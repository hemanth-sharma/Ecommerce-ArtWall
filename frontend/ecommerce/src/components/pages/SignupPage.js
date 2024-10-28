import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux"


function SignupPage() {
  const checkValidPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{5,}$");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    pass1: "",
    pass2: "",
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
    console.log(formData);
    
    if(formData.pass1 !== formData.pass2){
      setError("Passwords do not match")
      return;
    }
    else if(!checkValidPassword.test(formData.pass1)){
      setError("A password must include special characters, numbers, and alphabets.");
      return;  
    }
    else{
      setError("");
    }
    try{
      const response = await axios.post(`/api/users/register/`, {
        fname: formData.fname,
        lname: formData.lname, 
        email: formData.email,
        password: formData.pass1,
      });
      console.log(response.data)
      navigate("/login");
    } catch (error) {
      console.error("There was an error registering!", error);
      if (error.response && error.response.data.details){
        setError(error.response.data.details);
      } else {
        setError("An error occured. Please try again.");
      }
    }
  };
  
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header as="h3" className="text-center bg-black text-light">
                Signup
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="fname">
                    <Form.Label>
                      <span>
                        <i className="fa fa-user"></i>
                      </span>
                      First Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your First Name"
                      value={formData.fname}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="lname">
                    <Form.Label>
                      <span>
                        <i className="fa fa-user"></i>
                      </span>
                      Last Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Last Name"
                      value={formData.lname}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>
                      <span>
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="pass1">
                    <Form.Label>
                      <span>
                      <i class="fa-solid fa-lock"></i>
                      </span>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      id="pass1"
                      placeholder="Enter Your Password"
                      value={formData.pass1}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="pass2">
                    <Form.Label>
                      <span>
                       <i class="fa-solid fa-lock"></i>
                      </span>
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      id="pass2"
                      placeholder="Confirm Password"
                      value={formData.pass2}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  {error && <Col className="text-danger">{error}</Col>}

                  <div className="d-grid gap-2">
                    <Button
                      className="w-100 btn btn-md btn-success"
                      type="submit"
                    >
                      Signup
                    </Button>
                  </div>
                </Form>
                <Row className="py-3">
                  <Col>
                    Already User?<Link to="/login"><span class="text-info">Login</span></Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default SignupPage;
