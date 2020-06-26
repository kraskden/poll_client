import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Net from '../net/Net'

// todo: phone input

export default class SignupPage extends Component {

    constructor(props) {
        super(props)
        this.email = React.createRef()
        this.password = React.createRef()
        this.confirmPassword = React.createRef()

        this.firstName = React.createRef()
        this.lastName = React.createRef()
        this.phone = React.createRef()

        this.state = {
            message: "Sign Up"
        }
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (this.password.current.value !== this.confirmPassword.current.value) {
            this.confirmPassword.current.setCustomValidity("Passwords don't match")
            return;
        }

        let req = {}
        req.email = this.email.current.value
        req.password = this.password.current.value
        if (this.firstName.current.value) {
            req.firstName = this.firstName.current.value
        }
        if (this.lastName.current.value) {
            req.lastName = this.lastName.current.value
        }
        if (this.phone.current.value) {
            req.phone = this.phone.current.value
        }

        Net.signUp(req).then(() => {
            this.props.history.replace('/login')
        }).catch((status) => {
            this.setState({
                message: status === 400 ? "User already exists" : "Try again"
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
                            <form id="form-login" onSubmit={this.onSubmit} >
                                <p className="h5 mb-3 font-weight-normal mt-2">{this.state.message}</p>
                                <input type="email" id="inputLogin"  name="login" ref={this.email} className="form-control mb-2" placeholder="Email" required autoFocus />
                                <input type="password" id="inputPassword" ref={this.password} name="password" className="form-control mb-2" placeholder="Password" required />
                                <input type="password" name="password" ref={this.confirmPassword} className="form-control mb-2" placeholder="Confirm password" required />
                                <input type="text" name="firstName" ref={this.firstName} className="form-control mb-2" placeholder="First name" />
                                <input type="text" name="lastName" ref={this.lastName} className="form-control mb-2" placeholder="Last name" />
                                <input type="tel" name="phoneNumber" pattern="\+?[0-9]{2,20}"
                                    ref={this.phone}  className="form-control mb-2" placeholder="Phone number" />
                                <button className="btn  btn-primary btn-block mb-4" type="submit">Sign Up</button>
                                <p className="d-inline">Already have account?</p> <Link to="/login">Log in</Link> 
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}