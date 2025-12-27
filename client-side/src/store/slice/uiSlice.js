import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoginState: false,
        isRegisterState: false,
        isForgotPasswordState: false,
    },
    reducers: {
        toggleLoginState: (state) => {
            state.isLoginState = true;
            state.isRegisterState = false;
            state.isForgotPasswordState = false;
        },
        toggleRegisterState: (state) => {
            state.isRegisterState = true;
            state.isLoginState = false;
            state.isForgotPasswordState = false;
        },
        toggleForgotPasswordState: (state) => {
            state.isForgotPasswordState = true;
            state.isLoginState = false;
            state.isRegisterState = false;
        },
        closeAllState: (state) => {
            state.isLoginState = false;
            state.isRegisterState = false;
            state.isForgotPasswordState = false;
        },
    }
});

export const {
    toggleLoginState,
    toggleRegisterState,
    toggleForgotPasswordState,
    closeAllState
} = uiSlice.actions;

export default uiSlice.reducer;
