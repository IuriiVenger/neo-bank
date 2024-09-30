import { cn } from '@nextui-org/react';
import { FC } from 'react';

import ThemeImage from '../ThemeImage';

type EmptyStateProps = {
  title: string | JSX.Element;
  description?: string;
  lightImage: string;
  darkImage: string;
  className?: string;
  onTitleClick?: () => void;
};

const EmptyState: FC<EmptyStateProps> = (props) => {
  const { title, description, lightImage, darkImage, className, onTitleClick } = props;

  return (
    <div className={cn('m-auto flex w-full flex-col items-center justify-center text-center', className)}>
      <ThemeImage lightSrc={lightImage} darkSrc={darkImage} alt="emptyStateImg" className="h-20" />
      {onTitleClick ? (
        <button type="button" onClick={onTitleClick} className="mt-4 font-medium lg:mt-6">
          {title}
        </button>
      ) : (
        <h4 className="mt-4 font-medium lg:mt-5">{title}</h4>
      )}
      {!!description && <p className="text-foreground-2 mt-1 whitespace-break-spaces text-sm">{description}</p>}
    </div>
  );
};

export default EmptyState;
