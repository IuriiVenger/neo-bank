'use client';

import { FC } from 'react';

import SettingsModal from './SettingsModal';

import { kyc } from '@/api/kyc';
import KYCModal from '@/components/modals/KYC';
import { ModalNames } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectModalVisibility, selectUser } from '@/store/selectors';
import { setModalInvisible, setModalVisible } from '@/store/slices/ui';
import { ModalVisibility } from '@/store/types';

const GlobalModalContainer: FC = () => {
  const dispatch = useAppDispatch();

  const modalVisibility = useAppSelector(selectModalVisibility);
  const { user, userData } = useAppSelector(selectUser);
  const { initUser } = useAuth(dispatch);

  const setIsModalOpen = (modalName: keyof ModalVisibility) => (isOpen: boolean) => {
    isOpen ? dispatch(setModalVisible(modalName)) : dispatch(setModalInvisible(modalName));
  };

  if (!user || !userData) {
    return null;
  }

  return (
    <>
      <KYCModal
        isOpen={modalVisibility.kyc}
        onClose={initUser}
        setIsModalOpen={setIsModalOpen(ModalNames.KYC)}
        user_id={user.id}
        getSumsubToken={kyc.sumsub.generate_token}
        verificationStatus={userData.kyc_status}
      />
      {/* <SettingsModal isOpen={modalVisibility.settings} setIsModalOpen={setIsModalOpen(ModalNames.SETTINGS)} /> */}
    </>
  );
};

export default GlobalModalContainer;
