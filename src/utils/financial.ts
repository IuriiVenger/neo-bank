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
import { StaticImageData } from 'next/image';
import currencyFlag from 'react-currency-flags/dist/flags';

import { roundToDecimals } from './converters';

import { isChain, isFiat } from './typeguards';

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
import mcnt from '@/assets/svg/landing-cryptocurrency-icons/mcnt.webp';
import not from '@/assets/svg/landing-cryptocurrency-icons/not.svg';
import ton from '@/assets/svg/landing-cryptocurrency-icons/ton.svg';
import { WithOptionalAmount } from '@/types';

type CryptoIcons = {
  [key: string]: string | StaticImageData;
};

export const cryptoIcons: CryptoIcons = {
  ada,
  bnb,
  bsc,
  btc,
  dot,
  eth,
  matic,
  mcnt,
  sol,
  tron,
  trx,
  ton,
  not,
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

export const isWalletTransaction = (
  transaction: API.WalletTransactions.Transaction | API.Cards.TransactionItem,
): transaction is API.WalletTransactions.Transaction =>
  (transaction as API.WalletTransactions.Transaction).txid !== undefined;

export const getCurrencyIconSrc = (
  currency: API.List.Crypto | API.List.Fiat | API.List.Chains,
): string | StaticImageData =>
  isFiat(currency)
    ? currencyFlag[currency.code.toLowerCase() as keyof typeof currencyFlag]
    : cryptoIcons[currency.symbol.toLowerCase()] || cryptoIcons.btc;

export const getCryptoIconSrc = (symbol: string): string | StaticImageData =>
  cryptoIcons[symbol.toLowerCase()] || cryptoIcons.btc;

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

export const getCryptoByUuid = (uuid: string, crypto: API.List.Crypto[]) => crypto.find((item) => item.uuid === uuid);

export const getCardBalance = (card: API.Cards.CardDetailItem | API.Cards.CardListItem) => {
  const balanceAmount = roundToDecimals(+card.fiat_account.balance || 0, 2);
  const balance = `${card.fiat_account.fiat.symbol}${balanceAmount} `;

  return balance;
};

export const convertWalletBalanceToCryptoWithAmount = (walletBalance: API.Wallets.WalletBalance) => {
  const cryptoWithBalance: WithOptionalAmount<API.List.Crypto>[] = walletBalance
    .filter((balance) => balance.details.find((detail) => detail.amount > 0))
    .map((balance) => balance.details.map((detail) => ({ ...detail.crypto, amount: detail.amount })))
    .flat()
    .sort((a, b) => b.amount - a.amount);

  return cryptoWithBalance;
};

export const getCurrencyId = (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) =>
  isChain(currency) ? currency.id : currency.uuid;

// const selectedCoinCurrenciesWithAmount =
// cryptoBySymbol
//   .find((crypto) => crypto.symbol === selectedCoin)
//   ?.items.map((currency) => ({
//     ...currency,
//     amount:
//       selectedWallet.data?.balance.find(({ details }) =>
//         details.find(({ crypto }) => crypto.uuid === currency.uuid),
//       )?.amount || 0,
//   })) || [];

export const getCoinListlWithAmount = (
  cryptoBySymbol: API.List.CryptoBySymbol[],
  selectedWallet: API.Wallets.ExtendWallet | null,
  hideEmptyBalance = false,
) => {
  const coinListWithAmount = cryptoBySymbol
    .map((crypto) => {
      const balance = selectedWallet?.balance.find((wallet) => wallet.symbol === crypto.symbol);

      return {
        crypto: {
          ...crypto,
          amount: balance?.amount ?? 0,
          fiat_amount: balance?.fiat_amount ?? 0,
        },
        currencyName: crypto.symbol,
      };
    })
    .sort((a, b) => b.crypto.fiat_amount - a.crypto.fiat_amount);

  return hideEmptyBalance ? coinListWithAmount.filter((item) => item.crypto.amount > 0) : coinListWithAmount;
};

export const getCurrencyListWithAmount = (crypto: API.List.Crypto[], walletBalance: API.Wallets.WalletBalance) => {
  const cryptoWithBalance = convertWalletBalanceToCryptoWithAmount(walletBalance);

  const currencyListWithAmount = crypto
    .map((currency) => {
      const walletCrypto = cryptoWithBalance.find((item) => item.uuid === currency.uuid);
      return { ...currency, amount: walletCrypto?.amount || 0 };
    })
    .sort((a, b) => b.amount - a.amount);

  return currencyListWithAmount;
};

export const getSelectedCoinCurrenciesWithAmount = (
  cryptoBySymbol: API.List.CryptoBySymbol[],
  selectedCoin: string,
  selectedWallet: API.Wallets.ExtendWallet,
  hideEmptyBalance = false,
) => {
  const selectedCoinCurrenciesWithAmount =
    cryptoBySymbol
      .find((crypto) => crypto.symbol === selectedCoin)
      ?.items.map((currency) => {
        const balance =
          selectedWallet?.balance.find(({ details }) => details.find(({ crypto }) => crypto.uuid === currency.uuid))
            ?.amount || 0;

        return {
          ...currency,
          amount: balance,
        };
      })
      .sort((a, b) => b.amount - a.amount) || [];

  return hideEmptyBalance
    ? selectedCoinCurrenciesWithAmount.filter(({ amount }) => !!amount)
    : selectedCoinCurrenciesWithAmount;
};
