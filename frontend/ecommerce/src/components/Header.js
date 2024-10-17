import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Container, Nav, Navbar, Form, FormControl, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom"; // Import useLocation
import './Header.css'; 

function Header() {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Reference for dropdown
  const location = useLocation(); 

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

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="navbar navbar-expand-lg">
      <Container fluid>
        <Navbar.Brand href="/">ArtWALL</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <div
              className="custom-dropdown" 
              ref={dropdownRef}
            >
              <div
                className={`dropdown-toggle ${showDropdown ? "show" : ""}`}
                id="categoryDropdown"
                onClick={handleDropdownToggle}
              >
                Categories
              </div>
              {showDropdown && (
                <div className={`dropdown-menu p-3 ${showDropdown ? "show" : ""}`}>
                  <Row className="dropdown-row">
                    {categories.map((category) => (
                      <Col key={category._id} xs={12} md={6} lg={3}>
                        <LinkContainer to={{ pathname: "/products/", search: `?category=${category.category}` }}>
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

          <Form className="d-flex mx-auto w-100 my-2 my-lg-0" style={{ maxWidth: "600px" }}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              style={{ flex: 1 }}
            />
            <Button variant="secondary">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </Form>

          <Nav className="ms-auto">
            <Nav.Link href="/wishlist">Wishlist <i className="fa-regular fa-heart"></i></Nav.Link>
            <Nav.Link href="/cart">Cart <i className="fa-solid fa-cart-shopping"></i></Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
