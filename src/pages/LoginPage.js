import React, { Component } from 'react'

import Net from '../net/Net'
import { Link } from 'react-router-dom'

export default class LoginPage extends Component {

    constructor(props) {
        super(props)
        this.email = React.createRef()
        this.password = React.createRef()

        this.state = {
            message: "Log In"
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        let email = this.email.current.value
        let pass = this.password.current.value

        Net.login(email, pass).then(() => {
            this.props.onLogin();
            this.props.history.replace('/')
        }).catch((ex) => {
            console.log(`Invalid login -- ${ex}`)
            this.setState({
                message: "Invalid login. Try again"
            })
        })
    }

    render() {
        return ( 
            <div className="container">
            <div className="row d-flex justify-content-center form-center-wrapper">
                <div className="card p-3">
                    <div className="col text-center mx-auto">
                        <img src="logo.png" style={{width: "8vh"}} alt="logo"/>
                        <form id="form-login" onSubmit={this.onSubmit}>
                            <p className="h5 mb-3 font-weight-normal mt-2">{this.state.message}</p>
                            <label htmlFor="inputLogin" className="sr-only">Email</label>
                                <input type="email" id="inputLogin" ref={this.email} name="login" className="form-control mb-2" placeholder="Email" required autoFocus />
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" id="inputPassword" ref={this.password} name="password" className="form-control mb-2" placeholder="Password" required />
                            <div className="checkbox row ml-1">
                                <label>
                                    <input type="checkbox" value="remember-me" className="" /> Remember me
                                </label>
                                <a href="/#" className="ml-3 mr-3">Forgot your password?</a>
                            </div>
                            <button className="btn  btn-primary btn-block mb-4" type="submit">LOG IN</button>
                            <p className="d-inline">Don't have account?</p> <Link to="/signup">Sign up</Link>
                        </form>
                    </div>
                </div>

            </div>
        </div>
        )
    }


}