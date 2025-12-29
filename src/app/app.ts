import { router } from '@/app/router/router';
import { routesConfig } from '@/app/router/routes';
import { SessionController } from '@/entities/Session';

const sessionController = new SessionController();

const initApp = async () => {
  routesConfig.forEach((route) => router.use(route.pathname, route.block));

  router.start();

  try {
    await sessionController.getUser();

    if (window.location.pathname === '/login') {
      router.go('/messenger');
    }
  } catch (error) {
    // Если не авторизованы и не на регистрации — на логин
    console.log('error');

    if (window.location.pathname !== '/registration') {
      router.go('/login');
    }
  }
};

document.addEventListener('DOMContentLoaded', initApp);
