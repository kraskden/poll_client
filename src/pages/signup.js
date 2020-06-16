import React, { Component } from 'react'

// todo: phone input

export default class SignupPage extends Component {


    render() {
        return (
            <div className="container">
                <div className="row d-flex justify-content-center form-center-wrapper">
                    <div className="card p-3">
                        <div className="col text-center mx-auto">
                            <img src="logo.png" style={{width: "8vh"}} alt="logo"/>
                            <form id="form-login" method="post" encType="multipart/form-data">
                                <p className="h5 mb-3 font-weight-normal mt-2">Sign up</p>
                                <input type="text" id="inputLogin"  name="login" className="form-control mb-2" placeholder="Email" required autoFocus />
                                <input type="password" id="inputPassword"  name="password" className="form-control mb-2" placeholder="Password" required />
                                <input type="password" name="password" className="form-control mb-2" placeholder="Confirm password" required />
                                <input type="text" name="firstName" className="form-control mb-2" placeholder="First name" />
                                <input type="text" name="lastName" className="form-control mb-2" placeholder="Last name" />
                                <input type="text" name="phoneNumber" className="form-control mb-2" placeholder="Phone number" />
                                <button className="btn  btn-primary btn-block mb-4" type="submit">Sign Up</button>
                                <p className="d-inline">Already have account?</p> <a href="/#">Log in</a>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}