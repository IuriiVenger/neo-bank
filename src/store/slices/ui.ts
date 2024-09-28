/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { ModalNames } from '@/constants';
import { ModalVisibility } from '@/store/types';

type SetVisiblePopupAction = {
  payload: keyof ModalVisibility;
};

type InitialState = {
  popupVisibility: ModalVisibility;
  openModalCount: number;
};

const initialPopupVisibility: ModalVisibility = Object.values(ModalNames).reduce((acc, key) => {
  acc[key as ModalNames] = false;
  return acc;
}, {} as ModalVisibility);

const initialState: InitialState = {
  popupVisibility: initialPopupVisibility,
  openModalCount: 0,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModalVisible: (state, action: SetVisiblePopupAction) => {
      state.popupVisibility[action.payload] = true;
    },
    setModalInvisible: (state, action: SetVisiblePopupAction) => {
      state.popupVisibility[action.payload] = false;
    },
    increaseOpenModalCount: (state) => {
      state.openModalCount += 1;
    },
    decreaseOpenModalCount: (state) => {
      state.openModalCount -= 1;
    },
  },
});

export const { setModalVisible, setModalInvisible, increaseOpenModalCount, decreaseOpenModalCount } = uiSlice.actions;

export default uiSlice.reducer;
