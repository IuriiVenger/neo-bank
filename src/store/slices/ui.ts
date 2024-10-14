/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CustomTheme, ModalNames } from '@/constants';
import { ModalVisibility } from '@/store/types';
import { getFromLocalStorage } from '@/utils/helpers';

type InitialState = {
  popupVisibility: ModalVisibility;
  openModalCount: number;
  activeTheme: CustomTheme;
};

const customThemesValues = Object.values(CustomTheme);
const envDefaultTheme = process.env.DEFAULT_THEME as CustomTheme;
const localStorageTheme = getFromLocalStorage('active_theme') as CustomTheme;
const externalDefaultTheme = localStorageTheme || envDefaultTheme;
const defaultTheme = customThemesValues.includes(externalDefaultTheme) ? externalDefaultTheme : CustomTheme.DARK;

const initialPopupVisibility: ModalVisibility = Object.values(ModalNames).reduce((acc, key) => {
  acc[key as ModalNames] = false;
  return acc;
}, {} as ModalVisibility);

const initialState: InitialState = {
  popupVisibility: initialPopupVisibility,
  openModalCount: 0,
  activeTheme: defaultTheme,
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
      localStorage.setItem('active_theme', action.payload);
    },
  },
});

export const { setModalVisible, setModalInvisible, increaseOpenModalCount, decreaseOpenModalCount, setActiveTheme } =
  uiSlice.actions;

export default uiSlice.reducer;
