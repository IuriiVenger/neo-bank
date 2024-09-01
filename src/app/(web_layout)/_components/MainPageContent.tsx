'use client';

import { API } from '@/api/types';
import Landing from '@/components/Landing';
import useExchange from '@/hooks/useExchange';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectFinanceData, selectIsUserLoggedIn } from '@/store/selectors';
import { setSelectedCrypto, setSelectedFiat } from '@/store/slices/finance';

const MainPageCryptoForm = () => {
  const { selectedCrypto, selectedFiat, fiats, crypto, fiatExchangeRate, chains } = useAppSelector(selectFinanceData);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const dispatch = useAppDispatch();
  const setCrypto = (currency: API.List.Crypto) => dispatch(setSelectedCrypto(currency));
  const setFiat = (currency: API.List.Fiat) => dispatch(setSelectedFiat(currency));
  const exchangeData = useExchange(fiatExchangeRate, selectedCrypto);

  return (
    <Landing
      selectedCrypto={selectedCrypto}
      selectedFiat={selectedFiat}
      chainList={chains}
      fiatList={fiats}
      cryptoList={crypto}
      selectCrypto={setCrypto}
      selectFiat={setFiat}
      exchangeData={exchangeData}
      isUserLoggedIn={isUserLoggedIn}
    />
  );
};

export default MainPageCryptoForm;
