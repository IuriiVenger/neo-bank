import cn from 'classnames';
import { FC, useEffect, useMemo, useState } from 'react';

import { DashboardProps } from '../../Dashboard';

import ConfirmModal from '../ConfirmModal';

import CardDetailsStep, { CardDetailsStepProps } from './steps/CardDetailsStep';
import CardFormFactorStep, { CardFormFactorStepProps } from './steps/CardFormFactorStep';

import CardProgramStep, { CardProgramStepProps } from './steps/CardProgramStep';
import CardSusccessStep from './steps/CardSuccessStep';
import CardTypeStep, { CardTypeStepProps } from './steps/CardTypeStep';

import { API } from '@/api/types';

import MainModal from '@/components/modals/MainModal';

import { CardFormFactor, cardFormFactorsData, CardType, cardTypeData } from '@/constants';
import { useRequestStatus } from '@/hooks/useRequestStatus';

type CreateCardModalProps = DashboardProps & {
  className?: string;
  setIsModalOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  onCardCreate?: (card_id: string) => void;
};

enum CreateCardSteps {
  FORM_FACTOR = 'form_factor',
  TYPE = 'type',
  PROGRAM = 'program',
  DETAILS = 'details',
  SUCCESS = 'success',
}

type CreateCartStepsMap = {
  [key in CreateCardSteps]: {
    title?: string;
    subtitle?: string;
    Component: FC<any>;
    mainButtonText: string;
    onMainButtonClick: () => void;
    onBackButtonClick?: () => void;
    isDisabled?: boolean;
  };
};

type CreateCardStepsProps = CardDetailsStepProps & CardProgramStepProps & CardTypeStepProps & CardFormFactorStepProps;

const getCardTypesData = (programs: API.Cards.CardConfig[]) => {
  const types = programs.map((program) => ({
    title: cardTypeData[program.type].title,
    value: program.type as CardType,
  }));

  return types;
};

const getCardFormFactorsData = (programs: API.Cards.CardConfig[]) => {
  const formFactors = programs.map((program) => ({
    title: cardFormFactorsData[program.form_factor].title,
    description: program.allowed_currencies.join(', '),
    value: program.form_factor as CardFormFactor,
  }));

  return formFactors;
};

const CreateCardModal: FC<CreateCardModalProps> = (props) => {
  const { bins, createCard, selectedWallet, className, setIsModalOpen, isOpen, onCardCreate } = props;

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<API.Cards.CardConfig | null>(null);

  const [topUpConfirmationText, setTopUpConfirmationText] = useState<string | null>(null);
  const [requestStatuses, setPending, setFullfilled, setRejected] = useRequestStatus();

  const [cardFormFactor, setCardFormFactor] = useState<CardFormFactor | null>(null);
  const [cardType, setCardType] = useState<CardType | null>(null);
  const [currentStep, setCurrentStep] = useState<CreateCardSteps>(CreateCardSteps.FORM_FACTOR);
  const [cardName, setCardName] = useState<string | null>(null);
  const [cardholderName, setCardholderName] = useState<string | null>(null);

  const availablePrograms = useMemo(() => {
    if (currentStep === CreateCardSteps.FORM_FACTOR) {
      return bins;
    }

    if (currentStep === CreateCardSteps.TYPE) {
      return bins.filter((program) => cardFormFactor === program.form_factor);
    }

    if (currentStep === CreateCardSteps.PROGRAM) {
      return bins.filter((program) => cardType === program.type && cardFormFactor === program.form_factor);
    }

    return bins.filter(
      (program) =>
        cardType === program.type && cardFormFactor === program.form_factor && selectedProgram?.id === program.id,
    );
  }, [currentStep, bins, cardFormFactor, cardType, selectedProgram]);

  const cardTypes = useMemo(() => getCardTypesData(availablePrograms), [availablePrograms]);
  const cardFormFactors = useMemo(() => getCardFormFactorsData(availablePrograms), [availablePrograms]);

  const openConfirmationModal = () => {
    if (!cardFormFactor || !cardType || !selectedProgram || !cardName || !cardholderName) {
      return;
    }
    const confirmationText = `Are you sure you want to create ${cardFormFactorsData[
      cardFormFactor
    ].shortTitle.toLowerCase()} ${selectedProgram.brand}  ${cardTypeData[cardType].shortTitle.toLowerCase()} card?`;
    setTopUpConfirmationText(confirmationText);
    setIsConfirmationModalOpen(true);
  };

  const stepsProps: CreateCardStepsProps = {
    cardFormFactor,
    setCardFormFactor,
    cardFormFactors,
    cardTypes,
    cardType,
    setCardType,
    availablePrograms,
    selectedProgram,
    setSelectedProgram,
    cardName,
    setCardName,
    cardholderName,
    setCardholderName,
  };

  const createCardHandler = async () => {
    if (!selectedWallet.data || !selectedProgram || !cardName || !cardholderName) {
      return;
    }

    console.log('selectedProgram', selectedProgram);

    const requestData: API.Cards.Create.Request = {
      program_id: selectedProgram.id,
      name_on_card: cardholderName,
      nick_name: cardName,
      wallet_id: selectedWallet.data.uuid,
      purpose: selectedProgram.purposes[0],
      request_id: crypto.randomUUID(),
    };

    try {
      setPending();
      const { data } = await createCard(requestData);
      onCardCreate && onCardCreate(data.card_id);
      setCurrentStep(CreateCardSteps.SUCCESS);
      setFullfilled();
    } catch (error) {
      setRejected();
      throw error;
    }
  };

  const onClose = () => {
    setCurrentStep(CreateCardSteps.FORM_FACTOR);
    setCardFormFactor(null);
    setCardType(null);
    setSelectedProgram(null);
  };

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [isOpen]);

  const createCardStepsMap: CreateCartStepsMap = {
    [CreateCardSteps.FORM_FACTOR]: {
      title: 'Create card',
      subtitle: 'Please select the card form factor',
      Component: CardFormFactorStep,
      mainButtonText: 'Next',
      onMainButtonClick: () => setCurrentStep(CreateCardSteps.TYPE),
      isDisabled: !cardFormFactor,
    },
    [CreateCardSteps.TYPE]: {
      title: 'Create card',
      subtitle: 'Please select the card type',
      Component: CardTypeStep,
      mainButtonText: 'Next',
      onMainButtonClick: () => setCurrentStep(CreateCardSteps.PROGRAM),
      onBackButtonClick: () => setCurrentStep(CreateCardSteps.FORM_FACTOR),
      isDisabled: !cardType,
    },
    [CreateCardSteps.PROGRAM]: {
      title: 'Create card',
      subtitle: 'Please select the card program',
      Component: CardProgramStep,
      mainButtonText: 'Next',
      onMainButtonClick: () => setCurrentStep(CreateCardSteps.DETAILS),
      onBackButtonClick: () => setCurrentStep(CreateCardSteps.TYPE),
      isDisabled: !selectedProgram,
    },
    [CreateCardSteps.DETAILS]: {
      title: 'Create card',
      subtitle: 'Please enter card details',
      Component: CardDetailsStep,
      mainButtonText: 'Create card',
      onMainButtonClick: openConfirmationModal,
      onBackButtonClick: () => setCurrentStep(CreateCardSteps.PROGRAM),
      isDisabled: !cardName || !cardholderName,
    },
    [CreateCardSteps.SUCCESS]: {
      Component: CardSusccessStep,
      mainButtonText: 'Close',
      onMainButtonClick: onClose,
    },
  };

  const ActiveStep = createCardStepsMap[currentStep].Component;

  return (
    <>
      <MainModal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={setIsModalOpen}
        confirmButtonDisabled={createCardStepsMap[currentStep].isDisabled}
        backdrop="opaque"
        scrollBehavior="inside"
        nativeCloseButton
        confirmButtonText={createCardStepsMap[currentStep].mainButtonText}
        onConfirm={createCardStepsMap[currentStep].onMainButtonClick}
        isLoading={requestStatuses.PENDING}
        className=" md:h-[750px]"
      >
        <div className={cn('flex flex-col gap-4', className)}>
          <h3 className="text-3xl">{createCardStepsMap[currentStep].title}</h3>
          <p className="text-foreground-2">{createCardStepsMap[currentStep].subtitle}</p>
          <div className="mt-6">
            <ActiveStep {...stepsProps} />
          </div>
        </div>
      </MainModal>
      <ConfirmModal
        isOpen={isConfirmationModalOpen}
        setIsModalOpen={setIsConfirmationModalOpen}
        onConfirm={createCardHandler}
        title="Create card confirmation"
        confirmText={topUpConfirmationText}
      />
    </>
  );
};

export default CreateCardModal;
