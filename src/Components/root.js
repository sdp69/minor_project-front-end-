import React, {useEffect, useState} from 'react';
import App from "./App";
import {Switch, Route, withRouter} from "react-router";
import Login from "./Auth/login";
import Register from "./Auth/register";
import UserContext from "../Context/UserContext";
import firebase from "../Database/firebase";


function Root({history}) {
    const [user, setUser] = useState({displayName: ``, photoURL: `` , uid: ``});
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                const {displayName, photoURL, uid} = user;
                setUser({displayName, photoURL, uid});
                history.push(`/`);
            }
            else{
                console.log(`not logged in, you must be logged in`)
                history.push(`/login`);
            }
        });
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            <Switch>
                   <Route exact path="/" component={App}/>
                   <Route exact path="/login" component={Login}/>
                   <Route exact path="/register" component={Register}/>
            </Switch>
        </UserContext.Provider>
    );
}

export default withRouter(Root);