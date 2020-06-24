import React, { Component } from 'react'
import Field from '../model/Field'

import Net from '../net/Net'

// props.items
export default class FieldTable extends Component {

    onItemEdit = (item) => {
        this.props.onSelected(item)
        // Continue edit on FieldForm
    }

    onItemDelete = (item) => {
        Net.deleteField(item.id).then(() => {
            this.props.onChanged()
        })
    }

    render() {

        let items = this.props.items.map((item, idx) => {
            return (
                <tr key={idx} >
                    <td>{item.label}</td>
                    <td>{Field.typeNames[item.type]}</td>
                    <td>{item.isRequired.toString()}</td>
                    <td>{item.isEnabled.toString()}
                        <div style={{float: "right"}}>
                                <span className="oi oi-pencil mr-4 text-right" 
                                data-toggle="modal"
                                data-target="#AddFieldModal"
                                onClick={() => this.onItemEdit(item)}></span>
                                <span className="oi oi-trash"
                                onClick={() => this.onItemDelete(item)}
                                ></span>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Label</th>
                    <th scope="col">Type</th>
                    <th scope="col">Required</th>
                    <th scope="col">Is Active</th>
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        )
    }
}