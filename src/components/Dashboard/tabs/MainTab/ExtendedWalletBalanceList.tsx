import cn from 'classnames';
import { FC } from 'react';

import { API } from '@/api/types';
import cryptoEmptyStateDark from '@/assets/svg/theme-illustrations/dark/crypto-empty-state.svg';
import cryptoEmptyStateLight from '@/assets/svg/theme-illustrations/light/crypto-empty-state.svg';

import CryptoInfo from '@/components/ui/CryptoInfo';
import EmptyState from '@/components/ui/EmptyState';

type ExtendedWalletBalanceListProps = {
  wallet: API.Wallets.Wallet | null;
  className?: string;
  selectedWalletBalanceCurrency: string;
};

const ExtendedWalletBalanceList: FC<ExtendedWalletBalanceListProps> = (props) => {
  const { wallet, className, selectedWalletBalanceCurrency } = props;

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

export default ExtendedWalletBalanceList;
