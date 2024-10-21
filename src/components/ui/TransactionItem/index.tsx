/* eslint-disable arrow-body-style */
import { Button, cn } from '@nextui-org/react';
import { useState } from 'react';
import { RiAlignJustify } from 'react-icons/ri';

import TransactionDetailsModal from './TransactionDetailModal';

import { API } from '@/api/types';
import { walletTransactionTypeData, cardTransactionTypeData, cardTransactionStatusData } from '@/constants';
import { getDateAndTimeShort } from '@/utils/converters';

import { isWalletTransaction } from '@/utils/financial';
import { getDirectionSymbol } from '@/utils/helpers';
// import { getWalletTransactionData } from '@/utils/helpers';

type TransactionItemProps = {
  transaction: API.WalletTransactions.Transaction | API.Cards.TransactionItem;
  tableView?: boolean;
};

const getCardTransactionData = (transaction: API.Cards.TransactionItem) => {
  const typeData = cardTransactionTypeData[transaction.transaction_type];
  const statusData = cardTransactionStatusData[transaction.status];
  const directionSymbol = getDirectionSymbol(typeData?.direction);

  return {
    operationTitle: transaction.merchant,
    directionSymbol,
    Icon: typeData?.Icon || RiAlignJustify,
    amount: transaction.billing_amount,
    currencySymbol: transaction.billing_currency,
    date: getDateAndTimeShort(transaction.created_at),
    transactionColor: statusData.listColor,
  };
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
    transactionColor: 'text-foreground',
  };
};

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, tableView }) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const transactionData = isWalletTransaction(transaction)
    ? getWalletTransactionData(transaction)
    : getCardTransactionData(transaction);
  const { operationTitle, directionSymbol, amount, currencySymbol, date, Icon, transactionColor } = transactionData;
  const handleDetailsOpen = () => setIsDetailsOpen(true);

  return (
    <div
      onClick={handleDetailsOpen}
      className={cn(
        'grid w-full cursor-pointer grid-cols-[repeat(2,max-content)] items-center justify-between  hover:opacity-hover',
        tableView && 'lg:grid-cols-3',
      )}
    >
      <div className="flex items-center gap-2">
        <Button className=" bg-background-3 h-[42px] w-[42px]" radius="full" size="md" isIconOnly>
          <Icon className={cn('text-xl')} />
        </Button>

        <div>
          <p className={cn('text-start font-medium', transactionColor)}>{operationTitle}</p>
          <p className={cn('text-foreground-2 text-start text-sm', tableView && 'lg:hidden')}>{date}</p>
        </div>
      </div>
      {tableView && <p className="text-foreground-2 text-sm max-lg:hidden">{date}</p>}

      <p className={cn('text-end font-medium', transactionColor)}>
        {directionSymbol} {amount} {currencySymbol}
      </p>
      <TransactionDetailsModal isOpen={isDetailsOpen} transaction={transaction} onOpenChange={setIsDetailsOpen} />
    </div>
  );
};

export default TransactionItem;
