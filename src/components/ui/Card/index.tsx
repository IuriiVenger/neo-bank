import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import masterCardLogo from '@/assets/svg/payment-systems/master-card-logo.svg';
import visaLogo from '@/assets/svg/payment-systems/visa-logo-white.svg';
import cardLogo from '@/assets/svg/tenant/card-logo.svg';
import { CardStatus } from '@/constants';
import { getCardProvider } from '@/utils/financial';

export type CardColors = 'blue' | 'turquoise' | 'grey' | 'lavander';
export type CardSizes = 'xs' | 'sm' | 'md' | 'lg' | 'adaptive';
export type CardSizesValues = 'provider' | 'tenantLogo' | 'card' | 'cardNumber' | 'balance' | 'balanceLabel';
export type CardProvider = 'Visa' | 'MasterCard' | string;

const CardColorsMap: Record<CardColors, string> = {
  blue: 'bg-card-blue-gradient',
  turquoise: 'bg-card-turquoise-gradient',
  grey: 'bg-card-grey-gradient',
  lavander: 'bg-card-lavander-gradient',
};

const cardSizesMap: Record<CardSizes, Record<CardSizesValues, string>> = {
  xs: {
    provider: 'h-1 w-fit',
    tenantLogo: 'h-1 w-fit',
    card: 'w-15 h-9 rounded-[2px] p-1.5',
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
    cardNumber: 'text-base',
    balance: 'text-sm mt-1',
    balanceLabel: 'text-[8px]',
  },
  lg: {
    provider: 'h-7 w-fit',
    tenantLogo: 'h-5 w-fit',
    card: 'w-90 h-57 rounded-[14px] p-5',
    cardNumber: 'text-xl',
    balance: 'text-2xl mt-1.5',
    balanceLabel: 'text-sm',
  },
  adaptive: {
    provider: 'h-3 w-fit lg:h-5.5 lg:w-fit',
    tenantLogo: 'h-2.5 w-fit lg:h-5 lg:w-fit',
    card: 'w-44 h-28 lg:w-78 lg:h-49 rounded-[7px] p-2.5 lg:p-5 lg:rounded-[12px]',
    cardNumber: 'text-xs lg:text-base',
    balance: 'text-sm lg:text-lg lg:mt-1.5',
    balanceLabel: 'text-[8px] lg:text-sm',
  },
};

const CardProviders: Record<CardProvider, string> = {
  Visa: visaLogo,
  Mastercard: masterCardLogo,
};

type CardProps = {
  color?: CardColors;
  className?: string;
  size?: CardSizes;
  disabled?: boolean;
  blocked?: boolean;
  provider?: CardProvider;
  cardNumber?: string;
  balance?: string;
  CVV?: string;
  expirationDate?: string;
  masked?: boolean;
  tenantLogo?: string;
  status?: CardStatus;
};

const Card: FC<CardProps> = (props) => {
  const {
    color = 'blue',
    className,
    size = 'sm',
    disabled,
    blocked,
    provider,
    masked,
    cardNumber,
    balance,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CVV,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    expirationDate,
    tenantLogo,
    status = CardStatus.ACTIVE,
  } = props;

  const printedCardNumber = masked && cardNumber ? `· · ${cardNumber.slice(-4)}` : cardNumber;
  const mainLogo = tenantLogo || cardLogo;
  const providerLogo = provider ? CardProviders[getCardProvider(provider)] : null;

  return (
    <section
      className={cn(
        CardColorsMap[color],
        cardSizesMap[size].card,
        className,
        'flex flex-col justify-between',
        (status !== CardStatus.ACTIVE || disabled || blocked) && 'grayscale',
      )}
    >
      <div className="flex justify-between ">
        <Image className={cardSizesMap[size].tenantLogo} src={mainLogo} alt="Tenant logo" />
      </div>
      {balance !== undefined && (
        <div className="flex flex-col items-start">
          <p className={cn(cardSizesMap[size].balanceLabel, 'text-white opacity-70')}>Balance:</p>
          <p className={cn(cardSizesMap[size].balance, 'text-white')}>{balance}</p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <p className={cn(cardSizesMap[size].cardNumber, 'text-white')}>{printedCardNumber}</p>
        {providerLogo && <Image src={providerLogo} className={cardSizesMap[size].provider} alt="Provider logo" />}
      </div>
    </section>
  );
};

export default Card;
