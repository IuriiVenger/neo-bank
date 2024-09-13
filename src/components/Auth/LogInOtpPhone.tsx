import { Button, code } from '@nextui-org/react';
import cn from 'classnames';
import { hasCookie } from 'cookies-next';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import { useTimer } from 'react-timer-hook';

import CustomPhoneInput from '../ui/CustomPhoneInput';

import InputCode from '../ui/InputCode';

import logo from '@/assets/svg/tenant/header_logo.svg';
import { getStartTimeForTimer } from '@/utils/helpers';
import 'react-international-phone/style.css';
import { isPhoneValid } from '@/utils/validators';

type LogInOtpPhoneProps = {
  otp: string;
  phone: string;
  setPhone: (email: string) => void;
  getPhoneOtp: () => Promise<any>;
  setOtp: (otp: string) => void;
  signInByPhoneOtp: () => Promise<any>;
  isOtpRequested: boolean;
  isLoading?: boolean;
};

const timeCount = 60;

const LogInOtpPhone: FC<LogInOtpPhoneProps> = (props) => {
  const { otp, phone, setOtp, signInByPhoneOtp, setPhone, isOtpRequested, getPhoneOtp, isLoading } = props;
  const [isTimerDisabled, setIsTimerDisabled] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const isPhoneInvalid = useMemo(() => !isPhoneValid(phone), [phone]);
  const phoneNumberSumm = phone.split('').reduce((acc, val) => acc + val.charCodeAt(0), 0);
  const timeKey = useMemo(() => `get-otp-start-timer-time-${phoneNumberSumm}`, [phone]);

  const otpExpectedLength = 6;
  const isOtpFilled = otp.length === otpExpectedLength;

  const hasTimeCookie = hasCookie(timeKey);

  const memouzedStartTime = useMemo(() => getStartTimeForTimer(timeCount, timeKey), [timeKey]);

  const { minutes, seconds, isRunning, restart, start } = useTimer({
    expiryTimestamp: memouzedStartTime,
    autoStart: false,
  });

  // const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  const handleSignInByPhoneOtp = async () => {
    await signInByPhoneOtp();
    setIsTimerDisabled(true);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsDirty(true);
    e.preventDefault();

    if (isOtpRequested) {
      return handleSignInByPhoneOtp();
    }

    if (!isPhoneInvalid) {
      getPhoneOtp();
    }
  };

  const resendOtp = async () => {
    await getPhoneOtp();
    restart(getStartTimeForTimer(timeCount, timeKey));
  };

  const buttonText = useMemo(() => {
    if (isLoading) {
      return 'Loading...';
    }
    return isOtpRequested ? 'Sign In by OTP' : 'Get password';
  }, [isOtpRequested, isLoading]);

  useEffect(() => {
    if (isOtpRequested) {
      start();
    }
  }, [isOtpRequested]);

  useEffect(() => {
    if (isOtpFilled) {
      handleSignInByPhoneOtp();
    }
  }, [isOtpFilled]);

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className=" text-3xl">
        The Right Place for <br />
        Your Digital Assets
      </h1>
      <h3 className="text-foreground-2 whitespace-break-spaces text-center">
        {isOtpRequested
          ? 'We have has been sent an OTP \nto your phone'
          : 'Please provide your phone \nso that we can send you an OTP.'}
      </h3>
      <form onSubmit={onSubmit} className="flex h-fit w-full max-w-96 flex-col gap-4">
        {/* {isOtpRequested && (
          <h5 className="mb-4 text-center text-sm font-semibold text-neutral-400">OTP sent to {email}</h5>
        )} */}
        {isOtpRequested ? (
          // <input
          //   key="otp"
          //   name="otp"
          //   placeholder="Input one time password"
          //   value={otp}
          //   className="mb-4 w-full rounded-md border-gray-700 bg-gray-200 p-3  placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          //   onChange={handleOtpInput}
          //   type="text"
          // />
          <InputCode num={otpExpectedLength} setCode={setOtp} />
        ) : (
          // <input
          //   key="email"
          //   name="email"
          //   placeholder="Input your email"
          //   value={email}
          //   className="mb-4 w-full rounded-small border-gray-700 bg-gray-200 p-3  placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          //   onChange={handleEmailInput}
          //   type="email"
          // />
          <CustomPhoneInput
            value={phone}
            onChange={(newPhone) => setPhone(newPhone)}
            isPhoneInvalid={isPhoneInvalid && isDirty}
            disabled={isLoading}
          />
        )}

        <Button isLoading={isLoading} type="submit" color="primary" className="mb-2  w-full text-white" radius="full">
          {buttonText}
        </Button>
        {!isOtpRequested && (
          <Link className="m-auto mt-2 block w-fit text-center text-primary underline " href="/">
            Back to main page
          </Link>
        )}
        {isOtpRequested && !isTimerDisabled && (
          <div className="m-auto mt-2 w-fit">
            <button
              onClick={resendOtp}
              disabled={isRunning || isLoading}
              type="button"
              className={cn(isRunning || isLoading ? 'opacity-30' : 'underline')}
            >
              Resend
            </button>
            {isRunning && hasTimeCookie && (
              <span className="ml-1">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default LogInOtpPhone;
