import React from "react";
import { Container, Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="navbar navbar-expand-lg">
      <Container fluid>
        {/* Left Side - Logo and Navigation */}
        <Navbar.Brand href="/"> ArtWALL</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#" className="dropdown-toggle" data-bs-toggle="dropdown">
              Categories
            </Nav.Link>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Separated link</a>
            </div>
          </Nav>

          {/* Middle - Search Bar */}
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

          {/* Right Side - Wishlist, Cart, Login */}
          <Nav className="ms-auto">
            <Nav.Link href="/wishlist">Wishlist <i class="fa-regular fa-heart"></i></Nav.Link>
            <Nav.Link href="/cart">Cart <i class="fa-solid fa-cart-shopping"></i></Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;