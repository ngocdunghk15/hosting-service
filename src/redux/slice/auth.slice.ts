import { createSlice } from '@reduxjs/toolkit';

export interface AuthSliceState {
  isLoggedIn: boolean;
}

export const initialAuthState: AuthSliceState = {
  isLoggedIn: false
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
