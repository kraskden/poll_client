import React, { Component } from 'react'

export default class LoginPage extends Component {


    render() {
        return ( 
            <div className="container">
            <div className="row d-flex justify-content-center form-center-wrapper">
                <div className="card p-3">
                    <div className="col text-center mx-auto">
                        <img src="logo.png" style={{width: "8vh"}} alt="logo"/>
                        <form id="form-login" method="post" encType="multipart/form-data">
                            <p className="h5 mb-3 font-weight-normal mt-2">Log In</p>
                            <label htmlFor="inputLogin" className="sr-only">Email</label>
                            <input type="text" id="inputLogin"  name="login" className="form-control mb-2" placeholder="Email" required autoFocus />
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input type="password" id="inputPassword"  name="password" className="form-control mb-2" placeholder="Password" required />
                            <div class="checkbox row ml-1">
                                <label>
                                    <input type="checkbox" value="remember-me" className="" /> Remember me
                                </label>
                                <a href="/#" className="ml-3 mr-3">Forgot your password?</a>
                            </div>
                            <button className="btn  btn-primary btn-block mb-4" type="submit">LOG IN</button>
                            <p className="d-inline">Don't have account?</p> <a href="/#">Sign up</a>
                        </form>
                    </div>
                </div>

            </div>
        </div>
        )
    }


}