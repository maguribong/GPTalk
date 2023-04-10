import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const MessageInput = ({ userInput, onUserInputChange, onSubmit }) => (
    <Row className="input-row">
        <Col xs={10}>
            <Form onSubmit={onSubmit} className="input-form">
                <Form.Group controlId="userInput" className="full-width">
                    <Form.Control
                        type="text"
                        value={userInput}
                        onChange={onUserInputChange}
                        placeholder="Type your message..."
                    />
                </Form.Group>
            </Form>
        </Col>
        <Col xs={2}>
            <Button onClick={onSubmit}>Send</Button>
        </Col>
    </Row>
);

export default MessageInput;
