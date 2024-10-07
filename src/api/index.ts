import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { toast } from 'react-toastify';

import { AppEnviroment, ResponseStatus } from '@/constants';
import { navigate } from '@/utils/router';
import { deleteTokens, refreshTokens, setTokens } from '@/utils/tokensFactory';

// eslint-disable-next-line no-constant-condition
const baseURL = process.env.API_URL;
const tenantId = process.env.TENANT_ID;

type RequestQueueItem = {
  resolve: Function;
  reject: Function;
};

export const instance = axios.create({
  baseURL: baseURL || '/api/',
  timeout: 60000,
});

const isBrowser = typeof window !== 'undefined';

instance.interceptors.request.use((config) => {
  const access_token = isBrowser && localStorage.getItem('access_token');
  const appEnviroment = (isBrowser && localStorage.getItem('app_enviroment')) || AppEnviroment.WEB;

  const modifiedHeaders = {
    ...config.headers,
    'App-Enviroment': appEnviroment,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'X-Tenant-Id': tenantId,
  };

  if (access_token) {
    modifiedHeaders.Authorization = `${access_token}`;
  }

  return { ...config, headers: modifiedHeaders } as unknown as InternalAxiosRequestConfig;
});

let isTokenRefreshing = false;
let requestQueue: RequestQueueItem[] = [];

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === ResponseStatus.UNAUTHORIZED) {
      const { response, config: failedRequest } = error;
      const refreshToken = isBrowser && localStorage.getItem('refresh_token');
      const appEnviroment = (isBrowser && localStorage.getItem('app_enviroment')) || AppEnviroment.WEB;

      if (response.config?.url.includes('/auth/refresh/refresh_token') || !refreshToken) {
        if (typeof window !== 'undefined') {
          appEnviroment === AppEnviroment.TELEGRAM ? navigate('/auth/telegram/login') : navigate('/auth/login');
        }
        deleteTokens();
        requestQueue.forEach((request) => request.reject());
        requestQueue = [];
        return Promise.reject(response);
      }
      if (!isTokenRefreshing && typeof refreshToken === 'string') {
        isTokenRefreshing = true;
        refreshTokens(refreshToken)
          .then((newTokens) => {
            if (newTokens?.access_token) {
              setTokens(newTokens);
              requestQueue.forEach((request) => request.resolve());
              requestQueue = [];
            }
          })
          .finally(() => {
            isTokenRefreshing = false;
          });
      }
      return new Promise((res, rej) => {
        requestQueue.push({
          resolve: () => res(instance(failedRequest)),
          reject: () => rej(instance(failedRequest)),
        });
      });
    }

    return Promise.reject(error);
  },
);

interface RequestParams {
  params?: object;
  headers?: object;
}

interface PostRequestParams extends RequestParams {
  data: object;
}

export const patchRequest = async <T>(url: string, reqParams?: PostRequestParams): Promise<AxiosResponse<T>> => {
  const { data = {}, headers = {}, params = {} } = reqParams ?? {};

  const config = {
    headers,
    params,
  };

  const res = await instance.patch(url, data, config);

  return res;
};

export const postRequest = async <T>(url: string, reqParams?: PostRequestParams): Promise<AxiosResponse<T>> => {
  const { data = {}, headers = {}, params = {} } = reqParams ?? {};

  const config = {
    headers,
    params,
  };

  const res = await instance.post(url, data, config);

  return res;
};

export const deleteRequest = async (url: string, reqParams?: PostRequestParams) => {
  const { headers = {}, params = {}, data } = reqParams ?? {};

  const config = {
    headers,
    params,
    data,
  };

  const res = await instance.delete(url, config);

  return res;
};

export const getRequest = async <T>(url: string, reqParams?: RequestParams): Promise<AxiosResponse<T>> => {
  const { params = {}, headers = {} } = reqParams ?? {};

  const config = {
    url,
    params,
    headers,
  };

  const res = await instance.get(url, config);

  return res;
};
