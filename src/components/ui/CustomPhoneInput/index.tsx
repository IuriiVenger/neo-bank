import cn from 'classnames';
import { FC } from 'react';
import { PhoneInput, PhoneInputProps } from 'react-international-phone';

type CustomPhoneInputProps = PhoneInputProps & {
  isPhoneInvalid?: boolean;
  invalidPhoneMessage?: string;
};

const CustomPhoneInput: FC<CustomPhoneInputProps> = ({
  isPhoneInvalid,
  invalidPhoneMessage = 'Phone is not valid',
  inputClassName,
  ...otherProps
}) => (
  <div className="flex flex-col gap-1">
    <PhoneInput
      inputClassName={cn(inputClassName, 'w-full', isPhoneInvalid && '!border-red-500')}
      countrySelectorStyleProps={{ buttonClassName: cn('!pl-2 !border-r-0', isPhoneInvalid && '!border-red-500') }}
      {...otherProps}
    />
    {isPhoneInvalid && <span className="w-full text-center text-tiny text-red-500">{invalidPhoneMessage}</span>}
  </div>
);

export default CustomPhoneInput;
