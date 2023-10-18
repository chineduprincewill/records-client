import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi =  createApi({
    reducerPath: "authApi",
    //baseQuery: fetchBaseQuery({ baseUrl: "http://localhost/recordsMan/public"}),
    //baseQuery: fetchBaseQuery({ baseUrl: "https://recycletradezone.com/recordsMan"}),
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000"}),
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body) => {
                return {
                    url: "api/login",
                    method: "post",
                    body,
                };
            },
        }),
    }),
});

export const { useLoginUserMutation } = authApi;