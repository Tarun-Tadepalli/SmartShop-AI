import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import AddProduct from "../pages/AddProduct";
import Orders from "../pages/Orders";
import Profile from "../pages/Profile";
import AIAssistant from "../pages/AIAssistant";
import CustomerProduct from "../pages/CustomerProducts";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import CustomerProfile from "../pages/CustomerProfile";
import CustomerAIAssistant from "../pages/CustomerAIAssistant";
import MyOrders from "../pages/MyOrders";
import TrackOrder from "../pages/TrackOrder";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>  
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
      <Route path="/products/:id" element={ <ProtectedRoute><ProductDetails /></ProtectedRoute>} />
      <Route path="/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
      <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
      <Route path="/customer-product" element={<ProtectedRoute><CustomerProduct /></ProtectedRoute>} />
      <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/customer-profile" element={<ProtectedRoute><CustomerProfile /></ProtectedRoute>} />
      <Route path="/customer-ai-assistant" element={<ProtectedRoute><CustomerAIAssistant /></ProtectedRoute>} />
      <Route path="/my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
      <Route path="/track-order" element={<ProtectedRoute><TrackOrder /></ProtectedRoute>} />
    </Routes>
  );
}

export default AppRoutes;