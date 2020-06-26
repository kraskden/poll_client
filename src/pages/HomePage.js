import React, { Component } from 'react'
import NavBar from '../components/NavBar'


export default class HomePage extends Component {

    constructor(props) {
        super(props);
        console.log("Constructed");
    }

    render() {

        let content = <> </>

        let state = this.props.location.state
        console.log(state)

        if (state === "voted") {
            content = (
                <div className="row justify-content-center">
                    <div className="col-4">
                        <div class="card mt-3">
                            <div className="card-header justify-content-center d-flex">
                                <p className="h3">Thank you!</p>
                            </div>
                            <div class="card-body d-flex justify-content-center">
                                <div className="row">
                                    <div className="col">
                                        <p className="h5">You response was saved!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        if (this.props.user) {
            content = (
                <div class="alert alert-primary mt-3" role="alert">
                    Your poll located  <a href={`/quest/${this.props.user.id}`} class="alert-link">here</a>. Share it!
                </div>
            )
        }
        
        return (
            <div className="container">
                <NavBar user={this.props.user} />
                <div className="mt-2">
                    {content}
                </div>
            </div>
        )
    }
}