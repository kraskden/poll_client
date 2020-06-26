import React, { Component } from 'react'

import Net from '../net/Net'
import VoteForm from '../components/VoteForm'
import NavBar from '../components/NavBar'

export default class VotePage extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            isLoaded: false,
            errMessage: null,
            fields: []
        }
    }

    componentDidMount() {
        this.loadFields()
    }

    onSubmit = (data) => {
        Net.submitAnswer(this.props.id, data).then(() => {
            console.log("Succefully submiting")
            this.props.history.push({
                pathname: "/",
                state: "voted"
            })
        }).catch((err) => {
            console.log("Error " + err.status);
        }).finally(() => {
            // this.props.history.replace('/')
        })
    }


    loadFields = () => {
        Net.getPollFields(this.props.id).then((fields) => {
            this.setState({
                fields: fields,
                isLoaded: true,
                errMessage: null
            })
        }).catch((e) => {
            this.setState({
                isLoaded: true,
                errMessage: e.status
            })
        })
    }

    render() {
        if (!this.state.isLoaded) {
            return null;
        }

        if (this.state.errMessage) {
            return <h1>{this.state.errMessage}</h1>
        }

        console.log(this.state.fields);
        return (
            <div className="container">
                <NavBar user={this.props.user} />
                <VoteForm 
                fields={this.state.fields}
                onSubmit={this.onSubmit}
                />
            </div>
        )
    }

}