/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { usePopup } from '@telegram-apps/sdk-react';
import { FC, useEffect, useState } from 'react';

import { framerMotionAnimations } from '@/config/animations';
import { AppEnviroment } from '@/constants';
import { useRequestStatus } from '@/hooks/useRequestStatus';
import { useAppSelector } from '@/store';
import { selectConfig } from '@/store/selectors';

export type ConfirmModalTexts = {
  title?: string | null;
  confirmText?: string | null;
};

type ConfirmModalProps = ConfirmModalTexts & {
  setIsModalOpen: (isOpen: boolean) => void;
  onConfirm: () => any;
  isOpen: boolean;
};

type TelegramConfirmModalProps = {
  message: string;
  title: string;
  onConfirm: () => void;
};

enum TelegramPopupButtonId {
  CONFIRM = 'confirm',
  CANCEL = 'cancel',
}

const TelegramConfirmModal: FC<TelegramConfirmModalProps> = ({ message, title, onConfirm }) => {
  const telegramPopup = usePopup(true);

  if (telegramPopup) {
    telegramPopup
      .open({
        title,
        message,
        buttons: [
          { id: TelegramPopupButtonId.CONFIRM, type: 'default', text: 'Confirm' },
          { id: TelegramPopupButtonId.CANCEL, type: 'cancel' },
        ],
      })
      .then((buttonId) => {
        if (buttonId === TelegramPopupButtonId.CONFIRM) {
          onConfirm();
        }
      });
  }

  return null;
};

const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const { setIsModalOpen, onConfirm, isOpen, title, confirmText } = props;
  const { appEnviroment } = useAppSelector(selectConfig);
  const isTelegramEnviroment = appEnviroment === AppEnviroment.TELEGRAM;

  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestStatus();
  const [lastRequestStatus, _, setLastRequestFullfilled, setLastRequestRejected] = useRequestStatus();

  const [delay, setDelay] = useState(5);

  const handleClose = () => setIsModalOpen(false);

  const handleConfirmModal = async () => {
    try {
      setPending();
      await onConfirm();
      handleClose();
      setFullfilled();
      setLastRequestFullfilled();
    } catch (error) {
      setRejected();
      setLastRequestRejected();
      throw error;
    }
  };

  const modalTitle = title || 'Confirmation';
  const modalConfirmText = confirmText || 'Are you sure you want to proceed?';
  const confirmButtonText = `${lastRequestStatus.REJECTED ? 'Try again' : 'Confirm'} ${delay ? ` (${delay})` : ''}`;

  useEffect(() => {
    isOpen && delay > 0 && setTimeout(() => setDelay(delay - 1), 1000);
  }, [delay, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setDelay(5);
    }
  }, [isOpen]);

  if (isTelegramEnviroment) {
    return (
      isOpen && <TelegramConfirmModal message={modalConfirmText} title={modalTitle} onConfirm={handleConfirmModal} />
    );
  }

  return (
    <Modal
      motionProps={{
        variants: framerMotionAnimations.downEnterExit,
      }}
      isOpen={isOpen}
      onOpenChange={setIsModalOpen}
    >
      <ModalContent>
        <ModalHeader>
          <p>{modalTitle}</p>
        </ModalHeader>
        <ModalBody>
          <p>{modalConfirmText}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            isDisabled={!!delay}
            className="text-white"
            color={lastRequestStatus.REJECTED ? 'danger' : 'primary'}
            isLoading={requestStatuses.PENDING}
            onClick={handleConfirmModal}
          >
            {confirmButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
