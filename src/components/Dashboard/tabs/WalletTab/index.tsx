import { FC, useState } from 'react';

import { DashboardProps } from '../..';

import ChooseCoinStep, { ChooseCoinStepProps } from './step/ChooseCoinStep';

import ChooseCurrencyStep, { ChooseCurrencyStepProps } from './step/ChooseCurrencyStep';

import { API } from '@/api/types';
import BackButton from '@/components/ui/BackButton';
import DefaultContainer from '@/components/ui/DefaultContainer';
import { DashboardTabs } from '@/constants';
import { StoreDataWithStatus } from '@/store/types';
import { getSelectedCoinCurrenciesWithAmount } from '@/utils/financial';

type WalletTabProps = {
  cryptoBySymbol: API.List.CryptoBySymbol[];
  selectedWallet: StoreDataWithStatus<API.Wallets.ExtendWallet | null>;
  changeDashboardTab: (tab: DashboardTabs) => void;
  selectedWalletBalanceCurrency: string;
  chainList: DashboardProps['chainList'];
  selectedCrypto: DashboardProps['selectedCrypto'];
};

enum WalletTabSteps {
  COIN = 'coin',
  CURRENCY = 'currency',
}

type WalletTabStepsProps = ChooseCoinStepProps & ChooseCurrencyStepProps;

type WalletTabData = {
  [key in WalletTabSteps]: {
    backButtonText: string;
    backButtonHandler: () => void;
    title: string;
    Component: FC<WalletTabStepsProps>;
  };
};

const WalletTab: FC<WalletTabProps> = (props) => {
  const {
    cryptoBySymbol,
    selectedWallet,
    selectedWalletBalanceCurrency,
    changeDashboardTab,
    chainList,
    selectedCrypto,
  } = props;
  const [activeStep, setActiveStep] = useState<WalletTabSteps>(WalletTabSteps.COIN);
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);

  const selectedCoinCurrenciesWithAmount =
    selectedCoin && selectedWallet.data
      ? getSelectedCoinCurrenciesWithAmount(cryptoBySymbol, selectedCoin, selectedWallet.data)
      : [];

  const onCoinClick = (symbol: string) => {
    setSelectedCoin(symbol);
    setActiveStep(WalletTabSteps.CURRENCY);
  };

  const goToMainTab = () => changeDashboardTab(DashboardTabs.MAIN);
  const goToChooseCoinStep = () => setActiveStep(WalletTabSteps.COIN);

  const walletTabData: WalletTabData = {
    [WalletTabSteps.COIN]: {
      backButtonText: 'Back to main',
      backButtonHandler: goToMainTab,
      title: 'Choose coin',
      Component: ChooseCoinStep,
    },
    [WalletTabSteps.CURRENCY]: {
      backButtonText: 'Back to coin',
      backButtonHandler: goToChooseCoinStep,
      title: 'Choose currency',
      Component: ChooseCurrencyStep,
    },
  };

  const activeStepData = walletTabData[activeStep];
  const ActiveComponent = activeStepData.Component;

  const stepsProps: WalletTabStepsProps = {
    cryptoBySymbol,
    selectedWallet,
    selectedWalletBalanceCurrency,
    onCoinClick,
    chains: chainList,
    currencies: selectedCoinCurrenciesWithAmount,
    activeCurrency: selectedCrypto,
  };

  return (
    <>
      <BackButton onClick={activeStepData.backButtonHandler} text={activeStepData.backButtonText} />
      <DefaultContainer className="h-full max-lg:!bg-inherit max-lg:p-0">
        <h1 className="mb-8 text-2xl font-medium">Wallet</h1>
        <ActiveComponent {...stepsProps} />
      </DefaultContainer>
    </>
  );
};

export default WalletTab;
