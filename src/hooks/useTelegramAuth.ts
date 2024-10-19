import { InitData, LaunchParams, MiniApp } from '@telegram-apps/sdk-react';

import { useRouter } from 'next-nprogress-bar';
import { toast } from 'react-toastify';

import { auth } from '@/api/auth';
import { API } from '@/api/types';
import { RequestStatus, ResponseStatus } from '@/constants';
import { setAppFullInitialized } from '@/store/slices/config';
import { setUserLoadingStatus } from '@/store/slices/user';
import { AppDispatch } from '@/store/types';
import { setTokens } from '@/utils/tokensFactory';

const useTelegramAuth = (
  dispatch: AppDispatch,
  launchParams: LaunchParams | undefined,
  initData: InitData | undefined,
  miniApp: MiniApp | undefined,
  loadUserContent: () => Promise<void>,
) => {
  const router = useRouter();
  const tg_id = initData?.user?.id;
  const hash = initData?.hash;
  const init_data_raw = launchParams?.initDataRaw;
  const first_name = initData?.user?.firstName;
  const last_name = initData?.user?.lastName;

  const setLoadingStatus = (status: RequestStatus) => {
    dispatch(setUserLoadingStatus(status));
  };

  const telegramSignUp = async () => {
    setLoadingStatus(RequestStatus.PENDING);

    if (!tg_id || !hash || !init_data_raw || !first_name || !miniApp) {
      setLoadingStatus(RequestStatus.REJECTED);
      toast.error('Invalid data');
      return;
    }

    const signUpData: API.Auth.Telegram.Signup = {
      tg_id,
      hash,
      init_data_raw,
      first_name,
      last_name,
      phone: '',
    };

    try {
      const { contact } = await miniApp.requestContact();
      signUpData.phone = contact.phoneNumber;
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      throw e;
    }

    try {
      const { data } = await auth.telegram.signup(signUpData);
      setTokens(data);
      await loadUserContent();
      router.push('/mini-app');
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);
      throw e;
    } finally {
      dispatch(setAppFullInitialized(true));
    }
  };

  const telegramSignIn = async () => {
    setLoadingStatus(RequestStatus.PENDING);

    if (!tg_id || !hash || !init_data_raw) {
      setLoadingStatus(RequestStatus.REJECTED);

      return toast.error('Invalid data');
    }

    const signInData: API.Auth.Telegram.Signin = {
      tg_id,
      hash,
      init_data_raw,
    };

    try {
      const { data } = await auth.telegram.signin(signInData);

      setTokens(data);
      await loadUserContent();
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);

      throw e;
    }
  };

  const initTelegramAuth = async () => {
    if (!tg_id || !hash || !init_data_raw || !first_name || !miniApp) {
      dispatch(setAppFullInitialized(true));
      return toast.error('Invalid data');
    }
    try {
      await telegramSignIn();
      dispatch(setAppFullInitialized(true));
    } catch (e: any) {
      if (e.response?.status === ResponseStatus.NOT_FOUND || e.status === ResponseStatus.NOT_FOUND) {
        return router.push('/auth/telegram/signup');
      }
      dispatch(setAppFullInitialized(true));
      throw e;
    }
  };

  return {
    telegramSignIn,
    telegramSignUp,
    initTelegramAuth,
  };
};

export default useTelegramAuth;
