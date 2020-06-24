import React, { Component } from 'react'
import VoteFormField from './VoteFormField'

// props.fields
// props.onSubmit
export default class VoteForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editRefs: {},
            isLoaded: false
        }
    }

    componentDidMount() {
        console.log("Component did mount")
        this.setRefs()
        this.setState({
            isLoaded: true
        })
    }

    componentDidUpdate = (prevProps) => {
        console.log("Component did update")
        if (prevProps.fields !== this.props.fields) {
            this.setRefs()
        }
    }

    setRefs = () => {
        console.log("Set refs")
        let refs = {}
        for (const field of this.props.fields) {
            if (field.type === "radio") {
                refs[field.label] = field.properties.map(() => React.createRef());
            } else {
                refs[field.label] = React.createRef()
            }
        }
        this.setState({
            editRefs: refs
        })
    }

    getRadioValue = (refs) => {
        for (const ref of refs) {
            if (ref.current.checked) {
                return ref.current.value
            }
        }
        return null;
    }

    onSubmit = (e) => {
        e.preventDefault()
        let pollAnswer = {}

        console.log(this.state.editRefs)

        for (const field of this.props.fields) {
            let ref = this.state.editRefs[field.label]


            let questionAns = null;

            switch(field.type) {
                case "radio":
                    questionAns = this.getRadioValue(ref)
                    break;
                case "checkbox":
                    questionAns = ref.current.checked
                    break;
                case "date":
                    questionAns = Math.ceil((new Date(ref.current.value)).getTime() / 1000)
                    break;
                default:
                    questionAns = ref.current.value
            }

            if (questionAns) {
                pollAnswer[field.label] = questionAns
            }
        }
        console.log(pollAnswer)
        this.props.onSubmit(pollAnswer);
    }

    render() {
        if (!this.state.isLoaded) {
            return null;
        }
        return (
            <div className="card mt-4">
                <div class="card-header h5">
                    Vote
                </div>
                <div class="card-body">
                    <form onSubmit={this.onSubmit}>
                        {this.props.fields.map((field) => 
                            <VoteFormField field={field} fieldRef={this.state.editRefs[field.label]} />
                        )}
                        <button type="submit" className="btn btn-primary px-5">Save</button>
                    </form>
                </div>
            </div>
        )
    }


    // render() {

    //     let textField = new Field(1, "Text Input", "text", [], true, true)
    //     let textRef = React.createRef()

    //     let multiField = new Field(2, "Multi text field", "multitext", [], true, true)
    //     let multiRef = React.createRef();

    //     let radioButtons = new Field(3, "Radio Buttons.. Ohh", "radio", ["First", "Second"], true, true);
    //     let radioRefs = [React.createRef(), React.createRef()]

    //     let comboboxField = new Field(4, "Some combobox (fuck this)", "combobox", ["First", "Second", "Any", "Suck"], true, true);
    //     let comboboxRef = React.createRef()

    //     let checkboxField = new Field(5, "And checkbox...", "checkbox", [], true, true);
    //     let checkboxRef = React.createRef()

    //     let dateField = new Field(6, "Date field... Finally", "date", [], true, true);
    //     let dateRef = React.createRef()

    //     let onSubmit = (e) => {
    //         e.preventDefault()
    //         let dump = {
    //             text: textRef.current.value,
    //             multi: multiRef.current.value,
    //             combo: comboboxRef.current.value,
    //             radio: this.getRadioValue(radioRefs),
    //             checkbox: checkboxRef.current.checked,
    //             date: dateRef.current.value
    //         }
    //         console.log(dump)
    //     }

    //     return (
    //         <div className="card mt-4">
    //             <div class="card-header h5">
    //                 Vote
    //             </div>
    //             <div class="card-body">
    //                 <form onSubmit={onSubmit}>
    //                     <div class="form-group row px-3">
    //                         <label for="firstName">First name</label>
    //                         <input type="text" class="form-control" id="firstName" ref={this.firstName}  />
    //                     </div>
    //                     <VoteFormField 
    //                         field={textField}
    //                         fieldRef={textRef}
    //                     />
    //                     <VoteFormField 
    //                         field={multiField}
    //                         fieldRef={multiRef}
    //                     />
    //                     <VoteFormField 
    //                         field={radioButtons}
    //                         fieldRef={radioRefs}
    //                     />
    //                     <VoteFormField 
    //                         field={comboboxField}
    //                         fieldRef={comboboxRef}
    //                     />
    //                     <VoteFormField 
    //                         field={checkboxField}
    //                         fieldRef={checkboxRef}
    //                     />
    //                     <VoteFormField 
    //                         field={dateField}
    //                         fieldRef={dateRef}
    //                     />
    //                     <div class="form-group row px-3">
    //                         <label for="secondName">Last name</label>
    //                         <input type="text" class="form-control" id="secondName" ref={this.lastName}  />
    //                     </div>
    //                     <button type="submit" className="btn btn-primary px-5">Save</button>
    //                 </form>
    //             </div>
    //         </div>
    //     )
    // }
}