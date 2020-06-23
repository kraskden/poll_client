import React, { Component } from 'react'
import NavBar from '../components/navbar'

import NamedTable from '../components/table'
import PageTable from '../components/page_table'
import FieldForm from '../components/field_form'
import Field from '../model/field'
import FieldTable from '../components/field_table'

import Net from '../net/net'

function Table(props) {
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
                <tr>
                    <td>Full Name</td>
                    <td>Single line text</td>
                    <td>True</td>
                    <td>True
                        <div style={{float: "right"}}>
                            <span class="oi oi-pencil mr-2 text-right"></span>
                            <span class="oi oi-trash"></span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default class FieldsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fields: [],
            formField: null
        }
    }

    componentDidMount() {
        this.loadFields()
    }

    loadFields = () => {
        Net.getFields().then((fields) => {
            this.setState({
                fields: fields
            })
        }).catch(ex => {
            this.props.history.replace('/login')
        })
    }

    onFieldsChanged = () => {
        this.loadFields()
    }

    onFieldSelected = (field) => {
        this.setState({
            formField: field
        })
    }

    render() {

        return (
            <div className="container">
                <NavBar user={this.props.user} />
                <div className="card w-100 mt-3">
                    <div className="card-header ">
                        <p className="h4 float-left mb-0">Fields</p>
                        <button 
                        onClick={() => this.setState({formField: null})}
                        className="btn btn-primary btn-sm float-right"
                        data-toggle="modal"
                        data-target="#AddFieldModal"
                        >ADD FIELD</button>
                    </div>
                    <div
                        class="modal fade"
                        id="AddFieldModal"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="AddFieldModalLabel"
                        aria-hidden="true"
                        >
                        <div className="modal-dialog" role="document">
                            <FieldForm field={this.state.formField}/>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        <FieldTable items={this.state.fields} onSelected={this.onFieldSelected}/>
                    </div>
                </div>
                {/* <br></br>
                <PageTable
                    table={NamedTable}
                    items={[
                        {"a": 2, "b": 3, "c": 4},
                        {"a": 3, "b": 6, "c": 45}
                    ]}
                    names={["Hello", "World", "Fuck"]}
                /> */}
            </div>
        )
    }
}