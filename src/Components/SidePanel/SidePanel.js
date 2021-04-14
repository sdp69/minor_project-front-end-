import React from 'react';
import "./SidePanel.css"
import User from "./User";
import Rooms from "./Rooms";
import {Header, Icon} from "semantic-ui-react";

function SidePanel(props) {
    return (
        <div className="SidePanel">
            <Header inverted as="h2">
                <Icon name="chat"/>
                CommuniCon
            </Header>
            <User/>
            <Rooms/>
        </div>
    );
}

export default SidePanel;