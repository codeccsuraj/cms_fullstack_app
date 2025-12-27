import { lazy } from "react"

export const publicAuthRoutes = [
    {title : "", path : "/login", element : lazy(() => import("../feature/auth/Login"))},
    {title : "", path : "/register", element : lazy(() => import("../feature/auth/Register"))},
    {title : "", path : "/forgot-password", element : lazy(() => import("../feature/auth/ForgotPassword"))},
];

export const sharedPages = [
    {path : '', index : true, element : lazy(() => import("../shared/home/HomePage"))}
] 