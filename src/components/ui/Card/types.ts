import { CardStatus } from '@/constants';

export type CardSizes = 'xs' | 'sm' | 'md' | 'lg' | 'adaptive';
export type CardSizesValues = 'provider' | 'tenantLogo' | 'card' | 'cardNumber' | 'balance' | 'balanceLabel';
export type DetailCardSizesValues = 'provider' | 'tenantLogo' | 'card' | 'cardNumber';
export type CardProvider = 'Visa' | 'MasterCard' | string;

export type CardProps = {
  className?: string;
  size?: CardSizes;
  disabled?: boolean;
  blocked?: boolean;
  provider?: CardProvider;
  cardNumber?: string;
  balance?: string | null;
  masked?: boolean;
  status?: CardStatus;
  expirationDate?: string;
};
