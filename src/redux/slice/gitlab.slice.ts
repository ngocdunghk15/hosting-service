import { Status } from '~/enum/app.enum.ts';
import { createSlice } from '@reduxjs/toolkit';

export interface GitlabSliceState {
  isConnected: boolean;
  status: Status;
  account: any;
  data: any;
}

export const initialGitlabState: GitlabSliceState = {
  isConnected: false,
  status: Status.IDLE,
  account: {},
  data: []
};

export const gitlabSlice = createSlice({
  name: 'gitlab',
  initialState: initialGitlabState,
  reducers: {
    doRevoke: (state) => {
      state.isConnected = false;
      state.status = Status.IDLE;
      state.account = {};
      state.data = [];
    }
  }
});

export const { doRevoke } = gitlabSlice.actions;
