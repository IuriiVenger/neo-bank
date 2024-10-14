/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ConfigState } from '../types';

import { AppEnviroment } from '@/constants';

const initialState: ConfigState = {
  appEnviroment: AppEnviroment.WEB,
  isAppFullInitialized: false,
  isWebAppInitialized: false,
};

const confgiSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setWebAppInitialized: (state, action) => {
      state.isWebAppInitialized = action.payload;
    },
    setAppFullInitialized: (state, action) => {
      state.isAppFullInitialized = action.payload;
    },
    setAppEnviroment(state, action: PayloadAction<AppEnviroment>) {
      state.appEnviroment = action.payload;
    },
  },
});

export const { setWebAppInitialized, setAppEnviroment, setAppFullInitialized } = confgiSlice.actions;

export default confgiSlice.reducer;
