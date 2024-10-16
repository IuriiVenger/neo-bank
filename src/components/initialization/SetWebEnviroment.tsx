'use client';

import { useEffect } from 'react';

import { AppEnviroment } from '@/constants';
import { useAppDispatch } from '@/store';
import { setAppEnviroment } from '@/store/slices/config';

const SetWebEnviroment = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAppEnviroment(AppEnviroment.WEB));
    localStorage.setItem('app_enviroment', AppEnviroment.WEB);
  }, []);

  return null;
};

export default SetWebEnviroment;
