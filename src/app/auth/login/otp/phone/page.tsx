'use client';

import { useEffect } from 'react';

import LogInOtpPhone from '@/components/Auth/LogInOtpPhone';
import { RequestStatus } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectUser } from '@/store/selectors';

const LoginByOtpPage = () => {
  const dispatch = useAppDispatch();
  const { userLoadingStatus } = useAppSelector(selectUser);
  const { resetAuthState, ...authHandlers } = useAuth(dispatch);
  const isUserLoading = userLoadingStatus === RequestStatus.PENDING;

  useEffect(() => () => resetAuthState(), []);

  return <LogInOtpPhone isLoading={isUserLoading} {...authHandlers} />;
};

export default LoginByOtpPage;
