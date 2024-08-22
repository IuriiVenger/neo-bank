'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '..';
import { selectFinanceData } from '../selectors';

import { setFiatExchangeRate } from '../slices/finance';

import { exchange } from '@/api/exchange';

const StoreWatchers = () => {
  const dispatch = useAppDispatch();
  const { selectedFiat } = useAppSelector(selectFinanceData);

  const loadFiatExchangeRate = async () => {
    const fiatExchangeRate = await exchange.fiat2crypto.getByUuid(selectedFiat.uuid);

    dispatch(setFiatExchangeRate(fiatExchangeRate));
  };

  useEffect(() => {
    loadFiatExchangeRate();
  }, [selectedFiat]);

  return null;
};

export default StoreWatchers;
