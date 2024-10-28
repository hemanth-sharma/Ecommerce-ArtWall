// wishlistUtils.js
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export async function wishlistClickHandler(
  product,
  inWishlist,
  setInWishlist,
  isAuthenticated,
  setWishlistItemCount
) {
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
        setWishlistItemCount((prevCount) => prevCount - 1);
      } else {
        // Add to backend wishlist
        await axios.post(
          `${API_URL}api/wishlist/add/`,
          { product_id: product._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInWishlist(true);
        setWishlistItemCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
    }
  } else {
    if (inWishlist) {
      // Removing from localStorage wishlist
      const updatedWishlist = wishlist.filter((item) => item._id !== product._id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setInWishlist(false);
      setWishlistItemCount((prevCount) => prevCount - 1);
    } else {
      // Adding the item in localStorage wishlist
      wishlist.push(product);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setInWishlist(true);
      setWishlistItemCount((prevCount) => prevCount + 1);
    }
  }
}
