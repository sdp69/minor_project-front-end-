import React, {useEffect, useState, useRef} from 'react';
import './chatpanel.css'
import firebase from "../Database/firebase";

const ChatPanel = (props) => {
    const [messages, setMessages] = useState([]);
    const ref_toMessageVariable = useRef();
    ref_toMessageVariable.current = messages;
    const messageRef =  firebase.database().ref(`messages`);
    const addMessageListener = () => {
        messageRef.on(`child_added`, (snap) => {
            const prev_message = [...ref_toMessageVariable.current];
            console.log(snap.val());
            prev_message.push(snap.val());
            setMessages([...prev_message]);
        });
    };
    const removeMessageListener = () => {
        console.log(`messageListener Removed`);
        messageRef.off();
    };
    useEffect(() => {
        addMessageListener();
        return () => removeMessageListener();
    }, []);
    return (
        <div className="chatpanel">
            <div>ChatPanel</div>
            <div>room1</div>
           <div style={{flexGrow: 1}}> <ul>
               {messages.map((value, id) => {
                   return (
                       <li key={id}>{value.text}</li>
                   )
               })}
           </ul></div>
            <div style={{display: "flex"}}><input style={{flexGrow: 1}} placeholder="insert message..."/>
            <button onClick={() => {messageRef.child(`id2`)
                .set({text: `some text2`})
                .then(msg => console.log(`success`))
                .catch(e => console.log(`error: ${e}`))}}>SendMessage</button></div>
        </div>
    );
}

export default ChatPanel;