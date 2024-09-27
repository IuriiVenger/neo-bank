import { cn, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useBackButton, useMainButton } from '@telegram-apps/sdk-react';
import { FC, useEffect } from 'react';

import { toast } from 'react-toastify';

import { MainModalProps } from '.';

import { themes } from '@/config/themes';

const TelegramModal: FC<MainModalProps> = (props) => {
  const {
    children,
    header,
    isOpen,
    onOpenChange,
    contentClassName,
    bodyClassname,
    onConfirm,
    confirmButtonText,
    confirmButtonDisabled,
    confirmButtonHidden,
    isAppFullInitialized,
    isLoading,
    onClose,
    ...otherProps
  } = props;

  if (!isAppFullInitialized) return null;

  const backButton = useBackButton();
  const mainButton = useMainButton();

  const confirmHandler = () => {
    onConfirm && onConfirm();
  };

  const closeModal = () => {
    onOpenChange && onOpenChange(false);
    onClose && onClose();
  };

  const onConfirmButtonTextChanged = () => {
    if (!mainButton || !confirmButtonText || !isOpen) return;

    mainButton.setText(confirmButtonText);
  };

  const disableMainButton = () => {
    if (!mainButton || !isOpen) return;

    mainButton.disable();

    mainButton.setBgColor(themes.light.telegramColors.mainButton.disabledColor);
  };

  const enableMainButton = () => {
    if (!mainButton || !isOpen) return;

    mainButton.enable();
    mainButton.setBgColor(themes.light.telegramColors.mainButton.color);
  };

  const showLoader = () => {
    if (!mainButton || !isOpen) return;

    mainButton.showLoader();
    disableMainButton();
    mainButton.setText('Loading...');
  };

  const hideLoader = () => {
    if (!mainButton || !isOpen) return;

    mainButton.hideLoader();
    enableMainButton();
    onConfirmButtonTextChanged();
  };

  const onConfirmButtonDisabledChanged = () => {
    confirmButtonDisabled ? disableMainButton() : enableMainButton();
  };

  const onIsLoadingChanged = () => {
    if (!mainButton || !isOpen) return;

    isLoading ? showLoader() : hideLoader();
  };

  const onOnConfirmChanged = () => {
    if (!mainButton || !isOpen) return;
    mainButton.off('click', confirmHandler);
    mainButton.on('click', confirmHandler);
  };

  const onOpenChangeHandler = () => {
    if (!backButton || !mainButton) return;

    if (isOpen) {
      backButton.show();

      backButton.on('click', closeModal);
      if (!confirmButtonHidden) {
        mainButton.show();
        onOnConfirmChanged();
        onConfirmButtonTextChanged();
        onConfirmButtonDisabledChanged();
      }
    } else {
      backButton.hide();
      backButton.off('click', closeModal);
      mainButton.enable();
      mainButton.hideLoader();
      if (!confirmButtonHidden) {
        mainButton.off('click', confirmHandler);
        mainButton.hide();
      }
    }
  };

  useEffect(() => {
    onOpenChangeHandler();

    return () => {
      if (backButton) {
        backButton.off('click', closeModal);
      }
      if (mainButton) {
        mainButton.off('click', confirmHandler);
      }
    };
  }, [isOpen, confirmButtonHidden]);

  useEffect(() => () => onOpenChangeHandler(), []);

  useEffect(() => {
    onConfirmButtonTextChanged();
  }, [confirmButtonText]);

  useEffect(() => {
    onConfirmButtonDisabledChanged();
  }, [confirmButtonDisabled]);

  useEffect(() => {
    onOnConfirmChanged();
    return () => {
      mainButton.off('click', confirmHandler);
    };
  }, [onConfirm]);

  useEffect(() => {
    onIsLoadingChanged();
  }, [isLoading]);

  return (
    <Modal isOpen={isOpen} hideCloseButton disableAnimation onOpenChange={onOpenChange} {...otherProps}>
      <ModalContent className={cn('fixed left-0 top-0 max-h-svh md:relative md:max-h-[90vh]', contentClassName)}>
        {!!header && <ModalHeader>{header}</ModalHeader>}
        <ModalBody className={cn('pb-10 shadow-inner sm:max-h-[90vh]', bodyClassname)}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TelegramModal;
