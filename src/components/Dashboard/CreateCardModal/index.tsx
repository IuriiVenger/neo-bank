import cn from 'classnames';
import { FC, useEffect, useMemo, useState } from 'react';

import CardDetailsStep, { CardDetailsStepProps } from './steps/CardDetailsStep';
import CardFormFactorStep, { CardFormFactorStepProps } from './steps/CardFormFactorStep';

import CardProgramStep, { CardProgramStepProps } from './steps/CardProgramStep';
import CardSusccessStep from './steps/CardSuccessStep';
import CardTypeStep, { CardTypeStepProps } from './steps/CardTypeStep';

import { API } from '@/api/types';
import { DashboardProps } from '@/components/Dashboard';
import ConfirmModal from '@/components/modals/ConfirmModal';

import MainModal from '@/components/modals/MainModal';

import { CardFormFactor, cardFormFactorsData, CardType, cardTypeData } from '@/constants';

import { useRequestStatus } from '@/hooks/useRequestStatus';
import { TitleDescriptionValue } from '@/types';

type CreateCardModalProps = {
  className?: string;
  setIsModalOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  onCardCreate?: (card_id: string) => void;
  bins: DashboardProps['bins'];
  selectedWallet: DashboardProps['selectedWallet'];
  createCard: DashboardProps['createStandAloneCard'];
  fiatList: DashboardProps['fiatList'];
};

enum CreateCardSteps {
  FORM_FACTOR = 'form_factor',
  TYPE = 'type',
  PROGRAM = 'program',
  DETAILS = 'details',
  SUCCESS = 'success',
}
type CreateCardStepsProps = CardDetailsStepProps & CardProgramStepProps & CardTypeStepProps & CardFormFactorStepProps;

type CreateCartStepsMap = {
  [key in CreateCardSteps]: {
    title?: string;
    subtitle?: string;
    Component: FC<CreateCardStepsProps>;
    mainButtonText: string;
    onMainButtonClick: () => void;
    onBackButtonClick?: () => void;
    isDisabled?: boolean;
  };
};

type FormFactorsMap = { [key: string]: TitleDescriptionValue<string, string, CardFormFactor> };
type CardTypesMap = { [key: string]: TitleDescriptionValue<string, string, CardType> };

const getCardTypesData = (programs: API.Cards.CardConfig[], fiatList: API.List.Fiat[]) => {
  const types = programs.reduce((acc: CardTypesMap, program) => {
    const programBaseFiatCode = fiatList.find((item) => item.uuid === program.base_currency)?.code;
    if (acc[program.type]) {
      programBaseFiatCode &&
        !acc[program.type].description.includes(programBaseFiatCode) &&
        (acc[program.type].description += `, ${programBaseFiatCode}`);
    } else {
      acc[program.type] = {
        title: cardTypeData[program.type].title,
        description: programBaseFiatCode || '',
        value: program.type,
      };
    }

    return acc;
  }, {});

  return Object.values(types);
};

const getCardFormFactorsData = (programs: API.Cards.CardConfig[], fiatList: API.List.Fiat[]) => {
  const formFactorsMap = programs.reduce((acc: FormFactorsMap, program) => {
    const programBaseFiatCode = fiatList.find((item) => item.uuid === program.base_currency)?.code;

    if (acc[program.form_factor]) {
      programBaseFiatCode &&
        !acc[program.form_factor].description.includes(programBaseFiatCode) &&
        (acc[program.form_factor].description += `, ${programBaseFiatCode}`);
    } else {
      acc[program.form_factor] = {
        title: cardFormFactorsData[program.form_factor].title,
        description: programBaseFiatCode || '',
        value: program.form_factor,
      };
    }

    return acc;
  }, {});

  return Object.values(formFactorsMap);
};

const CreateCardModal: FC<CreateCardModalProps> = (props) => {
  const { bins, createCard, selectedWallet, className, setIsModalOpen, isOpen, onCardCreate, fiatList } = props;

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<API.Cards.CardConfig | null>(null);
  const [topUpConfirmationText, setTopUpConfirmationText] = useState<string | null>(null);
  const [cardFormFactor, setCardFormFactor] = useState<CardFormFactor | null>(null);
  const [cardType, setCardType] = useState<CardType | null>(null);
  const [currentStep, setCurrentStep] = useState<CreateCardSteps>(CreateCardSteps.FORM_FACTOR);
  const [cardName, setCardName] = useState<string | null>(null);
  // const [cardholderName, setCardholderName] = useState<string | null>(null); hide cardholder name
  const [createdCardId, setCreatedCardId] = useState<string | null>(null);

  const [requestStatus, setPending, setFulfilled, setRejected] = useRequestStatus();

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

  const cardTypes = useMemo(() => getCardTypesData(availablePrograms, fiatList), [availablePrograms, fiatList]);
  const cardFormFactors = useMemo(
    () => getCardFormFactorsData(availablePrograms, fiatList),
    [availablePrograms, fiatList],
  );

  const openConfirmationModal = () => {
    if (
      !cardFormFactor ||
      !cardType ||
      !selectedProgram ||
      !cardName
      // !cardholderName hide cardholder name
    ) {
      return;
    }
    const confirmationText = `Are you sure you want to create ${cardFormFactorsData[
      cardFormFactor
    ].shortTitle.toLowerCase()} ${cardTypeData[cardType].shortTitle.toLowerCase()} ${selectedProgram.brand} card?`;
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
    fiatList,
    // cardholderName, hide cardholder name
    // setCardholderName, hide cardholder name
  };

  const createCardHandler = async () => {
    if (
      !selectedWallet.data ||
      !selectedProgram ||
      !cardName
      // !cardholderName  hide cardholder name
    ) {
      return;
    }

    const requestData: API.Cards.Create.StandAloneRequest = {
      authorization_controls: {} as API.Cards.AuthorizationControls,
      transaction_limits: [] as API.Cards.TransactionLimit[],
      program_id: selectedProgram.id,
      // name_on_card: cardholderName, hide cardholder name
      nick_name: cardName,
      wallet_id: selectedWallet.data.uuid,
      request_id: crypto.randomUUID(),
    };

    try {
      setPending();
      const { data } = await createCard(requestData);
      setCreatedCardId(data.card_id);
      setCurrentStep(CreateCardSteps.SUCCESS);
      setFulfilled();
    } catch (error) {
      setRejected();
      throw error;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onOpen = () => {
    setCurrentStep(CreateCardSteps.FORM_FACTOR);
    setCardFormFactor(null);
    setCardType(null);
    setSelectedProgram(null);
  };

  const closeAndHandleOnCardCreate = () => {
    closeModal();
    onCardCreate && createdCardId && onCardCreate(createdCardId);
  };

  useEffect(() => {
    if (isOpen) {
      onOpen();
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
      // isDisabled: !cardName || !cardholderName, hide cardholder name
      isDisabled: !cardName,
    },
    [CreateCardSteps.SUCCESS]: {
      Component: CardSusccessStep,
      mainButtonText: 'Go to card',
      onMainButtonClick: closeAndHandleOnCardCreate,
    },
  };

  const ActiveStep = createCardStepsMap[currentStep].Component;

  return (
    <>
      <MainModal
        isOpen={isOpen}
        onClose={closeModal}
        confirmButtonDisabled={createCardStepsMap[currentStep].isDisabled}
        backdrop="opaque"
        scrollBehavior="inside"
        isLoading={requestStatus.PENDING}
        // nativeCloseButton
        confirmButtonText={createCardStepsMap[currentStep].mainButtonText}
        onConfirm={createCardStepsMap[currentStep].onMainButtonClick}
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
