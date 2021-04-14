import React, {useContext, useState} from 'react';
import UserContext from "../../Context/UserContext";
import firebase from "../../Database/firebase";
import {Button, Form, Header, Icon, Segment} from "semantic-ui-react";

function Register({history}) {
    const {setUser} = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState(``);



    const register = evt => {
        evt.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(createUser => {
            createUser.user.updateProfile({displayName, photoURL})
                .then(() => {
                    console.log(createUser);
                    setUser({displayName, photoURL, uid: createUser.user.uid});
                    history.push(`/`);
                })
                .catch(er => console.log(`error in update: ${er}`))
        })
            .catch(err => console.log(`error: ${err}`));

    };
    return (
        <div className="registerUpper">
            <Segment stacked>
                <div className="register">
                    <Header as="h2">
                        <Icon name="chat"/>  Register to CommuniCon.
                    </Header>
                    <Form onSubmit={register}>
                        <Form.Input
                            icon="user"
                            value={displayName}
                            iconPosition="left"
                            placeholder="name"
                            type="text"
                            onChange={e => setDisplayName(e.target.value)}/>
                        <Form.Input
                            icon="mail"
                            value={email}
                            iconPosition="left"
                            placeholder="email"
                            type="email"
                            onChange={e => setEmail(e.target.value)}/>
                        <Form.Input
                            icon="lock"
                            value={password}
                            iconPosition="left"
                            placeholder="password"
                            type="password"
                            onChange={e => setPassword(e.target.value)}/>
                        <Form.Input
                            icon="file image"
                            value={photoURL}
                            iconPosition="left"
                            placeholder="avatar"
                            type="url"
                            onChange={e => setPhotoURL(e.target.value)}/>
                        <Button type="submit" size="large" color="black">Register</Button>
                    </Form>
                </div>
            </Segment>
        </div>

    );
}

export default Register;