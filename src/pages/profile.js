import React, { Component } from 'react'
import NavBar from '../components/navbar'

export default class ProfilePage extends Component {


    render() {
        return (
            <div className="container">
                <NavBar user={this.props.user}/>
                <div className="row justify-content-center">
                    <div className="card mt-4">
                        <div class="card-header h5">
                            Edit Profile
                        </div>
                        <div class="card-body">
                            <form action="">
                                <div class="form-group row px-3">
                                    <label for="firstName">First name</label>
                                    <input type="text" class="form-control" id="firstName" />
                                </div>
                                <div class="form-group row px-3">
                                    <label for="secondName">Last name</label>
                                    <input type="text" class="form-control" id="secondName" />
                                </div>
                                <div class="form-group row px-3">
                                    <label for="email">Email<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" id="email" required/>
                                </div>
                                <div class="form-group row px-3">
                                    <label for="number">Phone Number</label>
                                    <input type="text" class="form-control" id="number" />
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