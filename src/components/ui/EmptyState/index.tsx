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
  horizontalEmptyState?: boolean;
};

const EmptyState: FC<EmptyStateProps> = (props) => {
  const { title, description, lightImage, darkImage, className, onTitleClick, horizontalEmptyState } = props;

  return (
    <div
      className={cn(
        'm-auto flex items-center justify-center gap-4 text-center',
        className,
        !horizontalEmptyState && 'flex-col',
      )}
    >
      <ThemeImage lightSrc={lightImage} darkSrc={darkImage} alt="emptyStateImg" className="h-20" />
      <div className={horizontalEmptyState ? 'text-start' : 'text-center'}>
        {onTitleClick ? (
          <button type="button" onClick={onTitleClick} className="font-medium ">
            {title}
          </button>
        ) : (
          <h4 className="font-medium">{title}</h4>
        )}
        {!!description && <p className="text-foreground-2 mt-1 whitespace-break-spaces text-sm">{description}</p>}
      </div>
    </div>
  );
};

export default EmptyState;
