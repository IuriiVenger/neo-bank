import SumsubWebSdk from '@sumsub/websdk-react';

import { FC, useEffect, useState } from 'react';

import { CustomTheme } from '@/constants';

type KycProps = {
  accessToken: string;
  activeTheme: CustomTheme | null;
};

const Kyc: FC<KycProps> = ({ accessToken, activeTheme }: KycProps) => {
  const [isSdkVisible, setIsSdkVisible] = useState(false);
  const errorHandler = (e: any) => {
    // eslint-disable-next-line no-console
    console.log(e);
  };
  const messageHandler = (message: any) => {
    // eslint-disable-next-line no-console
    console.log(message);
  };

  useEffect(() => {
    setIsSdkVisible(false);
    setTimeout(() => {
      setIsSdkVisible(true);
    }, 100);
  }, [activeTheme]);

  if (!isSdkVisible) {
    return null;
  }

  return (
    <SumsubWebSdk
      accessToken={accessToken}
      expirationHandler={() => Promise.resolve(accessToken)}
      config={{
        theme: activeTheme,
        i18n: {
          document: {
            subTitles: {
              IDENTITY: 'Upload a document that proves your identity',
            },
          },
        },
      }}
      options={{ theme: activeTheme }}
      onMessage={messageHandler}
      onError={errorHandler}
    />
  );
};

export default Kyc;
