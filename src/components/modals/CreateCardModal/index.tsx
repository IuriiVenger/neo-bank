import { Select, SelectItem } from '@nextui-org/react';

import cn from 'classnames';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { DashboardProps } from '../../Dashboard';

import ProgramInfo from './ProgramInfo';

import { API } from '@/api/types';

import ConfirmModal from '@/components/modals/ConfirmModal';

import MainModal from '@/components/modals/MainModal';
import CustomInput from '@/components/ui/CustomInput';

import { useRequestStatus } from '@/hooks/useRequestStatus';

type CreateCardModalProps = DashboardProps & {
  className?: string;
  setIsModalOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  onCardCreate?: (card_id: string) => void;
};

const CreateCardModal: FC<CreateCardModalProps> = (props) => {
  const { bins, createCard, selectedWallet, className, setIsModalOpen, isOpen, onCardCreate } = props;

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [activeBin, setActiveBin] = useState<API.Cards.CardConfig | undefined>(bins[0] || {});
  const [cardName, setCardName] = useState<string>('');
  const [topUpConfirmationText, setTopUpConfirmationText] = useState<string | null>(null);
  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestStatus();

  const mainButtonTitle = 'Create card';

  const createCardHandler = async () => {
    if (!selectedWallet.data || !activeBin) {
      return;
    }

    const requestData: API.Cards.Create.Request = {
      program_id: activeBin.id,
      name_on_card: cardName,
      nick_name: cardName,
      wallet_id: selectedWallet.data.uuid,
      purpose: activeBin.purposes[0],
      request_id: crypto.randomUUID(),
    };

    try {
      setPending();
      const { data } = await createCard(requestData);
      setIsModalOpen(false);
      toast.success('Card created successfully');
      onCardCreate && onCardCreate(data.card_id);
      setFullfilled();
    } catch (error) {
      setRejected();
      throw error;
    }
  };

  const openConfirmationModal = () => {
    const confirmationText = `Are you sure you want to create card with name ${cardName}?`;
    setTopUpConfirmationText(confirmationText);
    setIsConfirmationModalOpen(true);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const bin = bins?.find((item) => item.id === e.target.value);
    if (!bin) {
      return;
    }
    setActiveBin(bin);
  };

  return (
    <MainModal
      isOpen={isOpen}
      onOpenChange={setIsModalOpen}
      backdrop="opaque"
      scrollBehavior="inside"
      header="Create card"
      confirmButtonText={mainButtonTitle}
      onConfirm={openConfirmationModal}
      isLoading={requestStatuses.PENDING}
    >
      <div className={cn('flex flex-col gap-4', className)}>
        <Select label="Select BIN" onChange={handleSelectChange} selectedKeys={activeBin && [activeBin.id]}>
          {bins?.map((bin) => (
            <SelectItem
              key={bin.id}
              onClick={() => setActiveBin(bin)}
              value={bin.id}
              className="border-b border-gray-200 p-2 text-xs"
              textValue={` ${bin.brand}, ${bin.allowed_currencies.join(', ')}`}
            >
              <ProgramInfo config={bin} />
            </SelectItem>
          ))}
        </Select>
        <CustomInput
          label="Card name"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="Enter card name"
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
