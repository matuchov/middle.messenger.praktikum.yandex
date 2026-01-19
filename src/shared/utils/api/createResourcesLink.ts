import { RESOURCES_URL } from '@/shared/Config';

export const createResourcesLink = (url?: string | null) => {
  if (url) {
    return RESOURCES_URL + url;
  } else {
    return undefined;
  }
};
