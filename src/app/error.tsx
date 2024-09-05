/* eslint-disable */

'use client';

import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('handleError', error);
  }, [error]);

  const goToMainPage = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen flex-col justify-center gap-6">
      <h2>Something went wrong!</h2>
      <div className="flex flex-col gap-2">
        <Button color="primary" onClick={() => reset()}>
          Try again
        </Button>
        <Button color="primary" variant="bordered" onClick={goToMainPage}>
          Go to main page
        </Button>
      </div>
    </div>
  );
}
