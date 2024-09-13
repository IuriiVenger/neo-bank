import cn from 'classnames';
import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react';

type DefaultContainerProps = PropsWithChildren & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

const DefaultContainer: FC<DefaultContainerProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <div className={cn('bg-background-2 rounded-large p-4 lg:p-8', className)} {...rest}>
      {children}
    </div>
  );
};

export default DefaultContainer;
