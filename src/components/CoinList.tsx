import { cn } from '@nextui-org/react';
import { FC } from 'react';

import CryptoInfo from './ui/CryptoInfo';

import { API } from '@/api/types';
import { StoreDataWithStatus } from '@/store/types';
import { getCoinListlWithAmount } from '@/utils/financial';

type CoinListProps = {
  className?: string;
  cryptoBySymbol: API.List.CryptoBySymbol[];
  selectedWallet: StoreDataWithStatus<API.Wallets.ExtendWallet | null>;
  selectedWalletBalanceCurrency: string;
  onCoinClick?: (symbol: string) => void;
};

type CryptoBySymbolWithBalance = {
  crypto: Omit<API.Wallets.WalletBalanceItem, 'details'> & { amount: number };
  currencyName: string;
};

const CoinList: FC<CoinListProps> = (props) => {
  const { cryptoBySymbol, selectedWallet, selectedWalletBalanceCurrency, className, onCoinClick } = props;

  const cryptoBySymbolWithBalance: CryptoBySymbolWithBalance[] = getCoinListlWithAmount(
    cryptoBySymbol,
    selectedWallet.data,
  );

  const handleCurrencyClick = (symbol: string) => () => onCoinClick && onCoinClick(symbol);

  return (
    <div className={cn(className, 'flex flex-col justify-between gap-4')}>
      {cryptoBySymbolWithBalance.map((crypto, index) => (
        <CryptoInfo
          className="hover:opacity-hover"
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
