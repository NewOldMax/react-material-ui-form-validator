import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';

ReactDOM.render(
    <MuiThemeProvider>
        <BrowserRouter basename="/">
            <App />
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root'),
);
