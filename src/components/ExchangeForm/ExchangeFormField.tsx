import { cn } from '@nextui-org/react';
import { FC, useRef, useState } from 'react';

import CurrencyInfo from '../Currency/CurrencyInfo';
import DefaultContainer from '../ui/DefaultContainer';

import Loader from '../ui/Loader';

import { API } from '@/api/types';
import { normaliseDecimalValue, roundToDecimals } from '@/utils/converters';

type ExchangeFormFieldProps = {
  className?: string;
  titleLabel?: string;
  titleValue?: string;
  currency: API.List.Chains | API.List.Crypto | API.List.Fiat | null;
  chains?: API.List.Chains[];
  onCurrencyClick?: () => void;
  amount: string | number;
  setAmount?: (amount: number) => void;
  amountSymbol?: string;
  calculatedField?: boolean;
  isAmountLoading?: boolean;
  roundAmount?: boolean;
  roundAmountCount?: number;
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
    setAmount,
    amountSymbol,
    calculatedField = !setAmount,
    isAmountLoading,
    roundAmount,
    roundAmountCount = 2,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInputRef = () => {
    inputRef.current?.focus();
  };

  const amountValue = roundAmount ? roundToDecimals(+amount, roundAmountCount) : amount;

  const [inputValue, setInputValue] = useState<string | number>(amountValue);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = normaliseDecimalValue(e.target.value);

    setInputValue(targetValue);
    if (!Number.isNaN(+targetValue) && setAmount) {
      setAmount(+targetValue);
    }
  };

  return (
    <DefaultContainer
      rounded="md"
      className={cn(className, 'flex flex-col justify-between gap-2 !p-4')}
      onClick={focusInputRef}
    >
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
              className="w-full bg-inherit text-end text-foreground focus-visible:outline-none disabled:!bg-inherit disabled:opacity-100"
              value={calculatedField ? amountValue : inputValue}
              defaultValue={calculatedField ? amountValue : inputValue}
              inputMode="decimal"
              onChange={onInputChange}
              type="text"
              disabled={calculatedField}
              pattern="\d+(\.\d*)?"
              ref={inputRef}
            />
            <span className="ml-1">{amountSymbol}</span>
          </div>
        )}
      </div>
    </DefaultContainer>
  );
};

export default ExchangeFormField;
