import { FC, useEffect, useState } from 'react';

import { DashboardProps } from '..';

import ChooseCoinStep, { ChooseCoinStepProps } from './steps/ChooseCoinStep';
import ChooseCurrencyStep, { ChooseCurrencyStepProps } from './steps/ChooseCurrencyStep';
import ConfirmWithdrawStep, { ConfirmWithdrawStepProps } from './steps/ConfirmWithdrawStep';
import WithdrawCryptoStep, { WithdrawCryptoStepProps } from './steps/WithdrawCryptoStep';

import { API } from '@/api/types';
import MainModal, { HiddenConfirmButtonProps, VisibleConfirmButtonProps } from '@/components/modals/MainModal';

import { useRequestStatus } from '@/hooks/useRequestStatus';
import { getSelectedCoinCurrenciesWithAmount } from '@/utils/financial';

type WithdrawCryptoModalProps = {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedWallet: DashboardProps['selectedWallet'];
  cryptoBySymbol: DashboardProps['cryptoBySymbol'];
  selectedWalletBalanceCurrency: DashboardProps['selectedWalletBalanceCurrency'];
  chains: DashboardProps['chainList'];
  selectedCrypto: DashboardProps['selectedCrypto'];
  getWalletAddress: DashboardProps['getWalletAddress'];
  createWalletAddress: DashboardProps['createWalletAddress'];
  selectCrypto: DashboardProps['selectCrypto'];
  createCrypto2CryptoOrder: DashboardProps['createCrypto2CryptoOrder'];
  externalCalcData: DashboardProps['externalCalcData'];
};

enum WithdrawCryptoSteps {
  COIN = 'coin',
  CURRENCY = 'currency',
  WITHDRAW = 'withdraw',
  CONFIRM = 'confirm',
}

type CryptoStepsDataComponentProps = ChooseCoinStepProps &
  ChooseCurrencyStepProps &
  WithdrawCryptoStepProps &
  ConfirmWithdrawStepProps;

type CryptoStepsData = (HiddenConfirmButtonProps | VisibleConfirmButtonProps) & {
  title?: string;
  subtitle?: string;
  Component: FC<CryptoStepsDataComponentProps>;
  confirmButtonDisabled?: boolean;
  onBackButtonClick?: () => void;
};

type WithdrawCryptoStepsMap = {
  [key in WithdrawCryptoSteps]: CryptoStepsData;
};

const WithdrawCryptoModal: FC<WithdrawCryptoModalProps> = (props) => {
  const {
    isOpen,
    setIsModalOpen,
    cryptoBySymbol,
    selectedWallet,
    selectedWalletBalanceCurrency,
    chains,
    selectedCrypto,
    selectCrypto,
    createCrypto2CryptoOrder,
    externalCalcData,
  } = props;

  const [currentStep, setCurrentStep] = useState<WithdrawCryptoSteps>(WithdrawCryptoSteps.COIN);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [withdrawTarget, setWithdrawTarget] = useState('');
  const [withdrawRequestStatus, setWithdrawPending, setWithdrawFullfilled, setWithdrawRejected] = useRequestStatus();

  const { amount, setAmount } = externalCalcData;

  const selectedCryptoBalance =
    selectedWallet.data?.balance?.find((balance) =>
      balance.details.find((detail) => detail.crypto.uuid === selectedCrypto?.uuid),
    )?.amount || 0;

  const isAmountEnough = selectedCryptoBalance && selectedCryptoBalance >= amount;
  const isWithdrawAvailible =
    !!selectedCrypto && !!selectedWallet.data && !!withdrawTarget && !!amount && isAmountEnough;

  const withdrawButtonText = isAmountEnough ? 'Withdraw' : 'Insufficient funds';
  const selectedCoinCurrenciesWithAmount =
    selectedCoin && selectedWallet.data
      ? getSelectedCoinCurrenciesWithAmount(cryptoBySymbol, selectedCoin, selectedWallet.data, true)
      : [];

  const setChooseCoinStep = () => setCurrentStep(WithdrawCryptoSteps.COIN);
  const setConfirmWithdrawStep = () => setCurrentStep(WithdrawCryptoSteps.CONFIRM);
  const setWithdrawCryptoStep = () => setCurrentStep(WithdrawCryptoSteps.WITHDRAW);

  const handleWithdraw = async () => {
    if (!selectedWallet.data || !selectedCrypto) return;

    try {
      setWithdrawPending();
      await createCrypto2CryptoOrder({
        amount,
        crypto_uuid: selectedCrypto.uuid,
        wallet_uuid: selectedWallet.data.uuid,
        to_address: withdrawTarget,
        is_subsctract: true,
      });
      setWithdrawFullfilled();
    } catch (error) {
      setWithdrawRejected();
      throw error;
    }
  };

  const steps: WithdrawCryptoStepsMap = {
    [WithdrawCryptoSteps.COIN]: {
      title: 'Choose a coin',
      Component: ChooseCoinStep,
      confirmButtonHidden: true,
    },
    [WithdrawCryptoSteps.CURRENCY]: {
      title: 'Choose a network',
      Component: ChooseCurrencyStep,
      confirmButtonHidden: true,
      onBackButtonClick: setChooseCoinStep,
    },
    [WithdrawCryptoSteps.WITHDRAW]: {
      title: 'Withdraw',
      Component: WithdrawCryptoStep,
      confirmButtonText: withdrawButtonText,
      confirmButtonDisabled: !isWithdrawAvailible,
      onConfirm: setConfirmWithdrawStep,
      onBackButtonClick: setChooseCoinStep,
    },
    [WithdrawCryptoSteps.CONFIRM]: {
      title: 'Confirm transfer',
      Component: ConfirmWithdrawStep,
      confirmButtonText: 'Confirm',
      onConfirm: handleWithdraw,
      onBackButtonClick: setWithdrawCryptoStep,
    },
  };

  const onCoinClick = (symbol: string) => {
    setSelectedCoin(symbol);
    setCurrentStep(WithdrawCryptoSteps.CURRENCY);
  };

  const onCurrencyClick = (currency: API.List.Crypto | API.List.Chains | API.List.Fiat) => {
    if ('chain' in currency) {
      selectCrypto(currency);
      setCurrentStep(WithdrawCryptoSteps.WITHDRAW);
    }
  };

  const setDefaultState = () => {
    setCurrentStep(WithdrawCryptoSteps.COIN);
    setSelectedCoin(null);
    setWithdrawTarget('');
    setAmount(0);
  };

  const changeCurrency = () => {
    setCurrentStep(WithdrawCryptoSteps.COIN);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const cryptoStepsDataComponentProps: CryptoStepsDataComponentProps = {
    selectedWallet,
    selectedWalletBalanceCurrency,
    onCoinClick,
    onCurrencyClick,
    cryptoBySymbol,
    currencies: selectedCoinCurrenciesWithAmount,
    chains,
    activeCurrency: selectedCrypto,
    selectedCrypto,
    externalCalcData,
    changeCurrency,
    setWithdrawTarget,
    withdrawTarget,
    selectedCryptoBalance,
  };

  const activeStep = steps[currentStep];
  const ActiveStepComponent = activeStep.Component;

  useEffect(() => {
    if (!isOpen) {
      setDefaultState();
    }
  }, [isOpen]);

  return (
    <MainModal isLoading={withdrawRequestStatus.PENDING} isOpen={isOpen} onClose={closeModal} {...activeStep}>
      <h2 className="mb-5 text-3xl font-medium">{activeStep.title}</h2>
      <ActiveStepComponent {...cryptoStepsDataComponentProps} />
    </MainModal>
  );
};

export default WithdrawCryptoModal;
