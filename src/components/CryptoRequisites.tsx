import { Button, Divider } from '@nextui-org/react';
import copy from 'copy-to-clipboard';
import { FC, useEffect, useState } from 'react';

import { RiFileCopyFill } from 'react-icons/ri';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';

import { DashboardProps } from './Dashboard';

import DefaultContainer from './ui/DefaultContainer';

import { API } from '@/api/types';

import Loader from '@/components/ui/Loader';
import { ResponseStatus } from '@/constants';
import { useRequestStatus } from '@/hooks/useRequestStatus';

type CryptoRequisitesProps = {
  selectedWallet: DashboardProps['selectedWallet'];
  selectedCrypto: API.List.Crypto | null;
  getWalletAddress: DashboardProps['getWalletAddress'];
  createWalletAddress: DashboardProps['createWalletAddress'];
  chains: DashboardProps['chainList'];
};

const CryptoRequisites: FC<CryptoRequisitesProps> = (props) => {
  const { selectedWallet, selectedCrypto, getWalletAddress, createWalletAddress, chains } = props;

  const [requestStatus, setPending, setFullfilled, setRejected] = useRequestStatus();
  const [selectedAddress, setActiveWalletAddress] = useState<API.Wallets.WalletChain.Response | null>(null);

  const selectedChain = chains.find((chain) => chain.id === selectedCrypto?.chain);

  const loadAddress = async () => {
    if (selectedWallet.data && selectedCrypto?.chain) {
      try {
        setActiveWalletAddress(null);
        setPending();
        const walletChain = await getWalletAddress(selectedCrypto.chain, selectedWallet.data.uuid);
        setActiveWalletAddress(walletChain);
        setFullfilled();
      } catch (error) {
        setRejected();
        if ((error as any).response?.status === ResponseStatus.NOT_FOUND) {
          // eslint-disable-next-line no-console
          return console.log('Address not found');
        }
        throw error;
      }
    }
  };

  const createWalletAddressHandler = async () => {
    if (selectedWallet.data && selectedCrypto?.chain) {
      try {
        setPending();
        await createWalletAddress({
          chain: selectedCrypto.chain,
          wallet_uuid: selectedWallet.data.uuid,
          label: 'default',
        });
        await loadAddress();
        setFullfilled();
      } catch (error) {
        setRejected();
        throw error;
      }
    }
  };

  const copyAddress = () => {
    copy(selectedAddress?.address || '');
    toast.success('Address copied to clipboard');
  };

  useEffect(() => {
    loadAddress();
  }, []);

  if (requestStatus.NONE || requestStatus.PENDING) {
    return <Loader />;
  }

  console.log('selectedAddress', selectedAddress);

  return (
    <div className="flex flex-col items-center gap-8">
      {selectedAddress && (
        <DefaultContainer className="w-fit">
          <QRCode className=" self-center" size={180} value={selectedAddress.address} />
        </DefaultContainer>
      )}
      <DefaultContainer className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-foreground-2 text-sm">Currency</p>
          <p className="font-medium">{selectedCrypto?.name}</p>
        </div>
        <Divider />
        <div className="flex flex-col gap-1">
          <p className="text-foreground-2 text-sm">Network</p>
          <p className="font-medium">{selectedChain?.name}</p>
        </div>
        {selectedAddress && (
          <>
            <Divider />
            <div className="flex flex-col gap-1">
              <p className="text-foreground-2 text-sm">Address to deposit</p>
              <div className="flex items-end justify-between">
                <p className="break-all font-medium">{selectedAddress.address}</p>
                <RiFileCopyFill onClick={copyAddress} className=" cursor-pointer text-2xl text-secondary " />
              </div>
            </div>
          </>
        )}
      </DefaultContainer>
      {!selectedAddress && (
        <Button color="primary" className="w-full" radius="md" onClick={createWalletAddressHandler}>
          Get address to deposit
        </Button>
      )}
    </div>
  );
};

export default CryptoRequisites;
