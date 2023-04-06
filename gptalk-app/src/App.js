import React, { Component } from 'react';
import GPTalk from './components/GPTalk';
import ThemeContext from './ThemeContext';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'light',
        };
    }

    handleThemeChange = (theme) => {
        this.setState({ theme });
    };

    render() {
        return (
            <ThemeContext.Provider value={{ theme: this.state.theme, handleThemeChange: this.handleThemeChange }}>
                <GPTalk />
            </ThemeContext.Provider>
        );
    }
}

export default App;