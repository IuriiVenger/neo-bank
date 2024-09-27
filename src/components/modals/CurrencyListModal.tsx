import { FC } from 'react';

import MainModal from './MainModal';

import { API } from '@/api/types';
import CurrenciesList from '@/components/CurrencyList';

import { WithOptionalAmount } from '@/types';

type CurrencyListModalProps = {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  chains?: API.List.Chains[];
  title?: string;
  onSelect: (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => void;
  currencies:
    | WithOptionalAmount<API.List.Crypto>[]
    | WithOptionalAmount<API.List.Fiat>[]
    | WithOptionalAmount<API.List.Chains>[];
  activeCurrency: API.List.Crypto | API.List.Fiat | API.List.Chains | null;
};

const CurrencyListModal: FC<CurrencyListModalProps> = (props) => {
  const { isOpen, setIsModalOpen, onSelect, currencies, activeCurrency, chains, title = 'Select a currency' } = props;

  const handleCurrencyClick = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    onSelect(currency);
    setIsModalOpen(false);
  };

  return (
    <MainModal confirmButtonHidden bodyClassname="px-0" isOpen={isOpen} onOpenChange={setIsModalOpen}>
      <div>
        <h2 className="mb-4 px-4 text-2xl font-medium">{title}</h2>
        <CurrenciesList currencies={currencies} chains={chains} handleCurrencyClick={handleCurrencyClick} />
      </div>
    </MainModal>
  );
};

export default CurrencyListModal;
