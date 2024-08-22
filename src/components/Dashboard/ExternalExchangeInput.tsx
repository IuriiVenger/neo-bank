import { Card, CardBody, CardFooter } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useMemo } from 'react';

import CustomInput from '../ui/CustomInput';
import Loader from '../ui/Loader';

import { API } from '@/api/types';
import { CalcType } from '@/constants';
import { StoreOfframpCalcData, StoreOnrampCalcData } from '@/store/types';
import { roundToDecimals } from '@/utils/converters';

type ExchangeFormProps = {
  className?: string;
  sellingCurrency: API.List.Fiat | API.List.Crypto;
  buyingCurrency: API.List.Fiat | API.List.Crypto;
  isCalculating?: boolean;
  calcData: StoreOfframpCalcData | StoreOnrampCalcData | null;
  sellValue: number;
  setSellValue: (value: number) => void;
  isWithdraw?: boolean;
  label?: string;
  disableLabel?: boolean;
  externalLabel?: string;
  externalLabelClassName?: string;
  negativeValue?: boolean;
};

const ExternalExhangeInput: FC<ExchangeFormProps> = (props) => {
  const {
    className,
    sellingCurrency,
    buyingCurrency,
    calcData,
    isWithdraw,
    sellValue,
    setSellValue,
    isCalculating,
    label,
    disableLabel,
    externalLabel,
    externalLabelClassName,
    negativeValue = false,
  } = props;

  const buyingValue = useMemo(() => {
    if (!calcData) {
      return 0;
    }
    return calcData.type === CalcType.OFFRAMP ? calcData.amount_fiat : calcData.amount_crypto;
  }, [calcData]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0 && !negativeValue) {
      setSellValue(0);
      return;
    }
    setSellValue(value);
  };
  const prettyBuyingValue = roundToDecimals(buyingValue, 2);
  const prettyFee = roundToDecimals(calcData?.commission || 0, 2);

  const getInputLabel = () => {
    if (disableLabel || externalLabel) {
      return null;
    }

    const defaultLabel = `Amount to ${isWithdraw ? 'withdraw' : 'deposit'}`;

    return label || defaultLabel;
  };

  const inputLabel = getInputLabel();

  return (
    <section>
      {externalLabel && <p className={cn(externalLabelClassName, 'mb-4 text-base font-medium')}>{externalLabel}</p>}
      <Card className={cn(className, 'border-1 shadow-none')}>
        <CardBody className="flex flex-col gap-2">
          <CustomInput
            type="number"
            label={inputLabel}
            labelPlacement="outside"
            placeholder="0.00"
            size="lg"
            onChange={handleInput}
            value={String(sellValue)}
            content="width=device-width, initial-scale=1, maximum-scale=1"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-small text-default-400">{sellingCurrency.symbol}</span>
              </div>
            }
          />
        </CardBody>
        <CardFooter>
          {isCalculating ? (
            <Loader size="sm" />
          ) : (
            <div className="flex h-5 w-full items-center justify-between px-1">
              <span className="text-xs md:text-base">
                You will receive <strong>{prettyBuyingValue}</strong> {buyingCurrency.symbol}
              </span>
              {calcData && (
                <span className="text-xs text-gray-400">
                  Fee: {prettyFee}
                  {sellingCurrency.symbol}
                </span>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default ExternalExhangeInput;
