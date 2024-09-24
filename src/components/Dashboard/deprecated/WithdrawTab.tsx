import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useEffect, useState } from 'react';

import { PiCreditCard, PiWallet } from 'react-icons/pi';

import { DashboardProps } from '..';
import SelectCurrency from '../../Currency/SelectCurrency';

import ExternalExhangeInput from '../../ExchangeForm/deprecated/ExternalExchangeInput';
import ExternalWithdrawInput from '../../ExchangeForm/deprecated/ExternalWithdrawIpnut';
import SelectPaymentMethod from '../../ExchangeForm/deprecated/SelectPaymentMethod';

import { API } from '@/api/types';
import ConfirmModal from '@/components/modals/ConfirmModal';
import CurrencyListModal from '@/components/modals/CurrencyListModal';
import CustomInput from '@/components/ui/CustomInput';
import { PaymentMethod } from '@/constants';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { isCrypto, isFiat } from '@/utils/financial';

type WithdrawTabProps = DashboardProps & {
  className?: string;
  externalCalcData: UseExternalCalcData;
};

const WithdrawTab: FC<WithdrawTabProps> = (props) => {
  const {
    selectedWallet,
    className,
    selectCrypto,
    selectFiat,
    selectedCrypto,
    selectedFiat,
    fiatList,
    allowedCryptoToFiatList,
    createCrypto2FiatOrder,
    createCrypto2CryptoOrder,
    chainList,
    externalCalcData,
    whiteLabelConfig,
  } = props;

  const { setAmount, amount, offrampCalcData, withdrawCalcData, isOfframpCalcPending, isWithdrawCalcPending } =
    externalCalcData;

  const [isFiatModalOpen, setIsFiatModalOpen] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const [activePaymentMethod, setActivePaymentMethod] = useState<PaymentMethod>(
    whiteLabelConfig?.disableFiat ? PaymentMethod.CRYPTO : PaymentMethod.FIAT,
  );
  const [withdrawTarget, setWithdrawTarget] = useState('');
  const [withrawConfirmationText, setWithdrawConfirmationText] = useState<string | null>(null);

  const isFiatPayment = activePaymentMethod === PaymentMethod.FIAT;

  const selectedWalletBalance = selectedWallet.data?.balance;
  const selectedCryptoWalletBalance =
    selectedWalletBalance?.find((balance: any) => balance.crypto.uuid === selectedCrypto.uuid)?.amount || 0;

  const selectedCryptoAvavilibleToWithdraw =
    selectedWallet.data &&
    selectedWallet.data.balance.find((balance: any) => balance.crypto.uuid === selectedCrypto.uuid)?.amount;
  const isAmountEnough = selectedCryptoAvavilibleToWithdraw && selectedCryptoAvavilibleToWithdraw >= amount;

  const isWIthdrawAvailible =
    !!selectedCrypto && !!selectedFiat && !!selectedWallet.data && !!withdrawTarget && !!amount && isAmountEnough;

  const openCryptoModal = () => setIsCryptoModalOpen(true);
  const openFiatModal = () => setIsFiatModalOpen(true);
  const withdrawTargetWithoutSpaces = withdrawTarget.replace(/\s/g, '');
  const openWithdrawModal = () => {
    const confirmationText = isFiatPayment
      ? `Are you sure you want to withdraw ${amount} ${selectedCrypto.symbol} to card ${withdrawTarget}?`
      : `Are you sure you want to send ${amount} ${selectedCrypto.symbol} to address ${withdrawTarget}?`;

    setWithdrawConfirmationText(confirmationText);
    setIsWithdrawModalOpen(true);
  };

  const handleWithdrawTargetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isFiatPayment) return setWithdrawTarget(e.target.value);

    let value = e.target.value.replace(/\D/g, '').substring(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setWithdrawTarget(value);
  };

  const clickButtonHandler = () => {
    if (!selectedWallet.data) return;

    if (isFiatPayment) {
      return createCrypto2FiatOrder({
        amount,
        fiat_uuid: selectedFiat?.uuid,
        crypto_uuid: selectedCrypto?.uuid,
        wallet_uuid: selectedWallet.data.uuid,
        card_number: withdrawTargetWithoutSpaces,
        is_subsctract: true,
      });
    }

    return createCrypto2CryptoOrder({
      amount,
      crypto_uuid: selectedCrypto.uuid,
      wallet_uuid: selectedWallet.data.uuid,
      to_address: withdrawTarget,
      is_subsctract: true,
    });
  };

  const selectCurrency = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    if (isFiat(currency)) {
      selectFiat(currency);
    }
    if (isCrypto(currency)) {
      selectCrypto(currency);
    }
  };

  useEffect(() => {
    setWithdrawTarget('');
  }, [activePaymentMethod]);

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <SelectPaymentMethod
        isWithdraw
        label="Choose withdraw method"
        className="w-full"
        activePaymentMethod={activePaymentMethod}
        onSelect={setActivePaymentMethod}
        isFiatDisabled={whiteLabelConfig?.disableFiat}
      />
      <SelectCurrency
        label="Withdraw from"
        onClick={openCryptoModal}
        currency={selectedCrypto}
        balance={selectedCryptoWalletBalance}
        chains={chainList}
      />
      {isFiatPayment && <SelectCurrency label="Withdraw to" onClick={openFiatModal} currency={selectedFiat} />}

      <CustomInput
        className="-mt-4"
        label={isFiatPayment ? null : <h3 className="mb-4 text-xl font-bold">Withdraw to</h3>}
        placeholder={isFiatPayment ? 'Enter card number' : 'Enter wallet address'}
        size="lg"
        labelPlacement={isFiatPayment ? 'inside' : 'outside'}
        startContent={isFiatPayment ? <PiCreditCard /> : <PiWallet />}
        onChange={handleWithdrawTargetInput}
        value={withdrawTarget}
        content="width=device-width, initial-scale=1, maximum-scale=1"
        maxLength={isFiatPayment ? 19 : undefined}
        required
      />

      {isFiatPayment ? (
        <ExternalExhangeInput
          buyingCurrency={selectedFiat}
          sellingCurrency={selectedCrypto}
          calcData={offrampCalcData}
          sellValue={amount}
          setSellValue={setAmount}
          isCalculating={isOfframpCalcPending}
          isWithdraw
        />
      ) : (
        <ExternalWithdrawInput
          amount={amount}
          netAmount={withdrawCalcData && withdrawCalcData.net_amount}
          commission={withdrawCalcData && withdrawCalcData.commission}
          setAmount={setAmount}
          selectedCrypto={selectedCrypto}
          isCalculating={isWithdrawCalcPending}
        />
      )}

      <Button
        isDisabled={!isWIthdrawAvailible}
        size="lg"
        color="primary"
        className="mt-6 text-white"
        radius="sm"
        onClick={openWithdrawModal}
      >
        {isAmountEnough ? 'Withdraw' : 'Not enough funds'}
      </Button>

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
        currencies={allowedCryptoToFiatList}
        onSelect={selectCurrency}
        chains={chainList}
      />
      <ConfirmModal
        isOpen={isWithdrawModalOpen}
        setIsModalOpen={setIsWithdrawModalOpen}
        onConfirm={clickButtonHandler}
        title="Withdraw confirmation"
        confirmText={withrawConfirmationText}
      />
    </div>
  );
};

export default WithdrawTab;
