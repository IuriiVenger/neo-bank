import cn from 'classnames';
import { FC } from 'react';

import { API } from '@/api/types';
import CurrencyInfo from '@/components/Currency/CurrencyInfo';
import { roundToDecimals } from '@/utils/converters';

type WalletBalanceListProps = {
  wallet: API.Wallets.Wallet | null;
  cryptoList: API.List.Crypto[];
  chains: API.List.Chains[];
  className?: string;
};

const WalletBalanceList: FC<WalletBalanceListProps> = (props) => {
  const { wallet, cryptoList, chains, className } = props;
  const cryptoListWithBalance = cryptoList.map((crypto) => {
    const balance = wallet?.balance.find((walletBalance) => walletBalance.crypto.uuid === crypto.uuid);
    return { ...crypto, balance: balance?.amount || null };
  });

  const filteredCryptoList = cryptoListWithBalance.filter((crypto) => crypto.balance !== null);

  return (
    <section className={cn(className, 'flex flex-col')}>
      <h3 className="mb-4 hidden text-xl font-bold md:inline">Wallet crypto balance</h3>
      <div className="flex flex-col gap-2">
        {filteredCryptoList.map((crypto) => (
          <section key={crypto.uuid} className="flex items-center justify-between gap-4">
            <CurrencyInfo hideShevron key={crypto.uuid} currency={crypto} chains={chains} />
            <p className="font-medium text-gray-500">{crypto.balance ? roundToDecimals(crypto.balance, 2) : 0}</p>
          </section>
        ))}
        {!filteredCryptoList.length && <p className="text-gray-500">Your balance is empty</p>}
      </div>
    </section>
  );
};

export default WalletBalanceList;
