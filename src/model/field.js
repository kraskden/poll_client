export default class Field {

    static typeNames = {
        text: "Single line text",
        multitext: "Multi line text",
        radio: "Radiobox",
        combobox: "Combobox",
        checkbox: "Checkbox",
        date: "Date"
    }

    constructor(id = 0, label = "", type = "text", properties = [], isRequired = true, isEnabled = true) {
        this.id = id;
        this.label = label;
        this.type = type;
        this.properties = properties;
        this.isRequired = isRequired;
        this.isEnabled = isEnabled;
    }

    static constructEmpty() {
        return new Field()
    }

}