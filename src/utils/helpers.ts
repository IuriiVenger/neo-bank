import { getCookie, setCookie } from 'cookies-next';

import { supportEmail, walletType } from '../constants';

export const getWalletTypeLabel = (type: string) => walletType[type]?.label || type;

export const getStartTimeForTimer = (sec: number, key: string): Date => {
  const startTime = getCookie(key);

  if (!startTime) {
    const time = new Date();
    time.setSeconds(time.getSeconds() + sec);

    setCookie(key, new Date().toString(), { expires: time });

    return time;
  }

  const restTime = new Date(`${startTime}`);
  restTime.setSeconds(restTime.getSeconds() + sec);

  return restTime;
};

export const mailToSupport = () => window.open(`mailto:${supportEmail}`, '_blank');

export const isOddNumber = (num: number) => num % 2 !== 0;

export const isMultipleOf = (multiple: number, num: number) => num % multiple === 0;

export const isSettledPromiseFullfilled = (promise: PromiseSettledResult<any>) => promise.status === 'fulfilled';

export const createArray = (n: number): number[] => [...Array(n)].map((_, i) => i);

export const genereateTailwindThemeClasses = (className: string, lightClassName: string, darkClassName: string) => {
  const generatedThemesClassnames = `@apply ${lightClassName} dark:${darkClassName}`;
  return {
    [`.${className}`]: {
      [generatedThemesClassnames]: {},
    },
    [`.important-${className}`]: {
      [`${generatedThemesClassnames} !important`]: {},
    },
  };
};

export const getDirectionSymbol = (direction: string) => {
  switch (direction) {
    case 'incoming':
      return '+';
    case 'outgoing':
      return '-';
    default:
      return '';
  }
};

export const getRoundedClassName = (rounded: 'none' | 'sm' | 'md' | 'lg' | 'full') => {
  switch (rounded) {
    case 'none':
      return 'rounded-none';
    case 'sm':
      return 'rounded-small';
    case 'md':
      return 'rounded-medium';
    case 'lg':
      return 'rounded-large';
    case 'full':
      return 'rounded-full';
    default:
      return 'rounded-none';
  }
};

export const getFromLocalStorage = (key: string) => {
  if (typeof window === 'undefined' || !key) return null;
  const item = localStorage.getItem(key);
  return item;
};
