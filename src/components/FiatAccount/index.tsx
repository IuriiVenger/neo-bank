import { FC } from 'react';

import { roundToDecimals } from '../../utils/converters';
import { DashboardProps } from '../Dashboard';
import CardsList from '../Dashboard/tabs/MainTab/CardsList';

import { FiatAccountsWithCards } from '@/store/types';

type FiatAccountProps = {
  fiat_account: FiatAccountsWithCards;
  bins: DashboardProps['bins'];
  onCardClick: (card_id: string) => void;
  onSeeDetailsClick: (fiat_account_id: string) => void;
  loadMoreFiatAccountCards: DashboardProps['loadMoreFiatAccountCards'];
};

const FiatAccount: FC<FiatAccountProps> = (props) => {
  const { fiat_account, bins, onCardClick, onSeeDetailsClick, loadMoreFiatAccountCards } = props;
  const { cards, total_balance } = fiat_account;

  const program = bins.find((bin) => bin.id === fiat_account.program_id);
  const seeDetailsClickHandler = (fiat_account_id: string) => () => onSeeDetailsClick(fiat_account_id);
  const loadMoreCards = () => loadMoreFiatAccountCards(fiat_account.id);

  return (
    <div>
      <div className="px-4">
        <div className="flex justify-between">
          <h2 className="text-xl lg:text-2xl">
            {fiat_account.fiat.symbol}
            {roundToDecimals(total_balance)}
          </h2>
          <button
            type="button"
            className="text-foreground-2 text-sm hover:opacity-hover"
            onClick={seeDetailsClickHandler(fiat_account.id)}
          >
            See details
          </button>
        </div>
        <p className="text-foreground-2 text-sm">{program?.name}</p>
      </div>
      <CardsList
        openCreateCardModal={() => console.log('openCreateCardModal')}
        cards={cards}
        cardsOnly
        cardSize="xs"
        scrollContainerClassName="gap-1.5"
        smallPaddings
        hideCardInfo
        loadMoreCards={loadMoreCards}
        openKYC={() => console.log('openKYC')}
        onCardClick={onCardClick}
        horizontalEmptyState
      />
    </div>
  );
};

export default FiatAccount;
