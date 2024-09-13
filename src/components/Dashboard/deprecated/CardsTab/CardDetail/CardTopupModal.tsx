import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import { toast } from 'react-toastify';

import ExternalExhangeInput from '../../ExternalExchangeInput';

import { CardDetailProps } from '.';

import { API } from '@/api/types';
import SelectCurrency from '@/components/Currency/SelectCurrency';
import ConfirmModal from '@/components/modals/ConfirmModal';
import CurrencyListModal from '@/components/modals/CurrencyListModal';
import MainModal from '@/components/modals/MainModal';
import { useRequestStatus } from '@/hooks/useRequestStatus';
import { deleteDash, getCardExpiryRecord, separateNumbers } from '@/utils/converters';
import { isCrypto, isFiat } from '@/utils/financial';

type CardTopupModalProps = CardDetailProps & {
  setIsModalOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  sensitiveData: API.Cards.SensitiveData | null;
};

const CardTopupModal: FC<CardTopupModalProps> = (props) => {
  const {
    allowedCryptoToFiatList,
    selectedWallet,
    className,
    selectCrypto,
    selectFiat,
    selectedCrypto,
    selectedFiat,
    fiatList,
    createInternalTopUpOrder,
    chainList,
    externalCalcData,
    setIsModalOpen,
    isOpen,
    card,
    sensitiveData,
    selectCard,
  } = props;

  const { setAmount, amount, offrampCalcData, isOfframpCalcPending } = externalCalcData;

  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [topUpConfirmationText, setTopUpConfirmationText] = useState<string | null>(null);
  const [topUpRequestStatuses, setTopUpPending, setTopUpFullfilled, setTopUpRejected] = useRequestStatus();

  const selectedWalletBalance = selectedWallet.data?.balance;
  const selectedCryptoWalletBalance =
    selectedWalletBalance?.find((balance) => balance.crypto.uuid === selectedCrypto.uuid)?.amount || 0;
  const selectedCryptoAvavilibleToWithdraw =
    selectedWallet.data &&
    selectedWallet.data.balance.find((balance) => balance.crypto.uuid === selectedCrypto.uuid)?.amount;

  const isAmountEnough = selectedCryptoAvavilibleToWithdraw && selectedCryptoAvavilibleToWithdraw >= amount;
  const isTopUpAvailable = !!selectedCrypto && !!selectedFiat && !!selectedWallet.data && !!amount && isAmountEnough;

  const cardholderName = sensitiveData?.name_on_card || card.cardName;
  const cardNumber = sensitiveData?.card_number || deleteDash(card.maskedPan);
  const cardFormatedNum = sensitiveData ? separateNumbers(+sensitiveData.card_number, '-', 4) : card.maskedPan;
  const expiryDate = sensitiveData?.expiry_month
    ? getCardExpiryRecord(sensitiveData.expiry_month, sensitiveData.expiry_year)
    : '**/**';

  const selectCurrency = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    if (isFiat(currency)) {
      selectFiat(currency);
    }
    if (isCrypto(currency)) {
      selectCrypto(currency);
    }
  };

  const openCryptoModal = () => setIsCryptoModalOpen(true);

  const openConfirmationModal = () => {
    const confirmationText = `Are you sure you want to topup ${amount} ${selectedCrypto.symbol} to card ${cardFormatedNum}?`;

    setTopUpConfirmationText(confirmationText);
    setIsConfirmationModalOpen(true);
  };

  const topUpCard = async () => {
    if (!selectedWallet.data) return;
    try {
      setTopUpPending();

      await createInternalTopUpOrder({
        amount,
        crypto_uuid: selectedCrypto.uuid,
        fiat_uuid: selectedFiat.uuid,
        wallet_uuid: selectedWallet.data.uuid,
        is_subsctract: true,
        card_id: card.id,
      });
      toast.success('Card successfully topped up');
      selectCard(card.id);
      setIsModalOpen(false);
      setTopUpFullfilled();
    } catch (error) {
      setTopUpRejected();
      throw error;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const setCardFiatCurrency = () => {
    const cardCurrency = fiatList.find((fiat) => fiat.code === card.walletInfo.currencyCode);

    if (cardCurrency) {
      selectFiat(cardCurrency);
    } else {
      closeModal();
      toast.error('Card currency not found');
    }
  };

  useEffect(() => {
    if (!card) return;
    setCardFiatCurrency();
    setAmount(0);
  }, [card]);

  return (
    <MainModal
      isOpen={isOpen}
      onOpenChange={setIsModalOpen}
      header="Crypto Top Up"
      confirmButtonDisabled={!isTopUpAvailable}
      confirmButtonText={isAmountEnough ? 'Top Up' : 'Not enough funds'}
      isLoading={topUpRequestStatuses.PENDING}
      onConfirm={openConfirmationModal}
    >
      <div className={cn('flex  flex-col gap-4', className)}>
        <div className="flex gap-4">
          <div className=" h-[52px] w-[78px] ">
            <div className="origin-top-left scale-[0.3]">
              <Cards name={cardholderName} number={cardNumber} expiry={expiryDate} cvc="***" preview />
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-xs text-neutral-500">Card number:</p>
            <p>{cardFormatedNum}</p>
          </div>
        </div>

        <SelectCurrency
          label="Top Up from"
          labelClassName="!text-base font-medium mb-2"
          className="mt-4"
          onClick={openCryptoModal}
          currency={selectedCrypto}
          balance={selectedCryptoWalletBalance}
          chains={chainList}
        />

        <ExternalExhangeInput
          buyingCurrency={selectedFiat}
          sellingCurrency={selectedCrypto}
          calcData={offrampCalcData}
          sellValue={amount}
          setSellValue={setAmount}
          isCalculating={isOfframpCalcPending}
          isWithdraw
          disableLabel
        />

        <CurrencyListModal
          isOpen={isCryptoModalOpen}
          setIsModalOpen={setIsCryptoModalOpen}
          activeCurrency={selectedCrypto}
          currencies={allowedCryptoToFiatList}
          onSelect={selectCurrency}
          chains={chainList}
        />

        <ConfirmModal
          isOpen={isConfirmationModalOpen}
          setIsModalOpen={setIsConfirmationModalOpen}
          onConfirm={topUpCard}
          title="Top Up confirmation"
          confirmText={topUpConfirmationText}
        />
      </div>
    </MainModal>
  );
};

export default CardTopupModal;
