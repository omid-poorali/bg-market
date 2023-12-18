import axios from 'axios';

export type APIRequest = {
  get: <A>(url: string) => Promise<A>;
  post: <A, B>(url: string, payload?: A) => Promise<B>;
  put: <A, B>(url: string, payload?: A) => Promise<B>;
  delete: <A, B>(url: string, payload?: A) => Promise<B>;
};

function request(): APIRequest {

  const service = axios.create({});
  service.defaults.baseURL = process.env.BASE_URL;
  service.defaults.headers.common['Content-Type'] = 'application/json';

  return {
    get: <T>(path: string) => new Promise<T>((resolve, reject) => {
      service
        .get(path)
        .then((response) => {
          resolve(response.data as T);
        })
        .catch((error) => {
          reject(error);
        });
    }),
    post: <A, B>(path: string, payload?: A) => new Promise<B>((resolve, reject) => {
      service
        .post(path, payload)
        .then((response) => {
          resolve(response.data as B);
        })
        .catch((error) => {
          reject(error);
        });
    }),
    put: <A, B>(path: string, payload?: A) => new Promise<B>((resolve, reject) => {
      service
        .put(path, payload)
        .then((response) => {
          resolve(response.data as B);
        })
        .catch((error) => {
          reject(error);
        });
    }),
    delete: <A, B>(path: string, payload?: A) => new Promise<B>((resolve, reject) => {
      service
        .delete(path, { data: payload })
        .then((response) => {
          resolve(response.data as B);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  };
}

export default request();
