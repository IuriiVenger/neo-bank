import { cn, Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';
import { useBackButton, useMainButton } from '@telegram-apps/sdk-react';
import { FC, useEffect, useState } from 'react';

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

  // const [initialBackButtonVisibility] = useState(backButton.isVisible);
  // const [initialMainButtonVisibility] = useState(mainButton.isVisible);
  // const [initialMainButtonEnabled] = useState(mainButton.isEnabled);
  // const [initialMainButtonText] = useState(mainButton.text);

  const onConfirmButtonTextChanged = () => {
    if (!confirmButtonText) return;

    mainButton.setText(confirmButtonText);
  };

  const disableMainButton = () => {
    mainButton.disable();

    mainButton.setBgColor(themes[activeTheme].telegramColors.mainButton.disabledColor);
  };

  const enableMainButton = () => {
    mainButton.enable();
    mainButton.setBgColor(themes[activeTheme].telegramColors.mainButton.color);
    mainButton.setTextColor(themes[activeTheme].telegramColors.mainButton.textColor);
  };

  const showLoader = () => {
    mainButton.showLoader();
    disableMainButton();
    mainButton.setText('Loading...');
  };

  const hideLoader = () => {
    mainButton.hideLoader();
    enableMainButton();
    onConfirmButtonTextChanged();
  };

  const onConfirmButtonDisabledChanged = () => {
    confirmButtonDisabled ? disableMainButton() : enableMainButton();
  };

  const onIsLoadingChanged = () => {
    if (isLoading === undefined) return;

    isLoading ? showLoader() : hideLoader();
  };

  const onOnConfirmChanged = () => {
    mainButton.off('click', confirmHandler);
    mainButton.on('click', confirmHandler);
  };

  const onConfirmButtonHiddenChanged = () => {
    if (!mainButton || !isOpen) return;

    confirmButtonHidden ? mainButton.hide() : mainButton.show();
  };

  const onModalOpen = () => {
    dispatch(increaseOpenModalCount());
    backButton.off('click', onClose);
    setTimeout(() => backButton.show()); // setTimeout is used to prevent showing back button before previous back button is hidden
    setTimeout(() => backButton.on('click', onClose)); // setTimeout is used to prevent showing back button before previous back button is hidden
    if (!confirmButtonHidden) {
      mainButton.show();
      onOnConfirmChanged();
      onConfirmButtonTextChanged();
      onConfirmButtonDisabledChanged();
    }
  };

  const onModalClose = () => {
    backButton.off('click', onClose);
    onConfirm && mainButton.off('click', confirmHandler);
    dispatch(decreaseOpenModalCount());

    // if (restoreInitialTelegramButtonsOnClose) {
    //   console.log('restoreInitialTelegramButtonsOnClose');
    //   console.log('initialBackButtonVisibility', initialBackButtonVisibility);
    //   console.log('initialMainButtonVisibility', initialMainButtonVisibility);
    //   console.log('initialMainButtonEnabled', initialMainButtonEnabled);
    //   console.log('initialMainButtonText', initialMainButtonText);
    //   initialBackButtonVisibility ? backButton.show() : backButton.hide();
    //   initialMainButtonVisibility ? mainButton.show() : mainButton.hide();
    //   initialMainButtonEnabled ? mainButton.enable() : mainButton.disable();
    //   mainButton.setText(initialMainButtonText);
    //   return;
    // }

    if (openModalCount === 0) {
      mainButton.hide(); // have to test
      backButton.hide();
      mainButton.enable();
      mainButton.hideLoader();
    }
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
      // onClose={onClose}
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
