import React, { useEffect, useState } from "react";
import { Container, Grid, Header, Icon } from "semantic-ui-react";
import appLogo from "../../assets/images/app_logo.png";
import man from "../../assets/images/man.png";
import bubble from "../../assets/images/chatbubble.gif";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

const Welcome = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && userList.length === 0) {
      async function fetchUsers() {
        const users = await UserService.getUsers(user);
        setUserList(users);
      }
      fetchUsers();
    }
  }, [userList]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDifferentEmail = () => {
    localStorage.clear();
    navigate("/signup");
  };

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user ? user.uid : "";

  return (
    <div className="welcome-page">
      <div className="header-wrapper">
        <span className="header caveat-700">
          <img src={appLogo} width="40px" alt="App Logo" /> Slackerino
        </span>
        <div className="menu-icons">
          <Icon name="user" size="large" onClick={() => navigate("/welcome")} />
          <Icon name="dashboard" size="large" onClick={() => {
            setTimeout(() => {
              navigate("/redirect");
            }, 1000);
            setTimeout(() => {
              navigate("/dashboard");
            }, 10000);
          }} />
          <Icon name="setting" size="large" onClick={() => navigate("/settings")} />
          <Icon name="sign-out" size="large" onClick={handleDifferentEmail}/>
        </div>
      </div>

      <Grid className="content">
        <Grid.Column style={{ maxWidth: "1400px" }}>
          <Header as="h1" className="header-text">
            Slackerino
          </Header>
          <br />
          <br />
          <br />
          <Container className="white-background flex-container">
            <p className="larger-text">
              <img src={bubble} width="250px" alt="Chat GIF" />
              Welcome back{userEmail && `, ${userEmail}`}!
              <button
                type="button"
                className="modern-button2"
                onClick={() => {
                  setTimeout(() => {
                    navigate("/redirect");
                  }, 1000);
                  setTimeout(() => {
                    navigate("/dashboard");
                  }, 7000);
                }}
              >
                Launch Slackerino
              </button>
            </p>
          </Container>
          <br />
          <br />
          <br />
          <Container className="white-background1 flex-container">
            <p className="larger-text">
              <img src={man} width="250px" alt="Human" />
              Want to use Slackerino with a different email?
              <button type="button" className="modern-button" onClick={handleDifferentEmail}>
                Create account
              </button>
            </p>
          </Container>
        </Grid.Column>
      </Grid>

      {/* Footer */}
      <Grid className="footer" textAlign="center">
        <Grid.Row>
          <Grid.Column>
            <p>©2024 Slackerino Technologies. All rights reserved. Various trademarks held by their respective owners.</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Welcome;