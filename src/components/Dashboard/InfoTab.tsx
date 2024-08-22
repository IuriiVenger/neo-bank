import { Accordion, AccordionItem, Button, Selection } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useState } from 'react';

import Loader from '../ui/Loader';

import WalletBalanceList from '../Wallet/WalletBalanceList';

import { DashboardProps } from '.';

import { API } from '@/api/types';
import { RequestStatus } from '@/constants';
import { StoreDataWithStatusAndMeta } from '@/store/types';
import { getDate, getDateAndTime } from '@/utils/converters';

type InfoTabProps = DashboardProps & {
  walletTransactions: StoreDataWithStatusAndMeta<API.WalletTransactions.Transaction[] | null>;
};

const InfoTab: FC<InfoTabProps> = (props) => {
  const { walletTransactions, loadMoreWalletTransactions, chainList, selectedWallet, cryptoList } = props;
  const { data, status, meta } = walletTransactions;

  const [balanceAccordinState, setBalanceAccordionState] = useState<Selection>(new Set(['1']));

  const isBalanceAccordionOpen = (balanceAccordinState as Set<string>).has('1');

  const isTransactionsLoading = status === RequestStatus.PENDING;
  const isFirstTransactionsLoading = isTransactionsLoading && !data?.length;
  const isLoadMoreAvailible = !meta.isLastPage;

  return (
    <section className="flex min-h-96 flex-col overflow-scroll">
      <Accordion
        selectedKeys={balanceAccordinState}
        onSelectionChange={setBalanceAccordionState}
        fullWidth
        className="-mt-4 mb-4 pl-0 pr-3 md:hidden"
      >
        <AccordionItem
          key={1}
          subtitle={isBalanceAccordionOpen ? 'Tap to collapse' : 'Tap to expand'}
          className="p-0"
          title={<h3 className="text-xl font-bold">Wallet crypto balance</h3>}
        >
          <WalletBalanceList chains={chainList} wallet={selectedWallet.data} cryptoList={cryptoList} />
        </AccordionItem>
      </Accordion>

      {!isFirstTransactionsLoading && data ? (
        <>
          <h3 className="mb-4 text-xl font-bold">Transactions</h3>
          {!data.length && <p className="text-neutral-500">No transactions to display.</p>}
          <Accordion>
            {data.map((transaction) => (
              <AccordionItem
                key={transaction.id}
                isCompact
                title={
                  <div className={cn('flex items-center gap-2 text-xl font-bold')}>
                    {transaction.amount} {transaction.crypto?.symbol}
                  </div>
                }
                subtitle={
                  <p className="mt-2 flex items-center gap-1">{`${getDate(transaction.created_at)}, ${transaction.type}`}</p>
                }
              >
                <div className="pl-2">
                  <h4 className="font-meidum mb-4 text-sm">Transaction details</h4>
                  <div className="grid grid-cols-[1fr,4fr] gap-x-8 gap-y-2 px-2 pb-4 text-xs text-neutral-500">
                    <p>ID:</p>
                    <p>{transaction.id}</p>
                    <p>DATE:</p>
                    <p>{getDateAndTime(transaction.created_at)}</p>
                    <p>TYPE:</p>
                    <p>{transaction.type}</p>
                    <p>STATUS:</p>
                    <p>{transaction.status}</p>
                    {transaction.txid && (
                      <>
                        <p>TXID:</p>
                        <p>{transaction.txid}</p>
                      </>
                    )}
                    {transaction.to && (
                      <>
                        <p>TO:</p>
                        <p>{transaction.to}</p>
                      </>
                    )}
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
          {isLoadMoreAvailible && (
            <Button
              color="primary"
              variant="bordered"
              radius="sm"
              className="mt-4 w-full max-w-32 self-center "
              onClick={loadMoreWalletTransactions}
              isLoading={isTransactionsLoading}
            >
              Load more
            </Button>
          )}
        </>
      ) : (
        // <>
        //
        //   <Table removeWrapper aria-label="Wallet transactions" className="overflow-scroll">
        //     <TableHeader>
        //       <TableColumn>ID</TableColumn>
        //       <TableColumn>Date</TableColumn>
        //       <TableColumn>Type</TableColumn>
        //       <TableColumn>Amount</TableColumn>
        //       <TableColumn>Status</TableColumn>
        //     </TableHeader>
        //     <TableBody emptyContent="No transactions to display.">
        //       {data.map((transaction) => (
        //         <TableRow key={transaction.id}>
        //           <TableCell>{transaction.id}</TableCell>
        //           <TableCell>{getDateAndTime(transaction.created_at)}</TableCell>
        //           <TableCell>{transaction.type}</TableCell>
        //           <TableCell className="whitespace-nowrap">
        //             {transaction.amount} {transaction.crypto?.symbol}
        //           </TableCell>
        //           <TableCell>{transaction.status}</TableCell>
        //         </TableRow>
        //       ))}
        //     </TableBody>
        //   </Table>
        //   {isLoadMoreAvailible && (
        //     <Button
        //       color="primary"
        //       variant="bordered"
        //       radius="sm"
        //       className="mt-4 w-full max-w-32 self-center "
        //       onClick={loadMoreWalletTransactions}
        //       isLoading={isTransactionsLoading}
        //     >
        //       Load more
        //     </Button>
        //   )}
        // </>
        <Loader />
      )}
    </section>
  );
};

export default InfoTab;
