import { createAsyncThunk } from '@reduxjs/toolkit';
import { gitlabService } from '~/services/gitlab.service';
import { GitlabAccountReturned, GitlabProjectReturned } from '~/types/gitlab.type.ts';

export const loadAccountInfo = createAsyncThunk<GitlabAccountReturned>('gitlab/load-account-info', async () => {
  return (await gitlabService.getAccountInfo())?.data;
});

export const loadAllProjects = createAsyncThunk<GitlabProjectReturned>('gitlab/load-all-projects', async () => {
  return (await gitlabService.getAllProjects())?.data;
});
