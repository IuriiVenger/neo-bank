/* eslint-disable */

'use client';

import { Button } from '@nextui-org/react';
import { useEffect } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const printedError = error?.message || 'An error occurred';

  const goToMainPage = () => {
    window.location.href = '/';
  };

  useEffect(() => {
    console.error('handleError', error);
  }, [error]);

  return (
    <div className="flex h-screen max-w-72 flex-col justify-center gap-4 text-center">
      <RiErrorWarningLine className="self-center text-7xl" />
      <h2 className=" text-4.25xl">Something went wrong!</h2>
      <small className="text-foreground-2 text-sm">{printedError}</small>
      <div className="mt-6 flex flex-col">
        <Button color="primary" onClick={goToMainPage}>
          Go to main page
        </Button>
      </div>
    </div>
  );
}
