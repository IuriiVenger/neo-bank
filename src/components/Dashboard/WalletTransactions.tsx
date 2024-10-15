import { Button, cn } from '@nextui-org/react';
import { FC, useEffect, useState } from 'react';

import ReactVisibilitySensor from 'react-visibility-sensor';

import { API } from '@/api/types';
import transactionsEmptyStateDark from '@/assets/svg/theme-illustrations/dark/transactions-empty-state.svg';
import transactionsEmptyStateLight from '@/assets/svg/theme-illustrations/light/transactions-empty-state.svg';

import EmptyState from '@/components/ui/EmptyState';
import Loader from '@/components/ui/Loader';

import TransactionItem from '@/components/ui/TransactionItem';
import { RequestStatus } from '@/constants';
import { StoreDataWithStatusAndMeta } from '@/store/types';

type WalletTransactionsProps = {
  walletTransactions: StoreDataWithStatusAndMeta<API.WalletTransactions.Transaction[] | null>;
  loadMoreWalletTransactions: () => void;
  autoLoadMore?: boolean;
  disableLoadMore?: boolean;
  tableView?: boolean;
  className?: string;
};

const WalletTransactions: FC<WalletTransactionsProps> = (props) => {
  const { walletTransactions, loadMoreWalletTransactions, disableLoadMore, tableView, className, autoLoadMore } = props;
  const { data, status, meta } = walletTransactions;
  const [isEndCardsListVisible, setIsEndCardsListVisible] = useState(false);

  const isTransactionsLoading = status === RequestStatus.PENDING;
  const isFirstTransactionsLoading = isTransactionsLoading && !data?.length;
  const isLoadMoreAvailible = !meta.isLastPage && !disableLoadMore;

  useEffect(() => {
    if (isEndCardsListVisible && isLoadMoreAvailible) {
      loadMoreWalletTransactions();
    }
  }, [isEndCardsListVisible]);

  return (
    <section className={cn('flex flex-col gap-4 overflow-scroll', className)}>
      {!isFirstTransactionsLoading && data ? (
        <>
          {!data.length && (
            <EmptyState
              darkImage={transactionsEmptyStateDark}
              lightImage={transactionsEmptyStateLight}
              title="No transactions yet"
            />
          )}
          {data.map((transaction) => (
            <TransactionItem tableView={tableView} key={transaction.id} transaction={transaction} />
          ))}
          {isLoadMoreAvailible && !autoLoadMore && (
            <Button
              color="primary"
              variant="bordered"
              radius="sm"
              className="mt-4 w-full max-w-32 flex-shrink-0 self-center"
              onClick={loadMoreWalletTransactions}
              isLoading={isTransactionsLoading}
            >
              Load more
            </Button>
          )}
          {isLoadMoreAvailible && autoLoadMore && (
            <ReactVisibilitySensor onChange={setIsEndCardsListVisible}>
              <div className="m-auto w-fit flex-shrink-0">
                <Loader />
              </div>
            </ReactVisibilitySensor>
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default WalletTransactions;
