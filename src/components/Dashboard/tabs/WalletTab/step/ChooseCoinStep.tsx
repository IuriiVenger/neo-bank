import { FC } from 'react';

import { API } from '@/api/types';
import CoinList from '@/components/CoinList';
import { StoreDataWithStatus } from '@/store/types';

export type ChooseCoinStepProps = {
  cryptoBySymbol: API.List.CryptoBySymbol[];
  selectedWallet: StoreDataWithStatus<API.Wallets.ExtendWallet | null>;
  onCoinClick: (symbol: string) => void;
  selectedWalletBalanceCurrency: string;
};

const ChooseCoinStep: FC<ChooseCoinStepProps> = (props) => (
  <div className="flex flex-col justify-between gap-4">
    <div className="grid grid-cols-3 text-sm text-secondary max-lg:hidden">
      <p className="font-medium">Currency</p>
      <div className="col-span-2 flex justify-between">
        <p className="font-medium">Balance</p>
        <p className="font-medium">Amount</p>
      </div>
    </div>
    <CoinList isTable {...props} />
  </div>
);

export default ChooseCoinStep;
