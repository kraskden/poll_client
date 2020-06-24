import React, { Component } from 'react'


// props.items --> 
// props.fields --> 
export default class NamedTable extends Component {

    getFieldContent = (item, field, idx) => {
        let payload = "N/A";
        if (item[field.name]) {
            if (field.type === "DATE") {
                console.log(item[field.name])
                let date = new Date(item[field.name] * 1000)
                payload = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
            } else {
                payload = item[field.name]
            }
        }
        return payload;
    }


    render() {
        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        {this.props.fields.map((field) => <th scope="col" key={field.name}>{field.name}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.props.items.map((item, idx) => 
                        <tr key={idx}>
                            {this.props.fields.map((field, idx) => <td key={idx}>{this.getFieldContent(item, field, idx)}</td>)}
                        </tr>
                    )}
                </tbody>

            </table>
        )
    }
}