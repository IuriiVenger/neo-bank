import 'react-toastify/dist/ReactToastify.css';

import { FC } from 'react';

import darkLogo from '@/assets/tenant/dark/logo.svg';
import lightLogo from '@/assets/tenant/light/logo.svg';
import ThemeImage from '@/components/ui/ThemeImage';

type AuthLayoutProps = Readonly<{ children: React.ReactNode }>;

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => (
  <main className="flex flex-grow flex-col items-center px-4 pt-20 sm:justify-center sm:pt-0">
    <ThemeImage lightSrc={lightLogo} darkSrc={darkLogo} height={64} alt="logo" className="mb-6 h-12" />
    {children}
  </main>
);

export default AuthLayout;
