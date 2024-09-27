import cn from 'classnames';
import { FC } from 'react';

import DefaultContainer from '@/components/ui/DefaultContainer';
import RoundButton, { RoundButtonProps } from '@/components/ui/RoundButton';

type MainInformationProps = {
  className?: string;
  actionButtons: RoundButtonProps[];
  balance: string;
  // activeDashboardTab: DashboardTabs | null;
};

const MainInformation: FC<MainInformationProps> = (props) => {
  const { className, actionButtons, balance } = props;

  return (
    <DefaultContainer
      className={cn(
        'flex h-fit w-full flex-shrink-0 flex-col justify-between gap-6 md:flex-row  md:!py-11  md:px-8 max-md:!bg-background max-md:p-0',
        className,
      )}
    >
      <div className="flex flex-col gap-3">
        <p className="whitespace-nowrap text-xl font-medium">Total balance</p>
        <p className="whitespace-nowrap  text-5xl">{balance}</p>
      </div>
      <div className="flex gap-4 md:gap-9 max-md:justify-between max-md:px-2">
        {actionButtons.map((button, index) => (
          <RoundButton buttonClassname="md:!bg-background" key={button.id || index} {...button} />
        ))}
      </div>
    </DefaultContainer>
  );
};

export default MainInformation;
