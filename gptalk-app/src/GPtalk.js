// src/GPTalk.js
import React from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class GPTalk extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chatHistory: [],
            userInput: '',
        };
    }

    handleSendMessage = async (e) => {
        e.preventDefault();
        if (!this.state.userInput.trim()) return;

        this.setState((prevState) => ({
            chatHistory: [...prevState.chatHistory, { type: 'user', content: prevState.userInput }],
        }));

        try {
            const response = await axios.post('/api/chat', { userInput: this.state.userInput });
            const chatGptResponse = response.data.message;

            this.setState((prevState) => ({
                chatHistory: [...prevState.chatHistory, { type: 'chatgpt', content: chatGptResponse }],
            }));
        } catch (error) {
            console.error(error);
            this.setState((prevState) => ({
                chatHistory: [...prevState.chatHistory, { type: 'error', content: 'Error communicating with the server.' }],
            }));
        }

        this.setState({ userInput: '' });
    };

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <ListGroup className="chat-history">
                            {this.state.chatHistory.map((message, index) => (
                                <ListGroup.Item key={index} className={`message ${message.type}`}>
                                    {message.content}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={this.handleSendMessage} className="input-form">
                            <Form.Group controlId="userInput">
                                <Form.Control
                                    type="text"
                                    value={this.state.userInput}
                                    onChange={(e) => this.setState({ userInput: e.target.value })}
                                    placeholder="Type your message..."
                                />
                            </Form.Group>
                            <Button type="submit">Send</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default GPTalk;