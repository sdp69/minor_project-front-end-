import React,{useContext} from 'react';
import UserContext from "../../Context/UserContext";
import {Image, Dropdown} from "semantic-ui-react";
import firebase from "../../Database/firebase";
import CurrentRoomContext from "../../Context/CurrentRoomContext";

function User() {
    const user = useContext(UserContext);
    const {setCurrentRoom} = useContext(CurrentRoomContext);

    const logOut = () => {
        firebase.auth().signOut()
            .then(() => {
                console.log(`logged out successfully`);
                setCurrentRoom(``);
            })
            .catch((er) => {
                console.log(`error in logging out: ${er}`);
            })
    };
    return (
        <div className="user">
            <Image src={user.user.photoURL} avatar/>
            <Dropdown text={user.user.displayName} as="h4">
                <Dropdown.Menu>
                    <Dropdown.Item text="logout" onClick={logOut}/>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default User;
