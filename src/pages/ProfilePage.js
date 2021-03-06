import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import Net from '../net/Net'

export default class ProfilePage extends Component {

    constructor(props) {
        super(props)
        
        this.email = React.createRef()
        this.firstName = React.createRef()
        this.lastName = React.createRef()
        this.phone = React.createRef()

    }

    onSubmit = (e) => {
        e.preventDefault()

        let req = {}
        req.email = this.email.current.defaultValue
        
        if (this.firstName.current.value) {
            req.firstName = this.firstName.current.value
        }

        if (this.lastName.current.value) {
            req.lastName = this.lastName.current.value
        }

        if (this.firstName.current.value) {
            req.phone = this.phone.current.value
        }

        Net.updateProfile(req).then(() => {
            this.props.onUserChange()
        }).catch(() => {
            console.log("Try again")
        })
    }


    render() {
        let user = this.props.user;
        return (
            <div className="container">
                <NavBar user={user}/>
                <div className="row justify-content-center">
                    <div className="card mt-4">
                        <div className="card-header h5">
                            Edit Profile
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group row px-3">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" className="form-control" id="firstName" ref={this.firstName} defaultValue={user.firstName} />
                                </div>
                                <div className="form-group row px-3">
                                    <label htmlFor="secondName">Last name</label>
                                    <input type="text" className="form-control" id="secondName" ref={this.lastName} defaultValue={user.lastName} />
                                </div>
                                <div className="form-group row px-3">
                                    <label htmlFor="email" className="req-label">Email</label>
                                    <input type="text" className="form-control" id="email" ref={this.email} defaultValue={user.email} required/>
                                </div>
                                <div className="form-group row px-3">
                                    <label htmlFor="number">Phone Number</label>
                                    <input type="tel" className="form-control" id="number" pattern="\+?[0-9]{2,20}"
                                        ref={this.phone} defaultValue={user.phone}/>
                                </div>
                                <button type="submit" className="btn btn-primary px-5">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}