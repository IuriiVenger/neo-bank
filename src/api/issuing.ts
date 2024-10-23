import { API } from './types';

import { getRequest, patchRequest, postRequest } from '.';

import { defaultPaginationParams } from '@/constants';

export const issuing = {
  cards: {
    create: {
      standAloneCard: (data: API.Cards.Create.StandAloneRequest) =>
        postRequest<API.Cards.Create.StandAloneResponse>('/issuing/cards/create', { data }),
      fiatAccountCard: (data: API.Cards.Create.FiatAccountRequest) =>
        postRequest<API.Cards.Create.FiatAccountResponse>('/issuing/cards/', { data }),
    },
    getByWalletUuid: (wallet_uuid: string, limit: number, offset: number) =>
      getRequest<API.Cards.CardsList>('/issuing/cards', { params: { wallet_uuid, limit, offset } }),
    getByFiatAccountAndWalletId: (wallet_uuid: string, fiat_account_id: string, limit: number, offset: number) =>
      getRequest<API.Cards.CardsList>('/issuing/cards', { params: { wallet_uuid, fiat_account_id, limit, offset } }),
    getById: (card_id: string) => getRequest<API.Cards.CardDetailItem>(`/issuing/cards/${card_id}`),
    sensitiveData: {
      get: (card_id: string) => getRequest<API.Cards.SensitiveData>(`/issuing/cards/${card_id}/sensitive`),
      otp: {
        // have to update
        get: (card_id: string) => getRequest<API.Cards.OTP>(`/vcards/cards/${card_id}/sensitive/otp`),
      },
    },

    update: (card_id: string, data: API.Cards.Update.Request) =>
      patchRequest<API.Cards.CardDetailItem>(`/issuing/cards/${card_id}/update`, { data }),
  },
  transactions: {
    getByCardId: (card_id: string, limit = defaultPaginationParams.limit, offset = defaultPaginationParams.offset) =>
      getRequest<API.Cards.TransactionsList>(`/issuing/transactions/`, {
        params: { limit, offset, card_id, new_scheme: true },
      }),
    getByFiatAccountId: (
      fiat_account_id: string,
      limit = defaultPaginationParams.limit,
      offset = defaultPaginationParams.offset,
    ) =>
      getRequest<API.Cards.TransactionsList>(`/issuing/transactions/`, {
        params: { limit, offset, fiat_account_id, new_scheme: true },
      }),
  },
  bins: {
    getAll: () => getRequest<API.Issuing.Programs.Response>('/issuing/config/programs').then(({ data }) => data),
  },
};
