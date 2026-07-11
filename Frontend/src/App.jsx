import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './pages/login/Signup'
import Signin from './pages/login/Signin'
import Forget from './pages/login/Forget'
import {ToastContainer} from 'react-toastify'
import Home from "./pages/customer/Home";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import { AdminLayout } from "./pages/admin/AdminLayout";
import UnAuthorized from "./protectedRoute/UnAuthorized";
import CustomerLayout from "./pages/customer/CustomerLayout";
import AdminHome from "./pages/admin/AdminHome";
import Product from "./pages/admin/Product";
import Order from "./pages/admin/Order";
import User from "./pages/admin/User";
import Coupon from "./pages/admin/Coupon";
import AdminCategory from "./pages/admin/Category";
import CartPage from "./pages/customer/Cart";
import CheckoutPage from "./pages/customer/CheckoutPage";

const router = createBrowserRouter([

  // Customer Routes
  {
    element: <CustomerLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute allowedRoles={["Customer"]}>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute allowedRoles={["Customer"]}>
            <CartPage/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <ProtectedRoute allowedRoles={["Customer"]}>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  
  // Admin Routes
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Product />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Order/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/categories",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminCategory/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <User/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/coupons",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Coupon/>
          </ProtectedRoute>
        ),
      },
    ],
  },

  // Auth Routes
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/forget",
    element: <Forget />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorized />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer/>
    </>
  )
}
export default App;
