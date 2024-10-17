import { TypedUseSelectorHook } from 'react-redux';

import { store } from '.';

import { API } from '@/api/types';
import { CalcType, ModalNames } from '@/constants';

export type RootState = ReturnType<typeof store.getState>;
export type AppSelector = TypedUseSelectorHook<RootState>;
export type AppDispatch = typeof store.dispatch;
export type AppAction<P, T = string> = {
  readonly payload: P;
  readonly type: T;
};

export type SupabasePaginationParams = {
  meta: {
    offset: number;
    limit: number;
    isLastPage?: boolean;
  };
};

export type StoreDataWithStatus<T> = {
  status: RequestStatus;
  data: T;
};

export type StoreDataWithStatusAndMeta<T> = StoreDataWithStatus<T> & SupabasePaginationParams;
export type StoreDataWithStatusAndMetaRecordsWithNames<T> = Record<string, StoreDataWithStatusAndMeta<T>>;

export interface StoreOnrampCalcData extends API.Orders.OnRamp.Calc.Item {
  type: CalcType;
}

export interface StoreOfframpCalcData extends API.Orders.OffRamp.Calc.Item {
  type: CalcType;
}

export type ModalVisibility = {
  [key in ModalNames]: boolean;
};

type FiatAccountsWithCards = API.Wallets.FiatAccount & {
  cards: StoreDataWithStatusAndMeta<API.Cards.CardListItem[] | null>;
};

type ConfigState = {
  appEnviroment: AppEnviroment | null;
  isWebAppInitialized: boolean;
  isAppFullInitialized: boolean;
};

type FinanceState = {
  bins: API.Cards.CardConfig[];
  chains: API.List.Chains[];
  crypto: API.List.Crypto[];
  cryptoBySymbol: API.List.CryptoBySymbol[];
  fiats: API.List.Fiat[];
  fiatExchangeRate: API.Exchange.F2C[];
  onrampCalc: StoreDataWithStatus<StoreOnrampCalcData[] | null>;
  offrampCalc: StoreDataWithStatus<StoreOfframpCalcData[] | null>;
  withdrawCalc: StoreDataWithStatus<API.Orders.Crypto.Withdrawal.Calc.Response | null>;
  selectedChain: null | API.List.Chains;
  selectedCrypto: null | API.List.Crypto;
  selectedCard: StoreDataWithStatus<API.Cards.CardDetailItem | null>;
  selectedCardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  selectedFiat: null | API.List.Fiat;
  selectedFiatAccount: StoreDataWithStatus<API.Wallets.FiatAccount | null>;
  selectedFiatAccountCards: StoreDataWithStatusAndMeta<API.Cards.CardListItem[] | null>;
  selectedWallet: StoreDataWithStatus<API.Wallets.ExtendWallet | null>;
  selectedWalletTransactions: StoreDataWithStatusAndMeta<API.WalletTransactions.Transaction[] | null>;
  selectedWalletCards: StoreDataWithStatusAndMeta<API.Cards.CardListItem[] | null>;
  selectedWalletFiatAccounts: StoreDataWithStatusAndMeta<API.Wallets.FiatAccount[] | null>;
  selectedWalletFiatAccountsWithCards: Record<string, FiatAccountsWithCards>;
  userWallets: API.Wallets.Wallet[];
};

type LoadWithLimit<T> = T & {
  limit?: number;
  offset?: number;
};

type RequiredLoadWithLimit<T> = T & {
  limit: number;
  offset: number;
};

type UserState = {
  user: User | null;
  userData: API.Auth.UserData | null;
  userLoadingStatus: RequestStatus;
};
