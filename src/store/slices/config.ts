/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { AppEnviroment } from '@/constants';

type SetAppEnviromentAction = {
  payload: AppEnviroment;
};

type ConfigState = {
  appEnviroment: AppEnviroment | null;
  isWebAppInitialized: boolean;
  isAppFullInitialized: boolean;
};

const initialState: ConfigState = {
  appEnviroment: null,
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
    setAppEnviroment(state, action: SetAppEnviromentAction) {
      state.appEnviroment = action.payload;
    },
  },
});

export const { setWebAppInitialized, setAppEnviroment, setAppFullInitialized } = confgiSlice.actions;

export default confgiSlice.reducer;
