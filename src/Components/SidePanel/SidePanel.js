import React from 'react';
import "./SidePanel.css"
import User from "./User";

function SidePanel(props) {
    return (
        <div className="SidePanel">
            <div>ChatApp header</div>
            <User/>
            <ul>
                <li>room1</li>
                <li>room2</li>
            </ul>
        </div>
    );
}

export default SidePanel;