import { Dispatch, FC, SetStateAction, useCallback } from 'react';

import Card from '@/components/ui/Card';
import CustomOption from '@/components/ui/CustomOption';
import { CardFormFactor } from '@/constants';

export type CardFormFactorStepProps = {
  cardFormFactor: CardFormFactor | null;
  setCardFormFactor: Dispatch<SetStateAction<CardFormFactor | null>>;
  cardFormFactors: Array<{
    title: string;
    description: string;
    value: CardFormFactor;
  }>;
};

const CardFormFactorStep: FC<CardFormFactorStepProps> = (props) => {
  const { cardFormFactor, setCardFormFactor, cardFormFactors } = props;

  const onCardFormFactorClick = useCallback(
    (value: boolean, key: string) => {
      if (value && key in CardFormFactor) {
        setCardFormFactor(key as CardFormFactor);
      }
    },
    [setCardFormFactor],
  );

  return (
    <div className="flex flex-col gap-12">
      <Card provider="Visa" size="md" className=" self-center" />
      <div className="flex flex-col gap-3">
        {cardFormFactors.map(({ value, title, description }) => (
          <CustomOption
            key={value}
            title={title}
            description={description}
            type="radio"
            isChecked={cardFormFactor === value}
            onChange={onCardFormFactorClick}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};

export default CardFormFactorStep;
