import cn from 'classnames';
import { FC } from 'react';

import { FaCheckCircle } from 'react-icons/fa';

import CustomModal from '../ui/CustomModal';

import { API } from '@/api/types';
import CurrencyInfo from '@/components/Currency/CurrencyInfo';

import { isChain } from '@/utils/financial';

type CurrencyListModalProps = {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  chains?: API.List.Chains[];
  title?: string;
  onSelect: (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => void;
  currencies: API.List.Crypto[] | API.List.Fiat[] | API.List.Chains[];
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
    <CustomModal bodyClassname="px-0" isOpen={isOpen} onOpenChange={setIsModalOpen} header={title}>
      <>
        {currencies.map((currency, index) => (
          <div
            className={cn(
              'flex cursor-pointer items-center justify-between px-4  py-2 transition-background md:border-b ',
              getCurrencyId(currency) === getCurrencyId(activeCurrency)
                ? 'bg-gray-100'
                : 'hover:bg-light-lavander-gradient',
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
            {getCurrencyId(currency) === getCurrencyId(activeCurrency) && (
              <FaCheckCircle className="text-tenant-main" />
            )}
          </div>
        ))}
      </>
    </CustomModal>
  );
};

export default CurrencyListModal;
