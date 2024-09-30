import cn from 'classnames';
import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react';

import { getRoundedClassName } from '@/utils/helpers';

type DefaultContainerProps = PropsWithChildren &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    rounded?: 'sm' | 'md' | 'lg';
  };

const DefaultContainer: FC<DefaultContainerProps> = (props) => {
  const { children, className, rounded = 'md', ...rest } = props;

  const roundedClassName = getRoundedClassName(rounded);

  return (
    <div className={cn(className, 'bg-background-2 p-4 lg:p-8', roundedClassName)} {...rest}>
      {children}
    </div>
  );
};

export default DefaultContainer;
