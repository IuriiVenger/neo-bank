import { RadioGroup, RadioProps, VisuallyHidden, useRadio } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

import { PaymentMethod } from '@/constants';

type PaymentMethodListItem = {
  title: string;
  description: string;
  method: PaymentMethod;
  disabled?: boolean;
};

type SelectPaymentMethodProps = {
  label: string;
  className?: string;
  activePaymentMethod: PaymentMethod;
  onSelect: (paymentMethod: PaymentMethod) => void;
  isWithdraw?: boolean;
  isFiatDisabled?: boolean;
};

export const CustomRadio = (props: RadioProps) => {
  const {
    Component,
    children,
    isSelected,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        'group inline-flex flex-row-reverse items-center justify-between hover:bg-content2 hover:opacity-100',
        'cursor-pointer gap-4 rounded border-2 border-default p-4 opacity-50',
        'data-[selected=true]:border-gray-400 data-[selected=true]:opacity-100',
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} checked={isSelected} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && <span className="text-small text-foreground opacity-70">{description}</span>}
      </div>
    </Component>
  );
};

const SelectPaymentMethod: FC<SelectPaymentMethodProps> = (props) => {
  const { className, activePaymentMethod, onSelect, label, isWithdraw, isFiatDisabled } = props;

  const paymentMethods: PaymentMethodListItem[] = [
    {
      title: 'Fiat',
      description: `${isWithdraw ? 'Withdraw' : 'Deposit'} with your favorite fiat currency`,
      method: PaymentMethod.FIAT,
      disabled: isFiatDisabled,
    },
    {
      title: 'Crypto',
      description: `${isWithdraw ? 'Withdraw' : 'Deposit'} with your favorite cryptocurrency`,
      method: PaymentMethod.CRYPTO,
    },
  ];

  return (
    <section className={className}>
      <h3 className="mb-4 text-xl font-bold">{label}</h3>
      <RadioGroup defaultValue={activePaymentMethod}>
        {paymentMethods
          .filter((item) => !item.disabled)
          .map((paymentMethod) => (
            <CustomRadio
              key={paymentMethod.method}
              value={paymentMethod.method}
              description={paymentMethod.description}
              onChange={() => onSelect(paymentMethod.method)}
              checked={activePaymentMethod === paymentMethod.method}
              color="primary"
            >
              {paymentMethod.title}
            </CustomRadio>
          ))}
      </RadioGroup>
    </section>
  );
};

export default SelectPaymentMethod;
