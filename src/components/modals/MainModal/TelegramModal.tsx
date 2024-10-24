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
    havePreviousTelegramNativeButtons,
    previousTelegramMainButtonHandler,
    previousTelegramMainButtonText,
    previousTelegramMainButtonDisabled,
    previousTelegramBackButtonHandler,
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

  const [isInitialized, setIsInitialized] = useState(false);

  const onConfirmButtonTextChanged = () => {
    if (!confirmButtonText) return;

    mainButton.setText(confirmButtonText);
  };

  const disableMainButton = () => {
    mainButton.disable();
    activeTheme && mainButton.setBgColor(themes[activeTheme].telegramColors.mainButton.disabledColor);
  };

  const enableMainButton = () => {
    mainButton.enable();
    activeTheme && mainButton.setBgColor(themes[activeTheme].telegramColors.mainButton.color);
    activeTheme && mainButton.setTextColor(themes[activeTheme].telegramColors.mainButton.textColor);
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
    if (!isInitialized) return;

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

  const removePreviousTelegramNativeButtonsHandlers = () => {
    previousTelegramMainButtonHandler !== undefined && mainButton.off('click', previousTelegramMainButtonHandler);
    previousTelegramBackButtonHandler !== undefined && backButton.off('click', previousTelegramBackButtonHandler);
  };

  const restorePreviousTelegramNativeButtons = () => {
    previousTelegramMainButtonHandler !== undefined && mainButton.on('click', previousTelegramMainButtonHandler);
    previousTelegramMainButtonHandler !== undefined && mainButton.show();
    previousTelegramMainButtonDisabled ? disableMainButton() : enableMainButton();
    previousTelegramMainButtonText !== undefined && mainButton.setText(previousTelegramMainButtonText);
    previousTelegramBackButtonHandler !== undefined && backButton.on('click', previousTelegramBackButtonHandler);
  };

  const onModalOpen = () => {
    dispatch(increaseOpenModalCount());
    if (havePreviousTelegramNativeButtons) {
      removePreviousTelegramNativeButtonsHandlers();
    }
    // backButton.off('click', onClose); // have to test if it is necessary
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

    if (havePreviousTelegramNativeButtons) {
      restorePreviousTelegramNativeButtons();
      return;
    }

    if (openModalCount === 0) {
      mainButton.hide(); // have to test
      backButton.hide();
      mainButton.enable();
      mainButton.hideLoader();
    }
  };

  useEffect(() => {
    onModalOpen();
    setIsInitialized(true);
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
        <ModalBody className={cn('overflow-y-auto pb-10 shadow-inner sm:max-h-[90vh]', bodyClassname)}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TelegramModal;
