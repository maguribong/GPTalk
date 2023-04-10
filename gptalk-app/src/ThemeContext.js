import React from 'react';

const ThemeContext = React.createContext({
    theme: 'light',
    handleThemeChange: () => {},
});

export default ThemeContext;
