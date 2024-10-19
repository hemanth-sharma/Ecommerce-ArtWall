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



function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/products" element={<AllProductsPage />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/product/:id" element={<ProductPage />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/login" element={<LoginPage />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/signup" element={<SignupPage />}></Route>
        </Routes>
        <Routes>
          <Route exact path="/cart" element={<CartPage />}></Route>
        </Routes>
        <Footer />        
      </Router>
    </>
  );
}

export default App;