import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoutes from "./layout/ProtectedRoutes";
import { useSelector } from "react-redux";

const SharedLayout = lazy(() => import("./layout/SharedLayout"));
const HomePage = lazy(() => import("./shared/home/HomePage"))

const UserLayout = lazy(() => import("./layout/UserLayout"))
const UserProfileLayout = lazy(() => import("./shared/profile/user/UserProfileLayout"))
const ProfilePage = lazy(() => import("./shared/profile/user/ProfilePage"))


const AppRoutes = () => {
    const accessToken = useSelector((state) => state.auth.token);

    const router = createBrowserRouter([
        {
            path: "",
            element: (
                <Suspense fallback={<div>Loading layout...</div>}>
                    <SharedLayout />
                </Suspense>
            ),
            children: [
                { path: '', element: <HomePage /> },
                {
                    path: '/auth', element: (
                        <ProtectedRoutes>
                            <p>this is nrew page</p>
                        </ProtectedRoutes>
                    )
                },
            ]
        },
    ]);

    const authRoutes = createBrowserRouter([
        {
            path: '/',
            element: (
                <Suspense fallback={<p>Loading page</p>}>
                    <UserLayout />
                </Suspense>
            ),
            children: [
                { index: true, element: <p>This is layout</p> },
                {
                    path: '/profile',
                    element: (
                        <Suspense fallback={<p>Page Loading...</p>}>
                            <UserProfileLayout />
                        </Suspense>
                    ),
                    children: [
                        { index: true, element: <ProfilePage /> }
                    ]
                }
            ]
        }
    ])

    return <RouterProvider router={accessToken ? authRoutes : router} />;
};

export default AppRoutes;
