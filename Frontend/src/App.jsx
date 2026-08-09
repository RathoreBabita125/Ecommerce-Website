import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from './pages/login/Signup'
import Signin from './pages/login/Signin'
import Forget from './pages/login/Forget'
import { ToastContainer } from 'react-toastify'
import Home from "./pages/customer/Home";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import { AdminLayout } from "./pages/admin/AdminLayout";
import UnAuthorized from "./protectedRoute/UnAuthorized";
import CustomerLayout from "./pages/customer/CustomerLayout";
import AdminHome from "./pages/admin/AdminHome";
import Product from "./pages/admin/Product";
import User from "./pages/admin/User";
import Coupon from "./pages/admin/Coupon";
import AdminCategory from "./pages/admin/Category";
import CartPage from "./pages/customer/Cart";
import CheckoutPage from "./pages/customer/CheckoutPage";
import WishlistPage from "./pages/customer/Wishlist";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import AddAdddress from "./pages/address/AddAddress";

const router = createBrowserRouter([

  // Customer Routes
  {
    element: <>
      <CartProvider>
        <WishlistProvider>
          <CustomerLayout />
        </WishlistProvider>
      </CartProvider>,
    </>,
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
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <ProtectedRoute allowedRoles={["Customer"]}>
            <WishlistPage />
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
      {
        path: "/address",
        element: (
          <ProtectedRoute allowedRoles={["Customer"]}>
            <AddAdddress />
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
        path: "/admin/categories",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminCategory />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/users",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <User />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/coupons",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Coupon />
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
      <ToastContainer />
    </>
  )
}
export default App;
