import React, {useEffect, useState, useRef, useContext} from 'react';
import './chatpanel.css'
import firebase from "../../Database/firebase";
import CurrentRoom from "./CurrentRoom";
import Messages from "./Messages";
import SentMessage from "./SendMessage/SendMessage";
import CurrentRoomContext from "../../Context/CurrentRoomContext";


const ChatPanel = () => {
    const {currentRoom} = useContext(CurrentRoomContext);
    const [messages, setMessages] = useState([]);
    const ref_toMessageVariable = useRef();
    ref_toMessageVariable.current = messages;
    const messageRef =  firebase.database().ref(`messages`);
    const specificRoomId = messageRef.child(currentRoom.id);
    console.log(currentRoom.id);
    const addMessageListener = () => {
        setMessages([]);
        specificRoomId.on(`child_added`, (snap) => {
            const prev_message = [...ref_toMessageVariable.current];
            console.log(snap.val());
            prev_message.push(snap.val());
            console.log(prev_message);
            setMessages([...prev_message]);
        });
    };
    const removeMessageListener = () => {
        console.log(`messageListener Removed`);
        specificRoomId.off();
    };
    useEffect(() => {
        addMessageListener();
        return () => removeMessageListener();
    }, [currentRoom.id]);


    return (
        <div className="chatPanel">
            <CurrentRoom messages={messages}/>
            <Messages messages={messages}/>
            <SentMessage messageRef={specificRoomId}/>
        </div>
    );
}

export default ChatPanel;