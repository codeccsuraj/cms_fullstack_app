import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "../slice/apiSlice";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes : ["users"],
    endpoints: (builder) => ({
        addUserByAuth: builder.mutation({
            query: (data) => ({
                url: "/user/add-personal-info",
                method: "POST",
                body: data,
            }),
            invalidatesTags : ["users"]
        }),

        getUserByAuth: builder.query({
            query: (id) => ({
                url: "/user/get",
                method: "GET",
                params: { id }
            }),
            providesTags : ["users"]
        }),
    }),
});

export const {
    useAddUserByAuthMutation,
    useGetUserByAuthQuery,
} = userApi;
