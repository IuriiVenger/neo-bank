import { CardProvider, CardSizes, CardSizesValues } from './types';

import masterCardLogo from '@/assets/svg/payment-systems/master-card-logo.svg';
import visaLogo from '@/assets/svg/payment-systems/visa-logo-white.svg';

export const cardSizesMap: Record<CardSizes, Record<CardSizesValues, string>> = {
  xs: {
    provider: 'h-1 w-fit',
    tenantLogo: 'h-1 w-fit',
    card: ' w-22 h-14 rounded-[2px] p-1.5',
    cardNumber: 'text-[4px]',
    balance: 'hidden',
    balanceLabel: 'hidden',
  },
  sm: {
    provider: 'h-3 w-fit',
    tenantLogo: 'h-2.5 w-fit',
    card: 'w-44 h-28 rounded-[7px] p-2.5',
    cardNumber: 'text-xs',
    balance: 'text-sm',
    balanceLabel: 'text-[10px]',
  },
  md: {
    provider: 'h-5.5 w-fit',
    tenantLogo: 'h-5 w-fit',
    card: 'w-78 h-49 rounded-[12px] p-5',
    cardNumber: 'text-xl',
    balance: 'text-sm mt-1',
    balanceLabel: 'text-[8px]',
  },
  lg: {
    provider: 'h-7 w-fit',
    tenantLogo: 'h-5 w-fit',
    card: 'w-90 h-57 rounded-[14px] p-5',
    cardNumber: 'text-2xl',
    balance: 'text-2xl mt-1.5',
    balanceLabel: 'text-sm',
  },
  adaptive: {
    provider: 'h-3 w-fit lg:h-5.5 lg:w-fit',
    tenantLogo: 'h-2.5 w-fit lg:h-5 lg:w-fit',
    card: 'w-44 h-28 lg:w-78 lg:h-49 rounded-[7px] p-2.5 lg:p-5 lg:rounded-[12px]',
    cardNumber: 'text-xs lg:xl',
    balance: 'text-sm lg:text-lg lg:mt-1.5',
    balanceLabel: 'text-[8px] lg:text-sm',
  },
};

export const CardProviders: Record<CardProvider, string> = {
  Visa: visaLogo,
  Mastercard: masterCardLogo,
};
