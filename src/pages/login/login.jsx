import React, { useState, useEffect } from "react";
import "./login.css";
import { API_URL } from "../../constants/Constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Form, Segment, Header, Button, Icon } from "semantic-ui-react";
import logo from "../../assets/images/app_logo.png";

function Login(props) {
  const { setIsLoggedIn } = props;
  //   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user"))
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/welcome");
      // console.log(user);
    }
  }, [user, navigate, setIsLoggedIn]);

  async function handleLoginSubmit(event) {
    event.preventDefault();
    if (!email || !password) {
      return alert("Please input emaild and/or password!");
    }
    try {
      const loginCredentials = {
        email,
        password,
      };

      const res = await axios.post(`${API_URL}/auth/sign_in`, loginCredentials);
      const { data, headers } = res;

      if (data && headers) {
        const accessToken = headers["access-token"];
        const expiry = headers.expiry;
        const client = headers.client;
        const uid = headers.uid;

        setUser({
          accessToken,
          expiry,
          client,
          uid,
          id: data.data.id,
        });
        setIsLoggedIn(true);
      }
    } catch (error) {
      if (error.response.data.errors) {
        setPassword("");
        return alert(error.response.data.errors);
      }
    }
  }
  return (
                <Grid verticalAlign="middle" textAlign="center" style={{ height: '100vh', backgroundColor: 'black' }}>
                <Grid.Column style={{ maxWidth: '450px' }}>
                    <Header as="h1" className="login-header-text" style={{ color: 'white' }}>
                        <img src={logo} alt="App Logo" className="logo" style={{ marginBottom: '20px' }} />
                        Slackerino
                    </Header>
                    <br/>
                    <p style={{ color: 'white' }} className="text1">Enter your email address</p>
                    <p style={{ color: 'gray' }}>We suggest using the email address that you use at work.</p>
                    <br />
                    <br/>
                    <Form onSubmit={handleLoginSubmit} className="login-form">
                    <Segment stacked>
                      <Form.Input
                        fluid
                        icon="user"
                        iconPosition="left"
                        placeholder="Email"
                        type="email"
                        id="loginEmail"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                      <Form.Input
                        fluid
                        icon="lock"
                        iconPosition="left"
                        placeholder="Password"
                        type="password"
                        id="loginPassword"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                      <Button type="submit" color="teal" fluid size="large">
                        Login
                      </Button>
                      </Segment>
                    </Form>
                    <br />
                    <p style={{ color: 'white' }}>---------------- OR ----------------</p>
                    <Button fluid size="large" style={{ marginBottom: '10px', backgroundColor: 'white', color: 'black' }} className="google">
                        <Icon name='google' className="google"/> Login with Google
                    </Button>
                    <Button fluid size="large" style={{ marginBottom: '20px', backgroundColor: 'white', color: 'black' }} className="apple">
                        <Icon name='apple' className="apple"/> Login with Apple
                    </Button>
                    <div className="login-footer-text" style={{ color: 'white' }}>
                        Not using Slackerino yet? <a href="/signup" style={{ color: 'teal' }}>Create an account.</a>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div style={{ color: 'gray', marginTop: '20px' }}>
                        <a href="" style={{ color: 'gray' }}>Privacy & terms</a> |
                        <a href="" style={{ color: 'gray', marginLeft: '10px' }}>Contact us</a> |
                        <a href="" style={{ color: 'gray', marginLeft: '10px' }}>Change region</a>
                    </div>
                </Grid.Column>
            </Grid>
  );
}

export default Login;
