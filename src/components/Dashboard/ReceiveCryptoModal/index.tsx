import { FC, useEffect, useState } from 'react';

import { DashboardProps } from '..';

import ChooseCoinStep, { ChooseCoinStepProps } from './steps/ChooseCoinStep';
import ChooseCurrencyStep, { ChooseCurrencyStepProps } from './steps/ChooseCurrencyStep';

import ReceiveCryptoStep, { ReceiveCryptoStepProps } from './steps/ReceiveCryptoStep';

import { API } from '@/api/types';
import MainModal, { HiddenConfirmButtonProps, VisibleConfirmButtonProps } from '@/components/modals/MainModal';

import { getSelectedCoinCurrenciesWithAmount } from '@/utils/financial';

type ReceiveCryptoModalProps = {
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
};

enum ReceiveCryptoSteps {
  METHOD = 'method',
  COIN = 'coin',
  CURRENCY = 'currency',
  RECEIVE = 'receive',
}

type CryptoStepsDataComponentProps = ChooseCoinStepProps & ChooseCurrencyStepProps & ReceiveCryptoStepProps;

type CryptoStepsData = (HiddenConfirmButtonProps | VisibleConfirmButtonProps) & {
  title?: string;
  subtitle?: string;
  Component: FC<CryptoStepsDataComponentProps>;
  confirmButtonDisabled?: boolean;
};

type ReceiveCryptoStepsMap = {
  [key in ReceiveCryptoSteps]: CryptoStepsData;
};

const ReceiveCryptoModal: FC<ReceiveCryptoModalProps> = (props) => {
  const {
    isOpen,
    setIsModalOpen,
    cryptoBySymbol,
    selectedWallet,
    selectedWalletBalanceCurrency,
    chains,
    selectedCrypto,
    getWalletAddress,
    createWalletAddress,
    selectCrypto,
  } = props;

  const [currentStep, setCurrentStep] = useState<ReceiveCryptoSteps>(ReceiveCryptoSteps.METHOD);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  const selectedCoinCurrenciesWithAmount =
    selectedCoin && selectedWallet.data
      ? getSelectedCoinCurrenciesWithAmount(cryptoBySymbol, selectedCoin, selectedWallet.data)
      : [];

  const steps: ReceiveCryptoStepsMap = {
    [ReceiveCryptoSteps.METHOD]: {
      title: 'Choose a coin',
      Component: ChooseCoinStep,
      confirmButtonHidden: true,
    },
    [ReceiveCryptoSteps.COIN]: {
      title: 'Recieve',
      Component: ChooseCoinStep,
      confirmButtonHidden: true,
    },
    [ReceiveCryptoSteps.CURRENCY]: {
      title: 'Choose a network',
      Component: ChooseCurrencyStep,
      confirmButtonHidden: true,
    },
    [ReceiveCryptoSteps.RECEIVE]: {
      Component: ReceiveCryptoStep,
      confirmButtonHidden: true,
    },
  };

  const onCoinClick = (symbol: string) => {
    setSelectedCoin(symbol);
    setCurrentStep(ReceiveCryptoSteps.CURRENCY);
  };

  const onCurrencyClick = (currency: API.List.Crypto | API.List.Chains | API.List.Fiat) => {
    if ('chain' in currency) {
      selectCrypto(currency);
      setCurrentStep(ReceiveCryptoSteps.RECEIVE);
    }
  };

  const setDefaultState = () => {
    setCurrentStep(ReceiveCryptoSteps.METHOD);
    setSelectedCoin(null);
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
    createWalletAddress,
    getWalletAddress,
    selectedCrypto,
  };

  const activeStep = steps[currentStep];
  const ActiveStepComponent = activeStep.Component;

  useEffect(() => {
    if (!isOpen) {
      setDefaultState();
    }
  }, [isOpen]);

  return (
    <MainModal isOpen={isOpen} onOpenChange={setIsModalOpen} {...activeStep}>
      <h2 className="mb-5 text-3xl font-medium">{activeStep.title}</h2>
      <ActiveStepComponent {...cryptoStepsDataComponentProps} />
    </MainModal>
  );
};

export default ReceiveCryptoModal;
