import cn from 'classnames';
import { FC } from 'react';
import { GoHistory, GoIssueDraft, GoNoEntry, GoUnverified, GoVerified } from 'react-icons/go';
import { MdMoreTime } from 'react-icons/md';

import KYCButton from './KYCButton';

import { KYCStatuses, requestKYCStatuses } from '@/constants';

type VerificationStatusProps = {
  verifyStatus: KYCStatuses;
  openKYC: () => void;
};

const verificationStatusInfo = {
  [KYCStatuses.PENDING]: {
    title: 'Verification in progress',
    subtitle: 'Verification is pending approval.',
    icon: GoHistory,
  },
  [KYCStatuses.APPROVED]: {
    title: 'Verified',
    subtitle: 'You have full access to the platform.',
    icon: GoVerified,
  },
  [KYCStatuses.DECLINED]: {
    title: 'Verification failed',
    subtitle: 'Verification has been declined.',
    icon: GoNoEntry,
  },
  [KYCStatuses.REJECT]: {
    title: 'Verification Rejected',
    subtitle: 'Verification has been rejected.',
    icon: GoNoEntry,
  },
  [KYCStatuses.DOUBLE]: {
    title: 'Verification issue',
    subtitle: 'A user with these documents has already been verified in another account.',
    icon: GoIssueDraft,
  },
  [KYCStatuses.HOLD]: {
    title: 'Verification On Hold',
    subtitle: 'Verification is currently on hold. Further action may be required.',
    icon: MdMoreTime,
  },
  [KYCStatuses.SOFT_REJECT]: {
    title: 'Verification failed',
    subtitle: 'Please fill out the KYC form again.',
    icon: GoUnverified,
  },
  [KYCStatuses.UNVERIFIED]: {
    title: 'Please verify your identity',
    subtitle: 'After verification you will have full access to the platform',
    icon: GoUnverified,
  },
};

const VerificationStatus: FC<VerificationStatusProps> = ({ verifyStatus, openKYC }) => {
  const isKYCRequired = requestKYCStatuses.includes(verifyStatus);

  const clickHandler = () => {
    if (isKYCRequired) {
      openKYC();
    }
  };

  return (
    <div
      className={cn(
        'flex w-fit flex-col items-center justify-end gap-2 md:items-end lg:flex-row lg:items-center xs:flex-col-reverse',
        isKYCRequired && 'hover:opacity-70',
      )}
      onClick={clickHandler}
    >
      <p className="mt-1 max-w-40 text-left text-[8px] text-neutral-500">
        {verificationStatusInfo[verifyStatus]?.subtitle}
      </p>
      {isKYCRequired && <KYCButton onClick={openKYC} disabled={!isKYCRequired} status={verifyStatus} />}
    </div>
  );
};

export default VerificationStatus;
