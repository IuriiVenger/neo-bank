import { API } from './types';

import { getRequest, patchRequest, postRequest } from '.';

import { defaultPaginationParams } from '@/constants';

export const vcards = {
  cards: {
    create: (data: API.Cards.Create.Request) => postRequest<API.Cards.Create.Response>('/vcards/cards', { data }),
    getAll: (wallet_uuid: string, limit: number, offset: number) =>
      getRequest<API.Cards.CardsList>('/vcards/cards', { params: { wallet_uuid, limit, offset } }),
    getById: (card_id: string) => getRequest<API.Cards.CardDetailItem>(`/vcards/cards/${card_id}`),
    sensitiveData: {
      get: (card_id: string) => getRequest<API.Cards.SensitiveData>(`/vcards/cards/${card_id}/sensitive`),
      otp: {
        get: (card_id: string) => getRequest<API.Cards.OTP>(`/vcards/cards/${card_id}/sensitive/otp`),
      },
    },

    update: (card_id: string, data: API.Cards.Update.Request) =>
      patchRequest<API.Cards.CardDetailItem>(`/vcards/cards/${card_id}`, { data }),
  },
  transactions: {
    getByCardId: (card_id: string, limit = defaultPaginationParams.limit, offset = defaultPaginationParams.offset) =>
      getRequest<API.Cards.TransactionsList>(`/vcards/transactions/${card_id}`, { params: { limit, offset } }),
  },
  bins: {
    getAll: () => getRequest<API.Cards.Bin[]>('/vcards/bins').then(({ data }) => data),
  },
};
