import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

import { DashboardProps } from '../..';

import CardDetail from './CardDetail';
import CardsList from './CardsList';

import { API } from '@/api/types';
import Loader from '@/components/ui/Loader';
import { CardsTabMode, RequestStatus } from '@/constants';
import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { StoreDataWithStatus, StoreDataWithStatusAndMeta } from '@/store/types';

export type CardsTabProps = DashboardProps & {
  className?: string;
  selectedCard: StoreDataWithStatus<API.Cards.CardDetailItem | null>;
  selectedCardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  createInternalTopUpOrder: (requestData: API.Orders.VCards.Topup.Internal.Request) => Promise<void | null>;
  externalCalcData: UseExternalCalcData;
};

type ActiveCardMode = {
  [key in keyof typeof CardsTabMode]: boolean;
};

const CardsTab: FC<CardsTabProps> = (props) => {
  const { className, cards, selectedCard, activeCardId, changeActiveCard } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const cardTabMode = activeCardId ? CardsTabMode.CARD_DETAIL : CardsTabMode.LIST;

  const activeCardMode: ActiveCardMode = Object.entries(CardsTabMode).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value === cardTabMode }),
    {} as ActiveCardMode,
  );

  const isFirstCardsListLoading = cards.status === RequestStatus.PENDING && !cards.data?.length;

  const isPending = isFirstCardsListLoading || selectedCard.status === RequestStatus.PENDING;

  const setActiveCard = (card_id: string | null) => {
    changeActiveCard(card_id);
  };

  useEffect(() => {
    if (containerRef.current && !isPending && !isVisible) {
      const htmlElement = document.documentElement;
      const originalScrollBehavior = htmlElement.style.scrollBehavior;
      htmlElement.style.scrollBehavior = 'auto';
      containerRef.current.scrollIntoView({ behavior: 'instant', block: 'start' });
      htmlElement.style.scrollBehavior = originalScrollBehavior;
    }
  }, [isPending]);

  return (
    <section className={cn(className, 'flex h-full min-h-44 scroll-mt-24 items-center')} ref={containerRef}>
      <VisibilitySensor onChange={setIsVisible}>
        <div className="h-1 w-1" />
      </VisibilitySensor>
      {isPending ? (
        <Loader />
      ) : (
        <>
          {/* {activeCardMode.LIST && <CardsList onCardClick={setActiveCard} {...props} />} */}
          {activeCardMode.CARD_DETAIL && selectedCard.data && (
            <CardDetail card={selectedCard.data} setCardTabMode={() => setActiveCard(null)} {...props} />
          )}
        </>
      )}
    </section>
  );
};

export default CardsTab;
