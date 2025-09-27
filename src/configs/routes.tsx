import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/pages/auth/Login";
import { Home } from "@/pages/home/Home";
import Profile from "@/pages/profile/Profile";
import { ErrorPage } from "@/components/pages/ErrorPage";
import { NotFoundPage } from "@/components/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
