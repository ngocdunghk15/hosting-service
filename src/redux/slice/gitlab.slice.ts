import { Status } from '~/enum/app.enum.ts';
import { createSlice } from '@reduxjs/toolkit';
import { loadAccountInfo } from '~/redux/actions/gitlab.action';
import { GitlabAccount } from '~/types/gitlab.type';

export interface GitlabSliceState {
  isConnected: boolean;
  status: Status;
  account: {
    data: GitlabAccount;
    status: Status;
  };
}

export const initialGitlabState: GitlabSliceState = {
  isConnected: false,
  status: Status.IDLE,
  account: {
    data: {} as GitlabAccount,
    status: Status.IDLE
  }
};

export const gitlabSlice = createSlice({
  name: 'gitlab',
  initialState: initialGitlabState,
  reducers: {
    doRevoke: (state) => {
      state.isConnected = false;
      state.status = Status.IDLE;
      state.account = {
        data: {} as GitlabAccount,
        status: Status.IDLE
      };
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload.isConnected;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAccountInfo.pending, (state) => {
        state.account.status = Status.PENDING;
      })
      .addCase(loadAccountInfo.fulfilled, (state, action) => {
        state.account.data = action.payload.data.account;
        state.account.status = Status.FULFILLED;
      })
      .addCase(loadAccountInfo.rejected, (state) => {
        state.account.data = {} as GitlabAccount;
        state.account.status = Status.REJECTED;
      });
  }
});

export const { setIsConnected, doRevoke } = gitlabSlice.actions;
