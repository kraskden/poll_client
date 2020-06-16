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
                    {this.props.items.map((item) => 
                        <tr>
                            {keys.map((key) => <td key={item[key]}>{item[key]}</td>)}
                        </tr>
                    )}
                </tbody>

            </table>
        )
    }
}