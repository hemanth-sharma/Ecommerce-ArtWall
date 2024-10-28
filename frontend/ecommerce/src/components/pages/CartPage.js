
import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import CartItem from "../CartItem"; // Adjust path as needed
import axios from "axios";
import { useCart } from "../../context/cartContext";
import { useAuth } from "../../context/AuthContext";
const BACKEND_URL = process.env.REACT_APP_API_URL;

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const { isAuthenticated } = useAuth();
    const { setIsAuthenticated } = useAuth();
    
    const { cartItemCount } = useCart();
    const { setCartItemCount } = useCart();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token);
        if (token) {
            // Fetch cart items from backend
            fetchCartItemsFromBackend(token);
        } else {
            // Load cart items from local storage
            loadCartFromLocalStorage();
        }
    }, []);

    const fetchCartItemsFromBackend = async (token) => {
        console.log(token)
        try {
            const response = await axios.get(`${BACKEND_URL}api/cart/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response)
            setCartItems(response.data);
        } catch (error) {
            console.error("Failed to fetch cart items from backend:", error);
        }
    };

    const loadCartFromLocalStorage = () => {
        const localCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(localCart);
    };

    const handleRemoveItem = (productId) => {
      // Check if the item exists in the current cart state
      const itemInCart = cartItems.find(item => item.product._id === productId);
  
      if (itemInCart) {
          // Check quantity and update accordingly
          if (itemInCart.quantity > 1) {
              // Decrement quantity and update the cart state
              const updatedCart = cartItems.map(item => 
                  item.product._id === productId ? { ...item, quantity: item.quantity - 1 } : item
              );
              setCartItems(updatedCart);
              setCartItemCount(prev => prev - 1);
              // Update local storage
              // const localCart = JSON.parse(localStorage.getItem("cart")) || [];
              // const localItem = localCart.find(item => item.product._id === productId);
              // if (localItem) {
              //     localItem.quantity--;
              //     localStorage.setItem("cart", JSON.stringify(localCart));
              // }
          } else {
              // Remove item from cart and local storage
              const updatedCart = cartItems.filter(item => item.product._id !== productId);
              setCartItems(updatedCart);
              setCartItemCount(prev => prev - 1);
  
              const localCart = JSON.parse(localStorage.getItem("cart")) || [];
              const updatedLocalCart = localCart.filter(item => item.product._id !== productId);
              localStorage.setItem("cart", JSON.stringify(updatedLocalCart));
          }
      }
  };
  

    const handleBuyAll = () => {
        // Redirect to checkout page for all items
        window.location.href = "/checkout/all";
    };

    return (
        <Container>
            <h1 className="text-center mt-4">Your Cart</h1>
            {cartItems.length > 0 ? (
                <>
                    {cartItems.map((item) => (
                        <CartItem key={item.product._id} product={item} onRemove={handleRemoveItem} />
                    ))}
                    <div className="text-center mt-4">
                        <Button variant="primary" className="w-25" onClick={handleBuyAll}>
                            Buy All
                        </Button>
                    </div>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </Container>
    );
}

export default CartPage;
