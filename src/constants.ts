// import { IconType } from 'react-icons';
// import { RiAddFill, RiArrowUpLine } from 'react-icons/ri';

import { IconType } from 'react-icons';

import { RiArrowDownLine, RiArrowUpLine } from 'react-icons/ri';

import { WalletType } from './types';

export enum RequestStatus {
  NONE = 'none',
  PENDING = 'pending',
  FULLFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

export enum ResponseStatus {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  VERIFICATION_EXPIRED = 419,
  UNPROCESSABLE_ENTITY = 422,
  USER_BLOCKED = 423,
  SERVER_ERROR = 500,
}

export const defaultCurrency = {
  chain: {
    id: 1,
    enabled: true,
    name: 'Tron',
    symbol: 'TRON',
  },
  fiat: {
    uuid: 'bf229baf-8514-4ca7-b74e-239ffd333868',
    symbol: '$',
    code: 'USD',
    enabled: true,
  },
  crypto: {
    uuid: '9126d383-cd78-444f-9482-b5c33b4e552a',
    name: 'USDT',
    symbol: 'USDT',
    icon: 'USDT',
    contract: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
    decimal: 6,
    chain: 1,
  },
};

export enum CryptoFormTabs {
  BUY = 'buy',
  EXCHANGE = 'exchange',
}

export enum CryptoFormFieldAction {
  BUY = 'buy',
  SELL = 'sell',
}

export enum PaymentMethod {
  CRYPTO = 'crypto',
  FIAT = 'fiat',
}

export enum DashboardTabs {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  EXCHANGE = 'exchange',
  INFO = 'info',
  CARDS = 'cards',

  // new

  MAIN = 'main',
  CARD = 'card',
  WALLET = 'wallet',
  TRANSACTIONS = 'transactions',
}

export enum WalletTypeValues {
  PERSONAL = 'personal',
  P2P = 'p2p',
  ESCROW = 'escrow',
  MERCHANT = 'merchant',
  EXCHANGE = 'exchange',
  STAKING = 'staking',
  VAULT = 'vault',
}

export const walletType: WalletType = {
  personal: { value: WalletTypeValues.PERSONAL, label: 'Personal' },
  p2p: { value: 'p2p', label: 'P2P' },
  escrow: { value: WalletTypeValues.ESCROW, label: 'Escrow' },
  merchant: { value: WalletTypeValues.MERCHANT, label: 'Merchant' },
  exchange: { value: WalletTypeValues.EXCHANGE, label: 'Exchange' },
  staking: { value: WalletTypeValues.STAKING, label: 'Staking' },
  vault: { value: WalletTypeValues.VAULT, label: 'Vault' },
};

export const defaultUpdateInterval = 10000;

export const defaultPaginationParams = {
  limit: 10,
  offset: 0,
  isLastPage: false,
};

export const cardInitialPaginationParams = {
  limit: 10,
  offset: 0,
  isLastPage: false,
};

export const cardLoadMoreDefaultLimit = 12;

export const emptyStoreDataWithStatus = {
  status: RequestStatus.NONE,
  data: null,
};

export enum CalcType {
  ONRAMP = 'onramp',
  OFFRAMP = 'offramp',
  WITHDRAWAL = 'withdrawal',
}

export enum ModalNames {
  KYC = 'kyc',
  SETTINGS = 'settings',
}

export enum KYCStatuses {
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
  HOLD = 'HOLD',
  DOUBLE = 'DOUBLE',
  SOFT_REJECT = 'SOFT_REJECT',
  REJECT = 'REJECT',
  UNVERIFIED = 'UNVERIFIED',
}

export const retryKYCStatuses = [KYCStatuses.DOUBLE, KYCStatuses.HOLD, KYCStatuses.SOFT_REJECT];
export const requestKYCStatuses = [...retryKYCStatuses, KYCStatuses.UNVERIFIED];

export enum OrderStatuses {
  NEW = 'NEW',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
  FAILED = 'FAILED',
}

export enum OrderTypes {
  ONRAMP = 'onramp',
  OFFRAMP = 'offramp',
  CRYPTO_WITHDRAWAL = 'crypto_withdrawal',
}

export const supportEmail = 'info@pprince.io';

export enum CardsTabMode {
  LIST = 'list',
  CARD_DETAIL = 'card_detail',
  NEW_CARD = 'new_card',
}

export enum CardStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  CLOSED = 'CLOSED',
}

export enum CardTransationStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  DECLINE = 'DECLINE',
}

export enum CardTransactionDirection {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
}

export const allowedCryptoToFiatUuid = [
  '9126d383-cd78-444f-9482-b5c33b4e552a',
  'ebe6f1db-5d84-4538-907a-bde6970e217c',
  'aceafbb8-aca6-44f9-8b12-25560e4e3bb4',
  '509eca03-bc0d-4a38-b7dc-d136d2bdaa43',
];

export enum AppEnviroment {
  WEB = 'web',
  TELEGRAM = 'telegram',
}

export enum CustomTheme {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum CardFormFactor {
  VIRTUAL = 'VIRTUAL',
  PHYSICAL = 'PHYSICAL',
}

export enum CardType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export const cardFormFactorsData: Record<CardFormFactor, { title: string; description: string; shortTitle: string }> = {
  [CardFormFactor.VIRTUAL]: {
    title: 'Virtual card',
    shortTitle: 'Virtual',
    description: 'Digital version of your card will be instantly available',
  },
  [CardFormFactor.PHYSICAL]: {
    title: 'Physical card',
    shortTitle: 'Physical',
    description: 'Plastic card that you can use for in-store purchases.',
  },
};

export const cardTypeData: Record<CardType, { title: string; shortTitle: string }> = {
  [CardType.DEBIT]: {
    title: 'Debit card',
    shortTitle: 'Debit',
  },
  [CardType.CREDIT]: {
    title: 'Credit card',
    shortTitle: 'Credit',
  },
};

export enum WalletTransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

// p2p, crypto, bank_transfer, exchange, sbp

export enum WalletTransactionMethod {
  P2P = 'p2p',
  CRYPTO = 'crypto',
  BANK_TRANSFER = 'bank_transfer',
  EXCHANGE = 'exchange',
  SBP = 'sbp',
}

export const walletTransactionTypeData: Record<
  WalletTransactionType,
  Record<
    WalletTransactionMethod,
    { title: string; methodName: string; typeName: string; direction: string; Icon: IconType }
  >
> = {
  [WalletTransactionType.DEPOSIT]: {
    [WalletTransactionMethod.P2P]: {
      title: 'P2P',
      methodName: 'p2p',
      typeName: 'deposit',
      direction: 'incoming',
      Icon: RiArrowDownLine,
    },
    [WalletTransactionMethod.CRYPTO]: {
      title: 'Crypto',
      methodName: 'crypto',
      typeName: 'deposit',
      direction: 'incoming',
      Icon: RiArrowDownLine,
    },
    [WalletTransactionMethod.BANK_TRANSFER]: {
      title: 'Bank Transfer',
      methodName: 'bank_transfer',
      typeName: 'deposit',
      direction: 'incoming',
      Icon: RiArrowDownLine,
    },
    [WalletTransactionMethod.EXCHANGE]: {
      title: 'Exchange',
      methodName: 'exchange',
      typeName: 'deposit',
      direction: 'incoming',
      Icon: RiArrowDownLine,
    },
    [WalletTransactionMethod.SBP]: {
      title: 'SBP',
      methodName: 'sbp',
      typeName: 'deposit',
      direction: 'incoming',
      Icon: RiArrowDownLine,
    },
  },
  [WalletTransactionType.WITHDRAWAL]: {
    [WalletTransactionMethod.P2P]: {
      title: 'P2P',
      methodName: 'p2p',
      typeName: 'withdrawal',
      direction: 'outgoing',
      Icon: RiArrowUpLine,
    },
    [WalletTransactionMethod.CRYPTO]: {
      title: 'Crypto',
      methodName: 'crypto',
      typeName: 'withdrawal',
      direction: 'outgoing',
      Icon: RiArrowUpLine,
    },
    [WalletTransactionMethod.BANK_TRANSFER]: {
      title: 'Bank Transfer',
      methodName: 'bank_transfer',
      typeName: 'withdrawal',
      direction: 'outgoing',
      Icon: RiArrowUpLine,
    },
    [WalletTransactionMethod.EXCHANGE]: {
      title: 'Exchange',
      methodName: 'exchange',
      typeName: 'withdrawal',
      direction: 'outgoing',
      Icon: RiArrowUpLine,
    },
    [WalletTransactionMethod.SBP]: {
      title: 'SBP',
      methodName: 'sbp',
      typeName: 'withdrawal',
      direction: 'outgoing',
      Icon: RiArrowUpLine,
    },
  },
};
