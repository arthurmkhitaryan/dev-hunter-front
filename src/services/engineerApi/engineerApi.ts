import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  CreateEngineerDto,
  Engineer,
  GenerateEngineersResponse,
  GetEngineersArg,
} from '@/services';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const engineerApi = createApi({
  reducerPath: 'engineerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['EngineerList', 'EngineerGenerate', 'EngineerMatches'],
  endpoints: (build) => ({
    getEngineers: build.query<Engineer[], GetEngineersArg>({
      query: (arg) => {
        if (arg && 'subscriptionId' in arg) {
          return {
            url: `/engineers?subscriptionId=${arg.subscriptionId}`,
            method: 'GET',
          };
        }
        return {
          url: '/engineers',
          method: 'GET',
        };
      },
      transformResponse: (response: Engineer[]) => {
        const FIFTEEN_MINUTES = 15 * 60 * 1000;
        const now = Date.now();

        return response.map((eng) => {
          const createdTime = new Date(eng.createdAt).getTime();
          const isNew = now - createdTime <= FIFTEEN_MINUTES;
          return { ...eng, isNew };
        });
      },
      providesTags: (result, _, arg) => {
        if (arg && typeof arg === 'object' && 'subscriptionId' in arg) {
          return [{ type: 'EngineerMatches', id: arg.subscriptionId }];
        }
        return result
          ? [
              { type: 'EngineerList', id: 'LIST' },
              ...result.map((eng) => ({ type: 'EngineerList' as const, id: eng._id })),
            ]
          : [{ type: 'EngineerList', id: 'LIST' }];
      },
    }),

    createEngineer: build.mutation<Engineer, CreateEngineerDto>({
      query: (newEng) => ({
        url: '/engineers',
        method: 'POST',
        body: newEng,
      }),
      invalidatesTags: [{ type: 'EngineerList', id: 'LIST' }],
    }),

    generateEngineers: build.mutation<GenerateEngineersResponse, number>({
      query: (count) => ({
        url: `/engineers/generate?count=${count}`,
        method: 'POST',
      }),
      invalidatesTags: [
        { type: 'EngineerList', id: 'LIST' },
        { type: 'EngineerGenerate', id: 'GEN' },
      ],
    }),
  }),
});

export const { useGetEngineersQuery, useCreateEngineerMutation, useGenerateEngineersMutation } =
  engineerApi;
