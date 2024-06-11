import React from "react";
import { Icon, Grid } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/app_logo.png";
import slackerino from "../../assets/images/slackerino.gif";
import './LandingPage.css';

const LandingPage = () => {

    const navigate = useNavigate();

  return (
    <div className="welcome-dashboard-container">
      <div className="header-wrapper">
        <span className="welcome-header welcome-caveat-700">
          <img src={logo} width="50px" alt="App Logo"/> Slackerino
        </span>
        <div>
        </div>
      </div>
      <div className="welcome-content">
        <h1 className="welcome-header-text">
            <br/>
          Made for people. <span className="highlight">Built to communicate effectively.</span>
        </h1>
        <br/>
        <br/>
        <button type="button" className="welcome-button" onClick={() => navigate("/signup")} >Get Started</button>
        <br/>
        <p className="welcome-caption-text">Slackerino is free to try <span className="welcome-caption-text2">as long as you like</span></p>
        <img src={slackerino} alt="App" className="welcome-appgif" />
      </div>
      <Grid className="welcome-footer" textAlign="center">
        <Grid.Row>
          <Grid.Column>
            <p>©2024 Slackerino Technologies. All rights reserved. Various trademarks held by their respective owners.</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default LandingPage;
