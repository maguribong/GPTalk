import React from 'react';
import { ListGroup, Col } from 'react-bootstrap';

const ChatHistory = ({ chatHistory }) => (
    <Col>
        <ListGroup className="chat-history">
            {chatHistory.map((message, index) => (
                <ListGroup.Item key={index} className={`message ${message.type}`}>
                    {/* Replace \n with <br> */}
                    {message.content.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}
                </ListGroup.Item>
            ))}
        </ListGroup>
    </Col>
);
export default ChatHistory;
