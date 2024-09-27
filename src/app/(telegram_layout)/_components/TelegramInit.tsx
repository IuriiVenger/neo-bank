import {
  useInitData,
  useLaunchParams,
  useMiniApp,
  // useSettingsButton
} from '@telegram-apps/sdk-react';

import { useEffect } from 'react';

import { toast } from 'react-toastify';

import { themes } from '@/config/themes';
import {
  AppEnviroment,
  // ModalNames
} from '@/constants';
import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectConfig, selectIsUserLoggedIn } from '@/store/selectors';
import { setAppEnviroment } from '@/store/slices/config';
// import { setModalVisible } from '@/store/slices/ui';

// eslint-disable-next-line import/order
// import { mockTelegramEnv, parseInitData } from '@telegram-apps/sdk';

// const initDataRaw = new URLSearchParams([
//   [
//     'user',
//     JSON.stringify({
//       id: 99281932,
//       first_name: 'Andrew',
//       last_name: 'Rogue',
//       username: 'rogue',
//       language_code: 'en',
//       is_premium: true,
//       allows_write_to_pm: true,
//     }),
//   ],
//   ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
//   ['auth_date', '1716922846'],
//   ['start_param', 'debug'],
//   ['chat_type', 'sender'],
//   ['chat_instance', '8428209589180549439'],
// ]).toString();

// mockTelegramEnv({
//   themeParams: {
//     accentTextColor: '#6ab2f2',
//     bgColor: '#17212b',
//     buttonColor: '#5288c1',
//     buttonTextColor: '#ffffff',
//     destructiveTextColor: '#ec3942',
//     headerBgColor: '#17212b',
//     hintColor: '#708499',
//     linkColor: '#6ab3f3',
//     secondaryBgColor: '#232e3c',
//     sectionBgColor: '#17212b',
//     sectionHeaderTextColor: '#6ab3f3',
//     subtitleTextColor: '#708499',
//     textColor: '#f5f5f5',
//   },
//   initData: parseInitData(initDataRaw),
//   initDataRaw,
//   version: '7.2',
//   platform: 'tdesktop',
// });

const TelegramInit = () => {
  const { isWebAppInitialized } = useAppSelector(selectConfig);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);

  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const initData = useInitData(true);
  const dispatch = useAppDispatch();

  const { initUser } = useAuth(dispatch);
  const { initTelegramAuth } = useTelegramAuth(dispatch, launchParams, initData, miniApp, initUser);

  // const settingsButton = useSettingsButton(true);
  // const openSettingsPopup = () => {
  //   dispatch(setModalVisible(ModalNames.SETTINGS));
  // };
  // const initSettingsButton = () => {
  //   if (!settingsButton) {
  //     return;
  //   }
  //   settingsButton.show();
  //   settingsButton.on('click', openSettingsPopup);
  // };
  // useEffect(() => {
  //   initSettingsButton();
  // }, [settingsButton]);

  useEffect(() => {
    if (isWebAppInitialized && !isUserLoggedIn) {
      initTelegramAuth();
    }
  }, [isWebAppInitialized, isUserLoggedIn]);

  useEffect(() => {
    dispatch(setAppEnviroment(AppEnviroment.TELEGRAM));
    localStorage.setItem('app_enviroment', AppEnviroment.TELEGRAM);
  }, []);

  useEffect(() => {
    if (miniApp) {
      miniApp.setHeaderColor('#000000');
      miniApp.setBgColor('#000000');
      toast.success('miniApp.setHeaderColor and miniApp.setBgColor');
    }
  }, [miniApp]);

  return null;
};

export default TelegramInit;
