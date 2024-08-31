import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalProps } from '@nextui-org/react';
import { useBackButton, useMainButton } from '@telegram-apps/sdk-react';
import cn from 'classnames';
import { FC, memo, ReactNode, useEffect } from 'react';

import { framerMotionAnimations } from '@/config/animations';
import { disabledTelegramButtonColor, mainTelegramButtonColor } from '@/config/colors';
import { AppEnviroment } from '@/constants';
import useBreakpoints from '@/hooks/useBreakpoints';
import { useAppSelector } from '@/store';
import { selectConfig } from '@/store/selectors';

type HiddenConfirmButtonProps = {
  confirmButtonHidden: true;
  onConfirm?: never;
  confirmButtonText?: never;
};

type VisibleConfirmButtonProps = {
  confirmButtonHidden?: false;
  onConfirm: () => void;
  confirmButtonText: string;
};

type CustomModalProps = ModalProps & {
  header?: ReactNode | string;
  footer?: ReactNode | string;
  contentClassName?: string;
  bodyClassname?: string;
};

type MainModalProps = CustomModalProps &
  (HiddenConfirmButtonProps | VisibleConfirmButtonProps) & {
    confirmButtonDisabled?: boolean;
    isLoading?: boolean;
    showNativeCloseButton?: boolean;
  };

export const CustomModal: FC<CustomModalProps> = (props) => {
  const { mdBreakpoint } = useBreakpoints();

  const {
    size,
    scrollBehavior,
    motionProps,
    children,
    header,
    footer,
    isOpen,
    className,
    contentClassName,
    bodyClassname,
    ...otherProps
  } = props;

  const responsiveSize = mdBreakpoint ? 'md' : 'full';
  const modalSize = size || responsiveSize;
  const responsiveMotionProps = mdBreakpoint ? { variants: framerMotionAnimations.downEnterExit } : undefined;
  const modalMotionProps = motionProps || responsiveMotionProps;

  useEffect(() => {
    if (isOpen && !mdBreakpoint && window) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isOpen]);

  return (
    <Modal
      motionProps={modalMotionProps}
      scrollBehavior={scrollBehavior}
      size={modalSize}
      isOpen={isOpen}
      {...otherProps}
      disableAnimation={!mdBreakpoint}
      className={cn('overflow-y-auto', className)}
    >
      <ModalContent className={cn('fixed left-0 top-0 max-h-svh md:static md:max-h-[90vh]', contentClassName)}>
        {!!header && <ModalHeader>{header}</ModalHeader>}
        <ModalBody className={cn('pb-10 shadow-inner sm:max-h-[90vh]', bodyClassname)}>{children}</ModalBody>

        <ModalFooter
          className="relative z-10 flex min-h-1 w-full flex-col pb-6 md:pb-4"
          style={{
            boxShadow:
              '0px -10px 6px -3px rgba(255,255,255,0.95), 0px -20px 6px -3px rgba(255,255,255,0.85), 0px -31px 6px -3px rgba(255,255,255,0.8)',
          }}
        >
          {footer}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

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
    ...otherProps
  } = props;

  const backButton = useBackButton();
  const mainButton = useMainButton();

  const confirmHandler = () => {
    onConfirm && onConfirm();
  };

  const closeModal = () => {
    onOpenChange && onOpenChange(false);
  };

  const onConfirmButtonTextChanged = () => {
    if (!mainButton || !confirmButtonText || !isOpen) return;

    mainButton.setText(confirmButtonText);
  };

  const disableMainButton = () => {
    if (!mainButton || !isOpen) return;

    mainButton.disable();
    mainButton.setBgColor(disabledTelegramButtonColor);
  };

  const enableMainButton = () => {
    if (!mainButton || !isOpen) return;

    mainButton.enable();
    mainButton.setBgColor(mainTelegramButtonColor);
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
  }, [isOpen]);

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
      <ModalContent className={cn('fixed left-0 top-0 max-h-svh md:static md:max-h-[90vh]', contentClassName)}>
        {!!header && <ModalHeader>{header}</ModalHeader>}
        <ModalBody className={cn('pb-10 shadow-inner sm:max-h-[90vh]', bodyClassname)}>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

const WebModal: FC<MainModalProps> = (props) => {
  const {
    children,
    header,
    className,
    contentClassName,
    bodyClassname,
    confirmButtonDisabled,
    confirmButtonText,
    onOpenChange,
    onConfirm,
    confirmButtonHidden,
    isLoading,
    hideCloseButton,
    showNativeCloseButton,
    ...otherProps
  } = props;

  const closeModal = () => {
    onOpenChange && onOpenChange(false);
  };

  return (
    <Modal {...otherProps} className={cn('overflow-y-auto', className)} hideCloseButton={!showNativeCloseButton}>
      <ModalContent className={cn('fixed left-0 top-0 max-h-svh md:static md:max-h-[90vh]', contentClassName)}>
        {!!header && <ModalHeader>{header}</ModalHeader>}
        <ModalBody className={cn('pb-10 shadow-inner sm:max-h-[90vh]', bodyClassname)}>{children}</ModalBody>
        {(!confirmButtonHidden || !hideCloseButton) && (
          <ModalFooter
            className="relative z-10 flex min-h-1 w-full flex-col pb-6 md:pb-4"
            style={{
              boxShadow:
                '0px -10px 6px -3px rgba(255,255,255,0.95), 0px -20px 6px -3px rgba(255,255,255,0.85), 0px -31px 6px -3px rgba(255,255,255,0.8)',
            }}
          >
            {!confirmButtonHidden && (
              <Button
                isDisabled={confirmButtonDisabled}
                isLoading={isLoading}
                color="primary"
                radius="md"
                onClick={onConfirm}
              >
                {confirmButtonText}
              </Button>
            )}

            {!hideCloseButton && (
              <Button onClick={closeModal} className="w-full" color="primary" variant="bordered">
                Close
              </Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

const MainModal: FC<MainModalProps> = (props) => {
  const { mdBreakpoint } = useBreakpoints();
  const { appEnviroment } = useAppSelector(selectConfig);
  const { size, motionProps, isOpen } = props;

  const responsiveSize = mdBreakpoint ? 'md' : 'full';
  const modalSize = size || responsiveSize;
  const responsiveMotionProps = mdBreakpoint ? { variants: framerMotionAnimations.downEnterExit } : undefined;
  const modalMotionProps = motionProps || responsiveMotionProps;
  const isTelegramEnviroment = appEnviroment === AppEnviroment.TELEGRAM;
  const disableAnimation = !mdBreakpoint && !motionProps;

  useEffect(() => {
    if (isOpen && !mdBreakpoint && window) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isOpen]);

  const modifiedProps = { ...props, disableAnimation, motionProps: modalMotionProps, size: modalSize };

  return isTelegramEnviroment ? <TelegramModal {...modifiedProps} /> : <WebModal {...modifiedProps} />;
};

export default memo(MainModal);
