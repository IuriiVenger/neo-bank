// import { Button } from '@nextui-org/react';
import { AxiosResponse } from 'axios';
import cn from 'classnames';
import { FC, useState } from 'react';
// import { CiCirclePlus } from 'react-icons/ci';

import CreateWalletModal from '../modals/CreateWalletModal';
import Loader from '../ui/Loader';

import MainTab from './tabs/MainTab';

import WalletTab from './tabs/WalletTab';

import { API } from '@/api/types';

import { WhiteLabelConfig } from '@/config/whitelabel';
import { AppEnviroment, DashboardTabs, KYCStatuses, RequestStatus, WalletTypeValues } from '@/constants';

import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { StoreDataWithStatus, StoreDataWithStatusAndMeta } from '@/store/types';
import { ValueWithLabel } from '@/types';

export interface DashboardProps {
  activeCardId: string | null;
  activeDashboardTab: DashboardTabs;
  allowedCryptoToFiatList: API.List.Crypto[];
  appEnviroment: AppEnviroment;
  availableToExchangeCrypto: API.List.Crypto[];
  bins: API.Cards.CardConfig[];
  cardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  cards: StoreDataWithStatusAndMeta<API.Cards.CardListItem[] | null>;
  chainList: API.List.Chains[];
  changeActiveCard: (card_id: string | null) => void;
  changeDashboardTab: (tab: DashboardTabs) => void;
  createCard: (data: API.Cards.Create.Request) => Promise<AxiosResponse<API.Cards.Create.Response, any>>;
  createCrypto2CryptoOrder: (requestData: API.Orders.Crypto.Withdrawal.Request) => Promise<void | null>;
  createCrypto2FiatOrder: (requestData: API.Orders.OffRamp.Request) => Promise<void | null>;
  createFiat2CryptoOrder: (requestData: API.Orders.OnRamp.Request) => Promise<void | null>;
  createInternalTopUpOrder: (requestData: API.Orders.VCards.Topup.Internal.Request) => Promise<void | null>;
  createWallet: (wallet_type: WalletTypeValues) => Promise<void>;
  createWalletAddress: (data: API.Wallets.WalletChain.Request) => Promise<API.Wallets.WalletChain.Response>;
  cryptoList: API.List.Crypto[];
  cryptoBySymbol: API.List.CryptoBySymbol[];
  exchangeRate: API.Exchange.F2C[];
  externalCalcData: UseExternalCalcData;
  fiatList: API.List.Fiat[];
  getOTP: (card_id: string) => Promise<API.Cards.OTP>;
  getSensitiveData: (card_id: string) => Promise<API.Cards.SensitiveData>;
  getWalletAddress: (chain: number, wallet_uuid: string) => Promise<API.Wallets.WalletChain.Response>;
  isTelegramEnviroment: boolean;
  loadMoreCards: () => void;
  loadMoreCardTransactions: () => void;
  loadMoreWalletTransactions: () => void;
  loadSelectedWalletCards: () => void;
  openKYC: () => void;
  selectCard: (card_id: string) => void;
  selectChain: (chain: API.List.Chains) => void;
  selectCrypto: (crypto: API.List.Crypto) => void;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectWallet: (wallet_uuid: string) => void;
  selectedCard: StoreDataWithStatus<API.Cards.CardDetailItem | null>;
  selectedChain: API.List.Chains;
  selectedCrypto: API.List.Crypto;
  selectedFiat: API.List.Fiat;
  selectedWallet: StoreDataWithStatus<API.Wallets.ExtendWallet | null>;
  selectedWalletBalanceCurrency: string;
  updateCard: (card_id: string, data: API.Cards.Update.Request) => Promise<void>;
  verificationStatus?: KYCStatuses;
  walletTransactions: StoreDataWithStatusAndMeta<API.WalletTransactions.Transaction[] | null>;
  walletTypes: ValueWithLabel[];
  wallets: API.Wallets.Wallet[];
  whiteLabelConfig?: WhiteLabelConfig;
}

const Dashboard: FC<DashboardProps> = (props) => {
  const { wallets, selectedWallet, createWallet, walletTypes, activeDashboardTab } = props;

  const [isCreateWalletModalOpen, setIsCreateWalletModalOpen] = useState(false);

  const openCreateWalletModal = () => setIsCreateWalletModalOpen(true);

  const isInfoTab = activeDashboardTab === DashboardTabs.INFO;

  const isWalletPending = selectedWallet.status === RequestStatus.PENDING;
  const isWalletsExist = wallets.length > 0;

  return (
    <section className="flex w-full max-w-screen-xl flex-col  gap-x-12  gap-y-4 lg:gap-x-20 xl:gap-x-40">
      {/* {!isWalletsExist ? (
        <div className="col-span-2 row-span-4 flex h-full w-full flex-col items-center justify-center">
          <h1 className="mb-6 text-xl">You don&apos;t have any wallets yet</h1>
          <Button
            className="self-center bg-secondary text-primary   md:flex"
            color="primary"
            onClick={openCreateWalletModal}
            variant="flat"
            radius="sm"
          >
            Create new wallet <CiCirclePlus />
          </Button>
        </div>
      ) : ( */}
      <div className={cn('order-4  md:order-3 md:col-start-2 md:col-end-4 md:mt-4', isInfoTab && 'overflow-scroll')}>
        {isWalletPending ? (
          <Loader />
        ) : (
          <>
            {/* {activeDashboardTab === DashboardTabs.DEPOSIT && <DepositForm {...props} />}
                {activeDashboardTab === DashboardTabs.WITHDRAW && <WithdrawForm {...props} />}
                {activeDashboardTab === DashboardTabs.INFO && <InfoTab {...props} />}
                {activeDashboardTab === DashboardTabs.CARDS && <CardsTab {...props} />} */}
            {activeDashboardTab === DashboardTabs.MAIN && <MainTab {...props} />}
            {activeDashboardTab === DashboardTabs.WALLET && <WalletTab {...props} />}
          </>
        )}
      </div>
      {/* )} */}
      <CreateWalletModal
        isOpen={isCreateWalletModalOpen}
        setIsModalOpen={setIsCreateWalletModalOpen}
        onConfirm={createWallet}
        walletTypes={walletTypes}
      />
    </section>
  );
};

export default Dashboard;
