import store from '@/app/store/store';

export const setFormError = (error: string, form: string, timeout?: number) => {
  store.set({
    forms: {
      [form]: {
        error,
      },
    },
  });
  if (timeout) {
    setTimeout(() => {
      store.set({
        forms: {
          [form]: {
            error: '',
          },
        },
      });
    }, timeout);
  }
};
