import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import { roundToDecimals } from '@/utils/converters';
import { getCryptoIconSrc } from '@/utils/financial';

const cryptoLabelSizesData = {
  xs: 'h-5 w-5',
  sm: 'h-7 w-7',
  md: 'h-[42px] w-[42px]',
  lg: 'h-12 w-12',
};

type CryptoLabelProps = {
  currencyNameLabel?: string;
  crypto: {
    symbol: string;
  };
  onlyIcon?: boolean;
  size?: keyof typeof cryptoLabelSizesData;
};

export type CryptoInfoAmountProps = {
  crypto: {
    amount: number;
    symbol: string;
    fiat_amount: number;
  };
  isTable?: boolean;
  className?: string;
} & ({ withoutFiat: true; fiatSymbol?: never } | { withoutFiat?: never; fiatSymbol: string });

export const CryptoLabel: FC<CryptoLabelProps> = ({ crypto, currencyNameLabel, onlyIcon, size = 'md' }) => (
  <div className="flex items-center gap-3">
    <Image
      className={cn('rounded-full object-cover', cryptoLabelSizesData[size])}
      src={getCryptoIconSrc(crypto.symbol)}
      alt="currency label"
      height={44}
      width={44}
    />
    {!onlyIcon && (
      <div className="flex flex-col items-start">
        <span className="font-medium leading-5">{currencyNameLabel || crypto.symbol}</span>
        <span className="text-foreground-2 text-sm leading-4">{crypto.symbol}</span>
      </div>
    )}
  </div>
);

export const CryptoInfoAmount: FC<CryptoInfoAmountProps> = (props) => {
  const { crypto, withoutFiat, fiatSymbol, isTable, className } = props;

  const fiatAmount = roundToDecimals(crypto.fiat_amount, 2);
  const cryptoAmount = roundToDecimals(crypto.amount, 8);

  return (
    <div className={cn('flex', className, isTable ? 'justify-between' : 'justify-end')}>
      {isTable && (
        <span className={cn('text-foreground-2 text-sm leading-4 max-lg:hidden')}>
          {fiatSymbol}
          {cryptoAmount}
        </span>
      )}
      <div className="flex flex-col items-end">
        <span className="font-medium leading-5">
          {crypto.amount} {crypto.symbol}
        </span>
        {!withoutFiat && (
          <span className={cn('text-foreground-2 text-sm leading-4', isTable && 'lg:hidden')}>
            {fiatSymbol}
            {fiatAmount}
          </span>
        )}
      </div>
    </div>
  );
};
