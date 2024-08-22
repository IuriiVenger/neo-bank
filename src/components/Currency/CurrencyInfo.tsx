import { Badge, Chip } from '@nextui-org/react';
import cn from 'classnames';
import Image from 'next/image';
import { FC } from 'react';

import { HiOutlineSelector } from 'react-icons/hi';

import { API } from '@/api/types';

import { getCurrencyIconSrc, isCrypto, isFiat } from '@/utils/financial';

type CurrencyInfoProps = {
  currency: API.List.Crypto | API.List.Fiat | API.List.Chains;
  chains?: API.List.Chains[];

  hideShevron?: boolean;
  onCurrencyClick?: () => void;
  className?: string;
  currencyTitleClassname?: string;
  minValue?: number;
};

const CurrencyInfo: FC<CurrencyInfoProps> = (props) => {
  const { currency, onCurrencyClick, hideShevron, className, currencyTitleClassname, minValue, chains } = props;
  const currencyName = isFiat(currency) ? currency.code : currency.name;

  const cryptoCurrencyChain = chains && isCrypto(currency) && chains.find((chain) => chain.id === currency.chain);

  const chainIcon = cryptoCurrencyChain && getCurrencyIconSrc(cryptoCurrencyChain);

  return (
    <div className={cn(className, 'flex shrink-0 items-center gap-2')}>
      <Badge
        className="border-none bg-none p-0"
        content={chainIcon && <Image className="h-4 w-4" height={32} width={32} alt="" src={chainIcon} />}
      >
        <Image
          className="h-9 w-9 rounded-full object-cover"
          src={getCurrencyIconSrc(currency)}
          alt="currency label"
          height={72}
          width={72}
        />
      </Badge>
      <div className="text-left">
        <button
          className={cn(currencyTitleClassname, 'flex items-center gap-1 text-xl font-bold')}
          type="button"
          onClick={onCurrencyClick}
        >
          <span>{currencyName}</span> {!hideShevron && <HiOutlineSelector className="text-sm text-gray-500" />}
          {cryptoCurrencyChain && (
            <Chip size="sm" radius="sm" className="-mt-1 h-4 py-2 text-[8px]">
              {cryptoCurrencyChain.name}
            </Chip>
          )}
        </button>
        <p className="!p-0 text-xs">
          {currency.symbol} {!!minValue && `(min ${minValue})`}
        </p>
      </div>
    </div>
  );
};

export default CurrencyInfo;
