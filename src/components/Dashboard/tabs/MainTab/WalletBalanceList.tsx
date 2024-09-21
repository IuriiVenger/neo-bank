import cn from 'classnames';
import { FC } from 'react';

import { API } from '@/api/types';
import cryptoEmptyStateDark from '@/assets/svg/theme-illustrations/dark/crypto-empty-state.svg';
import cryptoEmptyStateLight from '@/assets/svg/theme-illustrations/light/crypto-empty-state.svg';
import CryptoInfo from '@/components/Currency/CryptoInfo';
import CurrencyInfo from '@/components/Currency/CurrencyInfo';
import EmptyState from '@/components/ui/EmptyState';
import { roundToDecimals } from '@/utils/converters';

type WalletBalanceListProps = {
  wallet: API.Wallets.Wallet | null;
  cryptoList: API.List.Crypto[];
  chains: API.List.Chains[];
  className?: string;
  selectedWalletBalanceCurrency: string;
};

const WalletBalanceList: FC<WalletBalanceListProps> = (props) => {
  const { wallet, cryptoList, chains, className, selectedWalletBalanceCurrency } = props;
  // const cryptoListWithBalance = cryptoList.map((crypto) => {
  //   const balance = wallet?.balance.find((walletBalance) => walletBalance.crypto.uuid === crypto.uuid);
  //   return { ...crypto, balance: balance?.amount || null };
  // });

  // const filteredCryptoList = cryptoListWithBalance.filter((crypto) => crypto.balance !== null);

  return (
    <section className={cn(className, 'flex h-full flex-grow flex-col gap-4')}>
      {wallet?.balance.map((crypto, index) => (
        <CryptoInfo key={index} crypto={crypto} fiatSymbol={selectedWalletBalanceCurrency} />
      ))}
      {!wallet?.balance.length && (
        <EmptyState
          darkImage={cryptoEmptyStateDark}
          lightImage={cryptoEmptyStateLight}
          title="No crypto yet"
          description={'Buy USDT, Bitcoin, Ethereum \nand other crypto easily.'}
        />
      )}
    </section>
  );
};

export default WalletBalanceList;
