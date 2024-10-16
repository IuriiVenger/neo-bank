'use client';

import { useEffect } from 'react';

import LogInOtp from '@/components/Auth/LogInOtp';
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

  return <LogInOtp isLoading={isUserLoading} {...authHandlers} />;
};

export default LoginByOtpPage;
