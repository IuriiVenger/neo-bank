import { convertToBoolean } from '@/utils/converters';

const whiteLabelConfig = {
  disableStaticPages: convertToBoolean(process.env.DISABLE_STATIC_PAGES),
  disableKYC: convertToBoolean(process.env.DISABLE_KYC),
};

export type WhiteLabelConfig = typeof whiteLabelConfig;

export default whiteLabelConfig;
