import cn from 'classnames';
import { FC } from 'react';

import { CryptoInfoAmount, CryptoInfoAmountProps, CryptoLabel } from './CryptoInfoComponents';

import { API } from '@/api/types';

export type CryptoWithoutDetails = {
  currencyName: string;
  crypto: Omit<API.Wallets.WalletBalanceItem, 'details'>;
};

export type WithoutFiat = {
  withoutFiat: true;
  fiatSymbol?: never;
};

export type WithFiat = {
  withoutFiat?: never;
  fiatSymbol: string;
};

export type CryptoWithDetails = {
  currencyName?: never;
  crypto: API.Wallets.WalletBalanceItem;
};

type CryptoInfoProps = (CryptoWithoutDetails | CryptoWithDetails) &
  (WithoutFiat | WithFiat) & {
    onCurrencyClick?: () => void;
    className?: string;
    isTable?: boolean;
    hideEmptyBalance?: boolean;
  };

const CryptoInfo: FC<CryptoInfoProps> = (props) => {
  const { crypto, onCurrencyClick, className, currencyName, fiatSymbol, withoutFiat, isTable, hideEmptyBalance } =
    props;
  const currencyNameLabel = 'details' in crypto ? crypto.details[0].crypto.name : currencyName;

  const cryptoInfoAmountProps: CryptoInfoAmountProps = withoutFiat ? { crypto, withoutFiat } : { crypto, fiatSymbol };

  return (
    <button
      type="button"
      onClick={onCurrencyClick}
      className={cn(
        className,
        'flex shrink-0 items-center gap-3',
        onCurrencyClick ? 'cursor-pointer hover:opacity-hover' : 'cursor-default',
      )}
    >
      <div
        className={cn(
          'flex flex-grow items-center justify-between gap-2',
          isTable ? 'grid grid-cols-2 lg:grid-cols-3' : 'flex flex-grow',
        )}
      >
        <CryptoLabel currencyNameLabel={currencyNameLabel} crypto={crypto} />

        <CryptoInfoAmount
          className={cn(
            'w-full',
            isTable && 'flex lg:col-span-2 max-lg:justify-end',
            hideEmptyBalance && !crypto.amount && isTable && 'max-lg:hidden',
            hideEmptyBalance && !crypto.amount && !isTable && 'hidden',
          )}
          isTable={isTable}
          {...cryptoInfoAmountProps}
        />
      </div>
    </button>
  );
};

export default CryptoInfo;
