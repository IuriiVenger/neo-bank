import { FC } from 'react';

import { RiArrowDownLine } from 'react-icons/ri';

import ExchangeFormField from './ExchangeFormField';

import { API } from '@/api/types';

type ExchangeFormProps = {
  className?: string;
  chains?: API.List.Chains[];
  sellingTitleLabel?: string;
  sellingTitleValue?: string;
  sellingAmount: string | number;
  sellingCurrency: API.List.Crypto | API.List.Fiat | null;
  setSellingAmountInput?: (e: number) => void;
  onSellingCurrencyClick?: () => void;
  buyingTitleLabel?: string;
  buyingTitleValue?: string;
  buyingAmount: string | number;
  buyingCurrency: API.List.Crypto | API.List.Fiat | null;
  setBuyingAmountInput?: (e: number) => void;
  buyingAmoutPending?: boolean;
  onBuyingCurrencyClick?: () => void;
  roundSellingAmount?: boolean;
  roundSellingAmountCount?: number;
  roundBuyingAmount?: boolean;
  roundBuyingAmountCount?: number;
};

const ExchangeForm: FC<ExchangeFormProps> = (props) => {
  const {
    chains,
    className,
    sellingTitleLabel = 'From',
    sellingTitleValue,
    sellingAmount,
    sellingCurrency,
    setSellingAmountInput,
    onSellingCurrencyClick,
    buyingTitleLabel = 'To',
    buyingTitleValue,
    buyingAmount,
    buyingCurrency,
    setBuyingAmountInput,
    buyingAmoutPending,
    onBuyingCurrencyClick,
    roundBuyingAmount,
    roundBuyingAmountCount = 2,
    roundSellingAmount,
    roundSellingAmountCount = 2,
  } = props;

  return (
    <div className={className}>
      <ExchangeFormField
        titleLabel={sellingTitleLabel}
        titleValue={sellingTitleValue}
        currency={sellingCurrency}
        chains={chains}
        amount={sellingAmount}
        setAmount={setSellingAmountInput}
        amountSymbol={sellingCurrency?.symbol}
        onCurrencyClick={onSellingCurrencyClick}
        roundAmount={roundSellingAmount}
        roundAmountCount={roundSellingAmountCount}
      />

      <div className="bg-background-4 text-foreground-4 relative m-auto -my-[14px] flex h-11 w-11 items-center justify-center rounded-full text-2xl">
        <RiArrowDownLine />
      </div>
      <ExchangeFormField
        titleLabel={buyingTitleLabel}
        titleValue={buyingTitleValue}
        currency={buyingCurrency}
        amount={buyingAmount}
        amountSymbol={buyingCurrency?.symbol}
        setAmount={setBuyingAmountInput}
        isAmountLoading={buyingAmoutPending}
        onCurrencyClick={onBuyingCurrencyClick}
        roundAmount={roundBuyingAmount}
        roundAmountCount={roundBuyingAmountCount}
      />
    </div>
  );
};

export default ExchangeForm;
