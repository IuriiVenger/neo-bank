import { API } from '@/api/types';
import { StoreDataWithStatus, StoreDataWithStatusAndMeta } from '@/store/types';

export const isFiat = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains): currency is API.List.Fiat =>
  (currency as API.List.Fiat).code !== undefined && (currency as API.List.Fiat).enabled !== undefined;

export const isCrypto = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains): currency is API.List.Crypto =>
  (currency as API.List.Crypto).contract !== undefined && (currency as API.List.Crypto).chain !== undefined;

export const isChain = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains): currency is API.List.Chains =>
  (currency as API.List.Chains).id !== undefined && (currency as API.List.Chains).enabled !== undefined;

export const isStoreDataWithStatus = <T>(data: any): data is StoreDataWithStatus<T> =>
  data.data !== undefined && data.status !== undefined;

export const isStoreDataWithStatusAndMeta = <T>(data: any): data is StoreDataWithStatusAndMeta<T> =>
  data.data !== undefined && data.status !== undefined && data.meta !== undefined;
