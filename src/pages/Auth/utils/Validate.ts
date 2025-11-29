type Validator = (value: string) => string | null;

const validators = {
  required:
    (msg = 'Поле не может быть пустым'): Validator =>
    (value) =>
      !value ? msg : null,

  minLength:
    (min: number, msg?: string): Validator =>
    (value) =>
      value.length < min ? msg || `Минимум ${min} символов` : null,

  maxLength:
    (max: number, msg?: string): Validator =>
    (value) =>
      value.length > max ? msg || `Максимум ${max} символов` : null,

  pattern:
    (regex: RegExp, msg: string): Validator =>
    (value) =>
      !regex.test(value) ? msg : null,

  capitalized:
    (msg = 'Должно начинаться с заглавной буквы'): Validator =>
    (value) =>
      /^[A-ZА-ЯЁ]/.test(value) ? null : msg,

  notOnlyNumbers:
    (msg = 'Не может состоять только из цифр'): Validator =>
    (value) =>
      /^\d+$/.test(value) ? msg : null,

  phone:
    (msg = 'Телефон в формате +79991234567'): Validator =>
    (value) =>
      /^\+?\d{10,15}$/.test(value) ? null : msg,
};

const rules: Record<string, Validator[]> = {
  first_name: [
    validators.required(),
    validators.capitalized(),
    validators.pattern(/^[A-ZА-ЯЁa-zа-яё-]+$/, 'Только буквы и дефис'),
  ],
  second_name: [
    validators.required(),
    validators.capitalized(),
    validators.pattern(/^[A-ZА-ЯЁa-zа-яё-]+$/, 'Только буквы и дефис'),
  ],
  login: [
    validators.required(),
    validators.minLength(3),
    validators.maxLength(20),
    validators.pattern(/^[a-zA-Z0-9\-_]+$/, 'Только латиница, цифры, дефис и подчеркивание'),
    validators.notOnlyNumbers(),
  ],
  email: [
    validators.required(),
    validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Некорректный email'),
  ],
  password: [
    validators.required(),
    validators.minLength(8),
    validators.maxLength(40),
    validators.pattern(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква'),
    validators.pattern(/\d/, 'Должна быть хотя бы одна цифра'),
  ],
  new_password: [
    validators.required(),
    validators.minLength(8),
    validators.maxLength(40),
    validators.pattern(/[A-Z]/, 'Должна быть хотя бы одна заглавная буква'),
    validators.pattern(/\d/, 'Должна быть хотя бы одна цифра'),
  ],
  old_password: [validators.required()],
  phone: [validators.required(), validators.phone()],
  message: [validators.required(), validators.minLength(1), validators.maxLength(1000)],
};

export const validateInput = (fieldName: string, value: string): string | null => {
  const fieldRules = rules[fieldName];

  if (!fieldRules) return null;

  const errors: string[] = [];

  fieldRules.forEach((rule) => {
    const error = rule(value);
    if (error) {
      errors.push(error);
    }
  });
  return errors.join(', ');
};
