import React from 'react';
import axios from 'axios';
import { Container, Row, Col, ListGroup, Form, Button, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GPTalk.css'; // Import CSS file
import ThemeContext from '../ThemeContext';

class GPTalk extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            chatHistory: [],
            userInput: '',
        };
    }

    handleThemeChange = (event) => {
        const theme = event.target.value;
        this.context.handleThemeChange(theme); // Use the handleThemeChange from context instead of props
    };

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

            await this.typeMessage('chat-response', chatGptResponse, true);
        } catch (error) {
            console.error(error);
            await this.typeMessage('error', 'Error communicating with the server.', true);
        }

        this.setState({ userInput: '' });
    };

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme}) => (
                    <Container fluid className={`GPTalk ${theme}`}>
                        <Navbar expand="lg">
                            <Navbar.Brand href="#">GPTalk</Navbar.Brand>
                            <Navbar.Text className="navbar-model-text">
                                Model: <strong>GPT-4</strong>
                            </Navbar.Text>
                            <Form className="ml-auto">
                                <Form.Check
                                    className="theme-radio" // Add this line to add a class to the radio button
                                    label="Light"
                                    type="radio"
                                    name="theme"
                                    value="light"
                                    checked={theme === 'light'}
                                    onChange={this.handleThemeChange}
                                />
                                <Form.Check
                                    className="theme-radio" // Add this line
                                    label="Dark"
                                    type="radio"
                                    name="theme"
                                    value="dark"
                                    checked={theme === 'dark'}
                                    onChange={this.handleThemeChange}
                                />
                            </Form>
                        </Navbar>
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
                        <Row className="input-row">
                            <Col xs={10}>
                                <Form onSubmit={this.handleSendMessage} className="input-form">
                                    <Form.Group controlId="userInput" className="full-width">{/* had to put this in a form group to get full width of user input-box */}
                                        <Form.Control
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
                )}
            </ThemeContext.Consumer>
        );
    }
}

GPTalk.contextType = ThemeContext; // Set the contextType for GPTalk

export default GPTalk;
