'use client';

import { Button, Card } from '@nextui-org/react';

import cx from 'classnames';

import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { MdInfoOutline, MdOutlineArrowCircleRight } from 'react-icons/md';

import CryptoFormField from './CryptoFormField';

import { API } from '@/api/types';
import logo from '@/assets/svg/logo.svg';
import mastercard from '@/assets/svg/payment-systems/mastercard.svg';
import visa from '@/assets/svg/payment-systems/visa.svg';
import { CryptoFormFieldAction } from '@/constants';
import { UseExchangeData } from '@/hooks/useExchange';
import { getActiveFiatAvailableCrypto, isCrypto, isFiat } from '@/utils/financial';

type CryptoFormProps = {
  selectCrypto: (crypto: API.List.Crypto) => void;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  chainList: API.List.Chains[];
  cryptoList: API.List.Crypto[];
  fiatList: API.List.Fiat[];
  className?: string;
  exchangeData: UseExchangeData;
};

const CryptoForm: FC<CryptoFormProps> = (props) => {
  const {
    selectedCrypto,
    selectedFiat,
    cryptoList,
    fiatList,
    chainList,
    selectCrypto,
    selectFiat,
    className,
    exchangeData,
  } = props;

  const { sellValue, setSellValue, fiat2CryptoValue, minSellValue, checkMinSellValue, exchangeRate } = exchangeData;

  const availableCrypto = getActiveFiatAvailableCrypto(exchangeRate, cryptoList);

  const selectedChainName = chainList.find((chain) => chain.id === selectedCrypto.chain)?.name;

  const selectCurrency = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => {
    if (isFiat(currency)) {
      selectFiat(currency);
    }
    if (isCrypto(currency)) {
      selectCrypto(currency);
    }
  };

  return (
    <Card className={cx('flex w-full max-w-2xl flex-col gap-8 p-4 py-6 xs:px-10 xs:py-8', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium lg:text-2.5xl">
          Buy {selectedCrypto.name} {selectedChainName}
        </h3>
        <Image src={logo} alt="logo" height={96} className="h-12" />
      </div>

      <div className="flex flex-col gap-3">
        <CryptoFormField
          action={CryptoFormFieldAction.SELL}
          currency={selectedFiat}
          currencies={fiatList}
          setValue={setSellValue}
          minValue={minSellValue}
          value={sellValue}
          onInputBlur={checkMinSellValue}
          onChangeCurrency={selectCurrency}
        />
        <CryptoFormField
          action={CryptoFormFieldAction.BUY}
          currency={selectedCrypto}
          currencies={availableCrypto}
          value={fiat2CryptoValue}
          onChangeCurrency={selectCurrency}
          chains={chainList}
        />
        <div className="flex gap-2 text-zinc-600 ">
          <MdInfoOutline />
          <span className="text-xs md:text-sm">Purchases over €700.00 require enhanced verification checks</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Button as={Link} href="/dashboard" color="primary" radius="sm" size="md" className="font-medium text-white">
          To the payment <MdOutlineArrowCircleRight />
        </Button>

        <div className="flex gap-2">
          <Image src={visa} alt="visa" height={32} className="h-4" />
          <Image src={mastercard} alt="mastercard" height={32} className="h-4" />
        </div>
      </div>
    </Card>
  );
};

export default CryptoForm;
