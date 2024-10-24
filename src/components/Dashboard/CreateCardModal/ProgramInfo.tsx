import { FC } from 'react';

import { API } from '@/api/types';

type ConfigInfoProps = {
  config: API.Cards.CardConfig;
  className?: string;
  baseCurrency: string;
};

const ProgramInfo: FC<ConfigInfoProps> = ({ config, className, baseCurrency }) => (
  <div className={className}>
    <p>
      <strong>BIN:</strong> {config.id}
    </p>
    <div>
      <span>
        <strong className="font-bold">Provider:</strong> {config.brand};
      </span>

      <span>
        <strong className="font-bold"> Currencies:</strong> {baseCurrency}
      </span>
    </div>
    <div>
      <span className=" whitespace-normal break-all">
        <strong className="font-bold"> Purposes:</strong> {config.purposes?.join(', ')};
      </span>
    </div>
  </div>
);

export default ProgramInfo;
