import { Button } from '@nextui-org/react';
import { FC } from 'react';
import { RiPaletteFill } from 'react-icons/ri';

import DefaultContainer from '../ui/DefaultContainer';
import ThemeSwitcher from '../ui/ThemeSwitcher';

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
    <MainModal isOpen={isOpen} onClose={closeModal} confirmButtonHidden>
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-5 text-3xl font-medium">Settings</h2>
        <DefaultContainer className="w-full">
          <div className="flex items-center justify-between gap-3">
            <Button className=" bg-background-3 h-[42px] w-[42px]" radius="full" size="md" isIconOnly>
              <RiPaletteFill className="text-xl" />
            </Button>
            <div className="w-full">
              <p>Personalized theme</p>
              <p className="text-xs text-secondary">Choose light or dark mode</p>
            </div>
            <ThemeSwitcher />
          </div>
        </DefaultContainer>
      </div>
    </MainModal>
  );
};

export default SettingsModal;
