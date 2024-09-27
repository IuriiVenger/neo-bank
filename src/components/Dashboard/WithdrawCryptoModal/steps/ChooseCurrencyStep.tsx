import { FC } from 'react';

import { API } from '@/api/types';

import CurrenciesList from '@/components/CurrencyList';
import { WithOptionalAmount } from '@/types';

export type ChooseCurrencyStepProps = {
  chains: API.List.Chains[];
  currencies: WithOptionalAmount<API.List.Crypto>[];
  activeCurrency: API.List.Crypto | null;
  onCurrencyClick?: (currency: API.List.Crypto | API.List.Fiat | API.List.Chains) => void;
};

const ChooseCurrencyStep: FC<ChooseCurrencyStepProps> = ({ onCurrencyClick, ...otherProps }) => (
  <CurrenciesList handleCurrencyClick={onCurrencyClick} {...otherProps} />
);

export default ChooseCurrencyStep;
