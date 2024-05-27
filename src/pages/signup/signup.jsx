import React from "react";
import {Grid, Form, Segment, Header, Icon} from "semantic-ui-react";

const signup = () => {

    const handleInput = (event) => {

    }
    
    return (
    <Grid verticalAlign="middle" textAlign="center">
        <Grid.Column style={{maxWidth : '500px'}}>
        <Header icon as ="h2">
            <Icon name="signup"/>
            Signup
        </Header>
        <Form>
            <Segment stacked>
                <Form.Input 
                name="userName"
                value=""
                icon="user"
                iconPosition="left"
                onChange ={handleInput}
                type="text"
                placeholder="Enter Username"
                />

                <Form.Input 
                name="email"
                value=""
                icon="mail"
                iconPosition="left"
                onChange ={handleInput}
                type="email"
                placeholder="Enter Email"
                />

                <Form.Input 
                name="password"
                value=""
                icon="lock"
                iconPosition="left"
                onChange ={handleInput}
                type="password"
                placeholder="Enter Password"
                />
            </Segment>
        </Form>
        </Grid.Column>
    </Grid>
    )
}


export default signup;