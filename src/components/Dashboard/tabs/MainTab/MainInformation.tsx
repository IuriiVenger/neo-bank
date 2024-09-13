import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

import DefaultContainer from '@/components/ui/DefaultContainer';

type ButtonAction = {
  id?: string | null;
  title: string;
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
};

type MainInformationProps = {
  className?: string;
  actionButtons: ButtonAction[];
  balance: string;
  // activeDashboardTab: DashboardTabs | null;
};

const MainInformation: FC<MainInformationProps> = (props) => {
  const { className, actionButtons, balance } = props;

  return (
    <DefaultContainer
      className={cn(
        'flex h-fit w-full flex-shrink-0 flex-col justify-between gap-6 md:flex-row  md:!py-11  md:px-8 max-md:bg-inherit max-md:px-0',
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <p className="whitespace-nowrap text-xl font-medium">Total balance</p>
        <p className="whitespace-nowrap  text-5xl">{balance}</p>
      </div>
      <div className="flex gap-4 md:gap-9 max-md:justify-between max-md:px-2">
        {actionButtons.map((button, index) => (
          <div className="flex flex-col items-center justify-center gap-1.5" key={index}>
            <Button
              isIconOnly
              color={button.active ? 'primary' : 'default'}
              className={cn(
                'h-16 w-16 text-2xl',
                !button.active && 'bg-white md:bg-background',
                button.disabled && '!cursor-not-allowed opacity-50 hover:!opacity-50',
              )}
              radius="full"
              onClick={button.onClick}
              disabled={button?.disabled}
            >
              {/* <div className="ml-2 flex-shrink-0 ">{button.icon}</div>
            <span className="capitalize">{button.title}</span>  */}
              {button.icon}
            </Button>
            <span className="flex-shrink-0 text-sm font-medium capitalize">{button.title}</span>
          </div>
        ))}
      </div>
    </DefaultContainer>
  );
};

export default MainInformation;
