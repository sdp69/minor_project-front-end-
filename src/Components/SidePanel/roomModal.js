import React, {useState} from 'react';
import {Modal, Button, Header, Form, Icon} from "semantic-ui-react";

const RoomModal = ({roomRefFirebase}) => {
    const [roomName, setRoomName] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
    const [modalOpen, setModalOpen] = useState(false);


    const handleOpen = () => setModalOpen(true);
    const handleClose =() => setModalOpen(false);

    const createRoomHandler = () => {
        const roomID = roomRefFirebase.push().key;
        const newRoom = {
            id: roomID,
            name: roomName,
            description: roomDescription
        };
        roomRefFirebase.child(roomID)
            .set(newRoom)
            .then(() => console.log(`successfully added new room`))
            .catch(e => {
                console.log(`error: ${e}`);
            });
    };
    return (
        <div>
           <Modal trigger={<span className="roomModal" onClick={handleOpen}>+</span>}
           open={modalOpen}
           onClose={handleClose}
           size="small">
               <Header content="Add a chat Room"/>
               <Modal.Content>
                   <Form>
                        <Form.Field>
                            <label>Name:</label>
                            <input placeholder="insert room name..." onChange={evt => setRoomName(evt.target.value)}/>
                        </Form.Field>
                       <Form.Field>
                           <label>Description:</label>
                           <input placeholder="insert room name..." onChange={evt => setRoomDescription(evt.target.value)}/>
                       </Form.Field>
                   </Form>
               </Modal.Content>
               <Modal.Actions>
                   <Button basic color="red"  onClick={handleClose}>
                       <Icon name="remove" />
                           Cancel
                   </Button>
                   <Button color="green"  basic onClick={() => {
                       createRoomHandler();
                       handleClose();
                   }}>
                       <Icon name="checkmark" />
                           Create
                   </Button>
               </Modal.Actions>
           </Modal>
        </div>
    );
}

export default RoomModal;