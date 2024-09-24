import { FC } from 'react';

import DefaultContainer from '@/components/ui/DefaultContainer';

type TransactionDetailFieldProps = {
  items: { label: string; value: string }[];
};

const TransactionDetailField: FC<TransactionDetailFieldProps> = ({ items }) => (
  <DefaultContainer rounded="md" className="flex flex-col gap-5">
    {items.map(({ label, value }, index) => (
      <div key={index} className="flex justify-between gap-4">
        <span className="text-foreground-2 text-sm">{label}</span>
        <span className="text-end text-sm">{value}</span>
      </div>
    ))}
  </DefaultContainer>
);

export default TransactionDetailField;
