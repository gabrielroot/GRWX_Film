import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import App from './App'
import Search from './Search'

const Routes = () => {
    return (
        <Router>
            <Switch>

                <Route exact path='/'>
                    <App/>
                </Route>

                <Route path='/search/:id' component={Search}/>

            </Switch>
        </Router>
    );
}

export default Routes;
