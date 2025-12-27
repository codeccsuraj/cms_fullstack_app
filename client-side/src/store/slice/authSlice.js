import { createSlice } from '@reduxjs/toolkit';

const storedUser = JSON.parse(localStorage.getItem('user'));

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        user: storedUser || null,
        token: storedUser?.accessToken || null,
        isAuthenticated: !!storedUser,
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload
            state.user = user;
            state.token = accessToken;
            state.isAuthenticated = true;

            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("accessToken", accessToken);
        },

        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.isAuthenticated = false;

            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        },
    }
});

export const {
    setCredentials,
    logout
} = authSlice.actions;

export default authSlice.reducer;
