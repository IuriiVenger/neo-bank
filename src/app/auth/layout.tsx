import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

import { FC } from 'react';

import logo from '@/assets/svg/header_logo.svg';

type AuthLayoutProps = Readonly<{ children: React.ReactNode }>;

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => (
  <main className="flex flex-grow pt-10 sm:items-center sm:pt-0">
    <div className="flex flex-col items-center rounded-lg border-b-gray-400  p-6 sm:border sm:shadow-md">
      <Image src={logo} height={64} alt="logo" className="mb-6 h-8" />
      {children}
    </div>
  </main>
);

export default AuthLayout;
