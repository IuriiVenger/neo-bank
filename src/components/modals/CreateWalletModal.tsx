import { Select, SelectItem } from '@nextui-org/react';
import { FC, useState } from 'react';

import MainModal from './MainModal';

import { WalletTypeValues } from '@/constants';
import { ValueWithLabel } from '@/types';

type CreateWalletProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  onConfirm: (walletType: WalletTypeValues) => Promise<void>;
  isOpen: boolean;
  walletTypes: ValueWithLabel[];
};

const CreateWalletModal: FC<CreateWalletProps> = (props) => {
  const { setIsModalOpen, onConfirm, isOpen, walletTypes } = props;
  const [selectedWalletType, setSelectedWalletType] = useState<WalletTypeValues | undefined>(undefined);
  const [isWalletCreating, setIsWalletCreating] = useState(false);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWalletType(e.target.value as WalletTypeValues);
  };

  const handleClose = () => setIsModalOpen(false);

  const handleCreateWallet = async () => {
    if (selectedWalletType) {
      try {
        setIsWalletCreating(true);
        await onConfirm(selectedWalletType);
        handleClose();
      } finally {
        setIsWalletCreating(false);
      }
    }
  };

  return (
    <MainModal
      isOpen={isOpen}
      onOpenChange={setIsModalOpen}
      header="Create Wallet"
      confirmButtonText="Create"
      confirmButtonDisabled={!selectedWalletType}
      onConfirm={handleCreateWallet}
      isLoading={isWalletCreating}
    >
      <Select
        label="Select wallet type"
        className=""
        onChange={handleSelectChange}
        selectedKeys={selectedWalletType && [selectedWalletType]}
      >
        {walletTypes.map((walletType) => (
          <SelectItem key={walletType.value} value={walletType.value}>
            {walletType.label}
          </SelectItem>
        ))}
      </Select>
    </MainModal>
  );
};

export default CreateWalletModal;
