import { FC, useState } from 'react';

import { API } from '@/api/types';
import CryptoRequisites from '@/components/CryptoRequisites';
import { DashboardProps } from '@/components/Dashboard';
import { ResponseStatus } from '@/constants';

export type ReceiveCryptoStepProps = {
  getWalletAddress: DashboardProps['getWalletAddress'];
  createWalletAddress: DashboardProps['createWalletAddress'];
  selectedWallet: DashboardProps['selectedWallet'];
  selectedCrypto: DashboardProps['selectedCrypto'];
  chains: DashboardProps['chainList'];
};

const ReceiveCryptoStep: FC<ReceiveCryptoStepProps> = (props) => {
  const { selectedCrypto, chains } = props;
  const selectedChain = chains.find((chain) => chain.id === selectedCrypto?.chain);

  return (
    <div>
      <h2 className="mb-6 text-center font-medium">
        Deposit {selectedCrypto?.name} ({selectedChain?.symbol})
      </h2>
      <CryptoRequisites {...props} />
    </div>
  );
};

export default ReceiveCryptoStep;
