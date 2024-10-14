import { FC } from 'react';

import { roundToDecimals } from '../../utils/converters';
import { DashboardProps } from '../Dashboard';
import CardsList from '../Dashboard/tabs/MainTab/CardsList';

import { FiatAccountsWithCards } from '@/store/types';

type FiatAccountProps = {
  fiat_account: FiatAccountsWithCards;
  bins: DashboardProps['bins'];
  onCardClick: (card_id: string) => void;
};

const FiatAccount: FC<FiatAccountProps> = ({ fiat_account, bins, onCardClick }) => {
  const { cards, total_balance } = fiat_account;

  const program = bins.find((bin) => bin.id === fiat_account.program_id);
  const loadMoreFiatAccountCards = () => console.log(123);

  return (
    <div>
      <div className="px-4">
        <div className="flex justify-between">
          <h2 className="text-xl lg:text-2xl">
            {fiat_account.fiat.symbol}
            {roundToDecimals(total_balance)}
          </h2>
          <button type="button" className="text-foreground-2 text-sm hover:opacity-hover">
            See details
          </button>
        </div>
        <p className="text-foreground-2 text-sm">{program?.name}</p>
      </div>
      <CardsList
        openCreateCardModal={loadMoreFiatAccountCards}
        cards={cards}
        cardsOnly
        cardSize="xs"
        scrollContainerClassName="gap-1.5"
        smallPaddings
        hideCardInfo
        loadMoreCards={loadMoreFiatAccountCards}
        openKYC={loadMoreFiatAccountCards}
        onCardClick={onCardClick}
        horizontalEmptyState
      />
    </div>
  );
};

export default FiatAccount;
