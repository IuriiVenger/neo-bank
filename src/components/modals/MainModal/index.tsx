import { ModalProps } from '@nextui-org/react';
import cn from 'classnames';
import { FC, memo, ReactNode, useEffect, useState } from 'react';

import TelegramModal from './TelegramModal';

import WebModal from './WebModal';

import { framerMotionAnimations } from '@/config/animations';

import { AppEnviroment } from '@/constants';
import useBreakpoints from '@/hooks/useBreakpoints';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectConfig } from '@/store/selectors';
import { decreaseOpenModalCount, increaseOpenModalCount } from '@/store/slices/ui';

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
  };

const MainModal: FC<MainModalProps> = (props) => {
  const { mdBreakpoint } = useBreakpoints();
  const { appEnviroment, isAppFullInitialized } = useAppSelector(selectConfig);
  const { size, motionProps, isOpen, className, nativeCloseButton = true, saveScrollPosition } = props;
  const dispatch = useAppDispatch();

  const responsiveSize = mdBreakpoint ? 'md' : 'full';
  const modalSize = size || responsiveSize;
  const responsiveMotionProps = mdBreakpoint ? { variants: framerMotionAnimations.downEnterExit } : undefined;
  const modalMotionProps = motionProps || responsiveMotionProps;
  const isTelegramEnviroment = appEnviroment === AppEnviroment.TELEGRAM;
  const disableAnimation = !mdBreakpoint && !motionProps;

  const [wasOpened, setWasOpened] = useState(false);

  useEffect(() => {
    if (isOpen && !mdBreakpoint && window && !saveScrollPosition) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setWasOpened(true);
      dispatch(increaseOpenModalCount());
    } else if (wasOpened) {
      dispatch(decreaseOpenModalCount());
    }

    return () => {
      if (wasOpened) {
        dispatch(decreaseOpenModalCount());
      }
    };
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
