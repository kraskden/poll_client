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

import Net from './net/net'
import LogoutPage from './pages/logout'

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isLoaded: false
        }
    }

    componentDidMount() {
        this.loadUser().then(() => {
            this.setState({
                isLoaded: true
            })
        })

        console.log(this.state.user);
    }

    loadUser = async () => {
        return Net.getProfileInfo().then((user) => {
            this.setState({
                user: user
            })
        }).catch(() => {
            this.setState({
                user: null
            })
            console.log("User not loaded")
        })
    }

    onUserChange = () => {
        this.loadUser();
    }

    render() {
        if (!this.state.isLoaded) {
            return <> </>;
        }
        
        return (
            <Router>
                <Switch>
                    <Route exact path="/">
                        <div className="container">
                            <NavBar user={this.state.user} />
                        </div>
                    </Route>

                    <Route exact path="/fields" children={ (props) =>
                        <FieldsPage user={this.state.user} history={props.history}/>
                    } />

                    <Route exact path="/profile" children={(props) => 
                        <ProfilePage user={this.state.user} onUserChange={this.onUserChange} history={props.history}/>
                    }/>

                    <Route exact path="/setPassword">
                        <PassChangePage user={this.state.user} />
                    </Route>

                    <Route exact path="/login" children={ (props) =>
                        <LoginPage onLogin={this.onUserChange} history={props.history} />
                    } />

                    <Route exact path="/signup" children={(props) => 
                        <SignupPage onUserChange={this.onUserChange} history={props.history}/>
                    } />

                    <Route exact path="/logout" children={ (props) => 
                        <LogoutPage onUserChange={this.onUserChange} history={props.history} />
                    } />

                </Switch>
            </Router>
        )
    }
}