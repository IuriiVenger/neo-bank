import { FC } from 'react';

import TransactionDetailField from './TransactionDetailField';

import { API } from '@/api/types';
import MainModal from '@/components/modals/MainModal';
import { cardTransactionTypeData, walletTransactionTypeData } from '@/constants';
import { isWalletTransaction } from '@/utils/financial';
import { getDirectionSymbol } from '@/utils/helpers';

type TransactionDetilsProps = {
  transaction: API.WalletTransactions.Transaction | API.Cards.TransactionItem;

  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
};

const TransactionDetailsModal: FC<TransactionDetilsProps> = ({ isOpen, transaction, onOpenChange }) => {
  const transactionDetailFields: { label: string; value: string }[][] = isWalletTransaction(transaction)
    ? [
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
      ]
    : [
        [
          { label: 'Status', value: transaction.status },
          { label: 'Failury reason', value: transaction.failure_reason },
        ],
        [
          { label: 'Card ID', value: transaction.card_id },
          { label: 'Wallet ID', value: transaction.wallet_id },
          { label: 'Fiat account ID', value: transaction.fiat_account_id },
          { label: 'Curency', value: transaction.transaction_currency },
          { label: 'Type', value: transaction.transaction_type },
        ],
        [
          { label: 'Date', value: transaction.posted_date },
          { label: 'Amount', value: `${transaction.transaction_amount} ${transaction.transaction_currency}` },
          { label: 'Type', value: transaction.transaction_type },
        ],
      ];

  const nonEmptyFields = transactionDetailFields.map((fields) => fields.filter(({ value }) => !!value));
  const transactionDirection = isWalletTransaction(transaction)
    ? walletTransactionTypeData[transaction.type]?.[transaction.method]?.direction
    : cardTransactionTypeData[transaction.transaction_type]?.direction;

  const transactionAmount = isWalletTransaction(transaction) ? transaction.amount : transaction.transaction_amount;
  const transactionCurrency = isWalletTransaction(transaction)
    ? transaction.crypto.symbol
    : transaction.transaction_currency;

  const closeModal = () => {
    onOpenChange(false);
  };

  return (
    <MainModal saveScrollPosition isOpen={isOpen} onClose={closeModal} bodyClassname="px-0" confirmButtonHidden>
      <div className="px-4 pb-2 pt-10">
        <h2 className="mb-15 text-center text-4xl font-medium">
          {getDirectionSymbol(transactionDirection)} {transactionAmount} {transactionCurrency}
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
