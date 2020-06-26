import React, { Component } from 'react'

import Ws from '../net/Ws'
import Net from '../net/Net'
import ResponcesView from '../components/ResponcesView'
import NavBar from '../components/NavBar'
import { Link } from 'react-router-dom'


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
        this.wsClient = Ws.getClient()

        this.wsClient.onConnect = () => {
            this.wsClient.subscribe("/user/topic/answers", (msg) => {
                if (msg.body) {
                    this.onNewMessage(msg.body)
                }
            })
            this.wsClient.subscribe("/user/topic/pollListener", () => {
                this.initData() // Update all poll list where 
            })
        }

        this.initData().then(() => {
            this.wsClient.activate()
        }).catch(() => {
            this.props.history.replace('/login')
        })
    }



    componentWillUnmount() {
        if (this.wsClient) {
            this.wsClient.deactivate()
        }
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
                polls: newPolls,
                pollAnswers: {}
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

    onNewMessage = (msg) => {
        msg = JSON.parse(msg)
        let masterId = this.state.polls[0].id;
        let newAnswers = {...this.state.pollAnswers}
        newAnswers[masterId].push(msg)
        this.setState({
            pollAnswers: newAnswers
        })
    }

    render() {
        if (!this.state.isLoaded) {
            return null;
        }

        let items = this.state.pollAnswers[this.state.currPollKey];
        items = items === undefined ? [] : items;

        return (
            <div className="container">
                <NavBar user={this.props.user} />
                <div className="card w-100 mt-3">
                    <div className="card-header ">
                        <p className="h4 float-left mb-0">Responses to <Link to={`/quest/${this.props.user.id}`}>quest</Link></p>
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