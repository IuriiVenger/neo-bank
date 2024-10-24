/* eslint-disable import/prefer-default-export */

import { AxiosRequestConfig } from 'axios';

import { API } from './types';

import { getRequest } from '.';

export const list = {
  fiats: {
    getAll: (params?: AxiosRequestConfig) => getRequest<API.List.Fiat[]>('/fiats', params).then(({ data }) => data),
  },
  crypto: {
    getAll: (params?: AxiosRequestConfig): Promise<API.List.Crypto[]> =>
      getRequest<API.List.NonModifiedCrypto[]>('/crypto', params).then(
        ({ data }) => data.map((item) => ({ ...item, chain: item.chain.id })), // have to fix on backend
      ),
    bySymbol: () => getRequest<API.List.CryptoBySymbol[]>('/crypto/by_symbol').then(({ data }) => data),
  },
  chains: {
    getAll: (params?: AxiosRequestConfig) => getRequest<API.List.Chains[]>('/chains', params).then(({ data }) => data),
  },
};
