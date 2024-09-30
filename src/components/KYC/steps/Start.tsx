import { Button } from '@nextui-org/react';
import { FC, useMemo } from 'react';
import { FaRegAddressCard } from 'react-icons/fa6';

import Loader from '@/components/ui/Loader';
import { KYCStatuses } from '@/constants';

type StartProps = {
  nextStep: () => void;
  isPending: boolean;
  isError: boolean;
  verificationStatus?: KYCStatuses;
  setIsModalOpen: (isOpen: boolean) => void;
};

const Start: FC<StartProps> = ({ nextStep, isPending, isError, verificationStatus, setIsModalOpen }) => {
  const buttonContent = useMemo(() => {
    if (isPending) {
      return <Loader size="sm" />;
    }
    if (isError) {
      return 'Error';
    }
    return 'Verify your identity';
  }, [isPending, isError]);

  const isVerificationPending = verificationStatus === KYCStatuses.PENDING;

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-4 flex  flex-col items-center justify-center">
      <FaRegAddressCard className="mb-10 h-16 w-16 " />
      <h3 className="mb-5 text-center text-2xl font-medium">Proof of identity</h3>
      {isVerificationPending ? (
        <>
          <p className="mb-12 w-9/12 text-center text-lg font-normal ">
            Verification is pending approval. You will have full access to the platform after verification.
          </p>
          <Button className="mb-5 w-3/5 px-12" variant="bordered" color="primary" onClick={handleModalClose}>
            Close
          </Button>
        </>
      ) : (
        <>
          <p className="mb-12 w-9/12 text-center text-lg font-normal ">
            Due to legal requirements, we need to verify your identity.
            <br />
            Get ready to take a photo of yourself and your ID card.
          </p>
          <Button
            isDisabled={isError}
            className="mb-5 w-3/5 px-12"
            variant="bordered"
            color={isError ? 'danger' : 'primary'}
            onClick={nextStep}
          >
            {buttonContent}
          </Button>
          <small className="w-3/5 text-center text-xs">
            I give my consent to process my personal data with the policy for a period of 5 years. Other users
            won&apos;t see your photo
          </small>
        </>
      )}
    </div>
  );
};

export default Start;
