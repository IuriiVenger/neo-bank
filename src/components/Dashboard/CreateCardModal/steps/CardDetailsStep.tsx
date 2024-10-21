import { Dispatch, FC, SetStateAction, useCallback } from 'react';

import CustomInput from '@/components/ui/CustomInput';

export type CardDetailsStepProps = {
  cardName: string | null;
  setCardName: Dispatch<SetStateAction<string | null>>;
  // cardholderName: string | null; hide cardholder name
  // setCardholderName: Dispatch<SetStateAction<string | null>>; hide cardholder name
};

const CardDetailsStep: FC<CardDetailsStepProps> = (props) => {
  const {
    cardName,
    // cardholderName,  hide cardholder name
    setCardName,
    // setCardholderName,  hide cardholder name
  } = props;

  const onCardNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCardName(e.target.value);
    },
    [setCardName],
  );

  // const onCardholderNameChange = useCallback( hide cardholder name
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setCardholderName(e.target.value);
  //   },
  //   [setCardholderName],
  // );

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
        {/* <CustomInput hide cardholder name
          isCustomBordered
          label="Cardholder name"
          value={cardholderName || ''}
          onChange={onCardholderNameChange}
          placeholder="Enter cardholder name"
          size="lg"
          radius="md"
        /> */}
      </div>
    </div>
  );
};

export default CardDetailsStep;
