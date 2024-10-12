import { cn } from '@nextui-org/react';
import { FC } from 'react';

import CryptoInfo from './ui/CryptoInfo';

import EmptyState from './ui/EmptyState';

import { API } from '@/api/types';
import cryptoEmptyStateDark from '@/assets/svg/theme-illustrations/dark/crypto-empty-state.svg';
import cryptoEmptyStateLight from '@/assets/svg/theme-illustrations/light/crypto-empty-state.svg';
import { StoreDataWithStatus } from '@/store/types';
import { getCoinListlWithAmount } from '@/utils/financial';

type CoinListProps = {
  className?: string;
  cryptoBySymbol: API.List.CryptoBySymbol[];
  selectedWallet: StoreDataWithStatus<API.Wallets.ExtendWallet | null>;
  selectedWalletBalanceCurrency: string;
  onCoinClick?: (symbol: string) => void;
  hideEmptyBalance?: boolean;
  isTable?: boolean;
};

type CryptoBySymbolWithBalance = {
  crypto: Omit<API.Wallets.WalletBalanceItem, 'details'> & { amount: number };
  currencyName: string;
};

const CoinList: FC<CoinListProps> = (props) => {
  const {
    cryptoBySymbol,
    selectedWallet,
    selectedWalletBalanceCurrency,
    className,
    onCoinClick,
    hideEmptyBalance,
    isTable,
  } = props;

  const cryptoBySymbolWithBalance: CryptoBySymbolWithBalance[] = getCoinListlWithAmount(
    cryptoBySymbol,
    selectedWallet.data,
    hideEmptyBalance,
  );

  const handleCurrencyClick = (symbol: string) => () => onCoinClick && onCoinClick(symbol);

  return !cryptoBySymbolWithBalance.length ? (
    <EmptyState
      darkImage={cryptoEmptyStateDark}
      lightImage={cryptoEmptyStateLight}
      title="No crypto yet"
      description={'Buy USDT, Bitcoin, Ethereum \nand other crypto easily.'}
    />
  ) : (
    <div className={cn(className, 'flex flex-col justify-between gap-4')}>
      {cryptoBySymbolWithBalance.map((crypto, index) => (
        <CryptoInfo
          className="hover:opacity-hover"
          isTable={isTable}
          onCurrencyClick={handleCurrencyClick(crypto.crypto.symbol)}
          hideEmptyBalance
          key={index}
          {...crypto}
          fiatSymbol={selectedWalletBalanceCurrency}
        />
      ))}
    </div>
  );
};

export default CoinList;
