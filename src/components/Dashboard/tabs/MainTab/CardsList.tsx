import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';

import 'react-indiana-drag-scroll/dist/style.css';

import { RiAddFill, RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import ScrollContainer from 'react-indiana-drag-scroll';

import ReactVisibilitySensor from 'react-visibility-sensor';

import { DashboardProps } from '../..';

import cardsEmptyStateDark from '@/assets/svg/theme-illustrations/dark/card-empty-state.svg';
import cardsEmptyStateLight from '@/assets/svg/theme-illustrations/light/card-empty-state.svg';
import CreateCardModal from '@/components/modals/CreateCardModal';
import Card, { CardSizes } from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import { KYCStatuses, RequestStatus } from '@/constants';

import { deleteDash } from '@/utils/converters';

export type CardsListProps = DashboardProps & {
  onCardClick: (card_id: string) => void;
  className?: string;
  cardSize?: CardSizes;
};

const CardsList: FC<CardsListProps> = (props) => {
  const {
    cards,
    onCardClick,
    loadSelectedWalletCards,
    loadMoreCards,
    openKYC,
    verificationStatus,
    className,
    cardSize,
  } = props;
  const { data, status, meta } = cards;
  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false);
  const scrollContainer = useRef<HTMLElement>(null);
  const scrollContainerScrollStep =
    cards.data?.length && scrollContainer.current?.scrollWidth
      ? scrollContainer.current.scrollWidth / cards.data.length
      : 0;

  const [scrollAvailiblity, setScrollAvailiblity] = useState({
    isLeftScrollAvailible: false,
    isRightScrollAvailible: false,
  });
  const [isEndCardsListVisible, setIsEndCardsListVisible] = useState(false);

  const isRequestPending = status === RequestStatus.PENDING;
  const isFirstItemsLoading = isRequestPending && !data?.length;
  const isLoadMoreAvailible = !meta.isLastPage;

  const onContainerResizeAndScroll = () => {
    if (scrollContainer.current) {
      setScrollAvailiblity({
        isLeftScrollAvailible: scrollContainer.current.scrollLeft > 0,
        isRightScrollAvailible:
          scrollContainer.current.scrollWidth - scrollContainer.current.clientWidth >
          scrollContainer.current.scrollLeft,
      });
    }
  };

  const openCreateCardModal = () => {
    setIsCreateCardModalOpen(true);
  };

  const createCardButtonClickHandler = () => {
    verificationStatus === KYCStatuses.APPROVED ? openCreateCardModal() : openKYC();
  };

  const onCardCreate = (card_id: string) => {
    onCardClick(card_id);
    loadSelectedWalletCards();
  };

  useEffect(() => {
    if (!isFirstItemsLoading) {
      onContainerResizeAndScroll();
    }
  }, [isFirstItemsLoading, data]);

  useEffect(() => {
    if (isEndCardsListVisible && isLoadMoreAvailible) {
      loadMoreCards();
    }
  }, [isEndCardsListVisible]);

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: scrollContainerScrollStep, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollBy({ left: -scrollContainerScrollStep, behavior: 'smooth' });
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3 px-4 lg:px-8">
        <h2 className="text-xl lg:text-2xl">Cards</h2>
        <Button
          onClick={createCardButtonClickHandler}
          radius="full"
          isIconOnly
          color="secondary"
          className="h-6 w-6 min-w-6 flex-grow-0 text-2xl"
        >
          <RiAddFill />
        </Button>

        <div className="hidden flex-grow justify-end gap-2 lg:flex">
          <button
            disabled={!scrollAvailiblity.isLeftScrollAvailible}
            type="button"
            className={cn('text-2xl', !scrollAvailiblity.isLeftScrollAvailible && 'opacity-50')}
            onClick={scrollLeft}
          >
            <RiArrowLeftSLine />
          </button>
          <button
            disabled={!scrollAvailiblity.isRightScrollAvailible}
            type="button"
            className={cn('text-2xl', !scrollAvailiblity.isRightScrollAvailible && 'opacity-50')}
            onClick={scrollRight}
          >
            <RiArrowRightSLine />
          </button>
        </div>
      </div>
      <ScrollContainer
        className="flex min-h-40 gap-6 px-4 py-5 lg:h-60 lg:px-8 lg:pt-6"
        ref={scrollContainer as any}
        onScroll={onContainerResizeAndScroll}
      >
        {!isFirstItemsLoading && data ? (
          <>
            {!data.length && (
              <EmptyState
                darkImage={cardsEmptyStateDark}
                lightImage={cardsEmptyStateLight}
                title={
                  <div className="flex items-center gap-1">
                    Order your first card <RiArrowRightSLine className="text-lg hover:opacity-hover" />
                  </div>
                }
                description="Top up and manage crypto easily by our cards"
                onTitleClick={createCardButtonClickHandler}
              />
            )}
            {data.map((card, index) => (
              <button
                key={`${card.card_id}_${index}`}
                type="button"
                onClick={() => onCardClick(card.card_id)}
                className={cn(
                  'cursor-pointer transition-all hover:opacity-hover',
                  card.card_status !== 'ACTIVE' && 'grayscale',
                )}
              >
                <Card
                  className="mt-2"
                  color="blue"
                  size={cardSize}
                  provider={card.brand}
                  cardNumber={deleteDash(card.card_number)}
                  CVV="***"
                  expirationDate="**/**"
                  masked
                />
              </button>
            ))}
            {isLoadMoreAvailible && (
              <ReactVisibilitySensor onChange={setIsEndCardsListVisible}>
                <div className="m-auto w-fit flex-shrink-0">
                  <Loader />
                </div>
              </ReactVisibilitySensor>
            )}
          </>
        ) : (
          <Loader />
        )}
      </ScrollContainer>
      <CreateCardModal
        isOpen={isCreateCardModalOpen}
        setIsModalOpen={setIsCreateCardModalOpen}
        onCardCreate={onCardCreate}
        {...props}
      />
    </div>
  );
};

export default CardsList;
