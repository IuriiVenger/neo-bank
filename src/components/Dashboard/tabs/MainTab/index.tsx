/* eslint-disable no-alert */
import cn from 'classnames';
import { FC, useState } from 'react';

import { RiAddFill, RiCornerLeftDownFill, RiCornerRightUpFill, RiWalletLine } from 'react-icons/ri';

import CreateCardModal from '../../CreateCardModal';
import ReceiveCryptoModal from '../../ReceiveCryptoModal';
import WalletTransactions from '../../WalletTransactions';
import WithdrawCryptoModal from '../../WithdrawCryptoModal';

import FiatAccountsList from './FiatAccountsList';
import MainInformation from './MainInformation';
import WalletBalanceList from './WalletBalanceList';

import { DashboardProps } from '@/components/Dashboard';
import DefaultContainer from '@/components/ui/DefaultContainer';
import { RoundButtonProps } from '@/components/ui/RoundButton';
import { DashboardTabs } from '@/constants';
import { roundToDecimals, separateNumbers } from '@/utils/converters';

type MainTabProps = {
  className?: string;
  selectedWallet: DashboardProps['selectedWallet'];
  selectedWalletBalanceCurrency: string;
  changeDashboardTab: DashboardProps['changeDashboardTab'];
  chainList: DashboardProps['chainList'];
  cards: DashboardProps['cards'];
  loadSelectedWalletCards: DashboardProps['loadSelectedWalletCards'];
  loadMoreWalletFiatAccounts: DashboardProps['loadMoreWalletFiatAccounts'];
  loadMoreWalletCards: DashboardProps['loadMoreWalletCards'];
  loadMoreWalletTransactions: DashboardProps['loadMoreWalletTransactions'];
  createCard: DashboardProps['createCard'];
  createCrypto2CryptoOrder: DashboardProps['createCrypto2CryptoOrder'];
  createCrypto2FiatOrder: DashboardProps['createCrypto2FiatOrder'];
  walletTransactions: DashboardProps['walletTransactions'];
  selectedCrypto: DashboardProps['selectedCrypto'];
  cryptoBySymbol: DashboardProps['cryptoBySymbol'];
  bins: DashboardProps['bins'];
  verificationStatus?: DashboardProps['verificationStatus'];
  openKYC: DashboardProps['openKYC'];
  getWalletAddress: DashboardProps['getWalletAddress'];
  createWalletAddress: DashboardProps['createWalletAddress'];
  selectCrypto: DashboardProps['selectCrypto'];
  externalCalcData: DashboardProps['externalCalcData'];
  selectedWalletFiatAccounts: DashboardProps['selectedWalletFiatAccounts'];
  selectedWalletFiatAccountsWithCards: DashboardProps['selectedWalletFiatAccountsWithCards'];
};

const MainTab: FC<MainTabProps> = (props) => {
  const {
    className,
    selectedWallet,
    changeDashboardTab,
    selectedWalletBalanceCurrency,
    chainList,
    loadSelectedWalletCards,
    loadMoreWalletFiatAccounts,
    selectedWalletFiatAccountsWithCards,
    bins,
    selectedWalletFiatAccounts,
  } = props;

  const [isReceiveCryptoModalOpen, setIsReceiveCryptoModalOpen] = useState(false);
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [isWithdrawCryptoModalOpen, setIsWithdrawCryptoModalOpen] = useState(false);

  const currentWalletBalanceAmount = separateNumbers(roundToDecimals(selectedWallet.data?.total_amount || 0));
  const currentWalletBalance = `${selectedWalletBalanceCurrency} ${currentWalletBalanceAmount}`;
  const currentWalletCryptoBalance =
    selectedWallet.data?.crypto_total !== undefined &&
    `~${selectedWalletBalanceCurrency}${separateNumbers(roundToDecimals(selectedWallet.data.crypto_total))}`;

  const onCardClick = (card_id: string) => {
    changeDashboardTab(DashboardTabs.CARD, { card_id });
  };
  const openWalletTab = () => changeDashboardTab(DashboardTabs.WALLET);
  const openTransactionsTab = () => changeDashboardTab(DashboardTabs.TRANSACTIONS);
  const openReceiveCryptoModal = () => setIsReceiveCryptoModalOpen(true);
  const openCreateCardModal = () => setIsCreateCardModalOpen(true);
  const openWithdrawCryptoModal = () => setIsWithdrawCryptoModalOpen(true);

  const onCardCreate = (card_id: string) => {
    onCardClick(card_id);
    loadSelectedWalletCards();
  };

  const actionButtons: RoundButtonProps[] = [
    {
      title: 'New card',
      Icon: RiAddFill,
      onClick: openCreateCardModal,
    },
    {
      title: 'Receive',
      Icon: RiCornerLeftDownFill,
      onClick: openReceiveCryptoModal,
    },
    {
      title: 'Send',
      Icon: RiCornerRightUpFill,
      onClick: openWithdrawCryptoModal,
    },
    {
      title: 'Wallet',
      Icon: RiWalletLine,
      onClick: openWalletTab,
    },
  ];

  return (
    <section className={cn(className, 'bg-custom-turquoise-gradient grid max-w-screen-xl grid-cols-6 gap-4')}>
      <MainInformation className="col-span-6" balance={currentWalletBalance} actionButtons={actionButtons} />
      <div className="col-span-6 flex flex-col gap-4 md:col-span-3 lg:col-span-2">
        <DefaultContainer paddingStyle="none" className="flex flex-col py-4">
          <div className="mb-4 flex justify-between px-4">
            <div>
              {currentWalletCryptoBalance && <h2 className="text-xl lg:text-2xl">{currentWalletCryptoBalance}</h2>}
              <p className="text-foreground-2 text-xs">Crypto Wallet</p>
            </div>
            <button
              onClick={openWalletTab}
              type="button"
              className="text-foreground-2 h-8 text-small hover:opacity-hover "
            >
              See details
            </button>
          </div>
          <WalletBalanceList wallet={selectedWallet.data} />
        </DefaultContainer>
        <div>
          <FiatAccountsList
            fiatAccounts={selectedWalletFiatAccountsWithCards}
            loadMoreFiatAccounts={loadMoreWalletFiatAccounts}
            bins={bins}
            onCardClick={onCardClick}
            isLoadMoreAvailible={!selectedWalletFiatAccounts.meta?.isLastPage}
          />
        </div>
      </div>

      <DefaultContainer className="col-span-6 h-fit md:col-span-3 lg:col-span-4">
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
      <ReceiveCryptoModal
        isOpen={isReceiveCryptoModalOpen}
        setIsModalOpen={setIsReceiveCryptoModalOpen}
        chains={chainList}
        {...props}
      />
      <CreateCardModal
        isOpen={isCreateCardModalOpen}
        setIsModalOpen={setIsCreateCardModalOpen}
        onCardCreate={onCardCreate}
        {...props}
      />
      <WithdrawCryptoModal
        isOpen={isWithdrawCryptoModalOpen}
        setIsModalOpen={setIsWithdrawCryptoModalOpen}
        chains={chainList}
        {...props}
      />
    </section>
  );
};

export default MainTab;
