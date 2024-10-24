import { cn } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';
import ReactVisibilitySensor from 'react-visibility-sensor';

import { DashboardProps } from '@/components/Dashboard';
import FiatAccount from '@/components/FiatAccount';
import DefaultContainer from '@/components/ui/DefaultContainer';
import Loader from '@/components/ui/Loader';

type FiatAccountListProps = {
  className?: string;
  fiatAccounts: DashboardProps['selectedWalletFiatAccountsWithCards'];
  onCardClick: (card_id: string) => void;
  loadMoreFiatAccounts: DashboardProps['loadMoreWalletFiatAccounts'];
  loadMoreFiatAccountCards: DashboardProps['loadMoreFiatAccountCards'];
  bins: DashboardProps['bins'];
  isLoadMoreAvailible?: boolean;
  openFiatAccountTab: (fiat_account_id: string) => void;
};

const FiatAccountsList: FC<FiatAccountListProps> = (props) => {
  const { fiatAccounts, loadMoreFiatAccounts, className, isLoadMoreAvailible, openFiatAccountTab } = props;
  const [isEndCardsListVisible, setIsEndCardsListVisible] = useState(false);

  const fiatAccountsData = Object.entries(fiatAccounts).map(([key, value]) => ({
    fiatAccountId: key,
    ...value,
  }));

  useEffect(() => {
    if (isEndCardsListVisible && isLoadMoreAvailible) {
      loadMoreFiatAccounts();
    }
  }, [isEndCardsListVisible]);

  return (
    <div className={cn(className, 'flex flex-col gap-4')}>
      {fiatAccountsData.map((fiatAccount) => (
        <DefaultContainer key={fiatAccount.fiatAccountId} paddingStyle="none" className="py-4">
          <FiatAccount
            key={fiatAccount.fiatAccountId}
            fiat_account={fiatAccount}
            onSeeDetailsClick={openFiatAccountTab}
            {...props}
          />
        </DefaultContainer>
      ))}
      {isLoadMoreAvailible && (
        <ReactVisibilitySensor onChange={setIsEndCardsListVisible}>
          <div className="m-auto h-1 w-fit flex-shrink-0">
            <Loader />
          </div>
        </ReactVisibilitySensor>
      )}
    </div>
  );
};

export default FiatAccountsList;
