import { useEffect } from 'react';

import { AppEnviroment } from '@/constants';
import { useAppDispatch } from '@/store';
import { setAppEnviroment } from '@/store/slices/config';

const SetTelegramEnviroment = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setAppEnviroment(AppEnviroment.TELEGRAM));
    localStorage.setItem('app_enviroment', AppEnviroment.TELEGRAM);
  }, []);

  return null;
};

export default SetTelegramEnviroment;
