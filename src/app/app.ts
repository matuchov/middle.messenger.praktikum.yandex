import { router } from '@/app/router/router';
import { routesConfig } from '@/app/router/routes';
import { SessionController } from '@/entities/Session';
import store from './store/store';

const sessionController = new SessionController();

const initApp = async () => {
  routesConfig.forEach((route) => router.use(route.pathname, route.block));

  router.start();

  try {
    await sessionController.getUser();
  } catch {
    if (!['/', '/registration'].includes(window.location.pathname)) {
      router.go('/');
      store.set({ forms: { singin: { error: 'Необходимо авторизоваться' } } });
    }
  }
};

document.addEventListener('DOMContentLoaded', initApp);
