const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

type Method = keyof typeof METHODS;
type PlainObject = Record<string, unknown>;
type RequestData = PlainObject | FormData | string;

type Options = {
  method?: Method;
  data?: RequestData;
  headers?: Record<string, string>;
  timeout?: number;
  withCredentials?: boolean;
};

function queryStringify(data: PlainObject) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    const value = data[key];
    return `${result}${key}=${encodeURIComponent(String(value ?? ''))}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

type HTTPMethod = <R = unknown>(url: string, options?: Options) => Promise<R>;

export class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => {
    const query =
      options.data && typeof options.data === 'object' && !(options.data instanceof FormData)
        ? queryStringify(options.data as PlainObject)
        : '';
    return this.request(`${url}${query}`, { ...options, method: METHODS.GET });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request: HTTPMethod = (url, options = {}) => {
    const { headers = {}, method, data, timeout = 5000, withCredentials = true } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.withCredentials = withCredentials;
      xhr.timeout = timeout;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }
      };

      xhr.onabort = () => reject(new Error('abort'));
      xhr.onerror = () => reject(new Error('error'));
      xhr.ontimeout = () => reject(new Error('timeout'));

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else if (typeof data === 'string') {
        xhr.send(data);
      } else {
        if (!headers['Content-Type']) {
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
