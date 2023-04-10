import React from 'react';
import axios from 'axios';
import { Container, Row, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GPTalk.css'; // Import CSS file
import ThemeContext from '../ThemeContext';
import ChatHistory from './ChatHistory';
import MessageInput from './MessageInput';
import ThemeSwitcher from './ThemeSwitcher';

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
                            <ThemeSwitcher theme={theme} onThemeChange={this.handleThemeChange} />
                        </Navbar>
                        <Row>
                            <ChatHistory chatHistory={this.state.chatHistory} />
                        </Row>
                        <MessageInput userInput={this.state.userInput} onUserInputChange={(e) => this.setState({ userInput: e.target.value })} onSubmit={this.handleSendMessage} />
                    </Container>
                )}
            </ThemeContext.Consumer>
        );
    }
}

GPTalk.contextType = ThemeContext; // Set the contextType for GPTalk

export default GPTalk;
