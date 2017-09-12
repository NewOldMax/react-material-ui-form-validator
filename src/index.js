import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

ReactDOM.render(
    <BrowserRouter basename="/react-material-ui-form-validator">
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);
