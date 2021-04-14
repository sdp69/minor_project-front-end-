import React, {useContext, useEffect, useRef, useState} from 'react';
import CurrentRoomContext from "../../Context/CurrentRoomContext";
import firebase from "../../Database/firebase";
import RoomModal from "./roomModal";
import Spinner from "../loader/spinner";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);
    const [roomsLoaded, setRoomsLoaded] = useState(false);
    console.log(rooms);
    const {setCurrentRoom}  = useContext(CurrentRoomContext);
    const roomsRef = useRef();
    roomsRef.current = rooms;
    const roomRefFirebase = firebase.database().ref(`rooms`);
    const addRoomListener = () => {
        roomRefFirebase.on(`child_added`, (snap) => {
            console.log(snap.val());
            const prevValues = [...roomsRef.current, snap.val()];
            setRooms(prevValues);
            setRoomsLoaded(true);
        });
    };
    const removeRoomListener = () => {
        roomRefFirebase.off();
    };
    useEffect(() => {
        addRoomListener();
        return () => removeRoomListener();
    }, []);

    const roomElements = roomsLoaded?(
        <ul>
            {rooms.map((room, index) => {
                return(<li key={index} onClick={() => setCurrentRoom(rooms[index])}>
                    {room.name}
                </li>)
            })
            }
        </ul>
    ):<Spinner/>;
    return (
        <div>
            <div className="roomsHeader">
                <h4>Rooms: ({rooms.length})</h4>
                <RoomModal roomRefFirebase={roomRefFirebase}/>
            </div>
            {roomElements}
        </div>
    );
}

export default Rooms;