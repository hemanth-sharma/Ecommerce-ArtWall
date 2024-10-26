import axios from "axios";
import React, { useEffect, useState, useRef, createContext } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { useCart } from "../context/cartContext";
import { useWishlist } from "../context/wishlistContext";
import { useAuth } from "../context/AuthContext";

function Header() {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isAuthenticated } = useAuth();
  const { setIsAuthenticated } = useAuth();
  const dropdownRef = useRef(null); // Reference for dropdown
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItemCount } = useCart();
  const { setCartItemCount } = useCart();
  const { wishlistItemCount } = useWishlist();
  const { setWishlistItemCount } = useWishlist();

  useEffect(() => {
    const checkAuthToken = () => {
      const token = localStorage.getItem("authToken");
      setIsAuthenticated(!!token);
    };

    checkAuthToken();
    window.addEventListener("storage", checkAuthToken);

    return () => {
      window.removeEventListener("storage", checkAuthToken);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("api/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setShowDropdown(false);
  }, [location]);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Remove token from local storage
    localStorage.removeItem("cartItemCount");
    localStorage.removeItem("wishlistItemCount");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    setIsAuthenticated(false);
    setCartItemCount(0);
    setWishlistItemCount(0);
    navigate("/");
  };

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="navbar navbar-expand-lg"
    >
      <Container fluid>
        <Navbar.Brand href="/">ArtWALL</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <div className="custom-dropdown" ref={dropdownRef}>
              <Nav.Link
                // href="#"
                className={`dropdown-toggle ${showDropdown ? "show" : ""}`}
                id="categoryDropdown"
                onClick={handleDropdownToggle}
              >
                Categories
              </Nav.Link>
              {showDropdown && (
                <div
                  className={`dropdown-menu p-3 ${showDropdown ? "show" : ""}`}
                >
                  <Row className="dropdown-row">
                    {categories.map((category) => (
                      <Col key={category._id} xs={12} md={6} lg={3}>
                        <LinkContainer
                          to={{
                            pathname: "/products",
                            search: `?category=${category.category}`,
                          }}
                        >
                          <Nav.Link className="dropdown-item">
                            {category.category}
                          </Nav.Link>
                        </LinkContainer>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          </Nav>

          <Form
            className="d-flex mx-auto w-100 my-2 my-lg-0"
            style={{ maxWidth: "600px" }}
            onSubmit={handleSearch}
          >
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ flex: 1 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="secondary" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </Form>

          <Nav className="ms-auto">
            <Nav.Link href="/wishlist">
              Wishlist <i className="fa-regular fa-heart"></i>
              {wishlistItemCount > 0 && (
                <span className="cart-count">{wishlistItemCount}</span>
              )}
            </Nav.Link>
            <Nav.Link href="/cart">
              Cart <i className="fa-solid fa-cart-shopping"></i>
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </Nav.Link>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
