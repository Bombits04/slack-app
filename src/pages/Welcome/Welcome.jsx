import React, { useState } from "react";
import { Container, Grid, Header, Icon, Modal } from "semantic-ui-react";
import appLogo from "../../assets/images/app_logo.png";
import man from "../../assets/images/man.png";
import bubble from "../../assets/images/chatbubble.gif";
import './Welcome.css';
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    return (
        <div className="welcome-page">
            <div className="header-wrapper">
                <span className="header caveat-700">
                    <img src={appLogo} width="40px" alt="App Logo" /> Slackerino
                </span>
                <Icon name="bars" size="large" onClick={handleOpen} className="menu-icon" />
            </div>

            <Modal
                open={modalOpen}
                onClose={handleClose}
                closeIcon
                className="menu-modal"
                size="small"
                direction="right"
            >
                <Modal.Header>Menu</Modal.Header>
                <Modal.Content>
                    <p>WIP by Javs</p>
                </Modal.Content>
            </Modal>

            <Grid className="content">
                <Grid.Column style={{ maxWidth: '1400px' }}>
                    <Header as="h1" className="header-text">
                        Slackerino
                    </Header>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Container className="white-background flex-container">
                        <p className="larger-text">
                            <img src={bubble} width="250px" alt="Chat GIF" />
                            Welcome back!
                            <button type="button" className="modern-button2" onClick={() => {
                                setTimeout(() => {
                                    navigate("/redirect");
                                }, 1000);
                                setTimeout(() => {
                                    navigate("/dashboard");
                                }, 2000);
                            }}>
                                Launch Slackerino
                            </button>
                        </p>
                    </Container>
                    <br />
                    <br />
                    <Container className="white-background1 flex-container">
                        <p className="larger-text">
                            <img src={man} width="250px" alt="Human" />
                            Want to use Slackerino with a different email?
                            <button type="button" className="modern-button" onClick={() => navigate("/")}>
                                Create account
                            </button>
                        </p>
                    </Container>
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default Welcome;
