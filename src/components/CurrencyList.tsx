import { cn } from '@nextui-org/react';
import { FC } from 'react';

import CurrencyInfo from './Currency/CurrencyInfo';

import { API } from '@/api/types';
import { WithOptionalAmount } from '@/types';
import { getCurrencyId } from '@/utils/financial';

type CurrenciesListProps = {
  chains?: API.List.Chains[];
  currencies:
    | WithOptionalAmount<API.List.Crypto>[]
    | WithOptionalAmount<API.List.Fiat>[]
    | WithOptionalAmount<API.List.Chains>[];
  activeCurrency: API.List.Crypto | API.List.Fiat | API.List.Chains | null;
  handleCurrencyClick?: (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => void;
  className?: string;
};

const CurrenciesList: FC<CurrenciesListProps> = (props) => {
  const { currencies, activeCurrency, chains, handleCurrencyClick, className } = props;
  return (
    <section className={cn(className, 'flex flex-col gap-4')}>
      {currencies.map((currency, index) => (
        <div
          className={cn(
            'flex cursor-pointer items-center justify-between transition-background md:border-b ',
            activeCurrency && getCurrencyId(currency) === getCurrencyId(activeCurrency)
              ? 'bg-gray-100'
              : 'hover:opacity-hover',
          )}
          key={index}
          onClick={() => handleCurrencyClick && handleCurrencyClick(currency)}
        >
          <CurrencyInfo
            className=""
            currencyTitleClassname="font-medium text-lg"
            currency={currency}
            chains={chains}
            hideShevron
          />
          {currency.amount !== undefined && (
            <div className="flex flex-col items-end">
              <span className="font-medium leading-5">
                {currency.amount} {currency.symbol}
              </span>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default CurrenciesList;
