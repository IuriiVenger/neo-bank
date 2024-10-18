import { Divider } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

import { DashboardProps } from '../..';

import CardsList from '../MainTab/CardsList';

import DefaultContainer from '@/components/ui/DefaultContainer';
import RoundButton, { RoundButtonProps } from '@/components/ui/RoundButton';

type FiatAccountInformationProps = {
  className?: string;
  actionButtons: RoundButtonProps[];
  balances: {
    total: string;
    fiat: string | null;
    crypto: string | null;
  };
  cards: DashboardProps['selectedFiatAccountCards'];
  loadMoreCards: DashboardProps['loadMoreSelectedFiatAccountCards'];
  onCardClick: (card_id: string) => void;
  openKYC: DashboardProps['openKYC'];
  openCreateCardModal: () => void;
  // activeDashboardTab: DashboardTabs | null;
};

const FiatAccountInformation: FC<FiatAccountInformationProps> = (props) => {
  const { className, actionButtons, balances } = props;

  return (
    <DefaultContainer
      className={cn(
        'flex h-fit w-full flex-shrink-0 flex-col justify-between  lg:!py-11  lg:px-8 max-lg:!bg-background max-lg:p-0',
        className,
      )}
    >
      <div className="flex w-full justify-between gap-6 max-lg:flex-col">
        <div className="flex gap-6 lg:items-end lg:gap-9 max-lg:flex-col">
          <div className="flex flex-col gap-2 ">
            <h3 className="text-xl font-medium">Available to spend</h3>
            <p className="border-background-4 text-5xl">{balances.total}</p>
          </div>
          {balances.crypto && (
            <>
              <Divider orientation="vertical" className="mb-1.5 h-11 opacity-80 max-lg:hidden" />

              <div className="flex items-center gap-9">
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-medium">Fiat balance</h3>
                  <p className="text-2xl">{balances.fiat}</p>
                </div>
                <Divider orientation="vertical" className=" h-4/5 opacity-80 lg:hidden" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-medium">Crypto balance</h3>
                  <p className="text-2xl">{balances.crypto}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <CardsList
          scrollContainerClassName="gap-2 px-5 md:px-10"
          noPadding
          className="-ml-5 w-screen  md:-ml-10  lg:hidden"
          hideCardInfo
          cardsOnly
          {...props}
        />
        <div className="flex gap-4 lg:gap-9 max-lg:justify-between max-lg:px-2">
          {actionButtons.map((button, index) => (
            <RoundButton buttonClassname="lg:!bg-background" key={button.id || index} {...button} />
          ))}
        </div>
      </div>
      <Divider className="my-8 opacity-80" />
      <CardsList
        scrollContainerClassName="gap-4"
        cardSize="md"
        className="max-lg:hidden"
        hideCardInfo
        noPadding
        cardsOnly
        {...props}
      />
    </DefaultContainer>
  );
};

export default FiatAccountInformation;
