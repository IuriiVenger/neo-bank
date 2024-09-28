import { Button, cn, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useBackButton, useMainButton } from '@telegram-apps/sdk-react';
import { FC, useEffect } from 'react';

import { MainModalProps } from '.';

import { themes } from '@/config/themes';
import { useAppDispatch } from '@/store';
import { decreaseOpenModalCount, increaseOpenModalCount } from '@/store/slices/ui';

// export const NonNativeTelegramModal: FC<MainModalProps> = (props) => {
//   const {
//     children,
//     header,
//     isOpen,
//     onOpenChange,
//     contentClassName,
//     bodyClassname,
//     onConfirm,
//     confirmButtonText,
//     confirmButtonDisabled,
//     confirmButtonHidden,
//     isAppFullInitialized,
//     isLoading,
//     onClose,
//     nativeCloseButton,
//     hideCloseButton,
//     ...otherProps
//   } = props;

//   if (!isAppFullInitialized) return null;

//   const backButton = useBackButton();

//   const closeModal = () => {
//     onOpenChange && onOpenChange(false);
//     onClose && onClose();
//   };

//   const onOpenChangeHandler = () => {
//     if (!backButton) return;

//     if (isOpen) {
//       backButton.show();

//       backButton.on('click', closeModal);
//     } else {
//       backButton.hide();
//       backButton.off('click', closeModal);
//     }
//   };

//   useEffect(() => {
//     onOpenChangeHandler();

//     return () => {
//       if (backButton) {
//         backButton.off('click', closeModal);
//       }
//     };
//   }, [isOpen, confirmButtonHidden]);

//   useEffect(() => () => onOpenChangeHandler(), []);

//   const nonNativeCloseButtonEnabled = !nativeCloseButton && !hideCloseButton;

//   return (
//     <Modal isOpen={isOpen} hideCloseButton disableAnimation onOpenChange={onOpenChange} {...otherProps}>
//       <ModalContent className={cn('fixed left-0 top-0 max-h-svh md:relative md:max-h-[90vh]', contentClassName)}>
//         {!!header && <ModalHeader>{header}</ModalHeader>}
//         <ModalBody className={cn('pb-10 shadow-inner sm:max-h-[90vh]', bodyClassname)}>{children}</ModalBody>
//         {(!confirmButtonHidden || nonNativeCloseButtonEnabled) && (
//           <ModalFooter className="relative z-10 flex min-h-1 w-full flex-col pb-6">
//             {!confirmButtonHidden && (
//               <Button
//                 isDisabled={confirmButtonDisabled}
//                 isLoading={isLoading}
//                 color="primary"
//                 radius="md"
//                 onClick={onConfirm}
//               >
//                 {confirmButtonText}
//               </Button>
//             )}

//             {nonNativeCloseButtonEnabled && (
//               <Button onClick={closeModal} className="w-full" color="primary" variant="bordered">
//                 Close
//               </Button>
//             )}
//           </ModalFooter>
//         )}
//       </ModalContent>
//     </Modal>
//   );
// };

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
    isDismissable = false,
    ...otherProps
  } = props;

  console.log('TelegramModal', props);

  const backButton = useBackButton();
  const mainButton = useMainButton();
  const dispatch = useAppDispatch();

  const confirmHandler = () => {
    onConfirm && onConfirm();
  };

  const closeModal = () => {
    onClose && onClose();
    onOpenChange && onOpenChange(false);
  };

  const onConfirmButtonTextChanged = () => {
    if (!mainButton || !confirmButtonText) return;
    console.log('onConfirmButtonTextChanged', confirmButtonText);

    mainButton.setText(confirmButtonText);
  };

  const disableMainButton = () => {
    if (!mainButton) return;
    console.log('disableMainButton');

    mainButton.disable();

    mainButton.setBgColor(themes.dark.telegramColors.mainButton.disabledColor);
  };

  const enableMainButton = () => {
    if (!mainButton) return;
    console.log('enableMainButton');

    mainButton.enable();
    mainButton.setBgColor(themes.dark.telegramColors.mainButton.color);
    mainButton.setTextColor(themes.dark.telegramColors.mainButton.textColor);
  };

  const showLoader = () => {
    if (!mainButton) return;
    console.log('showLoader');

    mainButton.showLoader();
    disableMainButton();
    mainButton.setText('Loading...');
  };

  const hideLoader = () => {
    if (!mainButton || !isOpen) return;
    console.log('hideLoader');

    mainButton.hideLoader();
    enableMainButton();
    onConfirmButtonTextChanged();
  };

  const onConfirmButtonDisabledChanged = () => {
    console.log('onConfirmButtonDisabledChanged', confirmButtonDisabled);
    confirmButtonDisabled ? disableMainButton() : enableMainButton();
  };

  const onIsLoadingChanged = () => {
    if (!mainButton || !isOpen) return;
    console.log('onIsLoadingChanged', isLoading);

    isLoading ? showLoader() : hideLoader();
  };

  const onOnConfirmChanged = () => {
    if (!mainButton || !isOpen) return;
    console.log('onOnConfirmChanged', onConfirm);
    mainButton.off('click', confirmHandler);
    mainButton.on('click', confirmHandler);
  };

  const onConfirmButtonHiddenChanged = () => {
    if (!mainButton || !isOpen) return;
    console.log('onConfirmButtonHiddenChanged', confirmButtonHidden);
    confirmButtonHidden ? mainButton.hide() : mainButton.show();
  };

  const onModalOpen = () => {
    if (!backButton || !mainButton) return;
    console.log('onModalOpen');
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
    console.log('onModalClose');
    backButton.isVisible && backButton.hide();
    backButton.isVisible && backButton.off('click', closeModal);
    mainButton.enable();
    mainButton.hideLoader();
    mainButton.off('click', confirmHandler);
    mainButton.hide();
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
