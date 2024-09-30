import { FC } from 'react';

import MainModal from './MainModal';

type SettingsModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  isOpen: boolean;
};

const SettingsModal: FC<SettingsModalProps> = (props) => {
  const { setIsModalOpen, isOpen } = props;

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <MainModal isOpen={isOpen} onClose={closeModal} header="Settings" confirmButtonHidden>
      <div className="flex flex-col items-center justify-center">
        <h1>Settings page</h1>
      </div>
    </MainModal>
  );
};

export default SettingsModal;
