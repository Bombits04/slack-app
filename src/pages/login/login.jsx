import React, { useState, useEffect } from "react";
import "./login.css";
import { API_URL } from "../../constants/Constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      navigate("/dashboard");
      console.log(user);
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
    <div className="login-container">
      <div className="form-wrapper">
        <span>
          <h1>LOGIN</h1>
        </span>
        <form
          action="submit"
          className="login-form"
          onSubmit={handleLoginSubmit}
        >
          <input
            type="text"
            placeholder="email"
            id="loginEmail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            id="loginPassword"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="login-button">
            <button type="submit">Login</button>
            <button type="button" onClick={() => navigate("/signup")}>
              Sign-up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
