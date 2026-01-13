import { Router } from '@/shared/utils/router';
import { routesConfig } from './routes';

const router = new Router('#app');

export const initRouter = () => {
  routesConfig.forEach((route) => {
    router.use(route.pathname, route.block);
  });

  router.start();
};

export { router };
