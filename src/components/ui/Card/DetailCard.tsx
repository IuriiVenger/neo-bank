import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import { CardProvider, CardSizes, DetailCardSizesValues } from './types';

import masterCardLogo from '@/assets/svg/payment-systems/master-card-logo.svg';
import visaLogo from '@/assets/svg/payment-systems/visa-logo-white.svg';
import darkCardBackground from '@/assets/tenant/dark/card-background.webp';
import darkCardLogo from '@/assets/tenant/dark/card-logo.svg';
import lightCardBackground from '@/assets/tenant/light/card-background.webp';
import lightCardLogo from '@/assets/tenant/light/card-logo.svg';
import ThemeImage from '@/components/ui/ThemeImage';
import { CardStatus } from '@/constants';
import { getCardProvider } from '@/utils/financial';

const cardSizesMap: Record<CardSizes, Record<DetailCardSizesValues, string>> = {
  xs: {
    provider: 'h-1 w-fit',
    tenantLogo: 'h-1 w-fit',
    card: 'w-15 h-9 rounded-[2px] p-1.5',
    cardNumber: 'text-[4px]',
  },
  sm: {
    provider: 'h-3 w-fit',
    tenantLogo: 'h-2.5 w-fit',
    card: 'w-44 h-28 rounded-[7px] p-2.5',
    cardNumber: 'text-xs',
  },
  md: {
    provider: 'h-5.5 w-fit',
    tenantLogo: 'h-5 w-fit',
    card: 'w-78 h-49 rounded-[12px] p-5',
    cardNumber: 'text-xl',
  },
  lg: {
    provider: 'h-7 w-fit',
    tenantLogo: 'h-5 w-fit',
    card: 'w-90 h-57 rounded-[14px] p-5',
    cardNumber: 'text-2xl',
  },
  adaptive: {
    provider: 'h-3 w-fit lg:h-5.5 lg:w-fit',
    tenantLogo: 'h-2.5 w-fit lg:h-5 lg:w-fit',
    card: 'w-44 h-28 lg:w-78 lg:h-49 rounded-[7px] p-2.5 lg:p-5 lg:rounded-[12px]',
    cardNumber: 'text-xs lg:text-xl',
  },
};

const CardProviders: Record<CardProvider, string> = {
  Visa: visaLogo,
  Mastercard: masterCardLogo,
};

type DetailCardProps = {
  className?: string;
  size?: CardSizes;
  disabled?: boolean;
  blocked?: boolean;
  provider?: CardProvider;
  cardNumber: string;
  // CVV?: string;
  expirationDate: string;
  // tenantLogo?: string;
  status?: CardStatus;
};

const DetailCard: FC<DetailCardProps> = (props) => {
  const {
    className,
    size = 'sm',
    disabled,
    blocked,
    provider,
    cardNumber,
    expirationDate,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // CVV,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // expirationDate,
    // tenantLogo,
    status = CardStatus.ACTIVE,
  } = props;

  const providerLogo = provider ? CardProviders[getCardProvider(provider)] : null;

  return (
    <section
      className={cn(
        cardSizesMap[size].card,
        className,
        'relative flex flex-col justify-between text-white',
        (status !== CardStatus.ACTIVE || disabled || blocked) && 'grayscale',
      )}
    >
      <ThemeImage
        className="absolute left-0 top-0 h-full w-full"
        lightSrc={lightCardBackground}
        darkSrc={darkCardBackground}
        alt="Card background"
      />
      <div className="relative  flex justify-between">
        <ThemeImage
          className={cardSizesMap[size].tenantLogo}
          lightSrc={lightCardLogo}
          darkSrc={darkCardLogo}
          alt="Tenant logo"
        />
      </div>

      <p className={cn(cardSizesMap[size].cardNumber, 'relative')}>{cardNumber}</p>

      <div className="relative flex justify-between">
        <p className={cardSizesMap[size].cardNumber}>{expirationDate}</p>
        {providerLogo && (
          <Image src={providerLogo} className={cn(cardSizesMap[size].provider, 'z-1 self-end')} alt="Provider logo" />
        )}
      </div>
    </section>
  );
};

export default DetailCard;
