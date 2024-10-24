// import { IconType } from 'react-icons';
// import { RiAddFill, RiArrowUpLine } from 'react-icons/ri';

import { IconType } from 'react-icons';

import {
  RiArrowDownLine,
  RiArrowGoBackFill,
  RiArrowUpLine,
  RiCheckDoubleFill,
  RiCheckFill,
  RiCloseLine,
  RiTimeFill,
  RiTimerLine,
} from 'react-icons/ri';

import { TitleDescriptionShortitle, WalletType } from './types';

export const falsyValues = ['false', '0', '', 'FALSE', false, null, undefined, NaN, 0];

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

export enum OfflineCryptoFormTabs {
  BUY = 'buy',
  EXCHANGE = 'exchange',
}

export enum OfflineCryptoFormFieldAction {
  BUY = 'buy',
  SELL = 'sell',
}

export enum PaymentMethod {
  CRYPTO = 'crypto',
  FIAT = 'fiat',
}

export enum DashboardTabs {
  MAIN = 'main',
  CARD = 'card',
  FIAT_ACCOUNT = 'fiat_account',
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

export const cardLoadMoreDefaultLimit = 12;

export const emptyStoreDataWithStatus = {
  status: RequestStatus.NONE,
  data: null,
};

export const emptyStoreDataWithStatusAndMeta = {
  ...emptyStoreDataWithStatus,
  meta: defaultPaginationParams,
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

export enum CardTransactionDirection {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
}

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

export const cardFormFactorsData: Record<CardFormFactor, TitleDescriptionShortitle> = {
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

export enum CardTransactionType {
  AUTHORIZATION = 'AUTHORIZATION',
  CLEARING = 'CLEARING',
  REFUND = 'REFUND',
  REVERSAL = 'REVERSAL',
  ORIGINAL_CREDIT = 'ORIGINAL_CREDIT',
}

export enum CardTransactionStatus {
  APPROVED = 'APPROVED',
  CLEARED = 'CLEARED',
  EXPIRED = 'EXPIRED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  REVERSED = 'REVERSED',
}

export const cardTransactionTypeData: Record<
  CardTransactionType,
  { title: string; Icon: IconType; direction: string; typeName: string }
> = {
  [CardTransactionType.AUTHORIZATION]: {
    title: 'Authorization',
    Icon: RiArrowDownLine,
    direction: 'outgoing',
    typeName: 'authorization',
  },
  [CardTransactionType.CLEARING]: {
    title: 'Clearing',
    Icon: RiArrowUpLine,
    direction: 'outgoing',
    typeName: 'clearing',
  },
  [CardTransactionType.REFUND]: {
    title: 'Refund',
    Icon: RiArrowUpLine,
    direction: 'incoming',
    typeName: 'refund',
  },
  [CardTransactionType.REVERSAL]: {
    title: 'Reversal',
    Icon: RiArrowUpLine,
    direction: 'incoming',
    typeName: 'reversal',
  },
  [CardTransactionType.ORIGINAL_CREDIT]: {
    title: 'Original Credit',
    Icon: RiArrowUpLine,
    direction: 'incoming',
    typeName: 'original_credit',
  },
};

export const cardTransactionStatusData: Record<
  CardTransactionStatus,
  { title: string; Icon: IconType; detailColor?: string; listColor?: string }
> = {
  [CardTransactionStatus.APPROVED]: {
    title: 'Approved',
    Icon: RiCheckFill,
    detailColor: 'text-green-500',
  },
  [CardTransactionStatus.CLEARED]: {
    title: 'Cleared',
    Icon: RiCheckDoubleFill,
    detailColor: 'text-green-500',
  },
  [CardTransactionStatus.EXPIRED]: {
    title: 'Expired',
    Icon: RiTimerLine,
    detailColor: 'text-red-500',
    listColor: 'text-red-500',
  },
  [CardTransactionStatus.FAILED]: {
    title: 'Failed',
    Icon: RiCloseLine,
    detailColor: 'text-red-500',
    listColor: 'text-red-500',
  },
  [CardTransactionStatus.PENDING]: {
    title: 'Pending',
    Icon: RiTimeFill,
    detailColor: 'text-yellow-500',
    listColor: 'text-foreground-2',
  },
  [CardTransactionStatus.REVERSED]: {
    title: 'Reversed',
    Icon: RiArrowGoBackFill,
    detailColor: 'text-orange-500',
    listColor: 'text-yellow-500',
  },
};

export enum WalletTransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

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
