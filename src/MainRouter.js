import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Clothes } from "./Pages/Clothes/Clothes";
import { Shoes } from "./Pages/Shoes/Shoes";
import { NotFound } from "./Pages/NotFound";
import { NavBar } from "./Components/NavBar/NavBar";
import { Cart } from "./Components/Cart/Cart";
import { Footer } from "./Components/Function";
import { Accessories } from "./Pages/Accessories/Accessories";
import { Profil } from "./Pages/ProfilPages/Profil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Favorite } from "./Pages/ProfilPages/Favorite";
import {Checkout} from "./Pages/Checkout/Checkout"

export function MainRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" extand element={<Home />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/shoes" element={<Shoes />} />
        <Route path="/accessories" element={<Accessories />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/profil/*" element={<Profil />} />
        <Route path="cart/checkout" element={<Checkout />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
