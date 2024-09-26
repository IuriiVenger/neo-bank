import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { API } from '@/api/types';
import { RequestStatus } from '@/constants';
import { useAppDispatch } from '@/store';
import { selectFinanceData } from '@/store/selectors';
import { loadOnrampCalc, loadOfframpCalc, loadWithdrawCalc } from '@/store/slices/finance';
import { StoreOfframpCalcData, StoreOnrampCalcData } from '@/store/types';

export type UseExternalCalcData = {
  amount: number;
  setAmount: (value: number) => void;
  onrampCalcData: StoreOnrampCalcData | null;
  offrampCalcData: StoreOfframpCalcData | null;
  withdrawCalcData: API.Orders.Crypto.Withdrawal.Calc.Item | null;
  isOfframpCalcPending: boolean;
  isOnrampCalcPending: boolean;
  isWithdrawCalcPending: boolean;
};

type UseExternalCalc = () => UseExternalCalcData;

const useExternalCalc: UseExternalCalc = () => {
  const dispatch = useAppDispatch();
  const { selectedWallet, selectedCrypto, selectedFiat, onrampCalc, offrampCalc, withdrawCalc } =
    useSelector(selectFinanceData);

  const [amount, setAmount] = useState(0);

  const offrampCalcData = offrampCalc?.data && offrampCalc.data[0];
  const onrampCalcData = onrampCalc?.data && onrampCalc.data[0];
  const withdrawCalcData = withdrawCalc.data && withdrawCalc.data.recommended;

  const isOfframpCalcPending = offrampCalc?.status === RequestStatus.PENDING;
  const isOnrampCalcPending = onrampCalc?.status === RequestStatus.PENDING;
  const isWithdrawCalcPending = withdrawCalc?.status === RequestStatus.PENDING;

  const [lastSelectedWallet, setLastSelectedWallet] = useState(selectedWallet);

  const updateCalculations = () => {
    if (selectedWallet.data && selectedCrypto && selectedFiat) {
      const onRampCalcParams = {
        crypto_uuid: selectedCrypto.uuid,
        fiat_uuid: selectedFiat.uuid,
        wallet_uuid: selectedWallet.data.uuid,
        amount,
        is_subsctract: true,
      };

      const offRampCalcParams = {
        crypto_uuid: selectedCrypto.uuid,
        fiat_uuid: selectedFiat.uuid,
        wallet_uuid: selectedWallet.data.uuid,
        amount,
        is_subsctract: true,
      };
      const withdrawCalcParams = {
        crypto_uuid: selectedCrypto.uuid,
        wallet_uuid: selectedWallet.data.uuid,
        is_subsctract: true,
        amount,
      };

      dispatch(loadOnrampCalc(onRampCalcParams));
      dispatch(loadOfframpCalc(offRampCalcParams));
      dispatch(loadWithdrawCalc(withdrawCalcParams));
    }
  };

  const delayedUpdateCalculations = debounce(updateCalculations, 200);

  useEffect(() => {
    if (lastSelectedWallet.data?.uuid !== selectedWallet.data?.uuid) {
      setLastSelectedWallet(selectedWallet);
      updateCalculations();
    }
  }, [selectedWallet]);

  useEffect(() => {
    delayedUpdateCalculations();
    return delayedUpdateCalculations.cancel;
  }, [selectedCrypto, selectedFiat, amount]);

  return {
    amount,
    setAmount,
    onrampCalcData,
    offrampCalcData,
    isOfframpCalcPending,
    isOnrampCalcPending,
    withdrawCalcData,
    isWithdrawCalcPending,
  };
};

export default useExternalCalc;
