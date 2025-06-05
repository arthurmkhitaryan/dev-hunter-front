import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { CreateSubscriptionDto, Subscription, SubscriptionStats } from '@/services';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const subscriptionApi = createApi({
  reducerPath: 'subscriptionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/subscriptions`,
    prepareHeaders: (headers) => {
      headers.set('Accept', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Subscription', 'Matches'],
  endpoints: (build) => ({
    getSubscriptions: build.query<Subscription[], void>({
      query: () => '',
      providesTags: (result) =>
        result
          ? [
              { type: 'Subscription', id: 'LIST' },
              ...result.map(({ _id }) => ({ type: 'Subscription' as const, id: _id })),
            ]
          : [{ type: 'Subscription', id: 'LIST' }],
    }),

    getSubscriptionById: build.query<Subscription, string>({
      query: (id) => `/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Subscription', id }],
    }),

    createSubscription: build.mutation<Subscription, CreateSubscriptionDto>({
      query: (newSub) => ({
        url: '',
        method: 'POST',
        body: newSub,
      }),
      invalidatesTags: [{ type: 'Subscription', id: 'LIST' }],
    }),

    getSubscriptionStats: build.query<SubscriptionStats, string>({
      query: (id) => `/${id}/stats`,
    }),
  }),
});

export const {
  useGetSubscriptionsQuery,
  useCreateSubscriptionMutation,
  useGetSubscriptionStatsQuery,
  useGetSubscriptionByIdQuery,
} = subscriptionApi;
