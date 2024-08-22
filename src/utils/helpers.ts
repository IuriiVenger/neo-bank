import { getCookie, setCookie } from 'cookies-next';

import { supportEmail, walletType } from '@/constants';

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
