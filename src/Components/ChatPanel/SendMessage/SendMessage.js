import React,{useContext, useState} from 'react';
import UserContext from "../../../Context/UserContext";
import CurrentRoomContext from "../../../Context/CurrentRoomContext";
import firebase from "firebase";
import {Input, Button} from "semantic-ui-react";

/*
* text
* id
* user : uid
* current room
* timestamp*/

const InputBar = (props)=> {
    const user = useContext(UserContext);
    const room = useContext(CurrentRoomContext);
    const [messageText, setMessageText] = useState("");
    const createMessage = messageID => ({
        id: messageID,
        text: messageText ,
        roomID: room.currentRoom.id,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: user.user
    });
    const messageId = props.messageRef.push().key;
    const newMessage = createMessage(messageId);
    return (
            <div className="inputBar" ><Input  className="insertMessage" onChange={(event) => {
                event.preventDefault();
                return setMessageText(event.target.value)}} placeholder="insert message..."
                value={messageText}/>
                <div>
                    <Button content='primary' size="medium" className="sendMessage" primary onClick={() => {props.messageRef.child(messageId)
                        .set(newMessage)
                        .then(() => {console.log(`success`);
                            setMessageText(``);
                        })
                        .catch(e => console.log(`error: ${e}`))}}>SendMessage</Button>
                </div>
            </div>
    );
}

export default InputBar;