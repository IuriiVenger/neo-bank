/* eslint-disable no-console */
import { toast } from 'react-toastify';

import useAuth from './useAuth';

import { exchange } from '@/api/exchange';

import { issuing } from '@/api/issuing';
import { list } from '@/api/list';

import { AppEnviroment } from '@/constants';

import { useAppSelector } from '@/store';
import { selectConfig } from '@/store/selectors';
import { setAppFullInitialized, setWebAppInitialized } from '@/store/slices/config';
import {
  setBins,
  setChains,
  setCrypto,
  setCryptoBySymbol,
  setFiatExchangeRate,
  setFiats,
  setSelectedCrypto,
  setSelectedFiat,
} from '@/store/slices/finance';
import { AppDispatch } from '@/store/types';
import { getFromLocalStorage } from '@/utils/helpers';

const useInitApp = (dispatch: AppDispatch) => {
  const { initUser } = useAuth(dispatch);
  const { appEnviroment } = useAppSelector(selectConfig);

  const isWebEnviroment = appEnviroment === AppEnviroment.WEB;

  const initWebApp = async () => {
    const [binsData, fiatsData, cryptoData, chainsData, cryptoBySymbolData] = await Promise.allSettled([
      issuing.bins.getAll(),
      list.fiats.getAll(),
      list.crypto.getAll(),
      list.chains.getAll(),
      list.crypto.bySymbol(),
    ]).then((results) => {
      results.forEach((result) => {
        if (result.status === 'rejected') {
          toast.error(`Error during app initialization in request ${result.reason.config.url}`);
          console.error('Error during initWebApp:', result.reason);
        }
      });

      return results;
    });

    if (fiatsData.status === 'fulfilled' && cryptoData.status === 'fulfilled') {
      const defaultFiat = fiatsData.value[0];
      const defaultCrypto = cryptoData.value[0];
      const fiatExchangeRateData = await exchange.fiat2crypto.getByUuid(defaultFiat.uuid);
      const fiatExchangeRateCryptoUuid = fiatExchangeRateData.map((item) => item.crypto_uuid);
      const availableCrypto = cryptoData.value.filter((item) => fiatExchangeRateCryptoUuid.includes(item.uuid));

      if (!availableCrypto.find((crypto_item) => crypto_item.uuid === defaultCrypto.uuid)) {
        dispatch(setSelectedCrypto(availableCrypto[0]));
      } else {
        dispatch(setSelectedCrypto(defaultCrypto));
      }

      dispatch(setFiats(fiatsData.value));
      dispatch(setSelectedFiat(defaultFiat));
      dispatch(setCrypto(cryptoData.value));
      dispatch(setFiatExchangeRate(fiatExchangeRateData));
    }

    binsData.status === 'fulfilled' && dispatch(setBins(binsData.value.data));
    fiatsData.status === 'fulfilled' && dispatch(setFiats(fiatsData.value));
    cryptoBySymbolData.status === 'fulfilled' && dispatch(setCryptoBySymbol(cryptoBySymbolData.value));
    chainsData.status === 'fulfilled' && dispatch(setChains(chainsData.value));
  };

  const initApp = async () => {
    const isAuthTokensExist = getFromLocalStorage('access_token');

    try {
      await initWebApp();
      isAuthTokensExist && isWebEnviroment && (await initUser());
    } catch (error) {
      toast.error('Error during app initialization');
      console.error('Error during initWebApp:', error);
    } finally {
      dispatch(setWebAppInitialized(true));
      isWebEnviroment && dispatch(setAppFullInitialized(true));
    }
  };

  return { initApp };
};

export default useInitApp;
