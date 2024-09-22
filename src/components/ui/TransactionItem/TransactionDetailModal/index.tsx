import { FC } from 'react';

import TransactionDetailField from './TransactionDetailField';

import { API } from '@/api/types';
import MainModal from '@/components/modals/MainModal';
import { walletTransactionTypeData } from '@/constants';
import { getDirectionSymbol } from '@/utils/helpers';

type TransactionDetilsProps = {
  transaction: API.WalletTransactions.Transaction;

  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
};

const TransactionDetailsModal: FC<TransactionDetilsProps> = ({ isOpen, transaction, onOpenChange }) => {
  const transactionDetailFields: { label: string; value: string }[][] = [
    [{ label: 'Status', value: transaction.status }],
    [
      { label: 'To', value: transaction.to },
      { label: 'TXID', value: transaction.txid },
      { label: 'Curency', value: transaction.crypto.name },
      {
        label: 'Type',
        value: walletTransactionTypeData[transaction.type]?.[transaction.method]?.typeName || transaction.type,
      },
      {
        label: 'Method',
        value: walletTransactionTypeData[transaction.type]?.[transaction.method]?.methodName || transaction.method,
      },
    ],
    [
      { label: 'Date', value: transaction.created_at },
      { label: 'Amount', value: `${transaction.amount} ${transaction.crypto.symbol}` },
      { label: 'Info', value: transaction.info },
    ],
  ];

  const nonEmptyFields = transactionDetailFields.map((fields) => fields.filter(({ value }) => !!value));

  return (
    <MainModal saveScrollPosition isOpen={isOpen} onOpenChange={onOpenChange} bodyClassname="px-0" confirmButtonHidden>
      <div className="px-4 pb-2 pt-10">
        <h2 className="mb-15 text-center text-4xl font-medium">
          {getDirectionSymbol(walletTransactionTypeData[transaction.type]?.[transaction.method]?.direction)}{' '}
          {transaction.amount} {transaction.crypto.symbol}
        </h2>
        <div className="flex flex-col gap-3">
          {nonEmptyFields.map((fields, index) => (
            <TransactionDetailField key={index} items={fields} />
          ))}
        </div>
      </div>
    </MainModal>
  );
};

export default TransactionDetailsModal;
