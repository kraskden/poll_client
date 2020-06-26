import React, { Component } from 'react'
import NavBar from '../components/NavBar'

import Net from '../net/Net'

export default class PassChangePage extends Component {

    constructor(props) {
        super(props)

        this.currPassword = React.createRef()
        this.newPassword = React.createRef()
        this.confirmNewPass = React.createRef()
    }

    onSumbit = (e) => {
        e.preventDefault()

        if (this.newPassword.current.value !== this.confirmNewPass.current.value) {
            this.newPassword.current.setCustomValidity("Passwords don't match")
            return;
        }
        
        Net.changePassword(this.currPassword.current.value, this.newPassword.current.value).then(() => {
            this.currPassword.current.value = ""
            this.newPassword.current.value = ""
            this.confirmNewPass.current.value = ""

            this.props.history.replace('/')

        }).catch(() => {
            this.currPassword.current.setCustomValidity("Invalid password")
        })

    }


    render() {
        return (
            <div className="container">
                <NavBar user={this.props.user}/>
                <div className="row justify-content-center">
                    <div className="card mt-4">
                        <div className="card-header h5">
                            Change Password
                        </div>
                        <div className="card-body">
                            <form action="" onSubmit={this.onSumbit}>
                                <div className="form-group row px-3">
                                    <label htmlFor="currPass" className="req-label">Current Password</label>
                                    <input type="password" className="form-control" id="currPass" ref={this.currPassword} required/>
                                </div>
                                <div className="form-group row px-3">
                                    <label htmlFor="newPass" className="req-label">New Password</label>
                                    <input type="password" className="form-control" id="newPass" ref={this.newPassword} required/>
                                </div>
                                <div className="form-group row px-3">
                                    <label htmlFor="newConfPass" className="req-label">Confirm New Password</label>
                                    <input type="password" className="form-control" id="newConfPass" ref={this.confirmNewPass} required/>
                                </div>
                                <button type="submit" className="btn btn-primary px-3">CHANGE</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}