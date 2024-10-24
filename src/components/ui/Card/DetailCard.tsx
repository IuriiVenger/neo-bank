import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import { CardProviders, cardSizesMap } from './config';
import { CardProps } from './types';

import darkCardBackground from '@/assets/tenant/dark/card-background.webp';
import darkCardLogo from '@/assets/tenant/dark/card-logo.svg';
import lightCardBackground from '@/assets/tenant/light/card-background.webp';
import lightCardLogo from '@/assets/tenant/light/card-logo.svg';
import ThemeImage from '@/components/ui/ThemeImage';
import { CardStatus } from '@/constants';
import { getCardProvider } from '@/utils/financial';

const DetailCard: FC<CardProps> = (props) => {
  const {
    className,
    size = 'sm',
    disabled,
    blocked,
    provider,
    cardNumber,
    expirationDate,
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
