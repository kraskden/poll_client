import React, { Component } from 'react'

import Net from '../net/Net'
import ResponcesView from '../components/ResponcesView'
import NavBar from '../components/NavBar'


export default class ResponcesPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            polls: [],
            pollAnswers: {},
            currPollKey: null,
            isLoaded: false      
        }
    }

    componentDidMount() {
        this.initData().then(() => {

        })
    }

    initData = async () => {
        let currPollKey = null

        let polls = await this.loadPolls()
        if (polls.length > 0) {
            await this.loadAnswers(polls[0].id)
            currPollKey = polls[0].id
        } 
        this.setState({
            currPollKey: currPollKey,
            isLoaded: true
        })
        
    }

    loadPolls = async () => {
        return Net.getPolls().then((polls) => {
            let newPolls = polls.reverse()
            this.setState({
                polls: newPolls
            })
            return newPolls
        }).catch((e) => {
            console.log(e)
        })
    }

    loadAnswers = async (pollId) => {
        if (this.state.pollAnswers[pollId] !== undefined) {
            return;
        }
        return Net.getAnswers(pollId).then((answers) => {
            this.setState((prevState) => {
                let pollAnswers = Object.assign({}, prevState.pollAnswers)
                pollAnswers[pollId] = answers;
                return {pollAnswers}
            })
        })
    }

    onPollChange = (poll) => {
        this.loadAnswers(poll.id).then(() => {
            this.setState({
                currPollKey: poll.id
            })
        })
    }



    render() {
        if (!this.state.isLoaded) {
            return null;
        }

        let items = this.state.pollAnswers[this.state.currPollKey];
        console.log(items)
        items = items === undefined ? [] : items;

        return (
            <div className="container">
                <NavBar user={this.props.user} />
                <div className="card w-100 mt-3">
                    <div className="card-header ">
                        <p className="h4 float-left mb-0">Responses</p>
                    </div>
                    <div className="card-body pt-0">
                        <ResponcesView
                            items={items}
                            polls={this.state.polls}
                            activeId={this.state.currPollKey}
                            onPollChange={this.onPollChange}
                        />
                    </div>
                </div>

            </div>

        )
    }
}