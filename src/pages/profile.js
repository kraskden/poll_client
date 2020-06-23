import React, { Component } from 'react'
import NavBar from '../components/navbar'
import Net from '../net/net'

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
                        <div class="card-header h5">
                            Edit Profile
                        </div>
                        <div class="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div class="form-group row px-3">
                                    <label for="firstName">First name</label>
                                    <input type="text" class="form-control" id="firstName" ref={this.firstName} defaultValue={user.firstName} />
                                </div>
                                <div class="form-group row px-3">
                                    <label for="secondName">Last name</label>
                                    <input type="text" class="form-control" id="secondName" ref={this.lastName} defaultValue={user.lastName} />
                                </div>
                                <div class="form-group row px-3">
                                    <label for="email">Email<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="email" ref={this.email} defaultValue={user.email} required/>
                                </div>
                                <div class="form-group row px-3">
                                    <label for="number">Phone Number</label>
                                    <input type="text" class="form-control" id="number" ref={this.phone} defaultValue={user.phone}/>
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