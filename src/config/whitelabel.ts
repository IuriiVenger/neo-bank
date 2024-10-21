const whiteLabelConfig = {
  disableLanding: !!process.env.DISABLE_LANDING,
  disableStaticPages: !!process.env.DISABLE_STATIC_PAGES,
  disableFiat: !!process.env.DISABLE_FIAT,
  disableKYC: !!process.env.DISABLE_KYC,
};

export type WhiteLabelConfig = typeof whiteLabelConfig;

export default whiteLabelConfig;
