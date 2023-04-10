import React from 'react';
import { createRoot } from 'react-dom/client'; // import createRoot from react-dom/client
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = document.getElementById('root');
createRoot(root).render( // use createRoot instead of ReactDOM.createRoot
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
