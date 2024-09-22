'use client';

import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

import { issuing } from '@/api/issuing';
import { API } from '@/api/types';

import { wallets } from '@/api/wallets';
import Dashboard, { DashboardProps } from '@/components/Dashboard';
import privateRoute from '@/components/privateRoute';
import Loader from '@/components/ui/Loader';
import whiteLabelConfig from '@/config/whitelabel';
import {
  walletType,
  defaultUpdateInterval,
  WalletTypeValues,
  defaultPaginationParams,
  ModalNames,
  DashboardTabs,
  allowedCryptoToFiatUuid,
  cardInitialPaginationParams,
  cardLoadMoreDefaultLimit,
  AppEnviroment,
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
  loadCards,
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
  loadMoreCards,
  hiddenLoadSelectedWallet,
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
  } = useAppSelector(selectFinanceData);

  const { isWebAppInitialized, appEnviroment } = useAppSelector(selectConfig);

  const { userData } = useAppSelector(selectUser);
  const selectedWalletBalanceCurrency = useAppSelector(selectCurrentWalletBalanceCurrency);
  const availableToExchangeCrypto = useAppSelector(selectActiveFiatAvailableCrypto);
  const { createOnRampOrder, createOffRampOrder, createCrypto2CryptoOrder, createInternalTopUpOrder } = useOrder();
  const { getWalletAddress, createWalletAddress } = useWallet();
  const externalCalcData = useExternalCalc();
  const [lastActiveWallet, setLastActiveWallet] = useState<API.Wallets.ExtendWallet | null>(null);
  const dispatch = useAppDispatch();

  const [queryDashboardTab, setQueryDashboardTab] = useQueryState('tab');
  const [queryCardId, setQueryCardId] = useQueryState('card_id');

  const initialDasboardTab = (queryDashboardTab as DashboardTabs) || DashboardTabs.MAIN;
  const allowedCryptoToFiatList = crypto.filter((item) => allowedCryptoToFiatUuid.includes(item.uuid));

  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTabs>(initialDasboardTab);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const walletTypes = Object.values(walletType);
  const isTelegramEnviroment = appEnviroment === AppEnviroment.TELEGRAM;

  const selectChain = (chain: API.List.Chains) => dispatch(setSelectedChain(chain));
  const selectCrypto = (currency: API.List.Crypto) => dispatch(setSelectedCrypto(currency));
  const selectFiat = (currency: API.List.Fiat) => dispatch(setSelectedFiat(currency));
  const selectCard = (card_id: string) =>
    Promise.all([dispatch(loadSelectedCard(card_id)), dispatch(loadCardTransactions({ card_id }))]);

  const openKYCModal = () => dispatch(setModalVisible(ModalNames.KYC));

  const changeActiveCard = async (card_id: string | null) => {
    setActiveCardId(card_id);
    if (!card_id) {
      dispatch(clearSelectedCard());
      return;
    }

    await selectCard(card_id);
  };

  const changeDashboardTab = (tab: DashboardTabs, additionalRouteParams?: ChangeDashboardTabAdditionalParams) => {
    setActiveDashboardTab(tab);
    setQueryDashboardTab(tab);

    if (additionalRouteParams?.card_id !== undefined) {
      setQueryCardId(additionalRouteParams.card_id);
    }

    activeCardId && changeActiveCard(null);
  };

  const loadSelectedWalletCards = async () => {
    const { limit, offset } = cardInitialPaginationParams;
    selectedWallet.data && dispatch(loadCards({ wallet_uuid: selectedWallet.data.uuid, limit, offset }));
  };

  const loadMoreCardsHandler = async () => {
    selectedWallet.data &&
      dispatch(
        loadMoreCards({
          wallet_uuid: selectedWallet.data.uuid,
          limit: cardLoadMoreDefaultLimit,
          offset: selectedWalletCards.meta.offset,
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
    dispatch(loadWalletTransactions({ wallet_uuid: wallet.uuid }));
    dispatch(
      loadCards({
        wallet_uuid: wallet.uuid,
        limit: cardInitialPaginationParams.limit,
        offset: cardInitialPaginationParams.offset,
      }),
    );
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

  const createCard = async (data: API.Cards.Create.Request) => issuing.cards.create(data);

  const updateCard = async (card_id: string, data: API.Cards.Update.Request) => {
    await issuing.cards.update(card_id, data);
    dispatch(
      loadCards({
        wallet_uuid: selectedWallet.data?.uuid || '',
        limit: selectedWalletCards.meta.limit,
        offset: selectedWalletCards.meta.offset,
      }),
    );
    await selectCard(card_id);
  };

  const dasboardProps: DashboardProps = {
    activeCardId,
    activeDashboardTab,
    allowedCryptoToFiatList,
    appEnviroment,
    availableToExchangeCrypto,
    bins,
    selectedCardTransactions,
    cards: selectedWalletCards,
    chainList: chains,
    changeActiveCard,
    changeDashboardTab,
    createCard,
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
    loadMoreCards: loadMoreCardsHandler,
    loadMoreCardTransactions: loadMoreCardTransactionsHandler,
    loadMoreWalletTransactions: loadMoreWalletTransactionsHandler,
    loadSelectedWalletCards,
    openKYC: openKYCModal,
    selectCard,
    selectedCard,
    selectedChain,
    selectedCrypto,
    selectedFiat,
    selectedWallet,
    selectChain,
    selectCrypto,
    selectFiat,
    selectWallet,
    selectedWalletBalanceCurrency,
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
    changeActiveCard(queryCardId as string);
  }, [queryCardId]);

  useEffect(() => {
    activeCardId && selectCard(activeCardId);
  }, []);

  if (!isWebAppInitialized) {
    return <Loader />;
  }

  return <Dashboard {...dasboardProps} />;
};

export default privateRoute(DashboardPage);
