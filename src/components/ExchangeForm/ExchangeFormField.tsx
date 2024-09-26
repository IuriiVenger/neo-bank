import { cn } from '@nextui-org/react';
import { FC } from 'react';

import CurrencyInfo from '../Currency/CurrencyInfo';
import DefaultContainer from '../ui/DefaultContainer';

import Loader from '../ui/Loader';

import { API } from '@/api/types';

type ExchangeFormFieldProps = {
  className?: string;
  titleLabel?: string;
  titleValue?: string;
  currency: API.List.Chains | API.List.Crypto | API.List.Fiat | null;
  chains?: API.List.Chains[];
  onCurrencyClick?: () => void;
  amount: string | number;
  handleAmountInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  amountSymbol?: string;
  calculatedField?: boolean;
  isAmountLoading?: boolean;
};

const ExchangeFormField: FC<ExchangeFormFieldProps> = (props) => {
  const {
    className,
    titleLabel,
    titleValue,
    currency,
    chains,
    onCurrencyClick,
    amount,
    handleAmountInput,
    amountSymbol,
    calculatedField = !handleAmountInput,
    isAmountLoading,
  } = props;

  return (
    <DefaultContainer rounded="md" className={cn(className, 'flex flex-col justify-between gap-2 !p-4')}>
      <div className="text-foreground-2 flex justify-between text-xs">
        <p>{titleLabel}</p>
        <p>{titleValue}</p>
      </div>
      <div className="flex justify-between">
        {!!currency && (
          <CurrencyInfo
            hideSymbol
            currency={currency}
            chains={chains}
            hideChainChip
            onCurrencyClick={onCurrencyClick}
          />
        )}
        {isAmountLoading ? (
          <Loader className="w-fit" size="sm" />
        ) : (
          <div className="flex items-center text-xl font-semibold tracking-wide">
            <input
              className="w-full text-end focus-visible:outline-none disabled:bg-inherit"
              value={amount}
              onChange={handleAmountInput}
              type="text"
              disabled={calculatedField}
            />
            <span className="ml-1">{amountSymbol}</span>
          </div>
        )}
      </div>
    </DefaultContainer>
  );
};

export default ExchangeFormField;
