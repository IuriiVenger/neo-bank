'use client';

import { NextUIProvider } from '@nextui-org/react';
import { AppProgressBar } from 'next-nprogress-bar';
import { Suspense, useEffect } from 'react';

import GlobalClientErrorHandler from '@/components/GlobalClientErrorHandler';

import { themes } from '@/config/themes';
import useInitApp from '@/hooks/useInitApp';
import { useAppDispatch } from '@/store';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const { initApp } = useInitApp(dispatch);

  useEffect(() => {
    initApp();
  }, []);

  return (
    <NextUIProvider className="flex min-h-screen flex-col items-center text-neutral-950">
      <GlobalClientErrorHandler />
      {children}
      <Suspense>
        <AppProgressBar
          color={themes.light.brandColors.primary.DEFAULT}
          height="5px"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </Suspense>
    </NextUIProvider>
  );
};
