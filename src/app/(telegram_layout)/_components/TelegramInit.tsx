'use client';

import { useInitData, useLaunchParams, useMiniApp, useSettingsButton, useThemeParams } from '@telegram-apps/sdk-react';

import { useEffect, useState } from 'react';

import { themes } from '@/config/themes';
import { AppEnviroment, CustomTheme, ModalNames } from '@/constants';
import useAuth from '@/hooks/useAuth';
import useTelegramAuth from '@/hooks/useTelegramAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectActiveTheme, selectConfig, selectIsUserLoggedIn } from '@/store/selectors';
import { setAppEnviroment } from '@/store/slices/config';
import { setActiveTheme, setModalVisible } from '@/store/slices/ui';

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
//     accentTextColor: '#000000',
//     bgColor: '#000000',
//     buttonColor: '#000000',
//     buttonTextColor: '#000000',
//     destructiveTextColor: '#000000',
//     headerBgColor: '#000000',
//     hintColor: '#000000',
//     linkColor: '#000000',
//     secondaryBgColor: '#000000',
//     sectionBgColor: '#000000',
//     sectionHeaderTextColor: '#000000',
//     subtitleTextColor: '#000000',
//     textColor: '#000000',
//   },
//   initData: parseInitData(initDataRaw),
//   initDataRaw,
//   version: '7.2',
//   platform: 'tdesktop',
// });

const TelegramInit = () => {
  const { isWebAppInitialized } = useAppSelector(selectConfig);
  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const activeTheme = useAppSelector(selectActiveTheme);

  const launchParams = useLaunchParams(true);
  const miniApp = useMiniApp(true);
  const initData = useInitData(true);
  const dispatch = useAppDispatch();
  const telegramTheme = useThemeParams(true);

  const { initUser } = useAuth(dispatch);
  const { initTelegramAuth } = useTelegramAuth(dispatch, launchParams, initData, miniApp, initUser);
  const [isThemeInitialized, setIsThemeInitialized] = useState(false);

  const initTheme = () => {
    telegramTheme && dispatch(setActiveTheme(telegramTheme.isDark ? CustomTheme.DARK : CustomTheme.LIGHT));
    setIsThemeInitialized(true);
  };

  const updateTheme = () => {
    window.Telegram.WebApp.setBackgroundColor(themes[activeTheme].baseColors.background);
    window.Telegram.WebApp.setHeaderColor(themes[activeTheme].baseColors.background);
    window.Telegram.WebApp.setBottomBarColor(themes[activeTheme].baseColors.background);
  };

  useEffect(() => {
    dispatch(setAppEnviroment(AppEnviroment.TELEGRAM));
    localStorage.setItem('app_enviroment', AppEnviroment.TELEGRAM);
  }, []);

  useEffect(() => {
    if (isThemeInitialized) {
      updateTheme();
    }
  }, [activeTheme]);

  useEffect(() => {
    initTheme();
  }, [telegramTheme?.isDark]);

  const settingsButton = useSettingsButton(true);
  const openSettingsPopup = () => {
    dispatch(setModalVisible(ModalNames.SETTINGS));
  };
  const initSettingsButton = () => {
    if (!settingsButton) {
      return;
    }
    settingsButton.show();
    settingsButton.on('click', openSettingsPopup);
  };
  useEffect(() => {
    initSettingsButton();
  }, [settingsButton]);

  useEffect(() => {
    if (isWebAppInitialized && !isUserLoggedIn) {
      initTelegramAuth();
    }
  }, [isWebAppInitialized, isUserLoggedIn]);

  return null;
};

export default TelegramInit;
