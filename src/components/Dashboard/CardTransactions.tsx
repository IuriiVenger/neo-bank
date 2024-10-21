import { Button } from '@nextui-org/react';
import { FC } from 'react';

import { API } from '@/api/types';
import transactionsEmptyStateDark from '@/assets/svg/theme-illustrations/dark/transactions-empty-state.svg';
import transactionsEmptyStateLight from '@/assets/svg/theme-illustrations/light/transactions-empty-state.svg';

import EmptyState from '@/components/ui/EmptyState';
import Loader from '@/components/ui/Loader';

import TransactionItem from '@/components/ui/TransactionItem';
import { RequestStatus } from '@/constants';
import { StoreDataWithStatusAndMeta } from '@/store/types';

type WalletTransactionsProps = {
  selectedCardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  loadMoreCardTransactions: () => void;
  disableLoadMore?: boolean;
  tableView?: boolean;
};

const CardTransactions: FC<WalletTransactionsProps> = (props) => {
  const { selectedCardTransactions, loadMoreCardTransactions, disableLoadMore, tableView } = props;
  const { data, status, meta } = selectedCardTransactions;

  const isTransactionsLoading = status === RequestStatus.PENDING;
  const isFirstTransactionsLoading = isTransactionsLoading && !data?.length;
  const isLoadMoreAvailible = !meta.isLastPage && !disableLoadMore;

  return (
    <section className="flex flex-col gap-4 overflow-y-auto">
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
            <TransactionItem tableView={tableView} key={transaction.vendor_transaction_id} transaction={transaction} />
          ))}
          {isLoadMoreAvailible && (
            <Button
              color="primary"
              variant="bordered"
              radius="sm"
              className="mt-4 w-full max-w-32 self-center "
              onClick={loadMoreCardTransactions}
              isLoading={isTransactionsLoading}
            >
              Load more
            </Button>
          )}
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default CardTransactions;
