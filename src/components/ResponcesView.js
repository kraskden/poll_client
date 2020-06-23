import React, { Component } from 'react'

import Pagination from './Pagination'
import NamedTable from './NamedTable';
import PollsDropdown from './PollsDropdown';

// props.items --> all items collection
// props.polls 
// props.activeId --> id of active poll
// props.onPollChange (id) --> when poll changed

export default class ResponcesView extends Component {

    static pageSize = 10;

    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    onPageChanged = (newPage) => {
        this.setState({
            page: newPage
        })
    } 

    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            this.setState({
                page: 1
            })
        }
    }

    render() {
        let itemsSize = this.props.items.length;

        let startIdx = (this.state.page - 1) * ResponcesView.pageSize;
        let endIdx = this.state.page * ResponcesView.pageSize;
        endIdx = endIdx > itemsSize ? itemsSize : endIdx;

        let items = this.props.items.slice(startIdx, endIdx);
        let maxPage = Math.ceil(this.props.items.length / ResponcesView.pageSize)
        maxPage = maxPage > 1 ? maxPage : 1;

        let activePoll = this.props.polls.find((poll) => poll.id === this.props.activeId)

        return (
            <>
                <NamedTable items={items} names={activePoll.fields}/>
                <div className="row">
                    <div className="col-4">
                        <p className="h-4">{`${itemsSize === 0 ? 0 :  startIdx + 1} - ${endIdx} of ${itemsSize}`}</p>
                    </div>
                    <div className="col-4 ">
                        <div className="row justify-content-center">
                            <Pagination page={this.state.page} maxPage={maxPage} onChange={this.onPageChanged}/>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="row mr-2 justify-content-end">
                            <PollsDropdown
                                polls={this.props.polls}
                                activePoll={activePoll}
                                onSelected={this.props.onPollChange}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}