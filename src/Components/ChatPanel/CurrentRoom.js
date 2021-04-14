import {useContext} from 'react';
import CurrentRoomContext from "../../Context/CurrentRoomContext";


function CurrentRoom(props) {
    const room = useContext(CurrentRoomContext);
    console.log(props.messages);
    const noOfUsers = [...new Set(props.messages.map((msg) => {
     return msg.user.uid;
    }))].length;
    console.log(noOfUsers);
    return (
        <div className="currentRoom">
            <h4>{room.currentRoom.name}</h4>
            <p>users: {noOfUsers}</p>
        </div>
    );
}

export default CurrentRoom;