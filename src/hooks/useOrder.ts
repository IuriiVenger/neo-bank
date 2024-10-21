import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';

import { orders } from '@/api/orders';
import { API } from '@/api/types';
import whiteLabelConfig from '@/config/whitelabel';
import { ModalNames } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectIsUserLoggedIn, selectUser } from '@/store/selectors';
import { setModalVisible } from '@/store/slices/ui';

const useOrder = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isUserLoggedIn = useAppSelector(selectIsUserLoggedIn);
  const { userData } = useAppSelector(selectUser);

  const availableLimit = userData && userData.turnover_limit && userData.turnover_limit - userData.total_turnover.total;

  const isUserLoggedInRef = useRef(isUserLoggedIn);
  const availableLimitRef = useRef(availableLimit);

  const openKYCModal = () => dispatch(setModalVisible(ModalNames.KYC));

  isUserLoggedInRef.current = isUserLoggedIn;
  availableLimitRef.current = availableLimit;

  const checkOrderPossibility = (amount: number) => {
    if (!isUserLoggedInRef.current) {
      router.push('/auth/login');
      return false;
    }

    if (availableLimitRef.current && availableLimitRef.current < amount && !whiteLabelConfig.disableKYC) {
      openKYCModal();
      return false;
    }

    return true;
  };

  const createOnRampOrder = useCallback(async (orderData: API.Orders.OnRamp.Request) => {
    if (!isUserLoggedInRef.current) {
      router.push('/auth/login');
      return null;
    }

    if (availableLimitRef.current && availableLimitRef.current < orderData.amount) {
      openKYCModal();
      return null;
    }

    const { data } = await orders.onramp.create(orderData);

    return data && router.push(data.redirect_url);
  }, []);

  const createOffRampOrder = useCallback(async (orderData: API.Orders.OffRamp.Request) => {
    const isOrderPossible = checkOrderPossibility(orderData.amount);

    if (!isOrderPossible) {
      return null;
    }

    const { data } = await orders.offramp.create(orderData);
    router.push(`/order/${data.order_uuid}`);
  }, []);

  const createCrypto2CryptoOrder = useCallback(async (orderData: API.Orders.Crypto.Withdrawal.Request) => {
    if (!isUserLoggedInRef.current) {
      router.push('/auth/login');
      return null;
    }

    const { data } = await orders.crypto.withdrawal.create(orderData);
    router.push(`/order/${data.order_uuid}`);
  }, []);

  const createInternalTopUpOrder = async (requestData: API.Orders.VCards.Topup.Internal.Request) => {
    await orders.vcars.topup.internal(requestData);
  };

  return { createOnRampOrder, createOffRampOrder, createCrypto2CryptoOrder, createInternalTopUpOrder };
};

export default useOrder;
