import React from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Form, Button, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GPTalk.css'; // Import CSS file

class GPTalk extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chatHistory: [],
            userInput: '',
        };
    }

    typeMessage = async (messageType, messageContent, shouldAnimate) => {
        if (shouldAnimate) {
            const words = messageContent.split(' ');
            let currentWordIndex = 0;
            let typedMessage = '';

            const typeWord = () => {
                typedMessage += words[currentWordIndex] + ' ';
                this.setState((prevState) => ({
                    chatHistory: [...prevState.chatHistory.slice(0, -1), { type: messageType, content: typedMessage }],
                }));
                currentWordIndex++;

                if (currentWordIndex < words.length) {
                    setTimeout(typeWord, 100);
                }
            };

            this.setState((prevState) => ({
                chatHistory: [...prevState.chatHistory, { type: messageType, content: typedMessage }],
            }));

            setTimeout(typeWord, 100);
        } else {
            this.setState((prevState) => ({
                chatHistory: [...prevState.chatHistory, { type: messageType, content: messageContent }],
            }));
        }
    };

    handleSendMessage = async (e) => {
        e.preventDefault();
        if (!this.state.userInput.trim()) return;

        await this.typeMessage('user', this.state.userInput, false);

        try {
            const response = await axios.post('/api/chat', { userInput: this.state.userInput });
            const chatGptResponse = response.data.message;

            await this.typeMessage('chatgpt', chatGptResponse, true);
        } catch (error) {
            console.error(error);
            await this.typeMessage('error', 'Error communicating with the server.', true);
        }

        this.setState({ userInput: '' });
    };

    render() {
        return (
            <Container fluid>
                <Navbar bg="light">
                    <Navbar.Brand>GPTalk</Navbar.Brand>
                    <Navbar.Text className="model-name">Model: gpt-3.5-turbo</Navbar.Text>
                </Navbar>
                <Row className="chat-row">
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
                <Row className="input-row">
                    <Col xs={10}>
                        <Form onSubmit={this.handleSendMessage} className="input-form">
                            <Form.Group controlId="userInput" className="full-width">{/* had to put this in a form group to get full width of user input-box */}                                <Form.Control
                                    type="text"
                                    value={this.state.userInput}
                                    onChange={(e) => this.setState({ userInput: e.target.value })}
                                    placeholder="Type your message..."
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={2}>
                        <Button onClick={this.handleSendMessage}>Send</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default GPTalk;
