import { createSlice } from '@reduxjs/toolkit';
import { Status } from '~/enum/app.enum.ts';
import { doLogin } from '~/redux/actions/auth.action';
import { Account } from '~/types/account.type';

export interface AuthSliceState {
  isLoggedIn: boolean;
  account: Account;
  status: Status;
}

export const initialAuthState: AuthSliceState = {
  isLoggedIn: false,
  status: Status.IDLE,
  account: {} as Account
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    doLogout: (state) => {
      state.isLoggedIn = false;
      state.account = {} as Account;
      state.isLoggedIn = false;
    },
    setAuthState: (state, action) => ({
      ...state,
      ...action.payload
    })
  },
  extraReducers: (builder) => {
    builder
      .addCase(doLogin.pending, (state) => {
        state.status = Status.PENDING;
      })
      .addCase(doLogin.fulfilled, (state, action) => {
        state.account = action.payload.account;
        state.isLoggedIn = true;
        state.status = Status.FULFILLED;
      })
      .addCase(doLogin.rejected, (state) => {
        state.status = Status.REJECTED;
      })
  }
});

export const { setAuthState, doLogout } = authSlice.actions;
