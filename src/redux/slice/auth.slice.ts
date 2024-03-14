import { createSlice } from '@reduxjs/toolkit';
import { Status } from '~/enum/app.enum.ts';
import { doLogin, getAccountInfo } from '~/redux/actions/auth.action';
import { Account } from '~/types/account.type';

export interface AuthSliceState {
  isLoggedIn: boolean;
  account: {
    data: Account;
    status: Status;
  };
  status: Status;
}

export const initialAuthState: AuthSliceState = {
  isLoggedIn: false,
  status: Status.IDLE,
  account: {
    data: {} as Account,
    status: Status.IDLE
  }
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    doLogout: (state) => {
      state.isLoggedIn = false;
      state.account = {
        data: {} as Account,
        status: Status.IDLE
      };
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
        state.account.data = action.payload.account;
        state.isLoggedIn = true;
        state.status = Status.FULFILLED;
      })
      .addCase(doLogin.rejected, (state) => {
        state.status = Status.REJECTED;
      });

    builder
      .addCase(getAccountInfo.pending, (state) => {
        state.account.status = Status.PENDING;
      })
      .addCase(getAccountInfo.fulfilled, (state, action) => {
        state.account.data = action.payload.data.account;
        state.isLoggedIn = true;
        state.account.status = Status.FULFILLED;
      })
      .addCase(getAccountInfo.rejected, (state) => {
        state.isLoggedIn = false;
        state.account.status = Status.REJECTED;
      });
  }
});

export const { setAuthState, doLogout } = authSlice.actions;
