import React, { Component } from 'react'
import Field from '../model/Field';

import Net from '../net/Net'


// props.field
export default class FieldForm extends Component {

    constructor(props) {
        super(props);
        this.labelRef = React.createRef()
        this.typeRef = React.createRef()
        this.optionRef = React.createRef()
        this.isEnabledRef = React.createRef()
        this.isRequiredRef = React.createRef()
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps == null || nextProps.field == null) {
            return true;
        }
        this.labelRef.current.value = nextProps.field.label;
        this.typeRef.current.value = nextProps.field.type;
        this.optionRef.current.value = nextProps.field.properties.join('\n')
        this.isEnabledRef.current.checked = nextProps.field.isEnabled
        this.isRequiredRef.current.checked = nextProps.field.isRequired
        return true;
    }

    submitHandler = (e) => {
        e.preventDefault();

        let optionsString = this.optionRef.current.value
        let newField = new Field(
            0,
            this.labelRef.current.value, 
            this.typeRef.current.value,
            optionsString === "" ? [] : optionsString.split('\n'),
            this.isRequiredRef.current.checked,
            this.isEnabledRef.current.checked
        );
        
        let oldField = this.props.field;
        let promiseCall = oldField ? () => Net.updateField(oldField.id, newField) : () => Net.addField(newField)
        promiseCall().then(() => {
            this.props.onChanged()
        }).catch(() => {
            console.log("Error updating")
        }).finally(() => {
            document.getElementById("btn-cancel").click() //close modal form
            //$("#AddFieldModal").modal('dispose')
            //document.getElementById("AddFieldModal").modal("dispose")
        })
    }


    render() {
        let field = this.props.field || Field.constructEmpty()

        let typeSelectOptions = Object.keys(Field.typeNames).map((fieldName, idx) => {
            if (fieldName === field.type) {
                return  <option value={fieldName} key={idx} selected>{Field.typeNames[fieldName]}</option>
            } else {
                return <option value={fieldName} key={idx}>{Field.typeNames[fieldName]}</option>
            }
        })

        return (
            <form
              className="modal-content"
              onSubmit={this.submitHandler}
            >
            <div className="modal-header">
              <h5
                className="modal-title"
                id="AddAccountModalLabel"
              >
                Add Field
              </h5>
    
              <button
                id="btn-close"
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
    
            </div>
    
            <div className="modal-body">
                <div className="form-group row">
                    <label htmlFor="inputLabel" className="col-sm-3 col-form-label">Label</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" id="inputLabel" defaultValue={field.label} ref={this.labelRef}/>
                    </div>
                </div>
    
                <div className="form-group row">
                    <label htmlFor="inputType" className="col-sm-3 col-form-label">Type</label>
                    <div className="col-sm-9">
                        <select className="custom-select" id="inputType" ref={this.typeRef}>
                            {typeSelectOptions}
                        </select>
                    </div>
                </div>
    
                <div className="form-group row">
                    <label htmlFor="inputOptions" className="col-sm-3 col-form-label">Options</label>
                    <div className="col-sm-9">
                        <textarea className="form-control" rows="4" id="inputOptions" defaultValue={field.properties.join('\n')} ref={this.optionRef}></textarea>
                    </div>
                </div>
    
                <div className="row">
                    <div className="col-sm-9 ml-auto">
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" id="customRadioInline1" name="customRadioInline1" 
                                className="custom-control-input" defaultChecked={field.isRequired} ref={this.isRequiredRef}/>
                            <label className="custom-control-label" htmlFor="customRadioInline1">Required</label>
                        </div>
                        <div className="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" id="customRadioInline2" name="customRadioInline1" 
                                className="custom-control-input" defaultChecked={field.isEnabled} ref={this.isEnabledRef} />
                            <label className="custom-control-label" htmlFor="customRadioInline2">Is Enabled</label>
                        </div>
                    </div>
                </div>
    
            </div>
            
            <div className="modal-footer">
              <button
                id="btn-cancel"
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                CANCEL
              </button>
              <button 
                type="submit"
                className="btn btn-primary"
              >
                SAVE
              </button>
            </div>
          </form>
          )
    }

}