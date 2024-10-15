'use client';

import { cn, NextUIProvider } from '@nextui-org/react';
import { getCookie, setCookie } from 'cookies-next';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { FC, PropsWithChildren, useEffect } from 'react';

import { Slide, ToastContainer } from 'react-toastify';

import GlobalClientErrorHandler from '@/components/GlobalClientErrorHandler';

import RouteProgressBar from '@/components/ui/ProgressBar';

import { CustomTheme } from '@/constants';
import useInitApp from '@/hooks/useInitApp';
import { useAppDispatch, useAppSelector } from '@/store';
import StoreWatchers from '@/store/components/StoreWatchers';
import { selectActiveTheme } from '@/store/selectors';
import { setActiveTheme } from '@/store/slices/ui';

const font = Inter({ subsets: ['latin'] });

type ProvidersProps = PropsWithChildren<{ initialTheme: CustomTheme }>;

export const Providers: FC<ProvidersProps> = ({ children, initialTheme }) => {
  const dispatch = useAppDispatch();
  const activeTheme = useAppSelector(selectActiveTheme) || initialTheme;

  const { initApp } = useInitApp(dispatch);

  useEffect(() => {
    initApp();
    dispatch(setActiveTheme(initialTheme));
  }, []);

  return (
    <html lang="en">
      <body className={cn(font.className, activeTheme, 'bg-background text-foreground')}>
        <NextUIProvider className={cn('flex min-h-screen flex-col items-center')}>
          <GlobalClientErrorHandler />
          {children}
          <RouteProgressBar activeTheme={activeTheme} />
          <ToastContainer
            position="top-right"
            closeButton={false}
            autoClose={4000}
            transition={Slide}
            theme={activeTheme}
            closeOnClick
            pauseOnHover={false}
            toastClassName="py-0 px-4 border rounded-lg shadow-xl"
            bodyClassName="text-sm p-0 font-normal"
          />
        </NextUIProvider>
        <StoreWatchers />
      </body>
    </html>
  );
};
