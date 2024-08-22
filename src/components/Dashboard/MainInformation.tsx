import { Button, Card } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

import VerificationStatus from '../KYC/VerificationStatus';

import { DashboardTabs, KYCStatuses } from '@/constants';

type ButtonAction = {
  id: DashboardTabs | null;
  title: string;
  icon: JSX.Element;
  onClick: () => void;
  disabled?: boolean;
};

type MainInformationProps = {
  className?: string;
  actionButtons: ButtonAction[];
  balance: string;
  activeDashboardTab: DashboardTabs | null;
  verificationStatus?: KYCStatuses;
  openKYC: () => void;
};

const MainInformation: FC<MainInformationProps> = (props) => {
  const { className, actionButtons, balance, activeDashboardTab, verificationStatus, openKYC } = props;
  return (
    <Card
      className={cn('flex h-fit w-full flex-shrink-0 flex-col gap-4 p-4  xs:gap-10 xs:px-6 xs:py-6 sm:px-8', className)}
    >
      <div className="flex flex-col flex-wrap items-center justify-around gap-2 xs:flex-row xs:gap-4 md:items-start lg:flex-nowrap lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 xs:gap-6">
          <div className="self-center text-center xs:text-start lg:self-start">
            <p className="whitespace-nowrap text-xl">Total balance</p>
            <p className="whitespace-nowrap  text-4xl font-medium">{balance}</p>
          </div>
        </div>
        {verificationStatus && <VerificationStatus openKYC={openKYC} verifyStatus={verificationStatus} />}
      </div>
      <div className="grid  grid-cols-4 justify-center  gap-1 lg:justify-start">
        {actionButtons.map((button, index) => (
          <div className="flex flex-col items-center justify-center gap-2" key={index}>
            <Button
              isIconOnly
              color="primary"
              className={cn(
                'bg-inherit lg:w-fit',
                button.disabled ? '!cursor-not-allowed opacity-50 hover:!opacity-50' : ' hover:!bg-gray-200',
                activeDashboardTab === button.id
                  ? 'bg-tenant-main text-white hover:!bg-tenant-main hover:!text-white'
                  : 'bg-tenant-main-light text-tenant-main hover:!bg-tenant-main-light hover:!text-tenant-main',
              )}
              radius="full"
              onClick={button.onClick}
              disabled={button?.disabled}
            >
              {/* <div className="ml-2 flex-shrink-0 ">{button.icon}</div>
            <span className="capitalize">{button.title}</span>  */}
              {button.icon}
            </Button>
            <span className="text-[10px] font-medium capitalize xs:text-xs">{button.title}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MainInformation;
