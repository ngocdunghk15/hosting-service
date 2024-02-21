import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authSlice } from '~/redux/slice/auth.slice';

const reducers = combineReducers({
  auth: authSlice.reducer
});

const persistConfig = {
  key: 'u2-music-dashboard',
  storage,
  whitelist: ['auth']
};

const persistedReducer = persistReducer<ReturnType<typeof reducers>>(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer
  // devTools: ENVIRONMENT !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);

