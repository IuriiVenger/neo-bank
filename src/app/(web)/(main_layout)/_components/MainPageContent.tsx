'use client';

import { API } from '@/api/types';
import Landing from '@/components/Landing';
import { defaultCurrency } from '@/constants';
import useExchange from '@/hooks/useExchange';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData, selectIsUserLoggedIn } from '@/store/selectors';
import { setSelectedCrypto, setSelectedFiat } from '@/store/slices/finance';

const MainPageCryptoForm = () => {
  const { selectedCrypto, selectedFiat, fiats, crypto, fiatExchangeRate, chains } = useAppSelector(selectFinanceData);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const currentCrypto = selectedCrypto || defaultCurrency.crypto;
  const currentFiat = selectedFiat || defaultCurrency.fiat;

  const dispatch = useAppDispatch();
  const selectCrypto = (currency: API.List.Crypto) => dispatch(setSelectedCrypto(currency));
  const setFiat = (currency: API.List.Fiat) => dispatch(setSelectedFiat(currency));
  const exchangeData = useExchange(fiatExchangeRate, currentCrypto);

  return (
    <Landing
      selectedCrypto={currentCrypto}
      selectedFiat={currentFiat}
      chainList={chains}
      fiatList={fiats}
      cryptoList={crypto}
      selectCrypto={selectCrypto}
      selectFiat={setFiat}
      exchangeData={exchangeData}
      isUserLoggedIn={isUserLoggedIn}
    />
  );
};

export default MainPageCryptoForm;
