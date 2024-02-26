import { createAsyncThunk } from '@reduxjs/toolkit';
import { gitlabService } from '~/services/gitlab.service';

export const loadAccountInfo = createAsyncThunk<any, void>('gitlab/load-account-info', async () => {
  return (await gitlabService.getAccountInfo())?.data;
});