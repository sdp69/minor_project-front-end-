import React from 'react';

function InputBar(props) {
    return (
            <div className="inputBar" ><input className="insertMessage" placeholder="insert message..."/>
                <button onClick={() => {props.messageRef.child(`id2`)
                    .set({text: `some text2`})
                    .then(msg => console.log(`success`))
                    .catch(e => console.log(`error: ${e}`))}}>SendMessage</button></div>
    );
}

export default InputBar;