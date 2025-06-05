import { configureStore } from '@reduxjs/toolkit';
import { subscriptionApi, engineerApi } from '@/services';

export const store = configureStore({
  reducer: {
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [engineerApi.reducerPath]: engineerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(subscriptionApi.middleware).concat(engineerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
