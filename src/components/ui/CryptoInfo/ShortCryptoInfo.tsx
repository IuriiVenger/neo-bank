import { cn } from '@nextui-org/react';
import { FC } from 'react';

import { CryptoLabel } from './CryptoInfoComponents';

import { API } from '@/api/types';

type ShortCryptoInfoProps = {
  onCurrencyClick?: () => void;
  className?: string;
  crypto: API.Wallets.WalletBalanceItem;
};

const ShortCryptoInfo: FC<ShortCryptoInfoProps> = (props) => {
  const { crypto, onCurrencyClick, className } = props;
  const currencyNameLabel = crypto.details[0].crypto.name;

  return (
    <button
      type="button"
      onClick={onCurrencyClick}
      className={cn(
        className,
        'border-background-4 flex w-fit shrink-0 items-center gap-2 rounded-full border px-3 py-1.5',
        onCurrencyClick ? 'cursor-pointer hover:opacity-hover' : 'cursor-default',
      )}
    >
      <CryptoLabel size="sm" onlyIcon currencyNameLabel={currencyNameLabel} crypto={crypto} />
      <span className="text-sm">
        {crypto.amount} {crypto.symbol}
      </span>
    </button>
  );
};

export default ShortCryptoInfo;
