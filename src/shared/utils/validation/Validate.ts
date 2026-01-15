export type Validator = (value: string) => string | null;

export const validators = {
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

export const validate = (fieldRules: Validator[] | undefined, value: string): string | null => {
  if (!fieldRules) return '';

  const errors: string[] = [];

  fieldRules.forEach((rule) => {
    const error = rule(value);
    if (error) {
      errors.push(error);
    }
  });
  return errors.join(', ');
};
