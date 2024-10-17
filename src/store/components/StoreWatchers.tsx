'use client';

import { setCookie } from 'cookies-next';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '..';
import { selectActiveTheme, selectFinanceData, selectIsUserLoggedIn } from '../selectors';

import { setFiatExchangeRate } from '../slices/finance';

import { exchange } from '@/api/exchange';
import useAuth from '@/hooks/useAuth';

const StoreWatchers = () => {
  const dispatch = useAppDispatch();
  const { selectedFiat } = useAppSelector(selectFinanceData);
  const activeTheme = useAppSelector(selectActiveTheme);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const { clearUserContent } = useAuth(dispatch);

  const loadFiatExchangeRate = async () => {
    if (!selectedFiat) return;

    const fiatExchangeRate = await exchange.fiat2crypto.getByUuid(selectedFiat.uuid);

    dispatch(setFiatExchangeRate(fiatExchangeRate));
  };

  useEffect(() => {
    if (!isUserLoggedIn) {
      clearUserContent();
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    loadFiatExchangeRate();
  }, [selectedFiat]);

  useEffect(() => {
    if (activeTheme) {
      setCookie('active_theme', activeTheme);
    }
  }, [activeTheme]);

  return null;
};

export default StoreWatchers;
