import { Dispatch, FC, SetStateAction, useCallback } from 'react';

import CustomInput from '@/components/ui/CustomInput';

export type CardDetailsStepProps = {
  cardName: string | null;
  setCardName: Dispatch<SetStateAction<string | null>>;
  cardholderName: string | null;
  setCardholderName: Dispatch<SetStateAction<string | null>>;
};

const CardDetailsStep: FC<CardDetailsStepProps> = (props) => {
  const { cardName, cardholderName, setCardName, setCardholderName } = props;

  const onCardNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardName(e.target.value);
    },
    [setCardName],
  );

  const onCardholderNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardholderName(e.target.value);
    },
    [setCardholderName],
  );

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-3 ">
        <CustomInput
          isCustomBordered
          label="Card name"
          placeholder="Enter card name"
          className="group"
          value={cardName || ''}
          onChange={onCardNameChange}
          size="lg"
          radius="md"
        />
        <CustomInput
          isCustomBordered
          label="Cardholder name"
          value={cardholderName || ''}
          onChange={onCardholderNameChange}
          placeholder="Enter cardholder name"
          size="lg"
          radius="md"
        />
      </div>
    </div>
  );
};

export default CardDetailsStep;
