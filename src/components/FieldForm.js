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
            document.getElementById("btn-close").click() //close modal form
        })
    }


    render() {
        let field = this.props.field || Field.constructEmpty()

        let typeSelectOptions = Object.keys(Field.typeNames).map(fieldName => {
            if (fieldName === field.type) {
                return  <option value={fieldName} selected>{Field.typeNames[fieldName]}</option>
            } else {
                return <option value={fieldName}>{Field.typeNames[fieldName]}</option>
            }
        })

        return (
            <form
              class="modal-content"
              onSubmit={this.submitHandler}
            >
            <div class="modal-header">
              <h5
                class="modal-title"
                id="AddAccountModalLabel"
              >
                Add Field
              </h5>
    
              <button
                id="btn-close"
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
    
            </div>
    
            <div class="modal-body">
                <div class="form-group row">
                    <label for="inputLabel" class="col-sm-3 col-form-label">Label</label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control" id="inputLabel" defaultValue={field.label} ref={this.labelRef}/>
                    </div>
                </div>
    
                <div class="form-group row">
                    <label for="inputType" class="col-sm-3 col-form-label">Type</label>
                    <div class="col-sm-9">
                        <select class="custom-select" id="inputType" defaultValue={field.type} ref={this.typeRef}>
                            {typeSelectOptions}
                        </select>
                    </div>
                </div>
    
                <div class="form-group row">
                    <label for="inputOptions" class="col-sm-3 col-form-label">Options</label>
                    <div class="col-sm-9">
                        <textarea className="form-control" rows="4" id="inputOptions" defaultValue={field.properties.join('\n')} ref={this.optionRef}></textarea>
                    </div>
                </div>
    
                <div class="row">
                    <div class="col-sm-9 ml-auto">
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" id="customRadioInline1" name="customRadioInline1" 
                                class="custom-control-input" defaultChecked={field.isRequired} ref={this.isRequiredRef}/>
                            <label class="custom-control-label" for="customRadioInline1">Required</label>
                        </div>
                        <div class="custom-control custom-checkbox custom-control-inline">
                            <input type="checkbox" id="customRadioInline2" name="customRadioInline1" 
                                class="custom-control-input" defaultChecked={field.isEnabled} ref={this.isEnabledRef} />
                            <label class="custom-control-label" for="customRadioInline2">Is Enabled</label>
                        </div>
                    </div>
                </div>
    
            </div>
            
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                CANCEL
              </button>
              <button 
                type="submit"
                class="btn btn-primary"
              >
                SAVE
              </button>
            </div>
          </form>
          )
    }

}