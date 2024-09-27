import { Divider } from '@nextui-org/react';
import { FC } from 'react';

import { DashboardProps } from '../..';

import DefaultContainer from '@/components/ui/DefaultContainer';
import { roundToDecimals } from '@/utils/converters';

export type ConfirmWithdrawStepProps = {
  withdrawTarget: string;
  selectedCrypto: DashboardProps['selectedCrypto'];
  chains: DashboardProps['chainList'];
  externalCalcData: DashboardProps['externalCalcData'];
};

const ConfirmWithdrawStep: FC<ConfirmWithdrawStepProps> = (props) => {
  const { withdrawTarget, selectedCrypto, chains, externalCalcData } = props;
  const selectedChain = chains.find((chain) => chain.id === selectedCrypto?.chain);

  const prettyCommission = roundToDecimals(externalCalcData.withdrawCalcData?.commission || 0, 7);
  const prettyAmount = roundToDecimals(externalCalcData.withdrawCalcData?.net_amount || 0, 7);
  const prettyTotal = roundToDecimals(externalCalcData.withdrawCalcData?.total_amount || 0, 7);

  return (
    <div className="flex flex-col gap-3">
      <DefaultContainer className="flex flex-col gap-5 !p-4">
        <div className="flex flex-col gap-1">
          <p className="text-foreground-2 text-sm">To address</p>
          <p className="break-all font-medium">{withdrawTarget}</p>
        </div>
        <Divider />
        <div className="flex justify-between">
          <span className="text-foreground-2 text-sm">Currency</span>
          <span className="font-medium">{selectedCrypto?.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-2 text-sm">Network</span>
          <span className="font-medium">{selectedChain?.name}</span>
        </div>
      </DefaultContainer>
      <DefaultContainer className="flex flex-col gap-5 !p-4">
        <div className="flex justify-between">
          <span className="text-foreground-2 text-sm">Amount</span>
          <span className="font-medium">
            {prettyAmount} {selectedCrypto?.symbol}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-2 text-sm">Fee</span>
          <span className="font-medium">
            {prettyCommission} {selectedCrypto?.symbol}
          </span>
        </div>
        <Divider />
        <div className="flex justify-between">
          <span className="text-foreground-2 text-sm">Total</span>
          <span className="font-medium">
            {prettyTotal} {selectedCrypto?.symbol}
          </span>
        </div>
      </DefaultContainer>
      {/* Warning:
      Please ensure that you select the correct blockchain network and wallet address. If you deposit or withdraw assets to an incompatible network or incorrect address, your funds may be permanently lost and cannot be recovered. Always double-check the network and address before proceeding. */}

      <p className="text-foreground-2 text-xs">
        Please ensure that you select the correct blockchain network and wallet address. If you deposit or withdraw
        assets to an incompatible network or incorrect address, your funds may be permanently lost and cannot be
        recovered. Always double-check the network and address before proceeding.
      </p>
    </div>
  );
};

export default ConfirmWithdrawStep;
