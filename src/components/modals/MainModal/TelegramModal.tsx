import { cn, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useBackButton, useMainButton } from '@telegram-apps/sdk-react';
import { FC, useEffect } from 'react';

import { MainModalProps } from '.';

import { themes } from '@/config/themes';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectActiveTheme, selectOpenModalCount } from '@/store/selectors';
import { decreaseOpenModalCount, increaseOpenModalCount } from '@/store/slices/ui';

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
    isLoading,
    onClose,
    isDismissable = false,
    ...otherProps
  } = props;

  const backButton = useBackButton();
  const mainButton = useMainButton();
  const dispatch = useAppDispatch();
  const activeTheme = useAppSelector(selectActiveTheme);
  const openModalCount = useAppSelector(selectOpenModalCount);
  const confirmHandler = () => {
    onConfirm && onConfirm();
  };

  const closeModal = () => {
    onClose && onClose();
    onOpenChange && onOpenChange(false);
  };

  const onConfirmButtonTextChanged = () => {
    if (!mainButton || !confirmButtonText) return;

    mainButton.setText(confirmButtonText);
  };

  const disableMainButton = () => {
    if (!mainButton) return;

    mainButton.disable();

    mainButton.setBgColor(themes[activeTheme].telegramColors.mainButton.disabledColor);
  };

  const enableMainButton = () => {
    if (!mainButton) return;

    mainButton.enable();
    mainButton.setBgColor(themes[activeTheme].telegramColors.mainButton.color);
    mainButton.setTextColor(themes[activeTheme].telegramColors.mainButton.textColor);
  };

  const showLoader = () => {
    if (!mainButton) return;

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
    if (!mainButton || !isOpen || isLoading === undefined) return;

    isLoading ? showLoader() : hideLoader();
  };

  const onOnConfirmChanged = () => {
    if (!mainButton || !isOpen) return;

    mainButton.off('click', confirmHandler);
    mainButton.on('click', confirmHandler);
  };

  const onConfirmButtonHiddenChanged = () => {
    if (!mainButton || !isOpen) return;

    confirmButtonHidden ? mainButton.hide() : mainButton.show();
  };

  const onModalOpen = () => {
    if (!backButton || !mainButton) return;

    dispatch(increaseOpenModalCount());
    setTimeout(() => backButton.show()); // setTimeout is used to prevent showing back button before previous back button is hidden
    setTimeout(() => backButton.on('click', closeModal)); // setTimeout is used to prevent showing back button before previous back button is hidden
    if (!confirmButtonHidden) {
      mainButton.show();
      onOnConfirmChanged();
      onConfirmButtonTextChanged();
      onConfirmButtonDisabledChanged();
    }
  };

  const onModalClose = () => {
    backButton.off('click', closeModal);
    onConfirm && mainButton.off('click', confirmHandler);
    console.log('openModalCount in onModalClose', openModalCount);
    if (openModalCount === 1) {
      mainButton.hide(); // have to test
      backButton.hide();
      mainButton.enable();
      mainButton.hideLoader();
    }
    dispatch(decreaseOpenModalCount());
  };

  useEffect(() => {
    onModalOpen();
  }, []);
  useEffect(() => () => onModalClose(), []);
  useEffect(() => {
    onConfirmButtonHiddenChanged();
  }, [confirmButtonHidden]);

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
    <Modal
      isDismissable={isDismissable}
      isOpen={isOpen}
      hideCloseButton
      disableAnimation
      onOpenChange={onOpenChange}
      {...otherProps}
    >
      <ModalContent className={cn('fixed left-0 top-0 max-h-svh md:relative md:max-h-[90vh]', contentClassName)}>
        {!!header && <ModalHeader>{header}</ModalHeader>}
        <ModalBody className={cn('pb-10 shadow-inner sm:max-h-[90vh]', bodyClassname)}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TelegramModal;
