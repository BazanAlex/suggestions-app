import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import {ArticlePage} from './articlePage';
import {ResultsPage} from './resultsPage';
import {PageNotFound} from './pageNotFound';

export class App extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={ArticlePage} />
                    <Route exact path="/results" component={ResultsPage} />
                    <Route component={PageNotFound} />
                </Switch>
            </div>
        );
    }
}