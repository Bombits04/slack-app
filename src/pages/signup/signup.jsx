import React, { useState } from "react";
import { Grid, Form, Segment, Header, Button } from "semantic-ui-react";
import logo from "../../assets/images/app_logo.png";
import './Signup.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password_confirmation: ""
    });

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
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }

            const data = await response.json();
            console.log("Success:", data);
            // Handle successful response
        } catch (error) {
            console.error("Error:", error);
            // Handle error
        }
    };

    return (
        <Grid verticalAlign="middle" textAlign="center" style={{ height: '100vh', backgroundColor: 'black' }}>
            <Grid.Column style={{ maxWidth: '500px' }}>
                <Header icon as="h2" className="header-text">
                    <br />
                    <img src={logo} alt="App Logo" className="logo" />
                    <h1 className="header-text">Slackerino</h1>
                </Header>
                <Form className="form-segment" onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="email"
                            value={formData.email}
                            icon="mail"
                            iconPosition="left"
                            onChange={handleInputChange}
                            type="email"
                            placeholder="Enter Email"
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
                        <Button type="submit" color="teal" fluid size="large">  Sign Up</Button>
                    </Segment>
                </Form>
                <div className="header-text">
                    <br/>
                    Already using Slackerino?   <a href="/" style={{ color: 'teal' }}>Sign in to an existing account.</a>
                </div>
            </Grid.Column>
        </Grid>
    );
};

export default Signup;
