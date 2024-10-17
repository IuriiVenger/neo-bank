/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CustomTheme, ModalNames } from '@/constants';
import { ModalVisibility } from '@/store/types';

type InitialState = {
  popupVisibility: ModalVisibility;
  openModalCount: number;
  activeTheme: CustomTheme | null;
};

const initialPopupVisibility: ModalVisibility = Object.values(ModalNames).reduce((acc, key) => {
  acc[key as ModalNames] = false;
  return acc;
}, {} as ModalVisibility);

const initialState: InitialState = {
  popupVisibility: initialPopupVisibility,
  openModalCount: 0,
  activeTheme: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModalVisible: (state, action: PayloadAction<keyof ModalVisibility>) => {
      state.popupVisibility[action.payload] = true;
    },
    setModalInvisible: (state, action: PayloadAction<keyof ModalVisibility>) => {
      state.popupVisibility[action.payload] = false;
    },
    increaseOpenModalCount: (state) => {
      state.openModalCount += 1;
    },
    decreaseOpenModalCount: (state) => {
      state.openModalCount -= 1;
    },
    setActiveTheme(state, action: PayloadAction<CustomTheme>) {
      state.activeTheme = action.payload;
    },
  },
});

export const { setModalVisible, setModalInvisible, increaseOpenModalCount, decreaseOpenModalCount, setActiveTheme } =
  uiSlice.actions;

export default uiSlice.reducer;
