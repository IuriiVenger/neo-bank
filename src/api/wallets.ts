import { API } from './types';

import { getRequest, postRequest } from '.';

import { defaultPaginationParams, WalletTypeValues } from '@/constants';

export const wallets = {
  create: (type: WalletTypeValues) => postRequest('/wallets', { data: { type } }).then(({ data }) => data),
  getAll: () => getRequest<API.Wallets.Wallet[]>('/wallets').then(({ data }) => data),
  getByUuid: (uuid: string) => getRequest<API.Wallets.ExtendWallet>(`/wallets/${uuid}`).then(({ data }) => data),
  getAddress: (chain: number, wallet_uuid: string) =>
    getRequest<API.Wallets.WalletChain.Response>(`/wallets/address/${chain}`, { params: { wallet_uuid } }).then(
      ({ data }) => data,
    ),
  createAddress: (data: API.Wallets.WalletChain.Request) =>
    postRequest<API.Wallets.WalletChain.Response>('/wallets/address', { data }).then((responce) => responce.data),
  transactions: {
    getByWalletUuid: async (
      walletUuid: string,
      limit = defaultPaginationParams.limit,
      offset = defaultPaginationParams.offset,
    ) =>
      getRequest<API.WalletTransactions.Transaction[]>(`/wallets/transactions/${walletUuid}`, {
        params: { limit, offset },
      }),
  },
};
