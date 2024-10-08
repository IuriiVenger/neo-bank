import { cn } from '@nextui-org/react';
import Image, { ImageProps, StaticImageData } from 'next/image';
import { FC } from 'react';

type ThemeImageProps = Omit<ImageProps, 'src'> & {
  darkSrc: StaticImageData | string;
  lightSrc: StaticImageData | string;
};

const ThemeImage: FC<ThemeImageProps> = ({ className, darkSrc, lightSrc, ...otherProps }) => (
  <>
    <Image src={darkSrc} className={cn(className, 'hidden dark:block')} {...otherProps} />
    <Image src={lightSrc} className={cn(className, 'block dark:hidden')} {...otherProps} />
  </>
);

export default ThemeImage;
