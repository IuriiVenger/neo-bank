import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { FC } from 'react';

import { FiUserCheck } from 'react-icons/fi';
import { PiWarning } from 'react-icons/pi';

import { KYCStatuses, retryKYCStatuses } from '@/constants';

type KYCButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  status: KYCStatuses;
};

const KYCButton: FC<KYCButtonProps> = ({ onClick, disabled, className, status }) => {
  const isReverifyStatus = retryKYCStatuses.includes(status);

  const buttonText = isReverifyStatus ? 'Retry KYC verification' : 'Verify your identity';
  const buttonIcon = isReverifyStatus ? <PiWarning className="h-6 w-6" /> : <FiUserCheck className="h-4 w-4" />;
  return (
    <Button
      onClick={onClick}
      isDisabled={disabled}
      color="primary"
      variant="bordered"
      radius="sm"
      className={cn(className, 'h-9 flex-shrink-0 border  text-small font-medium')}
    >
      {buttonText}
      {buttonIcon}
    </Button>
  );
};

export default KYCButton;
