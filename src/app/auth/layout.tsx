import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

import { FC } from 'react';

import logo from '@/assets/svg/tenant/header_logo.svg';

type AuthLayoutProps = Readonly<{ children: React.ReactNode }>;

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => (
  <main className="flex flex-grow flex-col items-center pt-20 sm:justify-center sm:pt-0">
    <Image src={logo} height={64} alt="logo" className="mb-6 h-12" />
    {children}
  </main>
);

export default AuthLayout;
