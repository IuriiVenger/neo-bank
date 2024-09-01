/* eslint-disable no-console */
import { toast } from 'react-toastify';

import useAuth from './useAuth';

import { exchange } from '@/api/exchange';

import { list } from '@/api/list';
import { vcards } from '@/api/vcards';
import { AppEnviroment, defaultCurrency } from '@/constants';

import { useAppSelector } from '@/store';
import { selectConfig } from '@/store/selectors';
import { setAppFullInitialized, setWebAppInitialized } from '@/store/slices/config';
import {
  setBins,
  setChains,
  setCrypto,
  setFiatExchangeRate,
  setFiats,
  setSelectedCrypto,
} from '@/store/slices/finance';
import { AppDispatch } from '@/store/types';

const useInitApp = (dispatch: AppDispatch) => {
  const { initUser } = useAuth(dispatch);
  const { appEnviroment } = useAppSelector(selectConfig);

  const isWebEnviroment = appEnviroment === AppEnviroment.WEB;

  const initWebApp = async () => {
    const [binsData, fiatsData, cryptoData, chainsData, fiatExchangeRateData] = await Promise.allSettled([
      vcards.bins.getAll(),
      list.fiats.getAll(),
      list.crypto.getAll(),
      list.chains.getAll(),
      exchange.fiat2crypto.getByUuid(defaultCurrency.fiat.uuid),
    ]).then((results) => {
      results.forEach((result) => {
        if (result.status === 'rejected') {
          toast.error(`Error during app initialization in request ${result.reason.config.url}`);
          console.error('Error during initWebApp:', result.reason);
        }
      });

      return results;
    });

    binsData.status === 'fulfilled' && dispatch(setBins(binsData.value));
    fiatsData.status === 'fulfilled' && dispatch(setFiats(fiatsData.value));
    cryptoData.status === 'fulfilled' && dispatch(setCrypto(cryptoData.value));
    chainsData.status === 'fulfilled' && dispatch(setChains(chainsData.value));
    fiatExchangeRateData.status === 'fulfilled' && dispatch(setFiatExchangeRate(fiatExchangeRateData.value));

    const fiatExchangeRateCryptoUuid =
      fiatExchangeRateData.status === 'fulfilled' && fiatExchangeRateData.value.map((item) => item.crypto_uuid);
    const availableCrypto =
      cryptoData.status === 'fulfilled' &&
      fiatExchangeRateCryptoUuid &&
      cryptoData.value.filter((item) => fiatExchangeRateCryptoUuid.includes(item.uuid));

    if (availableCrypto && !availableCrypto.find((crypto_item) => crypto_item.uuid === defaultCurrency.crypto.uuid)) {
      dispatch(setSelectedCrypto(availableCrypto[0]));
    }
  };

  const initApp = async () => {
    const isAuthTokensExist = localStorage.getItem('access_token');

    try {
      await initWebApp();
      isAuthTokensExist && (await initUser());
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
