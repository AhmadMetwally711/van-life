import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import MyFavorites from "./pages/MyFavorites";
import Vans from "./pages/Vans/Vans";
import VanDetail from "./pages/Vans/VanDetail";
import Dashboard from "./pages/Host/Dashboard";
import Income from "./pages/Host/Income";
import Reviews from "./pages/Host/Reviews";
import HostVans from "./pages/Host/HostVans";
import HostVanDetail from "./pages/Host/HostVanDetail";
import AddVan from "./pages/Host/AddVan";
import HostVanInfo from "./pages/Host/HostVanInfo";
import RentVan from "./pages/RentVan";
import MyRentals from "./pages/MyRentals";
import HostVanPricing from "./pages/Host/HostVanPricing";
import HostVanPhotos from "./pages/Host/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HostLayout from "./components/HostLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="vans" element={<Vans />} />
          <Route path="vans/:id" element={<VanDetail />} />
          <Route path="vans/:id/rent" element={<RentVan />} />
          <Route
            path="my-rentals"
            element={
              <ProtectedRoute>
                <MyRentals />
              </ProtectedRoute>
            }
          />

          <Route
            path="favorites"
            element={
              <ProtectedRoute>
                <MyFavorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="host"
            element={
              <ProtectedRoute>
                <HostLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />
            <Route path="add" element={<AddVan />} />
            <Route path="vans/:id" element={<HostVanDetail />}>
              <Route index element={<HostVanInfo />} />
              <Route path="pricing" element={<HostVanPricing />} />
              <Route path="photos" element={<HostVanPhotos />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
