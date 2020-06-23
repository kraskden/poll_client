import React, { Component } from 'react'
import Field from '../model/field'

// props.items
export default class FieldTable extends Component {

    onItemEdit = (item) => {
        this.props.onSelected(item)
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
                                <span class="oi oi-pencil mr-2 text-right" 
                                data-toggle="modal"
                                data-target="#AddFieldModal"
                                onClick={() => this.onItemEdit(item)}></span>
                                <span class="oi oi-trash"></span>
                        </div>
                    </td>
                </tr>
            )
        })

        return (
            <table class="table table-striped">
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