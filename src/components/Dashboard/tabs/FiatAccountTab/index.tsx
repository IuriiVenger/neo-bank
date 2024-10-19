/* eslint-disable no-alert */
import { FC, useState } from 'react';

import { IoSnow } from 'react-icons/io5';
import { RiAddFill, RiBankCard2Fill, RiEyeFill, RiLockFill, RiSettings3Fill } from 'react-icons/ri';

import { DashboardProps } from '../..';

import CardTransactions from '../../CardTransactions';

import CardSensitiveDataModal from './CardSensitiveDataModal';

import CardTopupModal from './CardTopupModal';

import FiatAccountInformation from './FiatAccountInformation';

import { API } from '@/api/types';
import ConfirmModal from '@/components/modals/ConfirmModal';
import BackButton from '@/components/ui/BackButton';
import Card from '@/components/ui/Card';
import DefaultContainer from '@/components/ui/DefaultContainer';
import Loader from '@/components/ui/Loader';
import RoundButton, { RoundButtonProps } from '@/components/ui/RoundButton';
import { CardStatus, DashboardTabs, RequestStatus } from '@/constants';
import { useRequestsStatus } from '@/hooks/useRequestStatus';

import { roundToDecimals } from '@/utils/converters';
import { getCardBalance } from '@/utils/financial';
import { navigate } from '@/utils/server';

type FiatAccountTabProps = {
  createFiatAccountCard: DashboardProps['createFiatAccountCard'];
  changeDashboardTab: DashboardProps['changeDashboardTab'];
  selectedFiatAccount: DashboardProps['selectedFiatAccount'];
  selectedFiatAccountCards: DashboardProps['selectedFiatAccountCards'];
  loadMoreSelectedFiatAccountCards: DashboardProps['loadMoreSelectedFiatAccountCards'];
  // selectedFiatAccountTransactions: DashboardProps['selectedFiatAccountTransactions'];
  // loadMoreFiatAccountCards: DashboardProps['loadMoreFiatAccountCards'];
  // loadMoreFiatAccountTransactions: DashboardProps['loadMoreFiatAccountTransactions'],
  // updateFiatAccount: DashboardProps['updateFiatAccount'],
  // allowedCryptoToFiatList: DashboardProps['allowedCryptoToFiatList'];
  // selectedWallet: DashboardProps['selectedWallet'];
  // selectCrypto: DashboardProps['selectCrypto'];
  // selectFiat: DashboardProps['selectFiat'];
  // selectedCrypto: DashboardProps['selectedCrypto'];
  // selectedFiat: DashboardProps['selectedFiat'];
  fiatList: DashboardProps['fiatList'];
  // createInternalTopUpOrder: DashboardProps['createInternalTopUpOrder'];
  // chainList: DashboardProps['chainList'];
  // externalCalcData: DashboardProps['externalCalcData'];
  // selectCard: DashboardProps['selectCard'];
  openKYC: DashboardProps['openKYC'];
};

const FiatAccountTab: FC<FiatAccountTabProps> = (props) => {
  const {
    changeDashboardTab,
    selectedFiatAccount,
    createFiatAccountCard,
    fiatList,
    loadMoreSelectedFiatAccountCards,
    selectedFiatAccountCards,
    openKYC,
    // updateFiatAccount
  } = props;

  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);

  const isAccountPending =
    selectedFiatAccount.status === RequestStatus.PENDING || selectedFiatAccount.status === RequestStatus.NONE;
  const isAccountRejected = selectedFiatAccount.status === RequestStatus.REJECTED;
  const isAccountFullfilled = selectedFiatAccount.status === RequestStatus.FULLFILLED;
  const fiatAccountCurrency = fiatList.reduce((acc: string | null, currency) => {
    if (currency.uuid === selectedFiatAccount.data?.currency_id) {
      return currency.symbol;
    }
    return acc;
  }, null);
  const isRealtimeAuth = selectedFiatAccount.data?.issuing_program.realtime_auth;

  if (!selectedFiatAccount.data && (isAccountFullfilled || isAccountRejected)) {
    navigate('/dashboard');
    return null;
  }

  const formatBalance = (balance: undefined | number) =>
    balance !== undefined ? `${fiatAccountCurrency}${roundToDecimals(balance)}` : null;

  const balances = {
    total: formatBalance(selectedFiatAccount.data?.total_balance) || '0',
    fiat: isRealtimeAuth ? formatBalance(selectedFiatAccount.data?.fiat_balance) : null,
    crypto: isRealtimeAuth ? formatBalance(selectedFiatAccount.data?.realtimeauth_balance) : null,
  };

  const backToDashboard = () => changeDashboardTab(DashboardTabs.MAIN, { card_id: null });
  const openTopupModal = () => setIsTopupModalOpen(true);
  const openCreateCardModal = () => setIsCreateCardModalOpen(true);
  const openSourceModal = () => setIsSourceModalOpen(true);

  const createCardHandler = async () => {
    if (!selectedFiatAccount.data) return;

    const data: API.Cards.Create.FiatAccountRequest = {
      fiat_account_id: selectedFiatAccount.data?.id,
      request_id: crypto.randomUUID(),
      // eslint-disable-next-line prefer-template
      nick_name: 'New card' + crypto.randomUUID(),
    };

    const { data: cardData } = await createFiatAccountCard(data);
  };

  const onCardClick = (card_id: string) => {
    changeDashboardTab(DashboardTabs.CARD, { card_id });
  };

  const actionButtons: Array<RoundButtonProps & { isLoading?: boolean }> = [
    {
      title: 'Top Up',
      onClick: openTopupModal,
      Icon: RiAddFill,
    },
    {
      title: 'Add card',
      onClick: createCardHandler,
      Icon: RiBankCard2Fill,
    },
    {
      title: 'Source',
      onClick: openSourceModal,
      Icon: RiLockFill,
    },
    {
      title: 'Settings',
      onClick: () => alert('Settings'),
      disabled: true,
      Icon: RiSettings3Fill,
    },
  ];

  return (
    <>
      {isAccountPending ? (
        <Loader className="h-full" />
      ) : (
        <>
          <BackButton onClick={backToDashboard} />
          <section className="flex h-full flex-col gap-6">
            <FiatAccountInformation
              cards={selectedFiatAccountCards}
              loadMoreCards={loadMoreSelectedFiatAccountCards}
              balances={balances}
              actionButtons={actionButtons}
              onCardClick={onCardClick}
              openKYC={openKYC}
              openCreateCardModal={openCreateCardModal}
            />
            <div className="flex w-fit flex-col gap-7 max-lg:self-center">
              {/* <Card
                className="max-md:hidden"
                cardNumber={selectedCard.data.card_number}
                provider={selectedCard.data.brand}
                status={selectedCard.data.card_status}
                balance={getCardBalance(selectedCard.data)}
                masked
                size="lg"
              />
              <Card
                className="md:hidden"
                cardNumber={selectedCard.data.card_number}
                provider={selectedCard.data.brand}
                balance={getCardBalance(selectedCard.data)}
                status={selectedCard.data.card_status}
                masked
                size="md"
              /> */}
            </div>
            <DefaultContainer className="left-0 h-full flex-grow md:w-full max-xs:-mx-5 max-xs:-mb-20 max-xs:rounded-b-none">
              <h1 className="mb-8 text-2xl font-medium">Transactions</h1>
              {/* <CardTransactions {...props} /> */}
            </DefaultContainer>
          </section>
        </>
      )}

      {/* <CardTopupModal setIsModalOpen={setIsTopupModalOpen} isOpen={isTopupModalOpen} {...props} /> // change to FiatAccountTopup */}
    </>
  );
};

export default FiatAccountTab;
