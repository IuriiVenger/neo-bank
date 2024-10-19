'use client';

import { useRouter } from 'next-nprogress-bar';
import { FC, useEffect } from 'react';

import { AppEnviroment } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectConfig } from '@/store/selectors';
import { deleteTokens } from '@/utils/tokensFactory';

const LogOutPage: FC = () => {
  const dispatch = useAppDispatch();
  const { appEnviroment } = useAppSelector(selectConfig);
  const { clearUserContent } = useAuth(dispatch);
  const router = useRouter();

  const logoutRedirectPath = appEnviroment === AppEnviroment.TELEGRAM ? '/auth/telegram/login' : '/auth/login';

  useEffect(() => {
    deleteTokens();
    clearUserContent();
    router.push(logoutRedirectPath);
  }, []);

  return null;
};

export default LogOutPage;
