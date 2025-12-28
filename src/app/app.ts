import { router } from '@/app/router/router';
import { routesConfig } from '@/app/router/routes';
import { SessionController } from '@/entities/Session';

const sessionController = new SessionController();

const initApp = async () => {
  // 1. Регистрируем все роуты
  routesConfig.forEach((route) => router.use(route.pathname, route.block));

  // 2. Запускаем роутер (но не рендерим сразу, если нужна проверка auth)
  router.start();

  try {
    // 3. Проверяем сессию
    await sessionController.getUser();

    // Если мы на странице логина, но авторизованы — на главную
    if (window.location.pathname === '/login') {
      router.go('/');
    }
  } catch (error) {
    // Если не авторизованы и не на регистрации — на логин
    if (window.location.pathname !== '/registration') {
      router.go('/login');
    }
  }
};

document.addEventListener('DOMContentLoaded', initApp);
