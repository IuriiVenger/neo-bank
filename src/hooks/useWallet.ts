import { API } from '@/api/types';
import { wallets } from '@/api/wallets';
import { WalletTypeValues } from '@/constants';
import { loadSelectedWallet, setSelectedWallet, setUserWallets } from '@/store/slices/finance';
import { AppDispatch } from '@/store/types';

const useWallet = () => {
  const createWallet = async (dispatch: AppDispatch) => {
    await wallets.create(WalletTypeValues.PERSONAL);

    const newUserWallets = await wallets.getAll();
    const lastWallet = newUserWallets[newUserWallets.length - 1];
    dispatch(setUserWallets(newUserWallets));
    dispatch(loadSelectedWallet(lastWallet.uuid));
  };
  const createWalletAddress = async (data: API.Wallets.WalletChain.Request) => wallets.createAddress(data);

  const getWalletAddress = async (chain: number, wallet_uuid: string) => wallets.getAddress(chain, wallet_uuid);

  const initUserWallets = async (dispatch: AppDispatch) => {
    const userWallets = await wallets.getAll();

    if (userWallets.length) {
      const activeWalletUuid = userWallets[0].uuid;
      const activeWallet = await wallets.getByUuid(activeWalletUuid);
      dispatch(setSelectedWallet(activeWallet));
      dispatch(setUserWallets(userWallets));
    } else {
      await createWallet(dispatch);
    }
  };

  const unloadWallets = (dispatch: AppDispatch) => {
    dispatch(setUserWallets([]));
    dispatch(setSelectedWallet(null));
  };

  return { createWalletAddress, getWalletAddress, initUserWallets, unloadWallets };
};

export default useWallet;
