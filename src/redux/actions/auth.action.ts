import { createAsyncThunk } from '@reduxjs/toolkit';
import { DoLoginPayload, DoLoginReturned } from '~/types/auth.type';
import { authService } from '~/services/auth.service';

export const doLogin = createAsyncThunk<DoLoginReturned, DoLoginPayload>('auth/do-login', async (payload) => {
  return (await authService.login(payload))?.data;
});
