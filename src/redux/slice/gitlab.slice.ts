import { Status } from '~/enum/app.enum.ts';
import { createSlice } from '@reduxjs/toolkit';
import { loadAccountInfo, loadAllProjects } from '~/redux/actions/gitlab.action';
import { GitlabAccount, GitlabProject } from '~/types/gitlab.type';

export interface GitlabSliceState {
  isConnected: boolean;
  account: {
    data: GitlabAccount;
    status: Status;
  };
  projects: {
    data: GitlabProject[];
    status: Status;
  };
}

export const initialGitlabState: GitlabSliceState = {
  isConnected: false,
  account: {
    data: {} as GitlabAccount,
    status: Status.IDLE
  },
  projects: {
    data: [],
    status: Status.IDLE
  }
};

export const gitlabSlice = createSlice({
  name: 'gitlab',
  initialState: initialGitlabState,
  reducers: {
    doRevoke: (state) => {
      state.isConnected = false;
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
        state.account.status = Status.REJECTED;
      });

    builder
      .addCase(loadAllProjects.pending, (state) => {
        state.projects.status = Status.PENDING;
      })
      .addCase(loadAllProjects.fulfilled, (state, action) => {
        state.projects.data = action.payload.data.projects;
        state.projects.status = Status.FULFILLED;
      })
      .addCase(loadAllProjects.rejected, (state) => {
        state.projects.status = Status.REJECTED;
      });
  }
});

export const { setIsConnected, doRevoke } = gitlabSlice.actions;
