import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReAuth from "../slice/apiSlice";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: baseQueryWithReAuth,
    tagTypes: ["users"],
    endpoints: (builder) => ({
        addUserByAuth: builder.mutation({
            query: (data) => ({
                url: "/user/add-personal-info",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["users"]
        }),

        getUserByAuth: builder.query({
            query: (id) => ({
                url: "/user/get",
                method: "GET",
                params: { id }
            }),
            providesTags: ["users"]
        }),

        updateAddress: builder.mutation({
            query: ({ authId, data }) => ({
                url: `/user/update-address?authId=${authId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["users"],
        })

    }),
});

export const {
    useAddUserByAuthMutation,
    useGetUserByAuthQuery,
    useUpdateAddressMutation
} = userApi;
