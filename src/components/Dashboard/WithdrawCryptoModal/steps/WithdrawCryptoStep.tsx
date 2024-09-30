import { cn } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

import CurrencyInfo from '@/components/Currency/CurrencyInfo';
import { DashboardProps } from '@/components/Dashboard';

import CustomInput from '@/components/ui/CustomInput';
import DefaultContainer from '@/components/ui/DefaultContainer';
import Loader from '@/components/ui/Loader';
import { roundToDecimals } from '@/utils/converters';

export type WithdrawCryptoStepProps = {
  selectedCrypto: DashboardProps['selectedCrypto'];
  chains: DashboardProps['chainList'];
  externalCalcData: DashboardProps['externalCalcData'];
  changeCurrency: () => void;
  selectedCryptoBalance: number;
  setWithdrawTarget: (value: string) => void;
  withdrawTarget: string;
};

const WithdrawCryptoStep: FC<WithdrawCryptoStepProps> = (props) => {
  const {
    selectedCrypto,
    chains,
    externalCalcData,
    changeCurrency,
    selectedCryptoBalance,
    setWithdrawTarget,
    withdrawTarget,
  } = props;

  const { setAmount, amount, withdrawCalcData, isWithdrawCalcPending } = externalCalcData;

  const [withdrawAmount, setWithdrawAmount] = useState<string>('');

  const prettyCommission = withdrawCalcData?.commission ? roundToDecimals(withdrawCalcData.commission, 15) : 0;
  const prettyAmount = withdrawCalcData?.net_amount ? roundToDecimals(withdrawCalcData.net_amount, 15) : 0;
  const isAmountEnough = selectedCryptoBalance >= amount;

  const handleWithdrawTargetInput = (e: React.ChangeEvent<HTMLInputElement>) => setWithdrawTarget(e.target.value);
  const handleWithdrawAmountInput = (e: React.ChangeEvent<HTMLInputElement>) => setWithdrawAmount(e.target.value);

  const onWithdrawAmountChange = (value: string) => {
    if (Number.isNaN(+value)) {
      return;
    }
    setAmount(+value);
  };

  useEffect(() => {
    onWithdrawAmountChange(withdrawAmount);
  }, [withdrawAmount]);

  return (
    <div className={cn('flex flex-col gap-4')}>
      {selectedCrypto && (
        <DefaultContainer className="flex items-center justify-between !p-4">
          <CurrencyInfo
            hideSymbol
            currency={selectedCrypto}
            chains={chains}
            hideChainChip
            onCurrencyClick={changeCurrency}
          />
          <p className="text-foreground-2 text-sm">
            Balance: {selectedCryptoBalance} {selectedCrypto.symbol}
          </p>
        </DefaultContainer>
      )}

      <CustomInput
        isCustomBordered
        label="Address"
        placeholder="Enter wallet address"
        size="lg"
        onChange={handleWithdrawTargetInput}
        value={withdrawTarget}
        content="width=device-width, initial-scale=1, maximum-scale=1"
        radius="md"
        required
      />

      <CustomInput
        isCustomBordered
        label="Amount"
        placeholder="Enter amount"
        type="number"
        size="lg"
        onChange={handleWithdrawAmountInput}
        value={withdrawAmount}
        content="width=device-width, initial-scale=1, maximum-scale=1"
        radius="md"
        required
      />

      <div className="min-h-12">
        {isWithdrawCalcPending && isAmountEnough && <Loader size="sm" />}
        {!!withdrawCalcData?.net_amount && (
          <div className="h-5 w-full items-center justify-between px-1">
            <span className="text-xs md:text-base">
              {isAmountEnough && !isWithdrawCalcPending && (
                <>
                  You will get <strong>{prettyAmount}</strong> {selectedCrypto?.symbol}, fees{' '}
                  <strong>{prettyCommission}</strong> {selectedCrypto?.symbol}
                </>
              )}
              {!isAmountEnough && <>Insufficient funds </>}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawCryptoStep;
