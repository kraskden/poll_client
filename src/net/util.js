import Field from '../model/field'

let NetUtil = {}

NetUtil.converFieldToRaw = (field) => {
    function convertType(fieldType) {
        switch (fieldType) {
            case "text":
                return "SINGLE_TEXT";
            case "multitext":
                return "MULTI_TEXT"
            default:
                return fieldType.toUpperCase()
        }
    }

    return {
        id: field.id,
        name: field.label,
        fieldType: convertType(field.type),
        properties: field.properties,
        isEnabled: field.isEnabled,
        isRequired: field.isRequired
    }
}

NetUtil.convertRawToField = (raw) => {

    function convertType(rawType) {
        switch (rawType) {
            case "SINGLE_TEXT":
                return "text";
            case "MULTI_TEXT":
                return "multitext"
            case "RADIO_BUTTON":
                return "radio"
            default:
                return rawType.toLowerCase()
        }
    }

    return new Field(
        raw.id,
        raw.name,
        convertType(raw.fieldType),
        raw.properties,
        raw.isRequired,
        raw.isEnabled
    )
}

export default NetUtil