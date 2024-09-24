import { API } from './types';

import { getRequest, postRequest } from '.';

export const orders = {
  onramp: {
    calc: (params: API.Orders.OnRamp.Calc.Request) =>
      getRequest<API.Orders.OnRamp.Calc.Response>('/orders/onramp/calc', { params }),
    create: (data: API.Orders.OnRamp.Request) => postRequest<API.Orders.OnRamp.Response>('/orders/onramp', { data }),
  },
  offramp: {
    calc: (params: API.Orders.OffRamp.Calc.Request) =>
      getRequest<API.Orders.OffRamp.Calc.Response>('/orders/offramp/calc', { params }),
    create: (data: API.Orders.OffRamp.Request) => postRequest<API.Orders.OffRamp.Response>('/orders/offramp', { data }),
  },
  crypto: {
    withdrawal: {
      create: (data: API.Orders.Crypto.Withdrawal.Request) =>
        postRequest<API.Orders.Crypto.Withdrawal.Response>('/orders/crypto/withdrawal', { data }),
      calc: (params: API.Orders.Crypto.Withdrawal.Calc.Request) =>
        getRequest<API.Orders.Crypto.Withdrawal.Calc.Response>('/orders/crypto/withdrawal/calc', { params }),
    },
  },
  status: {
    getByUuid: (uuid: string) => getRequest<API.Orders.Status.Response>(`/orders/status/${uuid}`),
  },
  vcars: {
    topup: {
      internal: (data: API.Orders.VCards.Topup.Internal.Request) =>
        postRequest<API.Orders.VCards.Topup.Internal.Response>('/orders/issuing/topup/internal', { data }),
    },
  },
};
