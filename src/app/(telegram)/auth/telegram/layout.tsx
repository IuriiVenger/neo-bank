'use client';

import { SDKProvider } from '@telegram-apps/sdk-react';

import { FC } from 'react';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const TelegramAuthLayout: FC<RootLayoutProps> = ({ children }) => <SDKProvider>{children}</SDKProvider>;

export default TelegramAuthLayout;
