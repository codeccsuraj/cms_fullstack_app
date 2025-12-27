import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { logout } from './authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken;
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }

        return headers;
    }
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        console.warn("Access token expired — trying refresh");

        const refreshResult = await baseQuery("/auth/refresh-token", api, extraOptions);

        if (refreshResult?.data) {
            const newToken = refreshResult.data.accessToken;

            api.dispatch(setCredentials({
                user: api.getState().auth.user,
                accessToken: newToken
            }));

            // retry original request
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    // 🔹 Important: return the result!
    return result;
};


export default baseQueryWithReAuth;