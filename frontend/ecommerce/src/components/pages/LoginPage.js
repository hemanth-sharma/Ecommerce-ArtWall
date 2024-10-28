import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { setIsAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      username: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(`/api/users/login/`, userData);
      console.log("Response = ", response)
      if (response.status === 200) {
        // Save token to local storage
        localStorage.setItem("authToken", response.data.access);
        console.log("User logged in: ", response.data);
        setIsAuthenticated(true);
        // Navigate to homepage after login
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("There was an error during login!", error);
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}></Col>
        <Col md={4}>
          <Card>
            <Card.Header as="h3" className="text-center bg-black text-light">
              Login
            </Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>
                    <i className="fa-solid fa-envelope"></i> Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>
                    <i className="fa-solid fa-lock"></i> Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Your Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {error && <Col className="text-danger">{error}</Col>}

                <div className="d-grid gap-2">
                  <Button className="w-100 btn btn-md btn-success" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
              <Row className="py-3">
                <Col>
                  New User?
                  <Link to="/signup">
                    <span className="text-info"> Signup</span>
                  </Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}></Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
