import React from "react";
import { Grid, Header } from "semantic-ui-react";
import logo from "../../assets/images/app_logo.png";
import './Error404.css';

const Error404 = () => {
    return (
        <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh', backgroundColor: 'black' }}>
            <Grid.Column style={{ maxWidth: '800px' }}>
                <Header as="h1" className="error-header">
                    <img src={logo} alt="App Logo" className="rotating-logo" />
                    <h1 className="header-text">Slackerino</h1>
                    <h3 className="header-text">Error 404. Opssss! Page not found.</h3>
                </Header>
            </Grid.Column>
        </Grid>
    );
};

export default Error404;
