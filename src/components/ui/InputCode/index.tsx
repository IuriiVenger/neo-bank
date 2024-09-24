import cx from 'classnames';
import { useRef, KeyboardEvent, ClipboardEvent, memo, FC, ChangeEvent, useEffect, useMemo } from 'react';

import { createArray } from '@/utils/helpers';
import { isNumber } from '@/utils/validators';

type Props = {
  num: number;
  setCode: (code: string) => void;
  autoSendCode?: (code: string) => void;
  className?: string;
};

const InputCode: FC<Props> = memo(({ num, autoSendCode, className, setCode }) => {
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const numArray = useMemo(() => createArray(num), [num]);
  // eslint-disable-next-line no-unused-vars

  const handleInput = (n: number) => (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = (e.nativeEvent as any).data;
    const nextInput = inputRefs.current[n + 1];

    e.preventDefault();
    if (!isNumber(inputValue)) {
      e.target.value = '';
      return;
    }

    e.target.value = inputValue;

    const code = inputRefs.current.map(({ value }: HTMLInputElement) => value).join('');

    setCode(code);

    if (n < num && inputValue.length === 1) {
      return nextInput?.focus();
    }

    autoSendCode && autoSendCode(code);
  };

  const handleBackspace = (n: number) => (e: KeyboardEvent<HTMLInputElement>) => {
    if (!!n && e.key === 'Backspace') {
      e.preventDefault();
      const prevInput = inputRefs.current[n - 1];
      const currInput = inputRefs.current[n];
      currInput.value = '';
      prevInput?.focus();
    }
  };

  const handlePast = (e: ClipboardEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const clipboardData = e.clipboardData || window.Clipboard;
    const content = clipboardData.getData('Text');
    const isFullCode = content.length === num;
    const focusRefIndex = content.length < num ? content.length + 1 : num;

    inputRefs.current.forEach((input, i) => {
      // eslint-disable-next-line no-param-reassign
      input.value = content[i] || '';
    });

    const code = inputRefs.current.map(({ value }: HTMLInputElement) => value).join('');

    setCode(code);

    inputRefs.current[focusRefIndex]?.focus();
    if (isFullCode) {
      autoSendCode && autoSendCode(code);
    }
  };

  useEffect(() => {
    inputRefs.current[0] && inputRefs.current[0].focus();
  }, []);

  return (
    <div className={cx(className, 'flex')}>
      {numArray.map((n) => (
        <div key={n} className="min-[370px]:w-12 ml-1 mr-1 h-14 w-fit">
          <input
            ref={(el: HTMLInputElement) => {
              inputRefs.current[n] = el;
            }}
            type="number"
            className="h-full w-full rounded-lg border text-center focus-visible:outline-primary"
            onInput={handleInput(n)}
            maxLength={1}
            pattern="[0, 9]{1}"
            onPaste={handlePast}
            onKeyDown={handleBackspace(n)}
          />
        </div>
      ))}
    </div>
  );
});

export default InputCode;
