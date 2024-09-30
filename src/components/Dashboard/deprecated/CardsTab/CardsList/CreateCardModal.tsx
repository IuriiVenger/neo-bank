import { Select, SelectItem } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import ProgramInfo from './BinInfo';

import { CardsListProps } from '.';

import { API } from '@/api/types';
import SelectCurrency from '@/components/Currency/SelectCurrency';
import ExternalExhangeInput from '@/components/ExchangeForm/deprecated/ExternalExchangeInput';
import ConfirmModal from '@/components/modals/ConfirmModal';
import CurrencyListModal from '@/components/modals/CurrencyListModal';
import MainModal from '@/components/modals/MainModal';
import CustomInput from '@/components/ui/CustomInput';
import { useRequestStatus } from '@/hooks/useRequestStatus';
import { isCrypto, isFiat } from '@/utils/financial';

type CreateCardModalProps = CardsListProps & {
  setIsModalOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  onCardCreate?: (card_id: string) => void;
};

const CreateCardModal: FC<CreateCardModalProps> = (props) => {
  const {
    allowedCryptoToFiatList,
    bins,
    createCard,
    selectedWallet,
    className,
    selectCrypto,
    selectFiat,
    selectedCrypto,
    selectedFiat,
    fiatList,
    chainList,
    externalCalcData,
    setIsModalOpen,
    isOpen,
    onCardCreate,
  } = props;

  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [activeBin, setActiveBin] = useState<any | undefined>(bins[0] || {});
  const [cardName, setCardName] = useState<string>('');
  const [topUpConfirmationText, setTopUpConfirmationText] = useState<string | null>(null);
  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestStatus();

  const { setAmount, amount, offrampCalcData, isOfframpCalcPending } = externalCalcData;

  const selectedWalletBalance = selectedWallet.data?.balance;
  const selectedCryptoWalletBalance =
    selectedWalletBalance?.find((balance: any) => balance.crypto.uuid === selectedCrypto?.uuid)?.amount || 0;
  const selectedCryptoAvavilibleToWithdraw =
    selectedWallet.data &&
    selectedWallet.data.balance.find((balance: any) => balance.crypto.uuid === selectedCrypto?.uuid)?.amount;

  const isAmountEnough = selectedCryptoAvavilibleToWithdraw && selectedCryptoAvavilibleToWithdraw >= amount;
  const isTopUpAvailable =
    !!selectedCrypto && !!selectedFiat && !!selectedWallet.data && !!amount && !!activeBin && isAmountEnough;

  const mainButtonTitle = isAmountEnough ? 'Create card' : 'Not enough funds';

  const selectCurrency = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    if (isFiat(currency)) {
      selectFiat(currency);
    }
    if (isCrypto(currency)) {
      selectCrypto(currency);
    }
  };

  const openCryptoModal = () => setIsCryptoModalOpen(true);

  const createCardHandler = async () => {
    if (!selectedWallet.data || !activeBin) {
      return;
    }

    const requestData: any = {
      binCode: activeBin.code,
      cardName,
      wallet_uuid: selectedWallet.data.uuid,
      cardBalance: amount,
    };

    try {
      setPending();
      const { data } = await createCard(requestData);
      setIsModalOpen(false);
      toast.success('Card created successfully');
      onCardCreate && onCardCreate((data as any).id); // deprecated
      setFullfilled();
    } catch (error) {
      setRejected();
      throw error;
    }
  };

  const openConfirmationModal = () => {
    const confirmationText = `Are you sure you want to create card and top up it with ${amount} ${selectedCrypto?.symbol}?`;

    setTopUpConfirmationText(confirmationText);

    setIsConfirmationModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const setCardFiatCurrency = () => {
    if (!activeBin) {
      return;
    }
    const cardCurrency = fiatList.find((fiat) => fiat.code === activeBin.currencyCode);

    if (cardCurrency) {
      selectFiat(cardCurrency);
    } else {
      closeModal();
      toast.error('Card currency not found');
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bin = bins?.find((item) => (item as any).code === e.target.value);
    if (!bin) {
      return;
    }
    setActiveBin(bin);
  };

  useEffect(() => {
    setCardFiatCurrency();
    setAmount(0);
  }, [activeBin]);

  return (
    <MainModal
      isOpen={isOpen}
      onClose={closeModal}
      backdrop="opaque"
      scrollBehavior="inside"
      header="Create card"
      confirmButtonText={mainButtonTitle}
      confirmButtonDisabled={!isTopUpAvailable}
      onConfirm={openConfirmationModal}
      isLoading={requestStatuses.PENDING}
    >
      <div className={cn('flex flex-col gap-4', className)}>
        <Select label="Select BIN" onChange={handleSelectChange} selectedKeys={activeBin && [activeBin.code]}>
          {bins?.map((bin) => (
            <SelectItem
              key={(bin as any).code}
              onClick={() => setActiveBin(bin)}
              value={(bin as any).code}
              className="border-b border-gray-200 p-2 text-xs"
              textValue={`${(bin as any).code}, ${(bin as any).provider}, ${(bin as any).currencyCode}`}
            >
              <ProgramInfo bin={bin} />
            </SelectItem>
          ))}
        </Select>
        <CustomInput
          label="Card name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Enter card name"
        />
        <SelectCurrency
          label="Top Up from"
          labelClassName="!text-base font-medium mb-2"
          onClick={openCryptoModal}
          currency={selectedCrypto as any}
          balance={selectedCryptoWalletBalance}
          chains={chainList}
        />

        <ExternalExhangeInput
          externalLabel="Top Up amount"
          buyingCurrency={selectedFiat as any}
          sellingCurrency={selectedCrypto as any}
          calcData={offrampCalcData}
          sellValue={amount}
          setSellValue={setAmount}
          isCalculating={isOfframpCalcPending}
          isWithdraw
        />

        <CurrencyListModal
          isOpen={isCryptoModalOpen}
          setIsModalOpen={setIsCryptoModalOpen}
          currencies={allowedCryptoToFiatList}
          onSelect={selectCurrency}
          chains={chainList}
        />

        <ConfirmModal
          isOpen={isConfirmationModalOpen}
          setIsModalOpen={setIsConfirmationModalOpen}
          onConfirm={createCardHandler}
          title="Top Up confirmation"
          confirmText={topUpConfirmationText}
        />
      </div>
    </MainModal>
  );
};

export default CreateCardModal;
