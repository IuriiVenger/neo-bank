import { Button } from '@nextui-org/react';
import copy from 'copy-to-clipboard';
import { FC, useState } from 'react';

import ReactCreditCard, { Focused } from 'react-credit-cards';

import { IoCopyOutline } from 'react-icons/io5';

import { toast } from 'react-toastify';

import { API } from '@/api/types';
import MainModal from '@/components/modals/MainModal';
import CustomInput from '@/components/ui/CustomInput';
import { deleteDash, getCardExpiryRecord, separateNumbers } from '@/utils/converters';

type CardSensitiveDataModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  sensitiveData: API.Cards.SensitiveData | null;
  isOpen: boolean;
};

const CardSensitiveDataModal: FC<CardSensitiveDataModalProps> = (props) => {
  const { setIsModalOpen, isOpen, sensitiveData } = props;
  const [focus, setFocus] = useState<Focused>('number');

  const isCVVFocused = focus === 'cvc';

  const toogleFocus = () => {
    setFocus(isCVVFocused ? 'number' : 'cvc');
  };

  if (!sensitiveData) {
    return null;
  }

  const expiry = getCardExpiryRecord(sensitiveData.expiry_month, sensitiveData.expiry_year);
  const numberMask = separateNumbers(+sensitiveData.card_number, '-', 4);

  const onModalClose = () => setFocus('number');
  const closeModal = () => {
    setIsModalOpen(false);
    onModalClose();
  };

  const copyCVVToClipboard = () => {
    copy(sensitiveData.cvv);
    toast.success('CVV copied to clipboard');
  };

  const copyCardNumberToClipboard = () => {
    copy(sensitiveData.card_number);
    toast.success('Card number copied to clipboard');
  };

  return (
    <MainModal
      isOpen={isOpen}
      onOpenChange={setIsModalOpen}
      onClose={onModalClose}
      confirmButtonHidden
      header="Card details"
    >
      <div className="m-auto flex flex-col gap-6">
        <button type="button" onClick={toogleFocus} className="m-auto w-fit">
          <ReactCreditCard
            number={deleteDash(sensitiveData.card_number)}
            expiry={expiry}
            cvc={sensitiveData.cvv}
            name={sensitiveData.name_on_card}
            focused={focus}
          />
        </button>
        <div className="flex flex-col gap-3 py-4">
          <CustomInput
            content="width=device-width, initial-scale=1, maximum-scale=1"
            label="Card number"
            value={numberMask}
            disabled
            endContent={
              <IoCopyOutline
                onClick={copyCardNumberToClipboard}
                className=" flex-shrink-0 cursor-pointer text-lg text-default-400"
              />
            }
          />
          <div className="grid grid-cols-2 gap-3">
            <CustomInput
              content="width=device-width, initial-scale=1, maximum-scale=1"
              label="Expiry date"
              value={expiry}
              disabled
            />
            <CustomInput
              content="width=device-width, initial-scale=1, maximum-scale=1"
              label="CVV"
              value={sensitiveData.cvv}
              disabled
              endContent={
                <IoCopyOutline
                  onClick={copyCVVToClipboard}
                  className=" flex-shrink-0 cursor-pointer text-lg text-default-400"
                />
              }
            />
          </div>
        </div>
      </div>
    </MainModal>
  );
};

export default CardSensitiveDataModal;
