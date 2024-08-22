import { Card, CardBody, CardFooter } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

import CustomInput from '../ui/CustomInput';

import { API } from '@/api/types';
import Loader from '@/components/ui/Loader';

type ExternalWithdrawInputProps = {
  className?: string;
  amount: number;
  netAmount: number | null;
  commission: number | null;
  setAmount: (amount: number) => void;
  selectedCrypto: API.List.Crypto;
  isCalculating?: boolean;
  label?: string;
  negativeValue?: boolean;
};

const ExternalWithdrawInput: FC<ExternalWithdrawInputProps> = (props) => {
  const {
    className,
    amount,
    setAmount,
    selectedCrypto,
    isCalculating,
    netAmount,
    commission,
    label = 'Amount to withdraw',
    negativeValue = false,
  } = props;
  const handleAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < 0 && !negativeValue) {
      setAmount(0);
      return;
    }
    setAmount(value);
  };
  const prettyCommission = commission ? commission.toFixed(2) : '';
  return (
    <Card className={cn(className, 'border-1 shadow-none')}>
      <CardBody>
        <CustomInput
          className="-mt-4"
          type="number"
          placeholder="Enter amount"
          label={label}
          size="lg"
          labelPlacement="outside"
          content="width=device-width, initial-scale=1, maximum-scale=1"
          endContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-small text-default-400">{selectedCrypto.icon}</span>
            </div>
          }
          value={amount.toString()}
          onChange={handleAmountInput}
        />
      </CardBody>
      <CardFooter>
        {isCalculating ? (
          <Loader size="sm" />
        ) : (
          <div className="h-5 w-full items-center justify-between px-1">
            <span className="text-xs md:text-base">
              {!!netAmount && (
                <>
                  You will get <strong>{netAmount}</strong> {selectedCrypto.symbol}, fees{' '}
                  <strong>{prettyCommission}</strong> {selectedCrypto.symbol}
                </>
              )}
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ExternalWithdrawInput;
