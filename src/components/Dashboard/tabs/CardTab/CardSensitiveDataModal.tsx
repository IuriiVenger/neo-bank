import copy from 'copy-to-clipboard';
import { FC, useState } from 'react';

import ReactCreditCard, { Focused } from 'react-credit-cards';

import { IoCopyOutline } from 'react-icons/io5';

import { toast } from 'react-toastify';

import { DashboardProps } from '../..';

import { API } from '@/api/types';
import MainModal from '@/components/modals/MainModal';
import Card from '@/components/ui/Card';
import CustomInput from '@/components/ui/CustomInput';
import { getCardExpiryRecord, separateNumbers } from '@/utils/converters';

type CardSensitiveDataModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  sensitiveData: API.Cards.SensitiveData | null;
  isOpen: boolean;
  selectedCard: DashboardProps['selectedCard'];
};

const CardSensitiveDataModal: FC<CardSensitiveDataModalProps> = (props) => {
  const { setIsModalOpen, isOpen, sensitiveData, selectedCard } = props;
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

  const copyCVVToClipboard = () => {
    copy(sensitiveData.cvv);
    toast.success('CVV copied to clipboard');
  };

  const copyCardNumberToClipboard = () => {
    copy(sensitiveData.card_number);
    toast.success('Card number copied to clipboard');
  };

  return (
    <MainModal isOpen={isOpen} onOpenChange={setIsModalOpen} onClose={onModalClose} confirmButtonHidden>
      <div className="m-auto flex flex-col gap-10">
        {/* <ReactCreditCard
            number={deleteDash(sensitiveData.card_number)}
            expiry={expiry}
            cvc={sensitiveData.cvv}
            name={sensitiveData.name_on_card}
            focused={focus}
          /> */}

        <Card
          className="self-center"
          cardNumber={numberMask}
          expirationDate={expiry}
          provider={selectedCard.data?.brand}
          CVV={sensitiveData.cvv}
          size="md"
        />
        <div className="flex flex-col gap-3 py-4">
          <CustomInput
            isCustomBordered
            radius="sm"
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
              isCustomBordered
              radius="sm"
              content="width=device-width, initial-scale=1, maximum-scale=1"
              label="Expiry date"
              value={expiry}
              disabled
            />
            <CustomInput
              isCustomBordered
              radius="sm"
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
