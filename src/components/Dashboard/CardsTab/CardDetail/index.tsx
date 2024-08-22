import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useState } from 'react';
import Cards from 'react-credit-cards';

import { isIOS, isAndroid } from 'react-device-detect';
import { FaCircleCheck, FaEye, FaMoneyBillTrendUp } from 'react-icons/fa6';
import { IoIosArrowRoundBack } from 'react-icons/io';

import { IoCloseCircle, IoCloseCircleOutline } from 'react-icons/io5';
import { MdCurrencyExchange } from 'react-icons/md';

import { PiListThin } from 'react-icons/pi';

import { CardsTabProps } from '..';

import AddToWalletModal from './AddToWalletModal';
import CardLimitsModal from './CardLimitsModal';
import CardSensitiveDataModal from './CardSensitiveDataModal';

import CardTopupModal from './CardTopupModal';
import CardTransactionTable from './CardTransactionTable';

import { API } from '@/api/types';
import addToAppleWalletImg from '@/assets/svg/add-to-apple-wallet.svg';
import addToGoogleWalletImg from '@/assets/svg/add-to-google-wallet.svg';
import ConfirmModal, { ConfirmModalTexts } from '@/components/modals/ConfirmModal';
import { CardsTabMode, CardStatus } from '@/constants';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { useRequestsStatus } from '@/hooks/useRequestStatus';
import { StoreDataWithStatusAndMeta } from '@/store/types';
import { deleteDash } from '@/utils/converters';

export type CardDetailProps = CardsTabProps & {
  card: API.Cards.CardDetailItem;
  cardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  setCardTabMode: (mode: CardsTabMode) => void;
  externalCalcData: UseExternalCalcData;
};

const cardDetailRequests = {
  SENSITIVE_DATA: 'sensitiveData',
  LIMITS: 'limits',
  TOP_UP: 'topUp',
};

const CardDetail: FC<CardDetailProps> = (props) => {
  const { card, setCardTabMode, getSensitiveData, updateCard, getOTP } = props;

  const [sensitiveData, setSensitiveData] = useState<API.Cards.SensitiveData | null>(null);
  const [isSensitiveDataModalOpen, setIsSensitiveDataModalOpen] = useState(false);
  const [isLimitsModalOpen, setIsLimitsModalOpen] = useState(false);
  const [isTopupModalOpen, setIsTopupModalOpen] = useState(false);
  const [isAddToWalletModalOpen, setIsAddToWalletModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationModalText, setConfirmationModalText] = useState<ConfirmModalTexts>({});

  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestsStatus(
    Object.values(cardDetailRequests),
  );

  const cardTitle = `${card.bin.provider}, ${card.bin.currencyCode}`;
  const isActive = card.status === CardStatus.ACTIVE;
  const isClosed = card.status === CardStatus.CLOSED;
  const isMobileWalletDevice = isIOS || isAndroid;

  const backToCardsList = () => {
    setCardTabMode(CardsTabMode.LIST);
  };

  const loadSensitiveData = async (card_id: string) => {
    const newSensitiveData = await getSensitiveData(card_id);
    setSensitiveData(newSensitiveData);
  };

  const showSensitiveDataModal = async () => {
    try {
      setPending(cardDetailRequests.SENSITIVE_DATA);
      await loadSensitiveData(card.id);
      setFullfilled(cardDetailRequests.SENSITIVE_DATA);
      setIsSensitiveDataModalOpen(true);
    } catch (error) {
      setRejected(cardDetailRequests.SENSITIVE_DATA);
      throw error;
    }
  };

  const showLimitsModal = () => {
    setIsLimitsModalOpen(true);
  };

  const showTopupModal = async () => {
    try {
      setPending(cardDetailRequests.TOP_UP);
      await loadSensitiveData(card.id);
      setFullfilled(cardDetailRequests.TOP_UP);
      setIsTopupModalOpen(true);
    } catch (error) {
      setRejected(cardDetailRequests.TOP_UP);
      throw error;
    }
  };

  const showAddToWalletModal = () => {
    setIsAddToWalletModalOpen(true);
  };

  const openCloseCardDialog = () => {
    setIsConfirmationModalOpen(true);
    setConfirmationModalText({ title: 'Close card', confirmText: 'Are you sure you want to close this card?' });
  };

  const closeCard = async () => {
    await updateCard(card.id, { ...card, status: CardStatus.CLOSED });
  };

  return (
    <section className="dashboard-card-detail flex w-full flex-col gap-4">
      <button type="button" onClick={backToCardsList} className="flex items-center gap-2 text-neutral-500">
        <IoIosArrowRoundBack /> Back to cards list
      </button>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className=" text-xl text-black lg:text-2xl">{cardTitle}</h3>
          <div
            className={cn(
              'flex items-center gap-1  text-sm lg:text-base',
              isActive ? 'text-green-600' : 'text-neutral-500',
            )}
          >
            {isClosed ? <IoCloseCircle /> : <FaCircleCheck />}

            <small className="capitalize">{card.status}</small>
          </div>
        </div>
      </div>
      <div className="mt-2 flex gap-4 xs:gap-8">
        <div className={cn(' w-[220px] xs:h-auto xs:w-auto', isMobileWalletDevice ? 'h-[185px]' : 'h-[165px]')}>
          <div className="flex origin-top-left scale-[85%] flex-col gap-4 xs:scale-100 ">
            <button type="button" className={cn(!isActive && 'grayscale')} onClick={showSensitiveDataModal}>
              <Cards
                name={card.cardName}
                issuer={card.bin.provider}
                number={deleteDash(card.maskedPan)}
                expiry={'**/**'}
                cvc="***"
                preview
              />
            </button>
            {isMobileWalletDevice && (
              <button type="button" onClick={showAddToWalletModal}>
                {isIOS && <img src={addToAppleWalletImg.src} className="max-w-[260px]" alt="ios" />}
                {isAndroid && <img src={addToGoogleWalletImg.src} className="max-w-[260px]" alt="android" />}
              </button>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col text-neutral-500">
            <p>Balance:</p>
            <p className="text-lg font-medium text-black lg:text-2xl">
              {card.balance.available} <small>{card.bin.currencyCode}</small>
            </p>
            <p className="mt-1 xs:mt-3">Blocked:</p>
            <p className="text-lg lg:text-2xl">
              {card.balance.pending} <small>{card.bin.currencyCode}</small>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-4">
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          isLoading={requestStatuses[cardDetailRequests.SENSITIVE_DATA].PENDING}
          onClick={showSensitiveDataModal}
          radius="sm"
        >
          <FaEye /> View details
        </Button>
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          onClick={showTopupModal}
          radius="sm"
          isLoading={requestStatuses[cardDetailRequests.TOP_UP].PENDING}
          isDisabled={card.status === CardStatus.CLOSED}
        >
          <MdCurrencyExchange />
          Top up
        </Button>
        <Button
          color="primary"
          variant="flat"
          className=" bg-tenant-main-light text-tenant-main"
          isLoading={requestStatuses[cardDetailRequests.LIMITS].PENDING}
          onClick={showLimitsModal}
          radius="sm"
          isDisabled={card.status === CardStatus.CLOSED}
        >
          <FaMoneyBillTrendUp />
          Change limits
        </Button>
        <Dropdown isDisabled={card.status === CardStatus.CLOSED}>
          <DropdownTrigger>
            <Button color="primary" className=" bg-tenant-main-light  text-tenant-main " radius="sm">
              <PiListThin />
              Other
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="close" color="primary" variant="light" onClick={openCloseCardDialog}>
              <div className="flex justify-between">
                Close card <IoCloseCircleOutline />
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <CardTransactionTable className="mt-2" {...props} />

      <CardSensitiveDataModal
        sensitiveData={sensitiveData}
        isOpen={isSensitiveDataModalOpen}
        setIsModalOpen={setIsSensitiveDataModalOpen}
        {...props}
      />
      <CardLimitsModal
        limits={card.limits}
        isOpen={isLimitsModalOpen}
        setIsModalOpen={setIsLimitsModalOpen}
        {...props}
      />
      <CardTopupModal
        sensitiveData={sensitiveData}
        isOpen={isTopupModalOpen}
        setIsModalOpen={setIsTopupModalOpen}
        {...props}
      />
      <ConfirmModal
        isOpen={isConfirmationModalOpen}
        setIsModalOpen={setIsConfirmationModalOpen}
        onConfirm={closeCard}
        {...confirmationModalText}
      />

      <AddToWalletModal
        isOpen={isAddToWalletModalOpen}
        setIsModalOpen={setIsAddToWalletModalOpen}
        getOTP={getOTP}
        cardId={card.id}
      />
    </section>
  );
};

export default CardDetail;
