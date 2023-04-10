import React from 'react';
import { Form } from 'react-bootstrap';

const ThemeSwitcher = ({ theme, onThemeChange }) => (
    <Form className="ml-auto">
        <Form.Check
            className="theme-radio"
            id="light-theme"
            label={<label htmlFor="light-theme">Light</label>}
            type="radio"
            name="theme"
            value="light"
            checked={theme === 'light'}
            onChange={onThemeChange}
        />
        <Form.Check
            className="theme-radio"
            id="dark-theme"
            label={<label htmlFor="dark-theme">Dark</label>}
            type="radio"
            name="theme"
            value="dark"
            checked={theme === 'dark'}
            onChange={onThemeChange}
        />
    </Form>
);

export default ThemeSwitcher;
