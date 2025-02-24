import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import PageNotFound from './PageNotFound';

export default function App() {
    return (
        <BrowserRouter basename="/react-material-ui-form-validator">
            <Switch>
                <Route exact path="/" component={Home} />
                <Route component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    );
}
