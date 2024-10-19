/* eslint-disable no-restricted-globals */

'use client';

import { useEffect } from 'react';

import LogIn from '@/components/Auth/LogIn';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectUser } from '@/store/selectors';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { userLoadingStatus } = useAppSelector(selectUser);
  const { resetAuthState, ...authHandlers } = useAuth(dispatch);

  useEffect(() => () => resetAuthState(), []);

  return <LogIn userLoadingStatus={userLoadingStatus} {...authHandlers} />;
};
export default LoginPage;
