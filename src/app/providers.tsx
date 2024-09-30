'use client';

import { cn, NextUIProvider } from '@nextui-org/react';
import { Inter } from 'next/font/google';
import { AppProgressBar } from 'next-nprogress-bar';
import { Suspense, useEffect } from 'react';

import { Slide, ToastContainer } from 'react-toastify';

import GlobalClientErrorHandler from '@/components/GlobalClientErrorHandler';

import { themes } from '@/config/themes';

import useInitApp from '@/hooks/useInitApp';
import { useAppDispatch, useAppSelector } from '@/store';
import StoreWatchers from '@/store/components/StoreWatchers';
import { selectActiveTheme } from '@/store/selectors';

const font = Inter({ subsets: ['latin'] });

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const activeTheme = useAppSelector(selectActiveTheme);

  const { initApp } = useInitApp(dispatch);

  useEffect(() => {
    initApp();
  }, []);

  return (
    <html lang="en">
      <body className={cn(font.className, activeTheme, 'bg-background text-foreground')}>
        <NextUIProvider className={cn('flex min-h-screen flex-col items-center')}>
          <GlobalClientErrorHandler />
          {children}
          <Suspense>
            <AppProgressBar
              color={themes[activeTheme].brandColors.primary.foreground}
              height="5px"
              options={{ showSpinner: false }}
              shallowRouting
            />
          </Suspense>
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
