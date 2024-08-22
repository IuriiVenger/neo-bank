import { Input, InputProps } from '@nextui-org/react';
import { FC, FocusEvent, useState } from 'react';

const CustomInput: FC<InputProps> = (props) => {
  const [initialWindowScroll, setInitialWindowScroll] = useState(0);
  const { onBlur, onFocus, ...otherProps } = props;

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

  return <Input onBlur={handleBlur} onFocus={handleFocus} {...otherProps} />;
};

export default CustomInput;
