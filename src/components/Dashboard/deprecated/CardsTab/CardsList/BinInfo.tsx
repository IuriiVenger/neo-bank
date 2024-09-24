import { FC } from 'react';

import { API } from '@/api/types';

type BinInfoProps = {
  // bin: API.Cards.Bin;
  bin: any;
  className?: string;
};

const BinInfo: FC<BinInfoProps> = ({ bin, className }) => (
  <div className={className}>
    <p>
      <strong>BIN:</strong> {bin.code}
    </p>
    <div>
      <span>
        <strong className="font-bold">Provider:</strong> {bin.provider};
      </span>
      <span>
        <strong className="font-bold"> Country:</strong> {bin.countryCode};
      </span>
      <span>
        <strong className="font-bold"> Currency:</strong> {bin.currencyCode}
      </span>
    </div>
    <div>
      <span className=" whitespace-normal break-all">
        <strong className="font-bold"> Purposes:</strong> {bin.purposes.join(', ')};
      </span>
      <span>
        <strong className="font-bold"> KYC:</strong> {bin.requirements?.isKycRequired ? 'Yes' : 'No'}
      </span>
    </div>
  </div>
);

export default BinInfo;
