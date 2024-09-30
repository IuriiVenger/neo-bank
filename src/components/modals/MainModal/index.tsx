import { ModalProps } from '@nextui-org/react';
import cn from 'classnames';
import { FC, memo, ReactNode, useEffect } from 'react';

import TelegramModal from './TelegramModal';

import WebModal from './WebModal';

import { framerMotionAnimations } from '@/config/animations';

import { AppEnviroment } from '@/constants';
import useBreakpoints from '@/hooks/useBreakpoints';
import { useAppSelector } from '@/store';
import { selectConfig } from '@/store/selectors';

export type HiddenConfirmButtonProps = {
  confirmButtonHidden: true;
  onConfirm?: never;
  confirmButtonText?: never;
};

export type VisibleConfirmButtonProps = {
  confirmButtonHidden?: boolean;
  onConfirm: () => void;
  confirmButtonText: string;
};

export type CustomModalProps = ModalProps & {
  header?: ReactNode | string;
  footer?: ReactNode | string;
  contentClassName?: string;
  bodyClassname?: string;
};

export type MainModalProps = CustomModalProps &
  (HiddenConfirmButtonProps | VisibleConfirmButtonProps) & {
    confirmButtonDisabled?: boolean;
    isLoading?: boolean;
    isAppFullInitialized?: boolean;
    nativeCloseButton?: boolean;
    saveScrollPosition?: boolean;
    isDismissable?: boolean;
    restoreInitialTelegramButtonsOnClose?: boolean;
  };

const MainModal: FC<MainModalProps> = (props) => {
  const { mdBreakpoint } = useBreakpoints();
  const { appEnviroment, isAppFullInitialized } = useAppSelector(selectConfig);
  const { size, motionProps, isOpen, className, nativeCloseButton = true, saveScrollPosition } = props;

  const responsiveSize = mdBreakpoint ? 'md' : 'full';
  const modalSize = size || responsiveSize;
  const responsiveMotionProps = mdBreakpoint ? { variants: framerMotionAnimations.downEnterExit } : undefined;
  const modalMotionProps = motionProps || responsiveMotionProps;
  const isTelegramEnviroment = appEnviroment === AppEnviroment.TELEGRAM;
  const disableAnimation = !mdBreakpoint && !motionProps;

  useEffect(() => {
    if (isOpen && !mdBreakpoint && window && !saveScrollPosition) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isOpen]);

  const modifiedProps = {
    ...props,
    nativeCloseButton,
    isAppFullInitialized,
    disableAnimation,
    motionProps: modalMotionProps,
    size: modalSize,
    className: cn('bg-background', className),
  };

  if (!isTelegramEnviroment) {
    return <WebModal {...modifiedProps} />;
  }

  if (isTelegramEnviroment && isAppFullInitialized && isOpen) {
    return <TelegramModal {...modifiedProps} />;
  }
};

export default memo(MainModal);
