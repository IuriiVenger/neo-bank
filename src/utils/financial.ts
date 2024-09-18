/* eslint-disable import/no-duplicates */
import ada from 'cryptocurrency-icons/svg/icon/ada.svg';
import bnb from 'cryptocurrency-icons/svg/icon/bnb.svg';
import bsc from 'cryptocurrency-icons/svg/icon/bnb.svg';
import btc from 'cryptocurrency-icons/svg/icon/btc.svg';
import dot from 'cryptocurrency-icons/svg/icon/dot.svg';
import eth from 'cryptocurrency-icons/svg/icon/eth.svg';
import matic from 'cryptocurrency-icons/svg/icon/matic.svg';
import sol from 'cryptocurrency-icons/svg/icon/sol.svg';
import tron from 'cryptocurrency-icons/svg/icon/trx.svg';
import trx from 'cryptocurrency-icons/svg/icon/trx.svg';
import usdc from 'cryptocurrency-icons/svg/icon/usdc.svg';
import usdt from 'cryptocurrency-icons/svg/icon/usdt.svg';
import xrp from 'cryptocurrency-icons/svg/icon/xrp.svg';
import currencyFlag from 'react-currency-flags/dist/flags';

import { API } from '@/api/types';
import acalaNetwork from '@/assets/svg/landing-cryptocurrency-icons/acala-network.svg';
import achain from '@/assets/svg/landing-cryptocurrency-icons/achain.svg';
import adcoin from '@/assets/svg/landing-cryptocurrency-icons/adcoin.svg';
import akropolis from '@/assets/svg/landing-cryptocurrency-icons/akropolis.svg';
import alphaWallet from '@/assets/svg/landing-cryptocurrency-icons/alphaWallet.svg';
import alqo from '@/assets/svg/landing-cryptocurrency-icons/alqo.svg';
import anchorProtocol from '@/assets/svg/landing-cryptocurrency-icons/anchorProtocol.svg';
import ankr from '@/assets/svg/landing-cryptocurrency-icons/ankr.svg';
import appCoins from '@/assets/svg/landing-cryptocurrency-icons/appCoins.svg';
import compound from '@/assets/svg/landing-cryptocurrency-icons/compound.svg';
import consensysCodefi from '@/assets/svg/landing-cryptocurrency-icons/consensysCodefi.svg';
import convex from '@/assets/svg/landing-cryptocurrency-icons/convex.svg';
import cortex from '@/assets/svg/landing-cryptocurrency-icons/cortex.svg';
import cosmos from '@/assets/svg/landing-cryptocurrency-icons/cosmos.svg';
import coti from '@/assets/svg/landing-cryptocurrency-icons/coti.svg';
import covalent from '@/assets/svg/landing-cryptocurrency-icons/covalent.svg';
import cream from '@/assets/svg/landing-cryptocurrency-icons/cream.svg';
import cryptoCom from '@/assets/svg/landing-cryptocurrency-icons/cryptoCom.svg';
import currencyCom from '@/assets/svg/landing-cryptocurrency-icons/currencyCom.svg';
import dash from '@/assets/svg/landing-cryptocurrency-icons/dash.svg';

type CryptoIcons = {
  [key: string]: string;
};

export const cryptoIcons: CryptoIcons = {
  ada,
  bnb,
  bsc,
  btc,
  dot,
  eth,
  matic,
  sol,
  tron,
  trx,
  usdt,
  xrp,
  usdc,
};

export const landingCryptoIcons = [
  acalaNetwork,
  achain,
  adcoin,
  akropolis,
  alphaWallet,
  alqo,
  anchorProtocol,
  ankr,
  appCoins,
  compound,
  consensysCodefi,
  convex,
  cortex,
  cosmos,
  coti,
  covalent,
  cream,
  cryptoCom,
  currencyCom,
  dash,
];

export const isFiat = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains): currency is API.List.Fiat =>
  (currency as API.List.Fiat).code !== undefined && (currency as API.List.Fiat).enabled !== undefined;

export const isCrypto = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains): currency is API.List.Crypto =>
  (currency as API.List.Crypto).contract !== undefined && (currency as API.List.Crypto).chain !== undefined;

export const isChain = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains): currency is API.List.Chains =>
  (currency as API.List.Chains).id !== undefined && (currency as API.List.Chains).enabled !== undefined;

export const getCurrencyIconSrc = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains): string =>
  isFiat(currency)
    ? currencyFlag[currency.code.toLowerCase() as keyof typeof currencyFlag]
    : cryptoIcons[currency.symbol.toLowerCase()] || cryptoIcons.btc;

export const getCryptoIconSrc = (symbol: string): string => cryptoIcons[symbol.toLowerCase()] || cryptoIcons.btc;

export const getActiveFiatAvailableCrypto = (fiatExchangeRate: API.Exchange.F2C[], crypto: API.List.Crypto[]) => {
  const availableToExchangeCryptoUuid = fiatExchangeRate.map((item) => item.crypto_uuid);

  const availableCrypto = crypto.filter((item) => availableToExchangeCryptoUuid.includes(item.uuid));

  return availableCrypto;
};

export const getCardProvider = (provider: string) => {
  const normalizedProvider = provider.replace(/[-_ ]/g, '').toUpperCase();

  switch (normalizedProvider) {
    case 'VISA':
      return 'Visa';
    case 'MASTERCARD':
      return 'Mastercard';
    default:
      return provider;
  }
};
