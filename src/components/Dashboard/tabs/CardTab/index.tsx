/* eslint-disable no-alert */
import { FC, useState } from 'react';

import { IoSnow } from 'react-icons/io5';
import { RiAddFill, RiEyeFill, RiSettings3Fill } from 'react-icons/ri';

import { DashboardProps } from '../..';

import CardTransactions from '../../CardTransactions';

import CardSensitiveDataModal from './CardSensitiveDataModal';

import CardTopupModal from './CardTopupModal';

import { API } from '@/api/types';
import ConfirmModal from '@/components/modals/ConfirmModal';
import BackButton from '@/components/ui/BackButton';
import Card from '@/components/ui/Card';
import DefaultContainer from '@/components/ui/DefaultContainer';
import Loader from '@/components/ui/Loader';
import RoundButton, { RoundButtonProps } from '@/components/ui/RoundButton';
import { CardStatus, DashboardTabs, RequestStatus } from '@/constants';
import { useRequestsStatus } from '@/hooks/useRequestStatus';
import { ChangeDashboardTabAdditionalParams } from '@/types';
import { getCardBalance } from '@/utils/financial';

type CardTabProps = {
  changeDashboardTab: (tab: DashboardTabs, additionalRouteParams: ChangeDashboardTabAdditionalParams) => void;
  selectedCard: DashboardProps['selectedCard'];
  selectedCardTransactions: DashboardProps['selectedCardTransactions'];
  loadMoreCardTransactions: DashboardProps['loadMoreCardTransactions'];
  getSensitiveData: DashboardProps['getSensitiveData'];
  updateCard: DashboardProps['updateCard'];
  allowedCryptoToFiatList: DashboardProps['allowedCryptoToFiatList'];
  selectedWallet: DashboardProps['selectedWallet'];
  selectCrypto: DashboardProps['selectCrypto'];
  selectFiat: DashboardProps['selectFiat'];
  selectedCrypto: DashboardProps['selectedCrypto'];
  selectedFiat: DashboardProps['selectedFiat'];
  fiatList: DashboardProps['fiatList'];
  createInternalTopUpOrder: DashboardProps['createInternalTopUpOrder'];
  chainList: DashboardProps['chainList'];
  externalCalcData: DashboardProps['externalCalcData'];
  selectCard: DashboardProps['selectCard'];
};

const cardDetailRequests = {
  SENSITIVE_DATA: 'sensitiveData',
  LIMITS: 'limits',
  TOP_UP: 'topUp',
  FREEZE: 'freeze',
};

const CardTab: FC<CardTabProps> = (props) => {
  const { changeDashboardTab, selectedCard, getSensitiveData, updateCard } = props;

  const [isSensitiveDataModalOpen, setIsSensitiveDataModalOpen] = useState(false);
  const [sensitiveData, setSensitiveData] = useState<API.Cards.SensitiveData | null>(null);
  const [isConfirmFreezeModalOpen, setIsConfirmFreezeModalOpen] = useState(false);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);

  const isCardPending = selectedCard.status === RequestStatus.PENDING;
  const isCardFrozen = selectedCard.data?.card_status === CardStatus.INACTIVE;
  const isCardClosed = selectedCard.data?.card_status === CardStatus.CLOSED;

  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestsStatus(
    Object.values(cardDetailRequests),
  );

  const backToDashboard = () => changeDashboardTab(DashboardTabs.MAIN, { card_id: null });

  const openSensitiveDataModal = async () => {
    if (!selectedCard.data?.card_id) {
      return;
    }

    try {
      setPending(cardDetailRequests.SENSITIVE_DATA);
      const newSensitiveData = await getSensitiveData(selectedCard.data?.card_id);
      setSensitiveData(newSensitiveData);
      setFullfilled(cardDetailRequests.SENSITIVE_DATA);
      setIsSensitiveDataModalOpen(true);
    } catch (error) {
      setRejected(cardDetailRequests.SENSITIVE_DATA);
      throw error;
    }
  };

  const openFreezeModal = () => {
    setIsConfirmFreezeModalOpen(true);
  };

  const openTopupModal = () => {
    setIsTopupModalOpen(true);
  };

  const toogleCardFreeze = async () => {
    if (!selectedCard.data?.card_id || isCardClosed) {
      return;
    }

    try {
      setPending(cardDetailRequests.FREEZE);
      await updateCard(selectedCard.data.card_id, {
        card_status: selectedCard.data.card_status === CardStatus.INACTIVE ? CardStatus.ACTIVE : CardStatus.INACTIVE,
      });
      setFullfilled(cardDetailRequests.FREEZE);
    } catch (error) {
      setRejected(cardDetailRequests.FREEZE);
      throw error;
    }
  };

  const actionButtons: Array<RoundButtonProps & { isLoading?: boolean }> = [
    {
      title: 'Top Up',
      onClick: openTopupModal,
      disabled: isCardClosed || isCardFrozen,
      Icon: RiAddFill,
    },
    {
      title: isCardFrozen ? 'Unfreeze' : 'Freeze',
      onClick: openFreezeModal,
      disabled: isCardClosed,
      isLoading: requestStatuses[cardDetailRequests.FREEZE].PENDING,
      Icon: IoSnow,
    },
    {
      title: 'Details',
      onClick: openSensitiveDataModal,
      isLoading: requestStatuses[cardDetailRequests.SENSITIVE_DATA].PENDING,
      Icon: RiEyeFill,
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
      {isCardPending || !selectedCard.data ? (
        <Loader className="h-full" />
      ) : (
        <>
          <BackButton onClick={backToDashboard} />
          <section className="flex h-full gap-8 lg:gap-14 max-lg:flex-col">
            <div className="flex w-fit flex-col gap-7 max-lg:self-center">
              <Card
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
              />
              <div className="flex w-full justify-between">
                {actionButtons.map((button, index) => (
                  <RoundButton key={index} {...button} />
                ))}
              </div>
            </div>
            <DefaultContainer className="left-0 h-full flex-grow md:w-full max-xs:-mx-5 max-xs:-mb-20 max-xs:rounded-b-none">
              <h1 className="mb-8 text-2xl font-medium">Transactions</h1>
              <CardTransactions {...props} />
            </DefaultContainer>
          </section>
        </>
      )}
      <CardSensitiveDataModal
        isOpen={isSensitiveDataModalOpen}
        setIsModalOpen={setIsSensitiveDataModalOpen}
        sensitiveData={sensitiveData}
        selectedCard={selectedCard}
      />
      <ConfirmModal
        isOpen={isConfirmFreezeModalOpen}
        setIsModalOpen={setIsConfirmFreezeModalOpen}
        title={
          isCardFrozen ? 'Are you sure you want to unfreeze the card?' : 'Are you sure you want to freeze the card?'
        }
        onConfirm={toogleCardFreeze}
      />
      <CardTopupModal setIsModalOpen={setIsTopupModalOpen} isOpen={isTopupModalOpen} {...props} />
    </>
  );
};

export default CardTab;
