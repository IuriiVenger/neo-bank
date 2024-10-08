import { Spinner } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

import ThemeImage from '../ThemeImage';

import darkLogo from '@/assets/tenant/dark/logo.svg';
import lightLogo from '@/assets/tenant/light/logo.svg';

type LoaderProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const Loader: FC<LoaderProps> = ({ className, size }) => (
  <Spinner size={size} className={cn('flex w-full justify-center', className)} color="primary" />
);

export const BrandLoader: FC = () => (
  <div className="flex w-full flex-col items-center justify-center">
    <ThemeImage
      lightSrc={lightLogo}
      darkSrc={darkLogo}
      height={128}
      alt="logo"
      className="absolute mb-6 h-16 animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_infinite]"
    />
  </div>
);

export default Loader;
