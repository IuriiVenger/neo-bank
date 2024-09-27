import { FC } from 'react';

import { API } from '@/api/types';
import CoinList from '@/components/CoinList';
import { StoreDataWithStatus } from '@/store/types';

export type ChooseCoinStepProps = {
  className?: string;
  cryptoBySymbol: API.List.CryptoBySymbol[];
  selectedWallet: StoreDataWithStatus<API.Wallets.ExtendWallet | null>;
  onCoinClick: (symbol: string) => void;
  selectedWalletBalanceCurrency: string;
};

const ChooseCoinStep: FC<ChooseCoinStepProps> = ({ onCoinClick, ...otherProps }) => (
  <CoinList hideEmptyBalance onCoinClick={onCoinClick} {...otherProps} />
);

export default ChooseCoinStep;
