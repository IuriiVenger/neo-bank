/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { CustomTheme, ModalNames } from '@/constants';
import { ModalVisibility } from '@/store/types';

type SetVisiblePopupAction = {
  payload: keyof ModalVisibility;
};

type SetThemeAction = {
  payload: CustomTheme;
};

type InitialState = {
  popupVisibility: ModalVisibility;
  openModalCount: number;
  activeTheme: CustomTheme;
};

const customThemesValues = Object.values(CustomTheme);
const externalDefaultTheme = process.env.DEFAULT_THEME as CustomTheme;

const initialPopupVisibility: ModalVisibility = Object.values(ModalNames).reduce((acc, key) => {
  acc[key as ModalNames] = false;
  return acc;
}, {} as ModalVisibility);

const initialState: InitialState = {
  popupVisibility: initialPopupVisibility,
  openModalCount: 0,
  activeTheme: customThemesValues.includes(externalDefaultTheme) ? externalDefaultTheme : CustomTheme.DARK,
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
    setActiveTheme(state, action: SetThemeAction) {
      state.activeTheme = action.payload;
    },
  },
});

export const { setModalVisible, setModalInvisible, increaseOpenModalCount, decreaseOpenModalCount, setActiveTheme } =
  uiSlice.actions;

export default uiSlice.reducer;
