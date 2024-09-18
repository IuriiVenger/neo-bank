import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import { API } from '@/api/types';

import { getCryptoIconSrc } from '@/utils/financial';

type CurrencyInfoProps = {
  crypto: API.Wallets.WalletBalanceItem;

  onCurrencyClick?: () => void;
  className?: string;
};

const CryptoInfo: FC<CurrencyInfoProps> = (props) => {
  const { crypto, onCurrencyClick, className } = props;
  const currencyName = crypto.details[0] && crypto.details[0].crypto.name;

  return (
    <button
      type="button"
      onClick={onCurrencyClick}
      className={cn(className, 'flex shrink-0 items-center gap-2 hover:opacity-hover')}
    >
      <Image
        className="h-11 w-11 rounded-full object-cover"
        src={getCryptoIconSrc(crypto.symbol)}
        alt="currency label"
        height={44}
        width={44}
      />
      <div className="flex flex-grow items-center justify-between gap-2">
        <div className="flex flex-col items-start">
          <span className="font-medium leading-5">{currencyName}</span>
          <span className="text-foreground-2 text-sm leading-4">{crypto.symbol}</span>
        </div>
        <span className="font-medium">
          {crypto.amount} {crypto.symbol}
        </span>
      </div>
    </button>
  );
};

export default CryptoInfo;
