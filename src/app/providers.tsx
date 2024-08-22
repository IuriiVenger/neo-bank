'use client';

import { NextUIProvider } from '@nextui-org/react';
import { AppProgressBar } from 'next-nprogress-bar';
import { Suspense, useEffect } from 'react';

import { tenantMainColor } from '../../tailwind.config';

import ModalsContainer from './(main_layout)/_components/ModalContainer';

import GlobalClientErrorHandler from '@/components/GlobalClientErrorHandler';
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
        <AppProgressBar color={tenantMainColor} height="5px" options={{ showSpinner: false }} shallowRouting />
      </Suspense>
      <ModalsContainer />
    </NextUIProvider>
  );
};
