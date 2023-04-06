import React, { Component } from "react";
import GPTalk from "./components/GPTalk";
import ThemeContext from "./ThemeContext";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: "light",
        };
    }

    toggleTheme = (newTheme) => {
        this.setState({ theme: newTheme });
    };

    render() {
        return (
            <ThemeContext.Provider
                value={{
                    theme: this.state.theme,
                    toggleTheme: this.toggleTheme,
                }}
            >
                <GPTalk />
            </ThemeContext.Provider>
        );
    }
}

export default App;
