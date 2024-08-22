/* eslint-disable no-restricted-globals */

import { useRouter } from 'next-nprogress-bar';
import { useState } from 'react';
import { toast } from 'react-toastify';

import useWallet from './useWallet';

import { auth } from '@/api/auth';

import { RequestStatus } from '@/constants';
import { setAppFullInitialized } from '@/store/slices/config';
import { setUser, setUserData, setUserLoadingStatus } from '@/store/slices/user';
import { AppDispatch } from '@/store/types';
import { deleteTokens, setTokens } from '@/utils/tokensFactory';

const useAuth = (dispatch: AppDispatch) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [isOtpRequested, setIsOtpRequested] = useState(false);

  const router = useRouter();
  const { initUserWallets, unloadWallets } = useWallet();

  const setLoadingStatus = (status: RequestStatus) => {
    dispatch(setUserLoadingStatus(status));
  };

  const getUser = async () => {
    const { data } = await auth.me();
    dispatch(setUser(data));
  };

  const loadUserData = async () => {
    const { data } = await auth.user_data();
    dispatch(setUserData(data));
  };

  const loadUserContent = async () => {
    await Promise.all([loadUserData(), initUserWallets(dispatch)]);
  };

  const clearUserContent = async () => {
    dispatch(setUser(null));
    dispatch(setUserData(null));
    unloadWallets(dispatch);
  };

  const resetAuthState = () => {
    setEmail('');
    setPassword('');
    setOtp('');
    setIsOtpRequested(false);
  };

  const initUser = async () => {
    try {
      setLoadingStatus(RequestStatus.PENDING);
      await getUser();
      await loadUserContent();
      setLoadingStatus(RequestStatus.FULLFILLED);
      dispatch(setAppFullInitialized(true));
    } catch (e) {
      deleteTokens();
      setLoadingStatus(RequestStatus.REJECTED);
    }
  };

  const signUp = async () => {
    setLoadingStatus(RequestStatus.PENDING);

    try {
      const { data } = await auth.signUp.password(email, password);
      const { error, user, session } = data;
      if (error) {
        setLoadingStatus(RequestStatus.REJECTED);

        return toast.error(error);
      }
      session && setTokens(session);
      await loadUserContent();
      dispatch(setUser(user));
      router.push('/dashboard');
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);

      throw e;
    }
  };

  const signIn = async () => {
    setLoadingStatus(RequestStatus.PENDING);

    try {
      const { data } = await auth.signin.password(email, password);

      const { error, user, session } = data;

      if (error) {
        setLoadingStatus(RequestStatus.REJECTED);

        return toast.error(error);
      }
      session && setTokens(session);
      await loadUserContent();
      dispatch(setUser(user));
      router.push('/dashboard');
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);

      throw e;
    }
  };

  const getOtp = async () => {
    setLoadingStatus(RequestStatus.PENDING);

    try {
      const { data } = await auth.signin.email.otp(email);
      if (data.error) {
        setLoadingStatus(RequestStatus.REJECTED);

        return toast.error(data.error);
      }
      setIsOtpRequested(true);
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);

      throw e;
    }
  };

  const signInByOtp = async () => {
    setLoadingStatus(RequestStatus.PENDING);

    try {
      const { data } = await auth.verify.email.otp(email, otp);

      if (data.error) {
        setLoadingStatus(RequestStatus.REJECTED);

        return toast.error(data.error);
      }

      if (data.access_token) {
        const tokens = {
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        };
        setTokens(tokens);
      }

      dispatch(setUser(data.user));
      await loadUserContent();
      router.push('/dashboard');
      toast.success('You have successfully logged in');
      setLoadingStatus(RequestStatus.FULLFILLED);
    } catch (e) {
      setLoadingStatus(RequestStatus.REJECTED);

      throw e;
    }
  };

  const signOut = async () => {
    setLoadingStatus(RequestStatus.PENDING);

    try {
      clearUserContent();
      deleteTokens();
      router.push('/');
    } finally {
      setLoadingStatus(RequestStatus.NONE);
    }
  };

  return {
    signIn,
    signInByOtp,
    signUp,
    signOut,
    initUser,
    setEmail,
    setPassword,
    resetAuthState,
    email,
    password,
    otp,
    setOtp,
    getOtp,
    isOtpRequested,
  };
};

export default useAuth;
