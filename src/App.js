import React, { Component } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'


import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import PassChangePage from './pages/PassChangePage'

import FieldsPage from './pages/FieldsPage'

import Net from './net/Net'
import LogoutPage from './pages/LogoutPage'
import ResponcesPage from './pages/ResponcesPage'
import VotePage from './pages/VotePage'

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
                    <Route exact path="/" render={ (props) =>  {
                        console.log(props.location)
                        return <HomePage user={this.state.user} location={props.location} />
                    }} />

                    <Route exact path="/fields" children={ (props) =>
                         this.state.user ? 
                        <FieldsPage user={this.state.user} history={props.history}/> : 
                        <Redirect to="/login" />
                    } />

                    <Route exact path="/profile" children={(props) => 
                        this.state.user ? 
                        <ProfilePage user={this.state.user} onUserChange={this.onUserChange} history={props.history}/> : 
                        <Redirect to="/login" />
                    }/>

                    <Route exact path="/setPassword" children={ (props) => 
                        this.state.user ? 
                        <PassChangePage user={this.state.user} history={props.history}/> : 
                        <Redirect to="/login" />
                    } />
                
                    <Route exact path="/login" children={ (props) =>
                        <LoginPage onLogin={this.onUserChange} history={props.history} />
                    } />

                    <Route exact path="/signup" children={(props) => 
                        <SignupPage onUserChange={this.onUserChange} history={props.history}/>
                    } />

                    <Route exact path="/logout" children={ (props) => 
                        <LogoutPage onUserChange={this.onUserChange} history={props.history} />
                    } />

                    <Route exact path="/responces" children={ (props) => 
                        this.state.user ? 
                        <ResponcesPage user={this.state.user} history={props.history}/> : 
                        <Redirect to="/login" />
                    } />

                    <Route path="/quest/:id" children={ (props) => 
                        <VotePage id={props.match.params.id} user={this.state.user} history={props.history}/>
                    }  />

                </Switch>
            </Router>
        )
    }
}