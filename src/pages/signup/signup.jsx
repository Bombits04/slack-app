import React, { useState, useEffect } from "react";
import {
  Grid,
  Form,
  Segment,
  Header,
  Button,
  Icon,
  Popup,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/app_logo.png";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [popupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://206.189.91.54/api/v1/auth/";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      console.log("Success:", data);
      setPopupOpen(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (popupOpen) {
      const timer = setTimeout(() => {
        setPopupOpen(false);
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [popupOpen, navigate]);

  return (
    <div className={popupOpen ? "blurred-background" : ""}>
      <Grid
        verticalAlign="middle"
        textAlign="center"
        style={{ height: "100vh", backgroundColor: "black" }}
      >
        <Grid.Column style={{ maxWidth: "450px" }}>
          <Header
            as="h1"
            className="signup-header-text"
            style={{ color: "white" }}
          >
            <img
              src={logo}
              alt="App Logo"
              className="logo"
              style={{ marginBottom: "20px" }}
            />
            Slackerino
          </Header>
          <p style={{ color: "white" }} className="text1">
            First of all, enter your email address
          </p>
          <p style={{ color: "gray" }}>
            We suggest using the email address that you use at work.
          </p>
          <br />
          <Form onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                name="email"
                value={formData.email}
                icon="mail"
                iconPosition="left"
                onChange={handleInputChange}
                type="email"
                placeholder="name@work-email.com"
                required
              />
              <Form.Input
                name="password"
                value={formData.password}
                icon="lock"
                iconPosition="left"
                onChange={handleInputChange}
                type="password"
                placeholder="Enter Password"
              />
              <Form.Input
                name="password_confirmation"
                value={formData.password_confirmation}
                icon="lock"
                iconPosition="left"
                onChange={handleInputChange}
                type="password"
                placeholder="Confirm Password"
              />
              <Button
                type="submit"
                color="teal"
                fluid
                size="large"
                className="signup-button"
              >
                Sign Up
              </Button>
            </Segment>
          </Form>
          <br />
          <p style={{ color: "white" }}>---------------- OR ----------------</p>
          <Button
            fluid
            size="large"
            style={{
              marginBottom: "10px",
              backgroundColor: "white",
              color: "black",
            }}
            className="google"
          >
            <Icon name="google" className="google" /> Sign Up with Google
          </Button>
          <Button
            fluid
            size="large"
            style={{
              marginBottom: "20px",
              backgroundColor: "white",
              color: "black",
            }}
            className="apple"
          >
            <Icon name="apple" className="apple" /> Sign Up with Apple
          </Button>
          <div className="signup-footer-text" style={{ color: "white" }}>
            Already using Slackerino?{" "}
            <a href="/login" style={{ color: "teal" }}>
              Sign in to an existing email.
            </a>
          </div>
          <br />
          <br />
          <div style={{ color: "gray", marginTop: "20px" }}>
            <a href="" style={{ color: "gray" }}>
              Privacy & terms
            </a>{" "}
            |
            <a href="" style={{ color: "gray", marginLeft: "10px" }}>
              Contact us
            </a>{" "}
            |
            <a href="" style={{ color: "gray", marginLeft: "10px" }}>
              Change region
            </a>
          </div>
        </Grid.Column>
      </Grid>
      <Popup
        content="Successfully logged in! Redirecting to login..."
        open={popupOpen}
        position="top center"
        className="custom-popup"
      />
    </div>
  );
};

export default Signup;
