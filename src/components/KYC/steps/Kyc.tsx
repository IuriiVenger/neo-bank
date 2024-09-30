import SumsubWebSdk from '@sumsub/websdk-react';
import { FC } from 'react';

type KycProps = {
  accessToken: string;
};

const Kyc: FC<KycProps> = ({ accessToken }: KycProps) => {
  const errorHandler = (e: any) => {
    // eslint-disable-next-line no-console
    console.log(e);
  };
  const messageHandler = (message: any) => {
    // eslint-disable-next-line no-console
    console.log(message);
  };

  return (
    <SumsubWebSdk
      accessToken={accessToken}
      expirationHandler={() => Promise.resolve(accessToken)}
      config={{
        theme: 'light',
        i18n: {
          document: {
            subTitles: {
              IDENTITY: 'Upload a document that proves your identity',
            },
          },
        },
      }}
      options={{ theme: 'light' }}
      onMessage={messageHandler}
      onError={errorHandler}
    />
  );
};

export default Kyc;
