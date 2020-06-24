import React, { Component } from 'react'
import NavBar from '../components/NavBar'

import FieldForm from '../components/FieldForm'
import FieldTable from '../components/FieldTable'

import Net from '../net/Net'

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
                        className="modal fade"
                        id="AddFieldModal"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="AddFieldModalLabel"
                        aria-hidden="true"
                        >
                        <div className="modal-dialog" role="document">
                            <FieldForm field={this.state.formField} onChanged={this.onFieldsChanged}/>
                        </div>
                    </div>
                    <div className="card-body pt-0">
                        <FieldTable items={this.state.fields} onSelected={this.onFieldSelected} onChanged={this.onFieldsChanged}/>
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