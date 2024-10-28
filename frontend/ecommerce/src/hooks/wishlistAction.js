import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/wishlistContext";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const useWishlistActions = () => {
  const { isAuthenticated } = useAuth();
  const { setWishlistItemCount } = useWishlist(); 

  const addToWishlist = async (product, inWishlist, setInWishlist) => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isAuthenticated) {
      try {
        const token = localStorage.getItem("authToken");

        if (inWishlist) {
          // Remove from backend wishlist
          await axios.delete(`${API_URL}api/wishlist/remove/${product._id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setInWishlist(false);
          setWishlistItemCount(prevCount => prevCount - 1);
        } else {
          // Add to backend wishlist
          await axios.post(
            "api/wishlist/add/",
            { product_id: product._id },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setInWishlist(true);
          setWishlistItemCount(prevCount => prevCount + 1);
        }
      } catch (error) {
        console.error("Failed to update wishlist:", error);
      }
    } else {
      if (inWishlist) {
        // Remove from localStorage wishlist
        const updatedWishlist = wishlist.filter(
          (item) => item._id !== product._id
        );
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        setInWishlist(false);
        setWishlistItemCount(prevCount => prevCount - 1);
      } else {
        // Add to localStorage wishlist
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setInWishlist(true);
        setWishlistItemCount(prevCount => prevCount + 1);
      }
    }
  };

  return { addToWishlist };
};

export default useWishlistActions;
