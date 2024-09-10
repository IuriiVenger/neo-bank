import { Button } from '@nextui-org/react';
import { AxiosResponse } from 'axios';
import cn from 'classnames';
import { FC, useState } from 'react';
import { BsCreditCard2Back } from 'react-icons/bs';
import { CiCirclePlus } from 'react-icons/ci';
import { IoInformationOutline } from 'react-icons/io5';
import { PiSignIn, PiSignOut } from 'react-icons/pi';

import CreateWalletModal from '../modals/CreateWalletModal';
import Loader from '../ui/Loader';

import CardsTab from './CardsTab';
import DepositForm from './DepositTab';
import InfoTab from './InfoTab';
import MainInformation from './MainInformation';
import WithdrawForm from './WithdrawTab';

import { API } from '@/api/types';
import WalletBalanceList from '@/components/Wallet/WalletBalanceList';
import WalletList from '@/components/Wallet/WalletList';

import { WhiteLabelConfig } from '@/config/whitelabel';
import { AppEnviroment, DashboardTabs, KYCStatuses, RequestStatus, WalletTypeValues } from '@/constants';

import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { StoreDataWithStatus, StoreDataWithStatusAndMeta } from '@/store/types';
import { ValueWithLabel } from '@/types';
import { roundToDecimals, separateNumbers } from '@/utils/converters';

export type DashboardProps = {
  activeCardId: string | null;
  activeDashboardTab: DashboardTabs;
  allowedCryptoToFiatList: API.List.Crypto[];
  appEnviroment: AppEnviroment;
  availableToExchangeCrypto: API.List.Crypto[];
  bins: API.Cards.Bin[];
  cardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  cards: StoreDataWithStatusAndMeta<API.Cards.CardDetailItem[] | null>;
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
  updateCard: (card_id: string, data: API.Cards.Update.Request) => Promise<void>;
  verificationStatus?: KYCStatuses;
  walletTransactions: StoreDataWithStatusAndMeta<API.WalletTransactions.Transaction[] | null>;
  walletTypes: ValueWithLabel[];
  wallets: API.Wallets.Wallet[];
  whiteLabelConfig?: WhiteLabelConfig;
};

const Dashboard: FC<DashboardProps> = (props) => {
  const {
    wallets,
    selectWallet,
    selectedWallet,
    cryptoList,
    createWallet,
    walletTypes,
    chainList,
    verificationStatus,
    openKYC,
    activeDashboardTab,
    changeDashboardTab,
    activeCardId,
    fiatList,
  } = props;

  const [isCreateWalletModalOpen, setIsCreateWalletModalOpen] = useState(false);

  const currentWalletBalanceAmount = separateNumbers(roundToDecimals(selectedWallet.data?.total_amount || 0));
  const currentWalletBalanceCurrency =
    fiatList.find((item) => item.uuid === selectedWallet.data?.base_fiat)?.symbol || '€';
  const currentWalletBalance = `${currentWalletBalanceCurrency} ${currentWalletBalanceAmount}`;
  const openCreateWalletModal = () => setIsCreateWalletModalOpen(true);

  const isInfoTab = activeDashboardTab === DashboardTabs.INFO;
  const isCardDetailMode = activeDashboardTab === DashboardTabs.CARDS && activeCardId;
  const isMainInformationHidden = isCardDetailMode;
  const isWalletPending = selectedWallet.status === RequestStatus.PENDING;
  const isWalletsExist = wallets.length > 0;

  const actionButtons = [
    {
      id: DashboardTabs.INFO,
      title: 'Wallet Info',
      icon: <IoInformationOutline />,
      onClick: () => changeDashboardTab(DashboardTabs.INFO),
    },
    {
      id: DashboardTabs.DEPOSIT,
      title: 'Deposit',
      icon: <PiSignIn className="rotate-90" />,
      onClick: () => changeDashboardTab(DashboardTabs.DEPOSIT),
    },
    {
      id: DashboardTabs.WITHDRAW,
      title: 'Withdraw',
      icon: <PiSignOut className="rotate-[270deg]" />,
      onClick: () => changeDashboardTab(DashboardTabs.WITHDRAW),
    },
    {
      id: DashboardTabs.CARDS,
      title: 'Cards',
      icon: <BsCreditCard2Back />,
      onClick: () => changeDashboardTab(DashboardTabs.CARDS),
    },
  ];

  return (
    <section className="grid w-full max-w-screen-xl grid-cols-1 grid-rows-[repeat(3,min-content)] gap-x-12  gap-y-4 md:grid-cols-[280px,auto] lg:gap-x-20 xl:gap-x-40">
      {!isWalletsExist ? (
        <div className="col-span-2 row-span-4 flex h-full w-full flex-col items-center justify-center">
          <h1 className="mb-6 text-xl">You don&apos;t have any wallets yet</h1>
          <Button
            className="self-center bg-light-secondary text-light-primary md:flex"
            color="primary"
            onClick={openCreateWalletModal}
            variant="flat"
            radius="sm"
          >
            Create new wallet <CiCirclePlus />
          </Button>
        </div>
      ) : (
        <>
          <aside className="row-start-1 row-end-5 hidden w-full flex-shrink-0  flex-col justify-between gap-8 sm:flex-row  md:flex md:max-w-xs md:flex-col md:justify-start ">
            <WalletList
              wallets={wallets}
              onSelect={selectWallet}
              activeWallet={selectedWallet.data}
              openCreateWalletModal={openCreateWalletModal}
            />
            <WalletBalanceList chains={chainList} wallet={selectedWallet.data} cryptoList={cryptoList} />
          </aside>
          {!isMainInformationHidden && (
            <>
              <MainInformation
                className="order-1 md:order-2 md:col-start-2 md:col-end-4"
                balance={currentWalletBalance}
                actionButtons={actionButtons}
                activeDashboardTab={activeDashboardTab}
                verificationStatus={verificationStatus}
                openKYC={openKYC}
              />
              <WalletList
                className="order-2 mt-1 md:hidden"
                wallets={wallets}
                onSelect={selectWallet}
                activeWallet={selectedWallet.data}
                openCreateWalletModal={openCreateWalletModal}
              />
            </>
          )}
          <div
            className={cn('order-4  md:order-3 md:col-start-2 md:col-end-4 md:mt-4', isInfoTab && 'overflow-scroll')}
          >
            {isWalletPending ? (
              <Loader />
            ) : (
              <>
                {activeDashboardTab === DashboardTabs.DEPOSIT && <DepositForm {...props} />}
                {activeDashboardTab === DashboardTabs.WITHDRAW && <WithdrawForm {...props} />}
                {activeDashboardTab === DashboardTabs.INFO && <InfoTab {...props} />}
                {activeDashboardTab === DashboardTabs.CARDS && <CardsTab {...props} />}
              </>
            )}
          </div>
        </>
      )}
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
