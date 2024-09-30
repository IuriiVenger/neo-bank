import { PhoneNumberUtil } from 'google-libphonenumber';

export const isPhoneValid = (phone: string): boolean => {
  const phoneUtil = PhoneNumberUtil.getInstance();
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};
export const isNumber = (value: string) => /^[0-9]*$/.test(value);
