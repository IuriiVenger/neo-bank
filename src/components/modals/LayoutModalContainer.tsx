'use client';

import { FC } from 'react';

import SettingsModal from './SettingsModal';

import { ModalNames } from '@/constants';

import { useAppDispatch, useAppSelector } from '@/store';
import { selectModalVisibility } from '@/store/selectors';
import { setModalInvisible, setModalVisible } from '@/store/slices/ui';
import { ModalVisibility } from '@/store/types';

// use any modal here

const LayoutModalContainer: FC = () => {
  const dispatch = useAppDispatch();

  const modalVisibility = useAppSelector(selectModalVisibility);

  const setIsModalOpen = (modalName: keyof ModalVisibility) => (isOpen: boolean) => {
    isOpen ? dispatch(setModalVisible(modalName)) : dispatch(setModalInvisible(modalName));
  };

  return <SettingsModal isOpen={modalVisibility.settings} setIsModalOpen={setIsModalOpen(ModalNames.SETTINGS)} />;
};

export default LayoutModalContainer;
