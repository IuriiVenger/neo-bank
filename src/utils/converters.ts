import { falsyValues } from '@/constants';

export const roundToDecimals = (value: number, count = 2) => {
  const multiplier = 10 ** count;

  return Math.round(value * multiplier) / multiplier;
};

export const prettyId = (id: string | number) => {
  const idStr = id.toString();

  return `${idStr.substring(0, 4)}****${idStr.substring(idStr.length - 6)}`;
};

export const separateNumbers = (num: number, separator: string = ',', group_size = 3): string => {
  const isNegative = num < 0;
  const reverseStr = (str: string): string => str.split('').reverse().join('');
  const [integerPart, decimalPart] = Math.abs(num).toString().split('.');
  const regExp = new RegExp(`.{1,${group_size}}`, 'g');
  const splitedIntegerPart = reverseStr(integerPart).match(regExp)?.join(separator);
  const formattedIntegerPart = splitedIntegerPart || integerPart;
  const formattedNumber = `${isNegative ? '-' : ''}${reverseStr(formattedIntegerPart)}${
    decimalPart ? `.${decimalPart}` : ''
  }`;
  return formattedNumber;
};

export const getDateAndTime = (date: string) => {
  const dateObj = new Date(date);

  return dateObj.toLocaleString('ru-RU');
};

export const getDateAndTimeShort = (date: string) => {
  const dateObj = new Date(date);

  return dateObj.toLocaleString('en-EN', {
    hour: 'numeric',
    minute: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getDate = (date: string) => {
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString('ru-RU');
};

export const deleteDash = (str: string) => str.replace(/-/g, '');

export const getCardExpiryRecord = (month: number, year: number) => {
  const monthStr = month.toString().length === 1 ? `0${month}` : month;
  const yearStr = year.toString().slice(-2);

  return `${monthStr}/${yearStr}`;
};

export const convertToBoolean = (value: any): boolean => !falsyValues.includes(value);
