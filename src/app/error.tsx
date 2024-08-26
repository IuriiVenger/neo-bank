/* eslint-disable */

'use client';

import { Button } from '@nextui-org/react';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('handleError', error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col justify-center gap-6">
      <h2>Something went wrong!</h2>
      <Button
        color="primary"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
