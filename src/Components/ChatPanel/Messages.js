import React from 'react';
import './messages.css'
import moment from 'moment';
import {Comment} from "semantic-ui-react";

function Messages(props) {
    return (
            <div className="message">
                <Comment.Group>
                    {props.messages.map((value, id) => {
                        return (
                            <div className="overflowProperty">
                                <Comment key={id}>
                                    <Comment.Avatar as="a" src={value.user.photoURL}/>
                                    <Comment.Content>
                                        <Comment.Author>{value.user.displayName}</Comment.Author>
                                        <Comment.Metadata>
                                            <div> {moment(value.timestamp).format(`LT`)}</div>
                                            <div>{moment(value.timestamp).format(`MMM Do YY`)}</div>
                                            <div>{moment(value.timestamp).fromNow()}</div>
                                        </Comment.Metadata>
                                        <Comment.Text>{value.text}</Comment.Text>
                                    </Comment.Content>
                                </Comment>
                            </div>
                        )
                    })}
                </Comment.Group>
            </div>
    );
}

export default Messages;