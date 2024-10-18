'use client';

import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

import { issuing } from '@/api/issuing';
import { API } from '@/api/types';

import { wallets } from '@/api/wallets';
import Dashboard, { DashboardProps } from '@/components/Dashboard';
import Loader from '@/components/ui/Loader';
import whiteLabelConfig from '@/config/whitelabel';
import {
  walletType,
  defaultUpdateInterval,
  WalletTypeValues,
  defaultPaginationParams,
  ModalNames,
  DashboardTabs,
  cardLoadMoreDefaultLimit,
  AppEnviroment,
  RequestStatus,
} from '@/constants';
import useExternalCalc from '@/hooks/useExternalCalc';
import useOrder from '@/hooks/useOrder';
import useWallet from '@/hooks/useWallet';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  selectActiveFiatAvailableCrypto,
  selectConfig,
  selectCurrentWalletBalanceCurrency,
  selectFinanceData,
  selectUser,
} from '@/store/selectors';
import {
  loadMoreFiatAccountCards,
  loadWalletCards,
  loadMoreWalletTransactions,
  loadSelectedWallet,
  loadWalletTransactions,
  loadCardTransactions,
  loadMoreCardTransactions,
  loadSelectedCard,
  setSelectedChain,
  setSelectedCrypto,
  setSelectedFiat,
  setUserWallets,
  clearSelectedCard,
  loadMoreWalletCards,
  hiddenLoadSelectedWallet,
  loadSelectedWalletFiatAccounts,
  loadFiatAccountCards,
  loadMoreSelectedWalletFiatAccounts,
  loadSelectedFiatAccount,
  loadSelectedFiatAccountCards,
} from '@/store/slices/finance';
import { setModalVisible } from '@/store/slices/ui';
import { ChangeDashboardTabAdditionalParams } from '@/types';

const DashboardPage = () => {
  const {
    selectedChain,
    selectedCrypto,
    selectedWallet,
    selectedFiat,
    selectedCard,
    selectedFiatAccount,
    selectedFiatAccountCards,
    bins,
    chains,
    fiats,
    crypto,
    cryptoBySymbol,
    userWallets,
    fiatExchangeRate,
    selectedWalletTransactions,
    selectedWalletCards,
    selectedCardTransactions,
    selectedWalletFiatAccounts,
    selectedWalletFiatAccountsWithCards,
  } = useAppSelector(selectFinanceData);
  const dispatch = useAppDispatch();

  const { isWebAppInitialized, appEnviroment } = useAppSelector(selectConfig);

  const { userData } = useAppSelector(selectUser);
  const selectedWalletBalanceCurrency = useAppSelector(selectCurrentWalletBalanceCurrency);
  const availableToExchangeCrypto = useAppSelector(selectActiveFiatAvailableCrypto);
  const { createOnRampOrder, createOffRampOrder, createCrypto2CryptoOrder, createInternalTopUpOrder } = useOrder();
  const { getWalletAddress, createWalletAddress, clearSelectedCardData, clearSelectedFiatAccountData } = useWallet();
  const externalCalcData = useExternalCalc();

  const allowedCryptoToFiatUuid = fiatExchangeRate.map((item) => item.crypto_uuid);
  const allowedCryptoToFiatList = crypto.filter((item) => allowedCryptoToFiatUuid.includes(item.uuid));

  const [queryDashboardTab, setQueryDashboardTab] = useQueryState<DashboardTabs>('tab', {
    defaultValue: DashboardTabs.MAIN,
    parse: (value) => value as DashboardTabs,
  });
  const [queryCardId, setQueryCardId] = useQueryState('card_id');
  const [queryFiactAccountId, setQueryFiatAccountId] = useQueryState('fiat_account_id');

  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTabs>(queryDashboardTab);
  const [lastActiveWallet, setLastActiveWallet] = useState<API.Wallets.ExtendWallet | null>(null);

  const walletTypes = Object.values(walletType);
  const isTelegramEnviroment = appEnviroment === AppEnviroment.TELEGRAM;

  const selectChain = (chain: API.List.Chains) => dispatch(setSelectedChain(chain));
  const selectCrypto = (currency: API.List.Crypto) => dispatch(setSelectedCrypto(currency));
  const selectFiat = (currency: API.List.Fiat) => dispatch(setSelectedFiat(currency));
  const selectCard = (card_id: string) =>
    Promise.all([dispatch(loadSelectedCard(card_id)), dispatch(loadCardTransactions({ card_id }))]);

  const selectFiatAccount = (fiat_account_id: string) => {
    if (!selectedWallet.data) {
      // eslint-disable-next-line no-console
      console.error('No selected wallet');
      return;
    }

    Promise.all([
      dispatch(loadSelectedFiatAccount(fiat_account_id)),
      dispatch(loadSelectedFiatAccountCards({ fiat_account_id, wallet_uuid: selectedWallet.data.uuid })),
    ]);
  };

  const openKYCModal = () => dispatch(setModalVisible(ModalNames.KYC));

  const changeActiveCard = async (card_id: string | null) => {
    if (!card_id) {
      return clearSelectedCardData(dispatch);
    }

    await selectCard(card_id);
  };

  const changeActiveFiatAccount = async (fiat_account_id: string | null) => {
    setQueryFiatAccountId(fiat_account_id);
    if (!fiat_account_id) {
      return clearSelectedFiatAccountData(dispatch);
    }
    await selectFiatAccount(fiat_account_id);
  };

  const changeDashboardTab = (tab: DashboardTabs, additionalRouteParams?: ChangeDashboardTabAdditionalParams) => {
    setActiveDashboardTab(tab);
    setQueryDashboardTab(tab);

    setQueryCardId(additionalRouteParams?.card_id || null);

    setQueryFiatAccountId(additionalRouteParams?.fiat_account_id || null);

    // activeCardId && changeActiveCard(null); // TODO: check if it's needed
  };

  const loadSelectedWalletCards = async () => {
    const { limit, offset } = defaultPaginationParams;
    selectedWallet.data && dispatch(loadWalletCards({ wallet_uuid: selectedWallet.data.uuid, limit, offset }));
  };

  const loadMoreCardsHandler = async () => {
    selectedWallet.data &&
      dispatch(
        loadMoreWalletCards({
          wallet_uuid: selectedWallet.data.uuid,
          limit: cardLoadMoreDefaultLimit,
          offset: selectedWalletCards.meta.offset,
        }),
      );
  };

  const loadMoreWalletFiatAccountsHandler = async () => {
    selectedWallet.data &&
      dispatch(
        loadMoreSelectedWalletFiatAccounts({
          wallet_uuid: selectedWallet.data.uuid,
          limit: defaultPaginationParams.limit,
          offset: selectedWalletFiatAccounts.meta.offset,
        }),
      );
  };

  const loadMoreFiatAccountCardsHandler = async (fiat_account_id: string) => {
    selectedWallet.data &&
      selectedWalletFiatAccountsWithCards &&
      dispatch(
        loadMoreFiatAccountCards({
          wallet_uuid: selectedWallet.data.uuid,
          fiat_account_id,
          limit: selectedWalletFiatAccountsWithCards[fiat_account_id].cards.meta.limit,
          offset: selectedWalletFiatAccountsWithCards[fiat_account_id].cards.meta.offset,
        }),
      );
  };

  const loadMoreSelectedFiatAccountCardsHandler = async () => {
    selectedWallet.data &&
      selectedFiatAccount.data &&
      dispatch(
        loadMoreSelectedWalletFiatAccounts({
          wallet_uuid: selectedWallet.data.uuid,
          limit: selectedFiatAccountCards.meta.limit,
          offset: selectedFiatAccountCards.meta.offset,
        }),
      );
  };

  const loadMoreWalletTransactionsHandler = () =>
    selectedWallet.data &&
    dispatch(
      loadMoreWalletTransactions({
        wallet_uuid: selectedWallet.data.uuid,
        limit: selectedWalletTransactions.meta.limit,
        offset: selectedWalletTransactions.meta.offset,
      }),
    );

  const loadMoreCardTransactionsHandler = () =>
    selectedCard.data &&
    dispatch(
      loadMoreCardTransactions({
        card_id: selectedCard.data.card_id,
        limit: selectedCardTransactions.meta.limit,
        offset: selectedCardTransactions.meta.offset,
      }),
    );

  const createWallet = async (wallet_type: WalletTypeValues) => {
    await wallets.create(wallet_type);

    const newUserWallets = await wallets.getAll();
    const lastWallet = newUserWallets[newUserWallets.length - 1];
    dispatch(setUserWallets(newUserWallets));
    dispatch(loadSelectedWallet(lastWallet.uuid));
  };

  const selectWallet = async (uuid: string) => {
    await dispatch(loadSelectedWallet(uuid));
  };

  const getOTP = async (card_id: string) => {
    const { data } = await issuing.cards.sensitiveData.otp.get(card_id);

    return data;
  };

  const getSensitiveData = async (card_id: string) => {
    const { data } = await issuing.cards.sensitiveData.get(card_id);

    return data;
  };

  const onWalletChange = async (wallet: API.Wallets.ExtendWallet) => {
    setLastActiveWallet(wallet);
    const isSelectedCryptoInWallet = wallet.balance.some((balance) =>
      balance.details.some((details) => details.crypto.uuid === selectedCrypto?.uuid),
    );

    if (wallet.balance.length && !isSelectedCryptoInWallet) {
      dispatch(setSelectedCrypto(wallet.balance[0].details[0].crypto));
    }

    dispatch(loadWalletTransactions({ wallet_uuid: wallet.uuid }));
    dispatch(
      loadWalletCards({
        wallet_uuid: wallet.uuid,
        limit: defaultPaginationParams.limit,
        offset: defaultPaginationParams.offset,
      }),
    );
    dispatch(loadSelectedWalletFiatAccounts({ wallet_uuid: wallet.uuid }));
    changeActiveCard(null);
  };

  const onWalletTotalAmountUpdate = async (wallet: API.Wallets.ExtendWallet) => {
    setLastActiveWallet(wallet);
    dispatch(
      loadWalletTransactions({
        wallet_uuid: wallet.uuid,
        limit: selectedWalletTransactions.data?.length || defaultPaginationParams.limit,
        offset: 0,
      }),
    );
  };

  const checkWalletUpdates = async () => {
    if (!selectedWallet.data) {
      return;
    }

    selectedWallet.data.uuid !== lastActiveWallet?.uuid && onWalletChange(selectedWallet.data);
    selectedWallet.data.total_amount !== lastActiveWallet?.total_amount &&
      onWalletTotalAmountUpdate(selectedWallet.data);
  };

  const createStandAloneCard = async (data: API.Cards.Create.StandAloneRequest) =>
    issuing.cards.create.standAloneCard(data);

  const createFiatAccountCard = async (data: API.Cards.Create.FiatAccountRequest) =>
    issuing.cards.create.fiatAccountCard(data);

  const updateCard = async (card_id: string, data: API.Cards.Update.Request) => {
    await issuing.cards.update(card_id, data);
    dispatch(
      loadWalletCards({
        wallet_uuid: selectedWallet.data?.uuid || '',
        limit: defaultPaginationParams.limit,
        offset: defaultPaginationParams.offset,
      }),
    );
    await selectCard(card_id);
  };

  const fiatAccountsCardsFirstLoad = async () => {
    selectedWalletFiatAccounts.data &&
      selectedWalletFiatAccounts.data.forEach((fiatAccount) => {
        if (
          selectedWalletFiatAccountsWithCards[fiatAccount.id]?.cards.status === RequestStatus.NONE &&
          selectedWallet.data
        ) {
          dispatch(loadFiatAccountCards({ wallet_uuid: selectedWallet.data.uuid, fiat_account_id: fiatAccount.id }));
        }
      });
  };

  const dasboardProps: DashboardProps = {
    activeDashboardTab,
    allowedCryptoToFiatList,
    appEnviroment,
    availableToExchangeCrypto,
    bins,
    selectedCardTransactions,
    cards: selectedWalletCards,
    chainList: chains,
    changeActiveCard,
    changeActiveFiatAccount,
    changeDashboardTab,
    createStandAloneCard,
    createFiatAccountCard,
    createCrypto2CryptoOrder,
    createCrypto2FiatOrder: createOffRampOrder,
    createFiat2CryptoOrder: createOnRampOrder,
    createInternalTopUpOrder,
    createWallet,
    createWalletAddress,
    cryptoList: crypto,
    cryptoBySymbol,
    externalCalcData,
    fiatList: fiats,
    exchangeRate: fiatExchangeRate,
    getOTP,
    getSensitiveData,
    getWalletAddress,
    isTelegramEnviroment,
    loadMoreWalletCards: loadMoreCardsHandler,
    loadMoreWalletFiatAccounts: loadMoreWalletFiatAccountsHandler,
    loadMoreCardTransactions: loadMoreCardTransactionsHandler,
    loadMoreWalletTransactions: loadMoreWalletTransactionsHandler,
    loadMoreFiatAccountCards: loadMoreFiatAccountCardsHandler,
    loadMoreSelectedFiatAccountCards: loadMoreSelectedFiatAccountCardsHandler,
    loadSelectedWalletCards,
    openKYC: openKYCModal,
    selectCard,
    selectedCard,
    selectedChain,
    selectedCrypto,
    selectedFiat,
    selectedFiatAccount,
    selectedFiatAccountCards,
    selectedWallet,
    selectChain,
    selectCrypto,
    selectFiat,
    selectWallet,
    selectedWalletBalanceCurrency,
    selectedWalletFiatAccounts,
    selectedWalletFiatAccountsWithCards,
    verificationStatus: userData?.kyc_status,
    walletTransactions: selectedWalletTransactions,
    walletTypes,
    wallets: userWallets,
    whiteLabelConfig,
    updateCard,
  };

  useEffect(() => {
    checkWalletUpdates();

    const intervalLoadSelectedWallet = setInterval(() => {
      selectedWallet.data && dispatch(hiddenLoadSelectedWallet(selectedWallet.data.uuid));
    }, defaultUpdateInterval);

    return () => clearInterval(intervalLoadSelectedWallet);
  }, [selectedWallet]);

  useEffect(() => {
    setActiveDashboardTab((queryDashboardTab as DashboardTabs) || DashboardTabs.MAIN);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [queryDashboardTab]);

  useEffect(() => {
    changeActiveCard(queryCardId);
  }, [queryCardId]);

  useEffect(() => {
    changeActiveFiatAccount(queryFiactAccountId);
  }, [queryFiactAccountId]);

  // useEffect(() => {
  //   activeCardId && selectCard(activeCardId);
  // }, []);

  useEffect(() => {
    fiatAccountsCardsFirstLoad();
  }, [selectedWalletFiatAccounts]);

  if (!isWebAppInitialized) {
    return <Loader />;
  }

  return <Dashboard {...dasboardProps} />;
};

export default DashboardPage;
