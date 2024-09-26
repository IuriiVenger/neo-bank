import { Dispatch, FC, SetStateAction, useCallback } from 'react';

import Card from '@/components/ui/Card';
import CustomOption from '@/components/ui/CustomOption';
import { CardType } from '@/constants';

export type CardTypeStepProps = {
  cardType: CardType | null;
  setCardType: Dispatch<SetStateAction<CardType | null>>;
  cardTypes: Array<{
    title: string;
    description: string;
    value: CardType;
  }>;
};

const CardTypeStep: FC<CardTypeStepProps> = (props) => {
  const { cardType, setCardType, cardTypes } = props;

  const onCardTypeClick = useCallback(
    (value: boolean, key: string) => {
      if (value && key in CardType) {
        setCardType(key as CardType);
      }
    },
    [setCardType],
  );

  return (
    <div className="flex flex-col gap-12">
      <Card provider="Visa" size="md" className=" self-center" />
      <div className="flex flex-col gap-3">
        {cardTypes.map(({ value, title, description }) => (
          <CustomOption
            key={value}
            title={title}
            description={description}
            type="radio"
            isChecked={cardType === value}
            onChange={onCardTypeClick}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};

export default CardTypeStep;
