import cn from 'classnames';
import { FC } from 'react';

import { RiAddFill, RiCornerLeftDownFill, RiCornerRightUpFill, RiMore2Fill } from 'react-icons/ri';

import MainInformation from './MainInformation';

import WalletBalanceList from './WalletBalanceList';
import WalletTransactions from './WalletTransactions';

import { DashboardProps } from '@/components/Dashboard';
import CardsList from '@/components/Dashboard/tabs/MainTab/CardsList';
import DefaultContainer from '@/components/ui/DefaultContainer';
import { roundToDecimals, separateNumbers } from '@/utils/converters';

type InfoTabProps = DashboardProps & {
  className?: string;
};

const actionButtons = [
  {
    title: 'Buy',
    icon: <RiAddFill />,
    onClick: () => alert('Buy'),
  },
  {
    title: 'Receive',
    icon: <RiCornerLeftDownFill />,
    onClick: () => alert('Receive'),
  },
  {
    title: 'Send',
    icon: <RiCornerRightUpFill />,
    onClick: () => alert('Send'),
  },
  {
    title: 'Other',
    icon: <RiMore2Fill />,
    onClick: () => alert('Other'),
  },
];

const MainTab: FC<InfoTabProps> = (props) => {
  const { className, selectedWallet, fiatList, chainList, cryptoList } = props;

  const currentWalletBalanceAmount = separateNumbers(roundToDecimals(selectedWallet.data?.total_amount || 0));
  const currentWalletBalanceCurrency =
    fiatList.find((item) => item.uuid === selectedWallet.data?.base_fiat)?.symbol || '€';
  const currentWalletBalance = `${currentWalletBalanceCurrency} ${currentWalletBalanceAmount}`;

  const onCardClick = (card_id: string) => {
    console.log(card_id);
  };

  return (
    <section className={cn(className, 'bg-custom-turquoise-gradient grid max-w-screen-xl grid-cols-3 gap-4')}>
      <MainInformation className="col-span-3" balance={currentWalletBalance} actionButtons={actionButtons} />
      <DefaultContainer className={cn(className, 'col-span-3 lg:col-span-2 xs:px-0 max-xs:px-0')}>
        <CardsList onCardClick={onCardClick} cardSize="adaptive" {...props} />
      </DefaultContainer>
      <DefaultContainer className="col-span-3 row-span-2 lg:col-span-1">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl">Wallet</h2>
          <button type="button" className="text-foreground-2 text-small hover:opacity-hover ">
            Show all
          </button>
        </div>
        <WalletBalanceList chains={chainList} wallet={selectedWallet.data} cryptoList={cryptoList} />
      </DefaultContainer>
      <DefaultContainer className="col-span-3 lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl lg:text-2xl">Transactions</h2>
          <button type="button" className="text-foreground-2 text-small hover:opacity-hover ">
            Show all
          </button>
        </div>
        <WalletTransactions {...props} />
      </DefaultContainer>
    </section>
  );
};

export default MainTab;
