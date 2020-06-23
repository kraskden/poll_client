import React, { Component } from 'react'


// props.items --> 
// props.names --> 
export default class NamedTable extends Component {


    render() {
        let keys = this.props.items[0] ? Object.keys(this.props.items[0]) : [];    
        return (
            <table class="table table-striped">
                <thead>
                    <tr>
                        {this.props.names.map((name) => <th scope="col" key={name}>{name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map((item, idx) => 
                        <tr key={idx}>
                            {this.props.names.map((name, idx) => <td key={idx}>{item[name] ? item[name] : "N/A"}</td>)}
                        </tr>
                    )}
                </tbody>

            </table>
        )
    }
}