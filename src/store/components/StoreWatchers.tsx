'use client';

import { setCookie } from 'cookies-next';
import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '..';
import { selectActiveTheme, selectFinanceData } from '../selectors';

import { setFiatExchangeRate } from '../slices/finance';

import { exchange } from '@/api/exchange';

const StoreWatchers = () => {
  const dispatch = useAppDispatch();
  const { selectedFiat } = useAppSelector(selectFinanceData);
  const activeTheme = useAppSelector(selectActiveTheme);

  const loadFiatExchangeRate = async () => {
    if (!selectedFiat) return;

    const fiatExchangeRate = await exchange.fiat2crypto.getByUuid(selectedFiat.uuid);

    dispatch(setFiatExchangeRate(fiatExchangeRate));
  };

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
