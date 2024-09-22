/* eslint-disable arrow-body-style */
import { Button, cn } from '@nextui-org/react';
import { useState } from 'react';
import { RiAlignJustify } from 'react-icons/ri';

import TransactionDetailsModal from './TransactionDetailModal';

import { API } from '@/api/types';
import { walletTransactionTypeData } from '@/constants';
import { getDateAndTimeShort } from '@/utils/converters';

import { getDirectionSymbol } from '@/utils/helpers';
// import { getWalletTransactionData } from '@/utils/helpers';

type TransactionItemProps = {
  transaction: API.WalletTransactions.Transaction;
  tableView?: boolean;
};

const getWalletTransactionData = (transaction: API.WalletTransactions.Transaction) => {
  const typeData = walletTransactionTypeData[transaction.type];
  const methodData = typeData && typeData[transaction.method];
  const directionSymbol = getDirectionSymbol(methodData?.direction);

  return {
    operationTitle: methodData?.title || transaction.type,
    directionSymbol,
    Icon: methodData?.Icon || RiAlignJustify,
    amount: transaction.amount,
    currencySymbol: transaction.crypto?.symbol || '',
    date: getDateAndTimeShort(transaction.created_at),
  };
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, tableView }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const transactionData = getWalletTransactionData(transaction);
  const { operationTitle, directionSymbol, amount, currencySymbol, date, Icon } = transactionData;
  const handleDetailsOpen = () => setIsDetailsOpen(true);

  return (
    <div
      onClick={handleDetailsOpen}
      className={cn(
        'grid w-full cursor-pointer grid-cols-[repeat(2,max-content)] items-center justify-between hover:opacity-hover',
        tableView && 'lg:grid-cols-3',
      )}
    >
      <div className="flex items-center gap-2">
        <Button className=" bg-background-3 h-[42px] w-[42px]" radius="full" size="md" isIconOnly>
          <Icon className="text-xl" />
        </Button>

        <div>
          <p className="text-start font-medium">{operationTitle}</p>
          <p className={cn('text-foreground-2 text-start text-sm', tableView && 'lg:hidden')}>{date}</p>
        </div>
      </div>
      {tableView && <p className="text-foreground-2 text-sm max-lg:hidden">{date}</p>}

      <p className="text-end font-medium">
        {directionSymbol} {amount} {currencySymbol}
      </p>
      <TransactionDetailsModal isOpen={isDetailsOpen} transaction={transaction} onOpenChange={setIsDetailsOpen} />
    </div>
  );
};

export default TransactionItem;
