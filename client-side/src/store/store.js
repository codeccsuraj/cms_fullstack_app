import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slice/authSlice';
import uiReducer from './slice/uiSlice'
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        ui: uiReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            userApi.middleware,
        ),
});
