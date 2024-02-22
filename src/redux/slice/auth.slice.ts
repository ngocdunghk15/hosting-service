import { createSlice } from '@reduxjs/toolkit';
import { Status } from '~/enum/app.enum.ts';

export interface AuthSliceState {
  isLoggedIn: boolean;
  accessToken: string;
  refreshToken: string;
  status: Status;
}

export const initialAuthState: AuthSliceState = {
  isLoggedIn: false,
  accessToken: '',
  refreshToken: '',
  status: Status.IDLE
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setAuthState: (state, action) => ({
      ...state,
      ...action.payload
    })
  }
});

export const { setAuthState } = authSlice.actions;

