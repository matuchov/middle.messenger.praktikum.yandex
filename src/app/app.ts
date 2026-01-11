import { router } from '@/app/router/router';
import { routesConfig } from '@/app/router/routes';
import { SessionController } from '@/entities/Session';

const sessionController = new SessionController();

const initApp = async () => {
  routesConfig.forEach((route) => router.use(route.pathname, route.block));

  router.start();

  try {
    await sessionController.getUser();
  } catch (error) {
    if (window.location.pathname !== '/registration') {
      router.go('/');
    }
  }
};

document.addEventListener('DOMContentLoaded', initApp);
