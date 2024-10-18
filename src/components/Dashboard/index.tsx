import { AxiosResponse } from 'axios';
import { FC, useState } from 'react';

import CreateWalletModal from '../modals/CreateWalletModal';
import Loader from '../ui/Loader';

import CardTab from './tabs/CardTab';
import FiatAccountTab from './tabs/FiatAccountTab';
import MainTab from './tabs/MainTab';
import TransactionTab from './tabs/TransactionsTab';
import WalletTab from './tabs/WalletTab';

import { API } from '@/api/types';

import { WhiteLabelConfig } from '@/config/whitelabel';
import { AppEnviroment, DashboardTabs, KYCStatuses, RequestStatus, WalletTypeValues } from '@/constants';

import { UseExternalCalcData } from '@/hooks/useExternalCalc';
import { FiatAccountsWithCards, StoreDataWithStatus, StoreDataWithStatusAndMeta } from '@/store/types';
import { ChangeDashboardTabAdditionalParams, ValueWithLabel } from '@/types';

export interface DashboardProps {
  activeDashboardTab: DashboardTabs;
  allowedCryptoToFiatList: API.List.Crypto[];
  appEnviroment: AppEnviroment | null;
  availableToExchangeCrypto: API.List.Crypto[];
  bins: API.Cards.CardConfig[];
  cards: StoreDataWithStatusAndMeta<API.Cards.CardListItem[] | null>;
  chainList: API.List.Chains[];
  changeActiveCard: (card_id: string | null) => void;
  changeActiveFiatAccount: (fiat_account_id: string | null) => void;
  changeDashboardTab: (tab: DashboardTabs, additionRouteParams?: ChangeDashboardTabAdditionalParams) => void;
  createStandAloneCard: (
    data: API.Cards.Create.StandAloneRequest,
  ) => Promise<AxiosResponse<API.Cards.Create.StandAloneResponse>>;
  createFiatAccountCard: (
    data: API.Cards.Create.FiatAccountRequest,
  ) => Promise<AxiosResponse<API.Cards.Create.FiatAccountResponse>>;
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
  loadMoreFiatAccountCards: (fiat_account_id: string) => void;
  loadMoreSelectedFiatAccountCards: () => void;
  loadMoreWalletCards: () => void;
  loadMoreWalletFiatAccounts: () => void;
  loadMoreCardTransactions: () => void;
  loadMoreWalletTransactions: () => void;
  loadSelectedWalletCards: () => void;
  openKYC: () => void;
  selectCard: (card_id: string) => void;
  selectedCardTransactions: StoreDataWithStatusAndMeta<API.Cards.TransactionItem[] | null>;
  selectChain: (chain: API.List.Chains) => void;
  selectCrypto: (crypto: API.List.Crypto) => void;
  selectFiat: (fiat: API.List.Fiat) => void;
  selectWallet: (wallet_uuid: string) => void;
  selectedCard: StoreDataWithStatus<API.Cards.CardDetailItem | null>;
  selectedChain: null | API.List.Chains;
  selectedCrypto: null | API.List.Crypto;
  selectedFiat: null | API.List.Fiat;
  selectedFiatAccount: StoreDataWithStatus<API.Wallets.FiatAccount | null>;
  selectedFiatAccountCards: StoreDataWithStatusAndMeta<API.Cards.CardListItem[] | null>;
  selectedWallet: StoreDataWithStatus<API.Wallets.ExtendWallet | null>;
  selectedWalletBalanceCurrency: string;
  selectedWalletFiatAccounts: StoreDataWithStatusAndMeta<API.Wallets.FiatAccount[] | null>;
  selectedWalletFiatAccountsWithCards: Record<string, FiatAccountsWithCards>;
  updateCard: (card_id: string, data: API.Cards.Update.Request) => Promise<void>;
  verificationStatus?: KYCStatuses;
  walletTransactions: StoreDataWithStatusAndMeta<API.WalletTransactions.Transaction[] | null>;
  walletTypes: ValueWithLabel[];
  wallets: API.Wallets.Wallet[];
  whiteLabelConfig?: WhiteLabelConfig;
}

const dashboardTabComponents: Record<DashboardTabs, FC<DashboardProps>> = {
  [DashboardTabs.MAIN]: MainTab,
  [DashboardTabs.CARD]: CardTab,
  [DashboardTabs.WALLET]: WalletTab,
  [DashboardTabs.TRANSACTIONS]: TransactionTab,
  [DashboardTabs.FIAT_ACCOUNT]: FiatAccountTab,
};

const Dashboard: FC<DashboardProps> = (props) => {
  const { selectedWallet, createWallet, walletTypes, activeDashboardTab } = props;

  const [isCreateWalletModalOpen, setIsCreateWalletModalOpen] = useState(false);

  const isWalletPending = selectedWallet.status === RequestStatus.PENDING;

  const ActiveComponent = dashboardTabComponents[activeDashboardTab];

  return (
    <section className="flex w-full max-w-screen-xl flex-col  [&>:first-child:not(.back-button)]:lg:mt-10">
      {isWalletPending ? <Loader /> : <ActiveComponent {...props} />}
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
