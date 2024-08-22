import { Button } from '@nextui-org/react';

import copy from 'copy-to-clipboard';
import { FC, useState } from 'react';
import { isAndroid, isIOS } from 'react-device-detect';
import { IoCopyOutline } from 'react-icons/io5';

import { toast } from 'react-toastify';

import { API } from '@/api/types';
import CustomInput from '@/components/ui/CustomInput';
import CustomModal from '@/components/ui/CustomModal';
import { useRequestStatus } from '@/hooks/useRequestStatus';

type AddWalletToModalProps = {
  setIsModalOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  getOTP: (card_id: string) => Promise<API.Cards.OTP>;
  cardId: string;
};

const AddToWalletModal: FC<AddWalletToModalProps> = (props) => {
  const { setIsModalOpen, isOpen, getOTP, cardId } = props;
  const [otpRequestStatuses, setOTPPending, setOTPFullfilled, setOTPRejected] = useRequestStatus();

  const [otp, setOTP] = useState<API.Cards.OTP | null>(null);
  const copyOTPtoClipboard = () => {
    if (!otp) {
      return;
    }
    copy(otp.otp);
    toast.success('OTP copied to clipboard');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setOTP(null);
  };

  const handleGetOTP = async () => {
    try {
      setOTPPending();
      const data = await getOTP(cardId);
      setOTP(data);
      setOTPFullfilled();
    } catch (error) {
      setOTPRejected();
      throw error;
    }
  };

  return (
    <CustomModal
      header="Add to wallet"
      isOpen={isOpen}
      onOpenChange={setIsModalOpen}
      footer={
        <div className="flex flex-col gap-4">
          {otp ? (
            <CustomInput
              content="width=device-width, initial-scale=1, maximum-scale=1"
              label="OTP"
              value={otp.otp}
              disabled
              endContent={
                <IoCopyOutline
                  onClick={copyOTPtoClipboard}
                  className=" flex-shrink-0 cursor-pointer text-lg text-default-400"
                />
              }
            />
          ) : (
            <Button className="w-full" onClick={handleGetOTP} color="primary" isLoading={otpRequestStatuses.PENDING}>
              Get OTP
            </Button>
          )}
          <Button className="w-full" onClick={closeModal} color="primary" variant="bordered">
            Close
          </Button>
        </div>
      }
    >
      {isIOS && (
        <>
          <p>Step 1: Open the Wallet App</p>
          <p>Step 2: Tap on the &ldquo;Plus&rdquo; Sign</p>
          <p>Step 3: Choose &ldquo;Add a Credit or Debit Card&rdquo;</p>
          <p>Step 4: Enter the Card Details Manually</p>
          <p>Step 5: Verify Your Card</p>
          <p>Step 6: Accept Terms and Conditions</p>
          <p>Step 7: Select &ldquo;Next&rdquo; to Complete the Adding Process</p>
          <p>
            Step 8: Your Card is Now Added to Apple Wallet. If you wallet reuqire verification, please select
            verification by email. After that, wait for 2-3 minutes and click on the “Get OTP” button in this window and
            fill the code in the Apple Wallet app.
          </p>
        </>
      )}
      {isAndroid && (
        <>
          <p>Step 1: Open the Google Wallet app </p>
          <p>Step 2: At the bottom, tap Add to Wallet</p>
          <p>
            Step 3: Tap <strong>Payment card</strong>
          </p>
          <p>
            Step 4: Tap <strong>New credit or debit card</strong>.
          </p>
          <p>
            Step 5: At the bottom, tap <strong>Save and continue</strong>.
          </p>
          <p>
            Step 6: Read the Issuer Terms and tap <strong>Accept</strong>.
          </p>

          <p>
            Step 7: Your Card is Now Added to Google Pay. If you wallet reuqire verification, please select verification
            by email. After that, wait for 2-3 minutes and click on the “Get OTP” button in this window and fill the
            code in the Google Pay app.
          </p>
        </>
      )}
    </CustomModal>
  );
};

export default AddToWalletModal;
