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

const Card: FC<CardProps> = (props) => {
  const {
    className,
    size = 'sm',
    disabled,
    blocked,
    provider,
    masked,
    cardNumber,
    balance,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // CVV,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // expirationDate,
    // tenantLogo,
    status = CardStatus.ACTIVE,
  } = props;

  const printedCardNumber = masked && cardNumber ? `· · ${cardNumber.slice(-4)}` : cardNumber;

  const providerLogo = provider ? CardProviders[getCardProvider(provider)] : null;

  return (
    <section
      className={cn(
        cardSizesMap[size].card,
        className,
        'relative flex flex-col justify-between',
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
      {balance !== undefined && (
        <div className="relative flex flex-col items-start">
          <p className={cn(cardSizesMap[size].balanceLabel, 'text-white opacity-70')}>Balance:</p>
          <p className={cn(cardSizesMap[size].balance, 'text-white')}>{balance}</p>
        </div>
      )}
      <div className="relative flex items-center justify-between">
        <p className={cn(cardSizesMap[size].cardNumber, 'text-white')}>{printedCardNumber}</p>
        {providerLogo && <Image src={providerLogo} className={cardSizesMap[size].provider} alt="Provider logo" />}
      </div>
    </section>
  );
};

export default Card;
