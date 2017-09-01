import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import PageNotFound from './PageNotFound';

export default function App() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route component={PageNotFound} />
        </Switch>
    );
}
