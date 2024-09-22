import { FC } from 'react';

import WalletTransactions from '../../WalletTransactions';

import { API } from '@/api/types';
import BackButton from '@/components/ui/BackButton';
import DefaultContainer from '@/components/ui/DefaultContainer';
import { DashboardTabs } from '@/constants';
import { StoreDataWithStatusAndMeta } from '@/store/types';

type TransactionTabProps = {
  walletTransactions: StoreDataWithStatusAndMeta<API.WalletTransactions.Transaction[] | null>;
  changeDashboardTab: (tab: DashboardTabs) => void;
  loadMoreWalletTransactions: () => void;
};

const TransactionTab: FC<TransactionTabProps> = (props) => {
  const { walletTransactions, changeDashboardTab, loadMoreWalletTransactions } = props;

  const goToMainTab = () => changeDashboardTab(DashboardTabs.MAIN);

  return (
    <>
      <BackButton onClick={goToMainTab} text="Back to main" />
      <DefaultContainer className="h-full max-lg:bg-inherit max-lg:p-0">
        <h1 className="mb-8 text-2xl font-medium">Wallet</h1>
        <div className="flex flex-col justify-between gap-4">
          <div className="grid grid-cols-3 text-sm text-secondary max-lg:hidden">
            <p className="font-medium">Item</p>
            <div className="col-span-2 flex justify-between">
              <p className="font-medium">Date</p>
              <p className="font-medium">Amount</p>
            </div>
          </div>
          <WalletTransactions
            walletTransactions={walletTransactions}
            tableView
            loadMoreWalletTransactions={loadMoreWalletTransactions}
          />
        </div>
      </DefaultContainer>
    </>
  );
};

export default TransactionTab;
