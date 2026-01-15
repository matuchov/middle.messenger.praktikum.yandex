export const errorStringify = (e: unknown) => {
  let error = 'Неизвестная ошибка';
  if (typeof e === 'string') {
    const res = JSON.parse(e);
    if (Object.hasOwn(res, 'reason')) {
      error = res.reason;
    }
  }
  return error;
};
