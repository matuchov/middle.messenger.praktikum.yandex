type Validator = (value: string) => string | null;

// --- 1. Фабрики валидаторов ---

const validators = {
  // Обязательное поле
  required:
    (msg = 'Поле не может быть пустым'): Validator =>
    (value) =>
      !value ? msg : null,

  // Минимальная длина
  minLength:
    (min: number, msg?: string): Validator =>
    (value) =>
      value.length < min ? msg || `Минимум ${min} символов` : null,

  // Максимальная длина
  maxLength:
    (max: number, msg?: string): Validator =>
    (value) =>
      value.length > max ? msg || `Максимум ${max} символов` : null,

  // Проверка регулярным выражением
  pattern:
    (regex: RegExp, msg: string): Validator =>
    (value) =>
      !regex.test(value) ? msg : null,

  // Специальный валидатор: первая буква заглавная
  capitalized:
    (msg = 'Должно начинаться с заглавной буквы'): Validator =>
    (value) =>
      /^[A-ZА-ЯЁ]/.test(value) ? null : msg,

  // Специальный валидатор: не состоит только из цифр (для логина)
  notOnlyNumbers:
    (msg = 'Не может состоять только из цифр'): Validator =>
    (value) =>
      /^\d+$/.test(value) ? msg : null,

  // Валидатор телефона (простой)
  phone:
    (msg = 'Некорректный формат телефона'): Validator =>
    (value) =>
      /^\+?\d{10,15}$/.test(value) ? null : msg,
};

// --- 2. Конфигурация правил для полей ---

const rules: Record<string, Validator[]> = {
  first_name: [
    validators.required(),
    validators.capitalized(),
    validators.pattern(/^[A-ZА-ЯЁa-zа-яё\-]+$/, 'Только буквы и дефис'),
  ],
  second_name: [
    validators.required(),
    validators.capitalized(),
    validators.pattern(/^[A-ZА-ЯЁa-zа-яё\-]+$/, 'Только буквы и дефис'),
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
  phone: [validators.required(), validators.phone()],
};

// --- 3. Основная функция валидации ---

export const validateInput = (fieldName: string, value: string): string | null => {
  const fieldRules = rules[fieldName];

  // Если правил нет, считаем поле валидным
  if (!fieldRules) return null;

  for (const rule of fieldRules) {
    const error = rule(value);
    if (error) {
      return error; // Возвращаем первую найденную ошибку
    }
  }

  return null;
};
