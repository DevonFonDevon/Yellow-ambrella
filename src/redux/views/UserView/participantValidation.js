export const ALLOWED_DURATION_WINDOWS = [
  { min: 2, max: 6 },
  { min: 8, max: 12 }
];

const isDurationAllowed = (duration) => ALLOWED_DURATION_WINDOWS.some(
  (window) => duration >= window.min && duration <= window.max
);

export const validateParticipant = (values) => {
  const errors = {};
  const nameValue = values.firstName?.trim();
  const creativeValue = values.creativeNumber?.trim();
  const phoneValue = values.phone?.trim();
  const durationValue = Number.parseInt(values.duration, 10);
  const orderValue = values.performanceOrder ? Number.parseInt(values.performanceOrder, 10) : null;

  if (!nameValue) errors.firstName = 'Имя обязательно';
  if (!creativeValue) errors.creativeNumber = 'Творческий номер обязателен';

  if (!phoneValue) {
    errors.phone = 'Телефон обязателен';
  } else if (!/^\+?\d{10,15}$/.test(phoneValue)) {
    errors.phone = 'Неверный формат телефона. Пример: +375291234567';
  }

  if (!Number.isFinite(durationValue) || durationValue <= 0) {
    errors.duration = 'Продолжительность должна быть больше 0 минут';
  } else if (!isDurationAllowed(durationValue)) {
    const ranges = ALLOWED_DURATION_WINDOWS
      .map((window) => `${window.min}-${window.max}`)
      .join(' или ');
    errors.duration = `Допустимые окна: ${ranges} мин`;
  }

  if (orderValue !== null) {
    if (!Number.isFinite(orderValue) || orderValue <= 0) {
      errors.performanceOrder = 'Порядок должен быть положительным числом';
    }
  }

  return errors;
};
