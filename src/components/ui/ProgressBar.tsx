'use client';

import { AppProgressBar } from 'next-nprogress-bar';
import { Suspense, useEffect, useState } from 'react';

import { themes } from '@/config/themes';
import { useAppSelector } from '@/store';
import { selectActiveTheme } from '@/store/selectors';

const RouteProgressBar = () => {
  const activeTheme = useAppSelector(selectActiveTheme);
  const [isProgressBarVisible, setIsProgressBarVisible] = useState(false);

  const onThemeChanged = () => {
    setIsProgressBarVisible(false);
    setTimeout(() => {
      setIsProgressBarVisible(true);
    }, 100);
  };

  useEffect(() => {
    onThemeChanged();
  }, [activeTheme]);

  return (
    isProgressBarVisible && (
      <Suspense>
        <AppProgressBar
          color={themes[activeTheme].brandColors.primary.DEFAULT}
          height="5px"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </Suspense>
    )
  );
};

export default RouteProgressBar;
