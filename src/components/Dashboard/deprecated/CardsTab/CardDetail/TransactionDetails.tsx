import { FC, Fragment } from 'react';

import { API } from '@/api/types';
import { getDateAndTime } from '@/utils/converters';

type TransactionInfoProps = {
  transaction: API.Cards.TransactionItem;
  className?: string;
};

const TransactionDetails: FC<TransactionInfoProps> = ({ transaction, className }) => {
  const detailsData = [
    { title: 'ID:', value: transaction.id },
    { title: 'DATE:', value: getDateAndTime(transaction.createdAt) },
    { title: 'TYPE:', value: transaction.type },
    { title: 'STATUS:', value: transaction.status },
    { title: 'DIRECTION:', value: transaction.direction },
    { title: 'DESCRIPTION:', value: transaction.description },
  ];

  return (
    <div className={className}>
      <h4 className="font-meidum mb-4 text-sm">Transaction details</h4>
      <div className="grid grid-cols-[1fr,4fr] gap-x-8 gap-y-2 px-2 pb-4 text-xs text-neutral-500">
        {detailsData.map((item) => (
          <Fragment key={item.title}>
            <span className="font-medium text-neutral-600">{item.title}</span>
            <span>{item.value}</span>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default TransactionDetails;
