import React from 'react';
import { Container } from "react-bootstrap";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import HomePage from './components/pages/HomePage';
import Footer from './components/Footer';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import CartPage from './components/pages/CartPage';
import ProductPage from './components/pages/ProductPage';
import AllProductsPage from './components/pages/AllProductsPage';
import SearchProductsPage from './components/pages/SearchProductsPage';
import WishlistPage from './components/pages/WishlistPage';




function App() {
  
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/products" element={<AllProductsPage />} />
          <Route exact path="/search" element={<SearchProductsPage />} />
          <Route exact path="/product/:id" element={<ProductPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/signup" element={<SignupPage />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/wishlist" element={<WishlistPage />} />
        </Routes>
        <Footer />        
      </Router>
    </>
  );
}

export default App;