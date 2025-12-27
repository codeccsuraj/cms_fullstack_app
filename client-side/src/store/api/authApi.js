import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "../slice/apiSlice";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReAuth,
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: "/auth/create",
                method: "POST",
                body: data,
            }),
        }),
        authenticateUser: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }),
        })
    })
});

export const { 
    useRegisterUserMutation,
    useAuthenticateUserMutation
} = authApi;