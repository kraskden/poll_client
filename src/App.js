import React, { Component } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'


import LoginPage from './pages/login'
import SignupPage from './pages/signup'
import ProfilePage from './pages/profile'
import PassChangePage from './pages/pass_change'

import NavBar from './components/navbar'
import FieldsPage from './pages/fields'

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div className="container">
                            <NavBar user="Fizzika" />
                        </div>
                    </Route>

                    <Route exact path="/fields">
                        <FieldsPage />
                    </Route>

                    <Route exact path="/profile">
                        <ProfilePage user="Fizzika" />
                    </Route>
                    <Route exact path="/setPassword">
                        <PassChangePage user="Fizzika" />2
                    </Route>
                    <Route exact path="/login">
                        <LoginPage />
                    </Route>
                    <Route exact path="/signup">
                        <SignupPage />
                    </Route>
                </Switch>
            </Router>
        )
    }
}