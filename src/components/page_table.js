import React, { Component } from 'react'

import Pagination from './pagination'

// props.items --> all items collection
// props.names --> col headers
// props.table --> React component for table
export default class PageTable extends Component {

    static pageSize = 10;

    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }

    render() {
        let items = this.props.items.slice((this.state.page - 1) * PageTable.pageSize, this.state.page * PageTable.pageSize);
        let RenderedTable = this.props.table;
        return (
            <>
                <RenderedTable items={items} names={this.props.names}/>
                <Pagination page={1} maxPage={3}/>
            </>
        )
    }
}