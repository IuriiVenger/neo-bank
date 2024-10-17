import cn from 'classnames';
import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react';

import { getRoundedClassName } from '@/utils/helpers';

const defaultContainerPaddingStyles = {
  none: 'p-0',
  md: 'p-4',
  adaptive: 'p-4 lg:p-8',
};

type DefaultContainerProps = PropsWithChildren &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    rounded?: 'sm' | 'md' | 'lg';
    paddingStyle?: 'none' | 'md' | 'adaptive';
  };

const DefaultContainer: FC<DefaultContainerProps> = (props) => {
  const { children, className, rounded = 'md', paddingStyle = 'adaptive', ...rest } = props;

  const roundedClassName = getRoundedClassName(rounded);
  const paddingClassName = defaultContainerPaddingStyles[paddingStyle];

  return (
    <div className={cn(className, 'bg-background-2', paddingClassName, roundedClassName)} {...rest}>
      {children}
    </div>
  );
};

export default DefaultContainer;
