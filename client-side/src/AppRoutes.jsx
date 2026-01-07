import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy-loaded pages
const HomePage = React.lazy(() => import("./shared/home/HomePage"));
const SharedLayout = React.lazy(() => import("./layout/SharedLayout"));

// auth pages`
const Login = React.lazy(() => import("./feature/auth/Login"));
const ForgotPassword = React.lazy(() => import("./feature/auth/ForgotPassword"))

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SharedLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
    {path : "/login", element : <Login />},
    {path : "/reset-password", element : <ForgotPassword />},
  ]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRoutes;
