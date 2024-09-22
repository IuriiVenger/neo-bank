/* eslint-disable no-alert */
import { FC } from 'react';

import { IoSnow } from 'react-icons/io5';
import { RiAddFill, RiEyeFill, RiSettings3Fill } from 'react-icons/ri';

import { DashboardProps } from '../..';

import BackButton from '@/components/ui/BackButton';
import Card from '@/components/ui/Card';
import DefaultContainer from '@/components/ui/DefaultContainer';
import RoundButton, { RoundButtonProps } from '@/components/ui/RoundButton';
import { DashboardTabs } from '@/constants';
import { ChangeDashboardTabAdditionalParams } from '@/types';

const actionButtons: RoundButtonProps[] = [
  {
    title: 'Top Up',
    onClick: () => alert('Top Up'),
    Icon: RiAddFill,
  },
  {
    title: 'Freeze',
    onClick: () => alert('Freeze'),
    Icon: IoSnow,
  },
  {
    title: 'Details',
    onClick: () => alert('Details'),
    Icon: RiEyeFill,
  },
  {
    title: 'Settings',
    onClick: () => alert('Settings'),
    Icon: RiSettings3Fill,
  },
];

type CardTabProps = {
  changeDashboardTab: (tab: DashboardTabs, additionalRouteParams: ChangeDashboardTabAdditionalParams) => void;
  selectedCard: DashboardProps['selectedCard'];
};

const CardTab: FC<CardTabProps> = (props) => {
  const { changeDashboardTab, selectedCard } = props;
  const backToDashboard = () => changeDashboardTab(DashboardTabs.MAIN, { card_id: null });
  return (
    <>
      <BackButton onClick={backToDashboard} />
      <section className="flex h-full gap-4 lg:gap-14 max-lg:flex-col">
        <div className="flex w-fit flex-col gap-7 max-lg:self-center">
          <Card
            className="max-md:hidden"
            cardNumber={selectedCard.data?.card_number}
            provider={selectedCard.data?.brand}
            masked
            size="lg"
          />
          <Card
            className="md:hidden"
            cardNumber={selectedCard.data?.card_number}
            provider={selectedCard.data?.brand}
            masked
            size="md"
          />
          <div className="flex w-full justify-between">
            {actionButtons.map((button, index) => (
              <RoundButton key={button.title + index} {...button} />
            ))}
          </div>
        </div>
        <DefaultContainer className="left-0 h-full flex-grow md:w-full max-xs:-mx-5 max-xs:-mb-20 max-xs:rounded-b-none">
          <h1>Card Tab</h1>
          <div>
            <h2>Card details</h2>
            <p>Card ID: {selectedCard.data?.card_id}</p>
            <p>Card number: {selectedCard.data?.card_number}</p>
            <p>Card status: {selectedCard.data?.card_status}</p>
            <p>Card balance: {selectedCard.data?.nick_name}</p>
          </div>
        </DefaultContainer>
      </section>
    </>
  );
};

export default CardTab;
