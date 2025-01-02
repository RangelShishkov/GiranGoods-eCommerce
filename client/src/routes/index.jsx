import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import SignUp from "../pages/SignUp";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import OrderPage from "../pages/OrderPage";

import AuthGuard from "../guards/AuthGuard";
import AdminGuard from "../guards/AdminGuard";
import UnauthGuard from "../guards/UnauthGuard";
import PaymentSuccessGuard from "../guards/PaymentSuccessGuard";
import PaymentCancelGuard from "../guards/PaymentCancelGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <UnauthGuard>
            <Login />
          </UnauthGuard>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <UnauthGuard>
            <ForgotPassword />
          </UnauthGuard>
        ),
      },
      {
        path: "sign-up",
        element: (
          <UnauthGuard>
            <SignUp />
          </UnauthGuard>
        ),
      },
      {
        path: "product-category",
        element: <CategoryProduct />,
      },
      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: (
          <AuthGuard>
            <Cart />
          </AuthGuard>
        ),
      },
      {
        path: "success",
        element: (
          <PaymentSuccessGuard>
            <Success />
          </PaymentSuccessGuard>
        ),
      },
      {
        path: "cancel",
        element: (
          <PaymentCancelGuard>
            <Cancel />
          </PaymentCancelGuard>
        ),
      },
      {
        path: "search",
        element: <SearchProduct />,
      },
      {
        path: "order",
        element: (
          <AuthGuard>
            <OrderPage />
          </AuthGuard>
        ),
      },
      {
        path: "admin-panel",
        element: (
          <AdminGuard>
            <AdminPanel />
          </AdminGuard>
        ),
        children: [
          {
            path: "all-users",
            element: (
              <AdminGuard>
                <AllUsers />
              </AdminGuard>
            ),
          },
          {
            path: "all-products",
            element: (
              <AdminGuard>
                <AllProducts />
              </AdminGuard>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
