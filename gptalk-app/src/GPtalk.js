// src/GPTalk.js
import React from 'react';

class GPTalk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        // Send the user input to the backend
        const response = await fetch('/api/user-input', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userInput: this.state.userInput }),
        });
        const data = await response.json();
        console.log(data.message);
    };

    handleChange = (e) => {
        this.setState({ userInput: e.target.value });
    };

    render() {
        return (
            <div>
                <h1>Welcome to GPTalk!</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.userInput}
                        onChange={this.handleChange}
                        placeholder="Type your message here"
                    />
                    <button type="submit">Send</button>
                </form>
            </div>
        );
    }
}

export default GPTalk;
