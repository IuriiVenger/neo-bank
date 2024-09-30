import { useBackButton } from '@telegram-apps/sdk-react';
import cn from 'classnames';
import { FC, useEffect } from 'react';
import { RiArrowLeftSLine } from 'react-icons/ri';

import { AppEnviroment } from '@/constants';
import { useAppSelector } from '@/store';
import { selectConfig, selectOpenModalCount } from '@/store/selectors';

type BackButtonProps = {
  onClick: () => void;
  text?: string;
  className?: string;
};

const TelegramBackButton: FC<Omit<BackButtonProps, 'text' & 'className'>> = ({ onClick }) => {
  const backButton = useBackButton(true);

  useEffect(() => {
    backButton?.show();
    backButton?.on('click', onClick);
    return () => {
      backButton?.hide();
      backButton?.off('click', onClick);
    };
  }, [backButton]);

  return null;
};

const BackButton: FC<BackButtonProps> = ({ onClick, text = 'Back', className }) => {
  const { appEnviroment } = useAppSelector(selectConfig);
  const openModalCount = useAppSelector(selectOpenModalCount);

  if (appEnviroment === AppEnviroment.TELEGRAM) {
    return !openModalCount && <TelegramBackButton onClick={onClick} />;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('back-button text-foreground-2 mb-4 flex h-6 items-center gap-2 hover:opacity-hover ', className)}
    >
      <RiArrowLeftSLine />
      <span>{text}</span>
    </button>
  );
};

export default BackButton;
