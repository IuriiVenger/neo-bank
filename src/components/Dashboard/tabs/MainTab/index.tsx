/* eslint-disable no-alert */
import cn from 'classnames';
import { FC } from 'react';

import { RiAddFill, RiCornerLeftDownFill, RiCornerRightUpFill, RiMore2Fill } from 'react-icons/ri';

import WalletTransactions from '../../WalletTransactions';

import MainInformation from './MainInformation';
import WalletBalanceList from './WalletBalanceList';

import { DashboardProps } from '@/components/Dashboard';
import CardsList from '@/components/Dashboard/tabs/MainTab/CardsList';
import DefaultContainer from '@/components/ui/DefaultContainer';
import { RoundButtonProps } from '@/components/ui/RoundButton';
import { DashboardTabs } from '@/constants';
import { roundToDecimals, separateNumbers } from '@/utils/converters';

type InfoTabProps = DashboardProps & {
  className?: string;
};

const actionButtons: RoundButtonProps[] = [
  {
    title: 'Buy',
    Icon: RiAddFill,
    onClick: () => alert('Buy'),
  },
  {
    title: 'Receive',
    Icon: RiCornerLeftDownFill,
    onClick: () => alert('Receive'),
  },
  {
    title: 'Send',
    Icon: RiCornerRightUpFill,
    onClick: () => alert('Send'),
  },
  {
    title: 'Other',
    Icon: RiMore2Fill,
    onClick: () => alert('Other'),
  },
];

const MainTab: FC<InfoTabProps> = (props) => {
  const { className, selectedWallet, changeDashboardTab, selectedWalletBalanceCurrency } = props;

  const currentWalletBalanceAmount = separateNumbers(roundToDecimals(selectedWallet.data?.total_amount || 0));

  const currentWalletBalance = `${selectedWalletBalanceCurrency} ${currentWalletBalanceAmount}`;

  const onCardClick = (card_id: string) => {
    changeDashboardTab(DashboardTabs.CARD, { card_id });
  };

  const openWalletTab = () => changeDashboardTab(DashboardTabs.WALLET);
  const openTransactionsTab = () => changeDashboardTab(DashboardTabs.TRANSACTIONS);

  return (
    <section className={cn(className, 'bg-custom-turquoise-gradient grid max-w-screen-xl grid-cols-3 gap-4')}>
      <MainInformation className="col-span-3" balance={currentWalletBalance} actionButtons={actionButtons} />
      <DefaultContainer className={cn(className, 'col-span-3 lg:col-span-2 xs:px-0 max-xs:px-0')}>
        <CardsList onCardClick={onCardClick} cardSize="adaptive" {...props} />
      </DefaultContainer>
      <DefaultContainer className="col-span-3 row-span-2 flex flex-col lg:col-span-1">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl">Wallet</h2>
          <button onClick={openWalletTab} type="button" className="text-foreground-2 text-small hover:opacity-hover ">
            Show all
          </button>
        </div>
        <WalletBalanceList selectedWalletBalanceCurrency={selectedWalletBalanceCurrency} wallet={selectedWallet.data} />
      </DefaultContainer>
      <DefaultContainer className="col-span-3 lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl">Transactions</h2>
          <button
            onClick={openTransactionsTab}
            type="button"
            className="text-foreground-2 text-small hover:opacity-hover "
          >
            Show all
          </button>
        </div>
        <WalletTransactions disableLoadMore {...props} />
      </DefaultContainer>
    </section>
  );
};

export default MainTab;
