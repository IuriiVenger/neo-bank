import { Button, Select, SelectItem } from '@nextui-org/react';
import cn from 'classnames';
import { FC, useState } from 'react';

import { CiCirclePlus } from 'react-icons/ci';
import { HiOutlineSelector } from 'react-icons/hi';
import { LiaWalletSolid } from 'react-icons/lia';

import { API } from '@/api/types';
import CreateWalletModal from '@/components/modals/CreateWalletModal';
import { WalletTypeValues } from '@/constants';
import { ValueWithLabel } from '@/types';
import { getWalletTypeLabel } from '@/utils/helpers';

type WalletMenuProps = {
  wallets: API.Wallets.Wallet[];
  onSelect: (wallet_uuid: string) => void;
  activeWallet: API.Wallets.Wallet | null;
  className?: string;
  openCreateWalletModal: () => void;
};

const WalletList: FC<WalletMenuProps> = ({ wallets, onSelect, activeWallet, className, openCreateWalletModal }) => {
  const handleSelectWallet = (e: React.ChangeEvent<HTMLSelectElement>) => onSelect(e.target.value);

  return (
    <section className={cn('flex flex-col gap-1', className)}>
      <h3 className="mb-1 text-xl font-bold md:mb-4">
        Wallet<span className="hidden md:inline">s</span>
        <Button
          isIconOnly
          className="ml-2 h-fit w-fit min-w-0 self-center text-black md:hidden"
          color="primary"
          onClick={openCreateWalletModal}
          variant="light"
          radius="sm"
        >
          <CiCirclePlus />
        </Button>
      </h3>
      <div className="hidden flex-col gap-1 md:flex">
        {wallets.map((wallet) => (
          <div
            className={cn(
              'flex cursor-pointer items-center gap-4 rounded px-4 py-2 transition-background',
              wallet.uuid === activeWallet?.uuid ? 'bg-tenant-main text-white' : 'hover:bg-gray-100',
            )}
            key={wallet.uuid}
            onClick={() => onSelect(wallet.uuid)}
          >
            <LiaWalletSolid className="mb-1 mr-2 text-3xl" />
            <div className="font-medium">
              <span className="mr-1 capitalize">{getWalletTypeLabel(wallet.type)}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-shrink-0 gap-1 md:hidden">
        <Select
          placeholder="Select a wallet"
          labelPlacement="outside"
          disableSelectorIconRotation
          selectorIcon={<HiOutlineSelector />}
          onChange={handleSelectWallet}
          selectedKeys={activeWallet?.uuid && [activeWallet.uuid]}
          variant="bordered"
          color="primary"
        >
          {wallets.map((wallet) => (
            <SelectItem key={wallet.uuid} value={wallet.uuid}>
              {getWalletTypeLabel(wallet.type)}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Button
        className="mt-2 hidden w-fit self-center bg-tenant-main-light text-tenant-main md:flex"
        color="primary"
        onClick={openCreateWalletModal}
        variant="flat"
        radius="sm"
      >
        Create new wallet <CiCirclePlus />
      </Button>
    </section>
  );
};

export default WalletList;
