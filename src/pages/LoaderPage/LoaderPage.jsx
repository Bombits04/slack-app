import React, { useState, useEffect } from "react";
import { Grid, Header } from "semantic-ui-react";
import loader from "../../assets/images/loading.gif";
import './LoaderPage.css';

const LoaderPage = () => {
    const [loadingMessage, setLoadingMessage] = useState("Loading Dashboard");
    const messages = ["Preparing your Dashboard...", "Preparing your Channels...", "Preparing your Direct Messages...",
                        "Preparing Menus...","Preparing Emojis...","Preparing UI..."];

    useEffect(() => {
        let messageIndex = 0;
        const interval = setInterval(() => {
            messageIndex = (messageIndex + 1) % messages.length;
            setLoadingMessage(messages[messageIndex]);
        }, 1000); // Change message every 1 second1

        return () => clearInterval(interval); // Clean up the interval on component unmount
    }, []);

    return (
        <Grid textAlign="center" verticalAlign="middle" style={{ height: '100vh', backgroundColor: 'black' }}>
            <Grid.Column style={{ maxWidth: '1400px' }}>
                    <img src={loader} width="800px" alt="Loader GIF"/>
                    <h1 className="header-text">Loading your Slackerino App</h1>
                    <h3 className="header-caption">{loadingMessage}</h3>
            </Grid.Column>
        </Grid>
    );
};

export default LoaderPage;
