import { FC } from 'react';

import { API } from '@/api/types';
import CoinList from '@/components/CoinList';
import BackButton from '@/components/ui/BackButton';
import DefaultContainer from '@/components/ui/DefaultContainer';
import { DashboardTabs } from '@/constants';
import { StoreDataWithStatus } from '@/store/types';

type WalletTabProps = {
  cryptoBySymbol: API.List.CryptoBySymbol[];
  selectedWallet: StoreDataWithStatus<API.Wallets.ExtendWallet | null>;
  changeDashboardTab: (tab: DashboardTabs) => void;
  selectedWalletBalanceCurrency: string;
};

const WalletTab: FC<WalletTabProps> = (props) => {
  const { cryptoBySymbol, selectedWallet, selectedWalletBalanceCurrency, changeDashboardTab } = props;

  const goToMainTab = () => changeDashboardTab(DashboardTabs.MAIN);

  return (
    <>
      <BackButton onClick={goToMainTab} text="Back to main" />
      <DefaultContainer className="h-full max-lg:bg-inherit max-lg:p-0">
        <h1 className="mb-8 text-2xl font-medium">Wallet</h1>
        <div className="flex flex-col justify-between gap-4">
          <div className="grid grid-cols-3 text-sm text-secondary max-lg:hidden">
            <p className="font-medium">Currency</p>
            <div className="col-span-2 flex justify-between">
              <p className="font-medium">Balance</p>
              <p className="font-medium">Amount</p>
            </div>
          </div>
          <CoinList
            cryptoBySymbol={cryptoBySymbol}
            selectedWallet={selectedWallet}
            selectedWalletBalanceCurrency={selectedWalletBalanceCurrency}
          />
        </div>
      </DefaultContainer>
    </>
  );
};

export default WalletTab;
