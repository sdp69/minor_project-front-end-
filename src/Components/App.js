import '../App.css';
import SidePanel from "./SidePanel/SidePanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import CurrentRoomContext from "../Context/CurrentRoomContext";
import React,{useState} from 'react';

function App() {

    const [currentRoom, setCurrentRoom] = useState(null);

  return (
    <div className="App">
          <CurrentRoomContext.Provider value={{currentRoom, setCurrentRoom}}>
              <SidePanel/>
              {currentRoom?<ChatPanel/>:<h3>Please choose a chat room</h3>}
          </CurrentRoomContext.Provider>
    </div>
  );
}

export default App;
