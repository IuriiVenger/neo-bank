import { Button } from '@nextui-org/react';
import cn from 'classnames';
import { hasCookie } from 'cookies-next';
import Link from 'next/link';
import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useTimer } from 'react-timer-hook';

import { getStartTimeForTimer } from '@/utils/helpers';

type LogInOtpProps = {
  otp: string;
  email: string;
  setEmail: (email: string) => void;
  getOtp: () => Promise<any>;
  setOtp: (otp: string) => void;
  signInByOtp: () => Promise<any>;
  isOtpRequested: boolean;
  isLoading?: boolean;
};

const timeCount = 60;

const LogInOtp: FC<LogInOtpProps> = (props) => {
  const { otp, email, setOtp, signInByOtp, setEmail, isOtpRequested, getOtp, isLoading } = props;
  const [isTimerDisabled, setIsTimerDisabled] = useState(false);
  const timeKey = useMemo(() => `get-otp-start-timer-time-${email.length}`, [email]);

  const hasTimeCookie = hasCookie(timeKey);

  const memouzedStartTime = useMemo(() => getStartTimeForTimer(timeCount, timeKey), [timeKey]);

  const { minutes, seconds, isRunning, restart, start } = useTimer({
    expiryTimestamp: memouzedStartTime,
    autoStart: false,
  });

  const handleOtpInput = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSignInByOtp = async () => {
    await signInByOtp();
    setIsTimerDisabled(true);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isOtpRequested ? handleSignInByOtp() : getOtp();
  };

  const resendOtp = async () => {
    await getOtp();
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

  return (
    <form onSubmit={onSubmit} className="h-fit w-full max-w-96">
      {isOtpRequested && (
        <h5 className="mb-4 text-center text-sm font-semibold text-neutral-400">OTP sent to {email}</h5>
      )}
      {isOtpRequested ? (
        <input
          key="otp"
          name="otp"
          placeholder="Input one time password"
          value={otp}
          className="mb-4 w-full rounded-md border-gray-700 bg-gray-200 p-3  placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          onChange={handleOtpInput}
          type="text"
        />
      ) : (
        <input
          key="email"
          name="email"
          placeholder="Input your email"
          value={email}
          className="mb-4 w-full rounded-md border-gray-700 bg-gray-200 p-3  placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          onChange={handleEmailInput}
          type="email"
        />
      )}

      <Button isLoading={isLoading} type="submit" color="primary" className="mb-2 w-full text-white" radius="sm">
        {buttonText}
      </Button>
      {!isOtpRequested && (
        <Link className="m-auto mt-2 block w-fit text-center text-light-primary underline" href="/">
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
  );
};

export default LogInOtp;
