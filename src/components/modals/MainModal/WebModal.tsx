import { Modal, cn, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react';
import { FC } from 'react';

import { MainModalProps } from '.';

const WebModal: FC<MainModalProps> = (props) => {
  const {
    children,
    header,
    className,
    contentClassName,
    bodyClassname,
    confirmButtonDisabled,
    confirmButtonText,
    onConfirm,
    confirmButtonHidden,
    isLoading,
    hideCloseButton,
    nativeCloseButton,
    isOpen,
    onClose,
    isDismissable = false,
    ...otherProps
  } = props;

  const nonNativeCloseButtonEnabled = !nativeCloseButton && !hideCloseButton;

  return (
    <Modal
      {...otherProps}
      isDismissable={isDismissable}
      isOpen={isOpen}
      className={cn('', className)}
      onClose={onClose}
      hideCloseButton={nonNativeCloseButtonEnabled}
      backdrop="blur"
    >
      <ModalContent
        className={cn('fixed left-0 top-0 max-h-svh  min-h-96 md:relative md:max-h-[85vh]', contentClassName)}
      >
        {header || (nativeCloseButton && !hideCloseButton && <ModalHeader className="">{header}</ModalHeader>)}
        <ModalBody className={cn('overflow-y-auto pb-10 shadow-none sm:max-h-[90vh]', bodyClassname)}>
          {children}
        </ModalBody>
        {(!confirmButtonHidden || nonNativeCloseButtonEnabled) && (
          <ModalFooter className="relative z-10 flex min-h-1 w-full flex-col pb-6">
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

            {nonNativeCloseButtonEnabled && (
              <Button onClick={onClose} className="w-full" color="primary" variant="bordered">
                Close
              </Button>
            )}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default WebModal;
