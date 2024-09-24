import { Button } from '@nextui-org/react';
import copy from 'copy-to-clipboard';
import { FC } from 'react';

import { FaRegCopy } from 'react-icons/fa6';

import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';

import CustomInput from '../../ui/CustomInput';

import { API } from '@/api/types';
import Loader from '@/components/ui/Loader';

type ChainInfoProps = {
  createAddress: () => void;
  selectedAddress: API.Wallets.WalletChain.Response | null;
  isWalletAdressLoading: boolean;
};

const ChainInfo: FC<ChainInfoProps> = (props) => {
  const { createAddress, selectedAddress, isWalletAdressLoading } = props;

  const copyAddress = () => {
    copy(selectedAddress?.address || '');
    toast.success('Address copied to clipboard');
  };

  if (isWalletAdressLoading) {
    return <Loader />;
  }

  return selectedAddress ? (
    <div className="flex gap-2">
      <QRCode className=" self-center" size={96} value={selectedAddress.address} />
      <CustomInput
        isReadOnly
        className="small-fontsize-input"
        value={selectedAddress.address}
        variant="underlined"
        color="default"
        label="Address to deposit"
        content="width=device-width, initial-scale=1, maximum-scale=1"
        endContent={<FaRegCopy onClick={copyAddress} className="mb-1 cursor-pointer " />}
      />
    </div>
  ) : (
    <Button onClick={createAddress}> Get address to deposit</Button>
  );
};

export default ChainInfo;
