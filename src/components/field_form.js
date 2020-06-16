import React, { Component } from 'react'
import Field from '../model/field';


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
        let newField = new Field(
            this.labelRef.current.value, 
            this.typeRef.current.value,
            this.optionRef.current.value.split('\n'),
            this.isRequiredRef.current.value,
            this.isEnabledRef.current.value
        );
        console.log(newField);
    }

    render() {
        let field = this.props.field || new Field()

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
                            <option value="text">Single line text</option>
                            <option value="multitext">Multi line text</option>
                            <option value="radio">Radio Button</option>
                            <option value="checkbox">Checkbox</option>
                            <option value="combobox">Combobox</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                </div>
    
                <div class="form-group row">
                    <label for="inputOptions" class="col-sm-3 col-form-label">Options</label>
                    <div class="col-sm-9">
                        <textarea className="form-control" rows="4" id="inputOptions" defaultValue={field.option.join('\n')} ref={this.optionRef}></textarea>
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