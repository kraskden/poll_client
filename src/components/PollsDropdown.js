import React, { Component } from 'react'

// props.polls --> list of all polls
// props.activeId --> Id of active poll
// props.onSelected (poll) --> on 
export default class PollsDropdown extends Component {

    formatDate = (dateStr) => {
        let date = new Date(dateStr)
        return `${date.getDate()}/${date.getMonth()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }

    isMasterPoll = (poll) => {
        if (this.props.polls.length === 0) {
            return false;
        }
        return poll.id === this.props.polls[0].id
    }

    makePollEntry = (poll) => {
        return `${this.formatDate(poll.date)}${this.isMasterPoll(poll) ? " [MASTER]" : ""}`
    }
    

    render() {
        if (this.props.polls.length === 0) {
            return <> </>
        }

        let activePoll = this.props.activePoll;

        return (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.makePollEntry(activePoll)}
                </button>

                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {this.props.polls.map((poll) => (
                        <button className="dropdown-item" key={poll.id} onClick={() => this.props.onSelected(poll)}>
                            {this.makePollEntry(poll)}
                        </button>
                    ))}
                </div>
            </div>
        )
    }
}