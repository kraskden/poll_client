import React, { Component } from 'react'
import NavBar from '../components/navbar'

export default class PassChangePage extends Component {


    render() {
        return (
            <div className="container">
                <NavBar user={this.props.user}/>
                <div className="row justify-content-center">
                    <div className="card mt-4">
                        <div class="card-header h5">
                            Change Password
                        </div>
                        <div class="card-body">
                            <form action="">
                                <div class="form-group row px-3">
                                    <label for="currPass">Current Password<span class="text-danger">*</span></label>
                                    <input type="password" class="form-control" id="currPass" />
                                </div>
                                <div class="form-group row px-3">
                                    <label for="newPass">New Password<span class="text-danger">*</span></label>
                                    <input type="password" class="form-control" id="newPass" />
                                </div>
                                <div class="form-group row px-3">
                                    <label for="newConfPass">Confirm New Password<span class="text-danger">*</span></label>
                                    <input type="password" class="form-control" id="newConfPass" />
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