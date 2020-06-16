export default class Field {

    static typeNames = {
        text: "Single line text",
        multitext: "Multi line text",
        radio: "Radiobox",
        combobox: "Combobox",
        checkbox: "Checkbox",
        date: "Date"
    }

    constructor(label = "", type = "text", option = [], isRequired = true, isEnabled = true) {
        this.label = label;
        this.type = type;
        this.option = option;
        this.isRequired = isRequired;
        this.isEnabled = isEnabled;
    }

}