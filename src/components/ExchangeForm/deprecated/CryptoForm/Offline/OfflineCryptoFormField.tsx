import { Card } from '@nextui-org/react';

import { FC, useState } from 'react';

import { API } from '@/api/types';
import CurrencyInfo from '@/components/Currency/CurrencyInfo';
import CurrencyListModal from '@/components/modals/CurrencyListModal';
import { OfflineCryptoFormFieldAction } from '@/constants';
import { roundToDecimals } from '@/utils/converters';

type OfflineCryptoFormFieldProps = {
  action: OfflineCryptoFormFieldAction;
  currency: API.List.Crypto | API.List.Fiat | null;
  currencies: API.List.Crypto[] | API.List.Fiat[];
  onChangeCurrency: (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => void;
  value: number;
  setValue?: (value: number) => void;
  onInputBlur?: () => void;
  minValue?: number;
  chains?: API.List.Chains[];
};

const title = {
  [OfflineCryptoFormFieldAction.BUY]: 'You are buying',
  [OfflineCryptoFormFieldAction.SELL]: 'You are selling',
};

const OfflineCryptoFormField: FC<OfflineCryptoFormFieldProps> = (props) => {
  const { action, currencies, value, currency, onChangeCurrency, setValue, onInputBlur, minValue, chains } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toogleIsModalOpen = () => setIsModalOpen((prev) => !prev);
  const isCalculateField = !setValue;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setValue && setValue(Number(e.target.value));
  const inputValue = roundToDecimals(value, 2);

  const calculatedValue = value ? `~${inputValue}` : value;

  return (
    <Card className="flex w-full p-4" radius="sm">
      <p className="mb-2 text-xs">{title[action]}</p>

      <div className="flex items-start justify-between">
        {currency && (
          <CurrencyInfo chains={chains} currency={currency} onCurrencyClick={toogleIsModalOpen} minValue={minValue} />
        )}
        <input
          className="w-full text-end text-xl font-semibold tracking-wide focus-visible:outline-none disabled:!bg-inherit"
          onBlur={onInputBlur}
          value={isCalculateField ? calculatedValue : value}
          disabled={isCalculateField}
          onChange={handleInput}
          type={isCalculateField ? 'text' : 'number'}
        />
      </div>
      <CurrencyListModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        currencies={currencies}
        onSelect={onChangeCurrency}
        chains={chains}
      />
    </Card>
  );
};

export default OfflineCryptoFormField;
