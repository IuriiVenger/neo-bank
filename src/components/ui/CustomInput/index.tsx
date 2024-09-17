import { cn, Input, InputProps } from '@nextui-org/react';
import { FC, FocusEvent, useState } from 'react';

type IsCustomBorderedEnable = {
  isCustomBordered: true;
  variant?: never;
  labelPlacement?: never;
  customLabelClassName?: string;
  customInputWrapperClassName?: string;
  customWrapperClassName?: string;
};
type IsCustomBorderedDisable = {
  isCustomBordered?: never;
  customLabelClassName?: never;
  customInputWrapperClassName?: never;
  customWrapperClassName?: never;
};

type IsCustomBordered = IsCustomBorderedEnable | IsCustomBorderedDisable;

type CustomInputProps = InputProps & IsCustomBordered;

const radiusMap = {
  none: 'rounded-none',
  sm: 'rounded-small',
  md: 'rounded-medium',
  lg: 'rounded-large',
  full: 'rounded-full',
};

const CustomInput: FC<CustomInputProps> = (props) => {
  const [initialWindowScroll, setInitialWindowScroll] = useState(0);
  const {
    onBlur,
    onFocus,
    label,
    isCustomBordered,
    customLabelClassName,
    customInputWrapperClassName,
    customWrapperClassName,
    ...otherProps
  } = props;
  const { radius, size } = otherProps;

  const handleFocus = (e: FocusEvent<Element, Element>) => {
    setInitialWindowScroll(window.scrollY);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: FocusEvent<Element, Element>) => {
    if (initialWindowScroll !== window.scrollY) {
      window.scrollTo({ top: initialWindowScroll, behavior: 'instant' });
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  if (isCustomBordered) {
    return (
      <div className={cn('flex flex-col gap-2', customWrapperClassName)}>
        <span className={cn('text-foreground-2 text-sm font-medium', customLabelClassName)}>{label}</span>
        <div
          className={cn(
            'bg-background-2 rounded-medium',
            customInputWrapperClassName,
            radius && radiusMap[radius],
            !radius && size && radiusMap[size],
          )}
        >
          <Input variant="bordered" label={undefined} {...otherProps} />
        </div>
      </div>
    );
  }

  return <Input onBlur={handleBlur} onFocus={handleFocus} label={label} {...otherProps} />;
};

export default CustomInput;
