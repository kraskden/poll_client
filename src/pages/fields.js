import React, { Component } from 'react'
import NavBar from '../components/navbar'

import NamedTable from '../components/table'
import PageTable from '../components/page_table'
import FieldForm from '../components/field_form'
import Field from '../model/field'
import FieldTable from '../components/field_table'


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

    render() {
        let fields = [
            new Field("fasdf", "text"), 
            new Field("foodfasdg", "radio"), 
            new Field("sag msadna sand ad ", "checkbox"),
        ]

        return (
            <div className="container">
                <NavBar user="Fizzika" />
                <div className="card w-100 mt-3">
                    <div className="card-header ">
                        <p className="h4 float-left mb-0">Fields</p>
                        <button 
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
                            <FieldForm />
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        <FieldTable items={fields} />
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