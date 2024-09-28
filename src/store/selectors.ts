import { RootState } from './types';

import { getActiveFiatAvailableCrypto } from '@/utils/financial';

export const selectUser = (state: RootState) => state.user;
export const selectIsUserLoggedIn = (state: RootState) => !!state.user.userData?.id;
export const selectFinanceData = (state: RootState) => state.finance;
export const selectConfig = (state: RootState) => state.config;
export const selectModalVisibility = (state: RootState) => state.ui.popupVisibility;
export const selectOpenModalCount = (state: RootState) => state.ui.openModalCount;
export const selectActiveTheme = (state: RootState) => state.ui.activeTheme;

export const selectActiveFiatAvailableCrypto = (state: RootState) => {
  const { fiatExchangeRate, crypto } = state.finance;

  const availableCrypto = getActiveFiatAvailableCrypto(fiatExchangeRate, crypto);

  return availableCrypto;
};

export const selectCurrentWalletBalanceCurrency = (state: RootState) =>
  state.finance.fiats.find((item) => item.uuid === state.finance.selectedWallet.data?.base_fiat)?.symbol || 'N/A';
