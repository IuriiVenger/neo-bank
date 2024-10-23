import { cn } from '@nextui-org/react';
import { FC } from 'react';

import { IconType } from 'react-icons';

import DefaultContainer from '@/components/ui/DefaultContainer';

export type TransactionDetailFieldItem = {
  label: string;
  value: string;
  valueClassname?: string;
  ValueIcon?: IconType;
};

export type TransactionDetailFieldProps = {
  items: TransactionDetailFieldItem[];
};

const TransactionDetailField: FC<TransactionDetailFieldProps> = ({ items }) => (
  <DefaultContainer rounded="md" className="flex flex-col gap-5">
    {items.map(({ label, value, valueClassname, ValueIcon }, index) => (
      <div key={index} className="flex justify-between gap-4">
        <span className="text-foreground-2 text-sm">{label}</span>
        <span className={cn('flex items-center gap-1 break-all text-end text-sm', valueClassname)}>
          {ValueIcon && <ValueIcon />}
          {value}
        </span>
      </div>
    ))}
  </DefaultContainer>
);

export default TransactionDetailField;
