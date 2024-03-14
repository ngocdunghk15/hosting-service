import { createAsyncThunk } from '@reduxjs/toolkit';
import { DoLoginPayload, DoLoginReturned, GetAccountInfoReturned } from '~/types/auth.type';
import { authService } from '~/services/auth.service';
import StorageService from '~/services/storage.service.ts';
import { Token } from '~/enum/app.enum.ts';

export const doLogin = createAsyncThunk<DoLoginReturned, DoLoginPayload>('auth/do-login', async (payload) => {
  const response = (await authService.login(payload))?.data;
  StorageService.set(Token.ACCESS, response?.access_token);
  StorageService.set(Token.REFRESH, response?.refresh_token);
  return response;
});

export const getAccountInfo = createAsyncThunk<GetAccountInfoReturned>('auth/get-account-info', async () => {
  return (await authService.getAccountInfo())?.data;
});
