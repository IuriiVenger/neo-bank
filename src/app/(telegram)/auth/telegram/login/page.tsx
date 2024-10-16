'use client';

import { useLaunchParams, useMiniApp, useInitData } from '@telegram-apps/sdk-react';

import TelegramLogIn from '@/components/Auth/TelegramLogIn';

import { RequestStatus } from '@/constants';
import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectUser } from '@/store/selectors';

const TelegramAuthSignupPage = () => {
  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const initData = useInitData(true);
  const dispatch = useAppDispatch();
  const { userLoadingStatus } = useAppSelector(selectUser);
  const { loadUserContent } = useAuth(dispatch);
  const isUserLoading = userLoadingStatus === RequestStatus.PENDING;

  const { initTelegramAuth } = useTelegramAuth(dispatch, launchParams, initData, miniApp, loadUserContent);

  return <TelegramLogIn signInByTelegram={initTelegramAuth} isLoading={isUserLoading} />;
};

export default TelegramAuthSignupPage;
