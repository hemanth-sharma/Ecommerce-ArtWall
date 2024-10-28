
import { useCart } from "../context/cartContext";
import axios from "axios";
import { useAuth } from "../context/AuthContext"
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT



const useCartActions = () => {
  const { setCartItemCount } = useCart();
  const { isAuthenticated } = useAuth();

  const addToCart = async (product, quantity = 1) => {
    if (isAuthenticated) {
      // If user is authenticated, get the token 
      const token = localStorage.getItem("authToken");
      try {
      const response = await axios.post(`${API_ENDPOINT}/api/cart/add/`, {
        product_id: product._id,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });



        alert('Product added to cart (Quantity: ' + quantity + ')');
        setCartItemCount(prevCount => prevCount + quantity);
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add product to cart.'); // You can enhance error handling as needed
      }
    } else {
      // If user is not authenticated, add product to local storage with quantity
      const localCart = JSON.parse(localStorage.getItem('cart')) || [];
  
      // Find existing item in the cart based on product._id
      const existingItem = localCart.find(item => item.product._id === product._id);
  
      if (existingItem) {
        existingItem.quantity += quantity; // Increment quantity for existing item
      } else {
        localCart.push({ product, quantity }); // Add new item with quantity
      }
  
      localStorage.setItem('cart', JSON.stringify(localCart));
      alert('Product added to cart (Quantity: ' + quantity + ')');
      setCartItemCount(prevCount => prevCount + quantity);
    }
  };
  

  
  return { addToCart };
};

export default useCartActions;


