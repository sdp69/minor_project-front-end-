import React, {useContext, useEffect, useState} from 'react';
import UserContext from "../../Context/UserContext";
import firebase from "../../Database/firebase";
import {Button, Form, Header, Icon, Segment, Message} from "semantic-ui-react";
import {Link} from "react-router-dom";

function Login({history}) {
    const {setUser} = useContext(UserContext);
    const [email, setEmail] = useState(``);
    const [password, setPassword] = useState(``);
    const [emailError, setEmailError] = useState(``);
    const [passwordError, setPasswordError] = useState(``);
    const [firebaseError, setFirebaseError] = useState(``);
    const [disable, setDisable] = useState(false);
    let isFormValid = !emailError && !passwordError;
    const check = (val) => {
        setDisable(val);
    }
    const loginAuth = (e) => {
        e.preventDefault();
        check(true);
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(loggedInUser => {
                console.log(loggedInUser.user);
                setUser({displayName: loggedInUser.user.displayName,
                uid: loggedInUser.user.uid,
                photoURL: loggedInUser.user.photoURL
                });
                history.push(`/`);
            })
            .catch(er => {
                console.log(er);
                setFirebaseError(er.message);
                setDisable(false);
            });
        check(false);
    };

    const evaluateEmailError = (email) => {
        if (!email.length){
            setEmailError("Email must not be empty");
        }
        else {
            setEmailError(``);
        }
    };

    const evaluatePasswordError = (password) => {
        if (!password.length){
            setPasswordError(`password must not be empty`);
        }
        else
        {
            setPasswordError(``);
        }
    };
    useEffect(() => {
        evaluateEmailError(email);
        evaluatePasswordError(password);
    }, []);
    return (
        <div className="registerUpper">
            <Segment stacked>
                <div className="register">
                    <Header as="h2">
                        <Icon name="chat"/>  Login to see the stuffs.
                    </Header>
                    <Form onSubmit={loginAuth}>
                        <Form.Input
                            icon="mail"
                            value={email}
                            iconPosition="left"
                            placeholder="email"
                            type="email"
                            onChange={e => {
                                setEmail(e.target.value)
                            evaluateEmailError(e.target.value)}}/>
                        {emailError?<Message negative>{emailError}</Message>:""}
                        <Form.Input
                            icon="lock"
                            value={password}
                            iconPosition="left"
                            placeholder="password"
                            type="password"
                            onChange={e => {
                                setPassword(e.target.value);
                                evaluatePasswordError(e.target.value);
                            }}/>
                        {passwordError?<Message negative>{passwordError}</Message>:""}
                        <Button disabled={!isFormValid || disable} type="submit" size="large" color="black">Log in</Button>
                        {firebaseError?<Message negative>{firebaseError}</Message>:""}
                    </Form>
                </div>
                <div><Message>
                    New to this? <Link to="/register">Register</Link>
                </Message></div>
            </Segment>
        </div>
    );
}

export default Login;