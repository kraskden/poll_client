import React, { Component } from 'react'


// props.field
// props.fieldRef
export default class VoteFormField extends Component {

    rnd = Math.ceil(Math.random() * 1000000)

    htmlId = `input-field-${this.props.field.id}`

    makeRadio = (baseProps) => {
        let field = this.props.field
        return (
            <div id={this.htmlId}>
                {
                    this.props.field.properties.map((prop, idx) => {
                        let rnd = Math.ceil(Math.random() * 1000000);
                        let ref = this.props.fieldRef[idx]
                        let id = `radio-input-${idx}-${rnd}`
                        return (
                            <div class="custom-control custom-radio pb-2">
                                {React.createElement("input", {
                                    ...baseProps,
                                    type: "radio",
                                    ref: ref,
                                    id: id,
                                    name: field.label,
                                    className: "custom-control-input",
                                    value: prop
                                })}
                                <label class="custom-control-label" for={id}>{prop}</label>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    makeSelect = (isEnabled, isRequired) => {
        let field = this.props.field
    
        let options = field.properties.map((prop, idx) => (
            <option key={idx} value={prop}>{prop}</option>
        ))

        if (!isEnabled) {
            return (
                <select id={this.htmlId} ref={this.props.fieldRef} className="custom-select" disabled>
                    {options}
                </select>
            )
        }

        if (isRequired) {
            return (
                <select id={this.htmlId} ref={this.props.fieldRef}  className="custom-select" required>
                    {options}
                </select>
            )
        }

        return (
            <select id={this.htmlId} ref={this.props.fieldRef} className="custom-select">
                {options}
            </select>
        )
    }

    makeCheckbox = (baseProps) => {
        let field = this.props.field
        delete baseProps.required
        return (
            <div class="custom-control custom-checkbox">
                {React.createElement("input", {
                    ...baseProps,
                    className: "custom-control-input",
                    type: "checkbox"
                })}
                <label class="custom-control-label" for={this.htmlId}>{field.label}</label>
            </div>
        )
    }


    makeFormRowWrapper = (input) => {
        return (
            <div class="form-group row px-3">
                <label for={this.htmlId}>{this.props.field.label}</label>
                {input}
            </div>
        )
    }

    makeRadioWrapper = (radioInput) => {
        return (
            <div className="mb-2">
                <label>{this.props.field.label}</label>
                <br />
                {radioInput}
            </div>
        )
    }

    makeInput = () => {
        let field = this.props.field

        let baseProps = {
            className: "form-control",
            id: this.htmlId,
            ref: this.props.fieldRef,
        }
        if (field.isRequired) {
            baseProps.required = "required"
        }
        if (!field.isEnabled) {
            baseProps.disabled = "disabled"
        }

        switch (field.type) {
            case "text":
                return this.makeFormRowWrapper(React.createElement("input", {...baseProps, type: "text"}))
            case "multitext":
                return this.makeFormRowWrapper(React.createElement("textarea", {...baseProps, rows: 3}))
            case "radio":
                return this.makeRadioWrapper(this.makeRadio(baseProps))
            case "combobox":
                return this.makeFormRowWrapper(this.makeSelect(field.isEnabled, field.isRequired))
            case "checkbox":
                return <div className="mb-3">{this.makeCheckbox(baseProps)}</div>
            case "date":
                return this.makeFormRowWrapper(React.createElement("input", {...baseProps, type: "date"}))
            default:
                return this.makeFormRowWrapper(React.createElement("input"))
        }
    }


    render() {
        return this.makeInput()
    }
}