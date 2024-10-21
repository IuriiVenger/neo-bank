import { FC } from 'react';

import TransactionDetailField, { TransactionDetailFieldProps } from './TransactionDetailField';

import { API } from '@/api/types';
import MainModal from '@/components/modals/MainModal';
import { cardTransactionStatusData, cardTransactionTypeData, walletTransactionTypeData } from '@/constants';
import { getDateAndTime } from '@/utils/converters';
import { getCardTransactionExchangeRate, isWalletTransaction } from '@/utils/financial';
import { getDirectionSymbol } from '@/utils/helpers';

type TransactionDetilsProps = {
  transaction: API.WalletTransactions.Transaction | API.Cards.TransactionItem;

  onOpenChange: (isOpen: boolean) => void;
  isOpen: boolean;
};

const TransactionDetailsModal: FC<TransactionDetilsProps> = ({ isOpen, transaction, onOpenChange }) => {
  const transactionDetailFields: TransactionDetailFieldProps['items'][] = isWalletTransaction(transaction)
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
          { label: 'Date', value: getDateAndTime(transaction.created_at) },
          { label: 'Amount', value: `${transaction.amount} ${transaction.crypto.symbol}` },
          { label: 'Info', value: transaction.info },
        ],
      ]
    : [
        [
          { label: 'Merchant', value: transaction.merchant },
          {
            label: 'Status',
            value: cardTransactionStatusData[transaction.status]?.title || transaction.status,
            valueClassname: cardTransactionStatusData[transaction.status]?.detailColor,
            ValueIcon: cardTransactionStatusData[transaction.status]?.Icon,
          },
          { label: 'Failury reason', value: transaction.failure_reason },
          { label: 'Date', value: getDateAndTime(transaction.created_at) },
          {
            label: 'Transaction amount',
            value: `${transaction.transaction_amount} ${transaction.transaction_currency}`,
          },
          { label: 'Billing amount', value: `${transaction.billing_amount} ${transaction.billing_currency}` },
          { label: 'Exchange rate', value: getCardTransactionExchangeRate(transaction) },
        ],
        [
          { label: 'Card number', value: `**${transaction.last4}` },
          { label: 'Transaction ID', value: transaction.vendor_transaction_id },
          { label: 'Type', value: transaction.transaction_type },
        ],
      ];

  const nonEmptyFields = transactionDetailFields.map((fields) => fields.filter(({ value }) => !!value));
  const transactionDirection = isWalletTransaction(transaction)
    ? walletTransactionTypeData[transaction.type]?.[transaction.method]?.direction
    : cardTransactionTypeData[transaction.transaction_type]?.direction;

  const transactionAmount = isWalletTransaction(transaction) ? transaction.amount : transaction.billing_amount;
  const transactionCurrency = isWalletTransaction(transaction)
    ? transaction.crypto.symbol
    : transaction.billing_currency;

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
