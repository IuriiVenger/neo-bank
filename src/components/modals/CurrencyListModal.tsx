import cn from 'classnames';
import { FC } from 'react';

import MainModal from './MainModal';

import { API } from '@/api/types';
import CurrencyInfo from '@/components/Currency/CurrencyInfo';

import { WithAmount } from '@/types';
import { isChain } from '@/utils/financial';

type CurrencyListModalProps = {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  chains?: API.List.Chains[];
  title?: string;
  onSelect: (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => void;
  currencies: WithAmount<API.List.Crypto>[] | WithAmount<API.List.Fiat>[] | WithAmount<API.List.Chains>[];
  activeCurrency: API.List.Crypto | API.List.Fiat | API.List.Chains;
};

const CurrencyListModal: FC<CurrencyListModalProps> = (props) => {
  const { isOpen, setIsModalOpen, onSelect, currencies, activeCurrency, chains, title = 'Select a currency' } = props;

  const handleCurrencyClick = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    onSelect(currency);
    setIsModalOpen(false);
  };

  const getCurrencyId = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) =>
    isChain(currency) ? currency.id : currency.uuid;

  return (
    <MainModal confirmButtonHidden bodyClassname="px-0" isOpen={isOpen} onOpenChange={setIsModalOpen}>
      <div>
        <h2 className="mb-4 px-4 text-2xl font-medium">{title}</h2>
        {currencies.map((currency, index) => (
          <div
            className={cn(
              'flex cursor-pointer items-center justify-between px-4 py-2 transition-background md:border-b ',
              getCurrencyId(currency) === getCurrencyId(activeCurrency)
                ? 'bg-gray-100'
                : 'hover:bg-custom-lavander-gradient',
            )}
            key={index}
            onClick={() => handleCurrencyClick(currency)}
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
      </div>
    </MainModal>
  );
};

export default CurrencyListModal;
