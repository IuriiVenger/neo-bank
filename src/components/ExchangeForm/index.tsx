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
  handleSellingAmountInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSellingCurrencyClick?: () => void;

  buyingTitleLabel?: string;
  buyingTitleValue?: string;
  buyingAmount: string | number;
  buyingCurrency: API.List.Crypto | API.List.Fiat | null;
  handleBuyingAmountInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buyingAmoutPending?: boolean;
  onBuyingCurrencyClick?: () => void;
};

const ExchangeForm: FC<ExchangeFormProps> = (props) => {
  const {
    chains,
    className,
    sellingTitleLabel = 'From',
    sellingTitleValue,
    sellingAmount,
    sellingCurrency,
    handleSellingAmountInput,
    onSellingCurrencyClick,
    buyingTitleLabel = 'To',
    buyingTitleValue,
    buyingAmount,
    buyingCurrency,
    handleBuyingAmountInput,
    buyingAmoutPending,
    onBuyingCurrencyClick,
  } = props;

  return (
    <div className={className}>
      <ExchangeFormField
        titleLabel={sellingTitleLabel}
        titleValue={sellingTitleValue}
        currency={sellingCurrency}
        chains={chains}
        amount={sellingAmount}
        handleAmountInput={handleSellingAmountInput}
        amountSymbol={sellingCurrency?.symbol}
        onCurrencyClick={onSellingCurrencyClick}
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
        handleAmountInput={handleBuyingAmountInput}
        isAmountLoading={buyingAmoutPending}
        onCurrencyClick={onBuyingCurrencyClick}
      />
    </div>
  );
};

export default ExchangeForm;
