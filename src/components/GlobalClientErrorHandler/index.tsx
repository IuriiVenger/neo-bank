import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const GlobalClientErrorHandler = () => {
  const [error, setError] = useState<any>(null);
  const onUnhandledRejection = (event: PromiseRejectionEvent) => {
    event.promise.catch((err) => {
      setError(err);
    });
  };

  useEffect(() => {
    window.addEventListener('unhandledrejection', onUnhandledRejection);
    return () => window.removeEventListener('unhandledrejection', onUnhandledRejection);
  }, []);

  useEffect(() => {
    if (error) {
      const errorText =
        (!!error?.response?.data?.message?.length && error.response.data.message?.length) ||
        (error?.response?.data?.error?.length && error.response.data.error) ||
        (error?.message?.length && error.message) ||
        error?.data?.error ||
        'Something went wrong';

      toast.error(errorText);
      // eslint-disable-next-line no-console
      console.error('GlobalClientErrorHandler:', error);
    }
  }, [error]);

  return null;
};

export default GlobalClientErrorHandler;
