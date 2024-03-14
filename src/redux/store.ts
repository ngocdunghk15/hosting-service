import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { authSlice } from '~/redux/slice/auth.slice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { gitlabSlice } from '~/redux/slice/gitlab.slice.ts';

const reducers = combineReducers({
  auth: authSlice.reducer,
  gitlab: gitlabSlice.reducer
});

const persistConfig = {
  key: 'u2-music-dashboard',
  storage,
  blacklist: ['auth']
};

const persistedReducer = persistReducer<ReturnType<typeof reducers>>(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      },
      immutableCheck: false
    })

  // devTools: ENVIRONMENT !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
