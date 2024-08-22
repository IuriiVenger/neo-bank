import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import SelectCurrency from '../Currency/SelectCurrency';
import CurrencyListModal from '../modals/CurrencyListModal';

import ChainInfo from './ChainInfo';

import ExternalExhangeInput from './ExternalExchangeInput';
import SelectPaymentMethod from './SelectPaymentMethod';

import { DashboardProps } from '.';

import { API } from '@/api/types';
import { PaymentMethod, ResponseStatus } from '@/constants';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { isChain, isCrypto, isFiat } from '@/utils/financial';

type DepositTabProps = DashboardProps & {
  className?: string;
  externalCalcData: UseExternalCalcData;
  createWalletAddress: (data: API.Wallets.WalletChain.Request) => Promise<API.Wallets.WalletChain.Response>;
};

const DepositTab: FC<DepositTabProps> = (props) => {
  const {
    selectedWallet,
    className,
    selectChain,
    selectedChain,
    selectCrypto,
    selectFiat,
    selectedCrypto,
    selectedFiat,
    fiatList,
    chainList,
    createFiat2CryptoOrder,
    getWalletAddress,
    createWalletAddress,
    externalCalcData,
    availableToExchangeCrypto,
    whiteLabelConfig,
  } = props;

  const { setAmount, amount, onrampCalcData, isOnrampCalcPending } = externalCalcData;

  const [isFiatModalOpen, setIsFiatModalOpen] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [isChainModalOpen, setIsChainModalOpen] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState<PaymentMethod>(
    whiteLabelConfig?.disableFiat ? PaymentMethod.CRYPTO : PaymentMethod.FIAT,
  );
  const [activeWalletAddress, setActiveWalletAddress] = useState<API.Wallets.WalletChain.Response | null>(null);
  const [isWalletAdressLoading, setIsWalletAdressLoading] = useState(false);

  const openCryptoModal = () => setIsCryptoModalOpen(true);
  const openFiatModal = () => setIsFiatModalOpen(true);
  const openChainModal = () => setIsChainModalOpen(true);

  const return_url = `${window.location.origin}/order/`;

  const clickButtonHandler = () =>
    selectedWallet.data &&
    createFiat2CryptoOrder({
      amount,
      fiat_uuid: selectedFiat?.uuid,
      crypto_uuid: selectedCrypto?.uuid,
      wallet_uuid: selectedWallet.data?.uuid,
      return_url_fail: return_url,
      return_url_pending: return_url,
      return_url_success: return_url,
      is_subsctract: true,
    });

  const selectCurrency = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    if (isChain(currency)) {
      selectChain(currency);
    }
    if (isFiat(currency)) {
      selectFiat(currency);
    }
    if (isCrypto(currency)) {
      selectCrypto(currency);
    }
  };

  const loadChain = async () => {
    if (selectedWallet.data) {
      try {
        setActiveWalletAddress(null);
        setIsWalletAdressLoading(true);
        const walletChain = await getWalletAddress(selectedChain.id, selectedWallet.data.uuid);
        setActiveWalletAddress(walletChain);
      } catch (error) {
        if ((error as any).response?.status === ResponseStatus.NOT_FOUND) {
          // eslint-disable-next-line no-console
          return console.log('Address not found');
        }
        throw error;
      } finally {
        setIsWalletAdressLoading(false);
      }
    }
  };

  const createWalletAddressHandler = async () => {
    if (selectedWallet.data) {
      try {
        setIsWalletAdressLoading(true);
        await createWalletAddress({ chain: selectedChain.id, wallet_uuid: selectedWallet.data.uuid, label: 'default' });
        await loadChain();
      } finally {
        setIsWalletAdressLoading(false);
      }
    }
  };

  useEffect(() => {
    if (activePaymentMethod === PaymentMethod.CRYPTO) {
      loadChain();
    }
  }, [activePaymentMethod, selectedWallet.data?.uuid, selectedChain]);

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <SelectPaymentMethod
        label="Choose deposit method"
        className="w-full"
        activePaymentMethod={activePaymentMethod}
        onSelect={setActivePaymentMethod}
        isFiatDisabled={whiteLabelConfig?.disableFiat}
      />
      {activePaymentMethod === PaymentMethod.FIAT && (
        <>
          <SelectCurrency label="Deposit by" onClick={openFiatModal} currency={selectedFiat} />
          <SelectCurrency label="Deposit to" onClick={openCryptoModal} currency={selectedCrypto} chains={chainList} />
          <ExternalExhangeInput
            buyingCurrency={selectedCrypto}
            sellingCurrency={selectedFiat}
            calcData={onrampCalcData}
            sellValue={amount}
            setSellValue={setAmount}
            isCalculating={isOnrampCalcPending}
          />
          <Button size="lg" color="primary" className="mt-8 text-white" radius="sm" onClick={clickButtonHandler}>
            Buy
          </Button>
        </>
      )}

      {activePaymentMethod === PaymentMethod.CRYPTO && (
        <>
          <SelectCurrency label="Deposit by" onClick={openChainModal} currency={selectedChain} />
          <ChainInfo
            isWalletAdressLoading={isWalletAdressLoading}
            selectedAddress={activeWalletAddress}
            createAddress={createWalletAddressHandler}
          />
        </>
      )}

      {whiteLabelConfig?.disableStaticPages && (
        <small className="mt-8 text-xs">
          *Before engaging in digital asset transactions, users must be aware of the high risk of substantial financial
          loss. Digital assets, including cryptocurrencies, are highly volatile and speculative. Users should exercise
          caution and conduct thorough research. Transactions involving digital assets may lack consumer protections
          found in traditional financial transactions. Digital currencies are not backed by central authorities,
          exposing users to risks such as hacking and fraud. By proceeding with digital asset transactions, users
          acknowledge the inherent risks and waive any claims against PPrince Ex s.r.o. This notice complies with
          regulations governing Virtual Asset Service Providers (VASPs) for transparency and legal compliance.
        </small>
      )}

      <CurrencyListModal
        isOpen={isFiatModalOpen}
        setIsModalOpen={setIsFiatModalOpen}
        activeCurrency={selectedFiat}
        currencies={fiatList}
        onSelect={selectCurrency}
      />
      <CurrencyListModal
        isOpen={isCryptoModalOpen}
        setIsModalOpen={setIsCryptoModalOpen}
        activeCurrency={selectedCrypto}
        currencies={availableToExchangeCrypto}
        onSelect={selectCurrency}
        chains={chainList}
      />
      <CurrencyListModal
        isOpen={isChainModalOpen}
        setIsModalOpen={setIsChainModalOpen}
        activeCurrency={selectedChain}
        currencies={chainList}
        onSelect={selectCurrency}
        title="Select network"
      />
    </div>
  );
};

export default DepositTab;
