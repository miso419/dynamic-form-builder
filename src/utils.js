import ReactDOM from "react-dom";
import { ELEMENT_TYPE } from "./constants";
import ID from "./UUID";

export function getErrors(elements, answers) {
    const errors = elements
        .filter(item => !!item.required)
        .filter(
            field =>
                !answers.length ||
                answers.some(item => {
                    return (
                        [field.field_name || field.fieldName].includes(item.name) &&
                        ((Array.isArray(item.value) && !item.value.length) ||
                            [null, "", undefined].includes(item.value))
                    );
                })
        )
        .map(field => field.field_name || field.fieldName);
    return errors;
}

export function getElementValueByRef(item, ref) {
    if (!ref || !item.element) return "";

    switch (item.element) {
        case ELEMENT_TYPE.RATING: {
            return ref.inputField.current.state.rating;
        }
        case ELEMENT_TYPE.MTUL: {
            return ref.inputField.current.state.value;
        }
        case ELEMENT_TYPE.DATE_PICKER: {
            return ref.state.value;
        }
        case ELEMENT_TYPE.CAMERA: {
            return ref.state.img.replace("data:image/png;base64,", "");
        }
        default: {
            return (item.value || "").trim();
        }
    }
}

export function getItemValue(item, ref) {
    return {
        element: item.element || {},
        value: getElementValueByRef(item, ref)
    };
}

export function getElementValue(field, element, answer) {
    const selectedElement = element.find(item => item.fieldName === field.fieldName);

    if (!selectedElement) {
        return { name: field.fieldName || field.name, value: field.value };
    }
    switch (selectedElement.element) {
        case ELEMENT_TYPE.RADIO_BUTTONS: {
            return { name: field.fieldName || field.name, value: field.name };
        }
        case ELEMENT_TYPE.MULTIPLE_CHOICES: {
            return {
                name: selectedElement.fieldName,
                value: [
                    ...answer.value,
                    ...selectedElement.options
                        .filter(item => {
                            return item.key === field.name;
                        })
                        .map(item => item.key)
                ]
            };
        }
        case ELEMENT_TYPE.CHECK_BOXES: {
            return {
                name: selectedElement.fieldName,
                value: selectedElement.options
                    .filter(item => item.key === field.name)
                    .map(item => {
                        if (item.key === field.name) {
                            return field.name;
                        }
                        return item.name;
                    })
            };
        }
        default: {
            return { name: field.fieldName || field.name, value: field.value };
        }
    }
}

export function getFieldValue(field, element) {
    const selectedElement = element.find(item => item.fieldName === field.fieldName);
    if (!selectedElement) {
        return field.value;
    }
    switch (selectedElement.element) {
        case ELEMENT_TYPE.CHECK_BOXES:
        case ELEMENT_TYPE.RADIO_BUTTONS: {
            return selectedElement.options
                .filter(item => item.key === field.name)
                .map(item => {
                    if (item.key === field.name) {
                        return field.value;
                    }
                    return item.value;
                });
        }
        default: {
            return field.value;
        }
    }
}

export function optionsDefaultValue(item, answers) {
    return (
        item.options &&
        item.options.map(option => {
            return answers && answers[option.key];
        })
    ).filter(i => !!i);
}

export function isInvalid(item, ref) {
    if (item.required === true) {
        if (
            item.element === ELEMENT_TYPE.CHECK_BOXES ||
            ELEMENT_TYPE === ELEMENT_TYPE.RADIO_BUTTONS
        ) {
            return (item.options || []).some(el => {
                const option = ReactDOM.findDOMNode(ref.options[`child_ref_${el.key}`]);
                return !option.checked;
            });
        } else {
            const value = getItemValue(item, ref).value;
            if (item.element === ELEMENT_TYPE.RATING) {
                if (!value || value === 0) {
                    return true;
                }
            } else if (value === undefined || value.length < 1) {
                return true;
            }
        }
    }
    return false;
}

export function getFormData(item, ref) {
    return {
        name: item.field_name,
        value:
            item.element === ELEMENT_TYPE.CHECK_BOXES ||
            item.element === ELEMENT_TYPE.RADIO_BUTTONS
                ? item.options
                      .filter(option => {
                          const optionDom = ReactDOM.findDOMNode(
                              ref.options[`child_ref_${option.key}`]
                          );
                          return !!optionDom.checked;
                      })
                      .map(option => option.key)
                : (getItemValue(item, ref) || { valud: "" }).value
    };
}

export function setSignatureImage(element) {
    const canvas = element.canvas && element.canvas.current;
    if (canvas) {
        const base64 = canvas.toDataURL().replace("data:image/png;base64,", "");
        const isEmpty = canvas.isEmpty();
        const signatureDom = ReactDOM.findDOMNode(canvas.inputField.current);
        signatureDom.value = isEmpty ? "" : base64;
    }
}

export function defaultItemOptions(element) {
    switch (element) {
        case ELEMENT_TYPE.DROP_DOWN:
            return [
                {
                    value: "1",
                    text: "option 1",
                    key: `dropdown_option_${ID.uuid()}`
                },
                {
                    value: "2",
                    text: "option 2",
                    key: `dropdown_option_${ID.uuid()}`
                },
                {
                    value: "3",
                    text: "option 3",
                    key: `dropdown_option_${ID.uuid()}`
                }
            ];
        case ELEMENT_TYPE.MULTI_SELECT_DROPDOWN:
            return [
                {
                    value: "1",
                    text: "option  1",
                    key: `multi_select_option_${ID.uuid()}`
                },
                {
                    value: "2",
                    text: "option 2",
                    key: `multi_select_option_${ID.uuid()}`
                },
                {
                    value: "3",
                    text: "option 3",
                    key: `multi_select_option_${ID.uuid()}`
                }
            ];
        case ELEMENT_TYPE.MULTIPLE_CHOICES:
            return [
                {
                    value: "1",
                    text: "option 1",
                    key: `checkboxes_option_${ID.uuid()}`
                },
                {
                    value: "2",
                    text: "option 2",
                    key: `checkboxes_option_${ID.uuid()}`
                },
                {
                    value: "3",
                    text: "option 3",
                    key: `checkboxes_option_${ID.uuid()}`
                }
            ];
        case ELEMENT_TYPE.CHECK_BOXES:
            return [
                {
                    value: "1",
                    text: "option 1",
                    key: `checkboxes_option_${ID.uuid()}`
                },
                {
                    value: "2",
                    text: "option 2",
                    key: `checkboxes_option_${ID.uuid()}`
                },
                {
                    value: "3",
                    text: "option 3",
                    key: `checkboxes_option_${ID.uuid()}`
                }
            ];
        case ELEMENT_TYPE.RADIO_BUTTONS:
            return [
                {
                    value: "1",
                    text: "option 1",
                    key: `radiobuttons_option_${ID.uuid()}`
                },
                {
                    value: "2",
                    text: "option 2",
                    key: `radiobuttons_option_${ID.uuid()}`
                },
                {
                    value: "3",
                    text: "option 3",
                    key: `radiobuttons_option_${ID.uuid()}`
                }
            ];
        default:
            return [];
    }
}

export function createElement(item) {
    const elementOptions = {
        id: ID.uuid(),
        element: item.key,
        text: item.name,
        normalText: !!item.static,
        required: false
    };

    if (item.static) {
        elementOptions.bold = false;
        elementOptions.italic = false;
    }

    if (item.canHaveAnswer) {
        elementOptions.canHaveAnswer = item.canHaveAnswer;
    }

    if (item.canReadOnly) {
        elementOptions.readOnly = false;
    }

    if (item.canDefaultToday) {
        elementOptions.defaultToday = false;
    }

    if (item.content) {
        elementOptions.content = item.content;
    }

    if (item.href) {
        elementOptions.href = item.href;
    }

    elementOptions.canHaveDisplayHorizontal = item.canHaveDisplayHorizontal !== false;
    elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;

    if (item.key === ELEMENT_TYPE.IMAGE) {
        elementOptions.src = item.src;
    }

    if (item.key === ELEMENT_TYPE.DATE_PICKER) {
        elementOptions.dateFormat = item.dateFormat;
        elementOptions.timeFormat = item.timeFormat;
        elementOptions.showTimeSelect = item.showTimeSelect;
        elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
    }

    if (item.key === ELEMENT_TYPE.DOWNLOAD) {
        elementOptions.attachment = item.attachment;
    }

    if (item.key === ELEMENT_TYPE.RANGE) {
        elementOptions.step = item.step;
        elementOptions.default_value = item.default_value;
        elementOptions.min_value = item.min_value;
        elementOptions.max_value = item.max_value;
        elementOptions.min_label = item.min_label;
        elementOptions.max_label = item.max_label;
    }

    if (item.defaultValue) {
        elementOptions.defaultValue = item.defaultValue;
    }

    elementOptions.field_name = elementOptions.fieldName = `${item.field_name ||
        item.key ||
        ""}_${ID.uuid()}`;

    if (item.label) {
        elementOptions.label = item.label;
    }

    if (item.options) {
        elementOptions.options = defaultItemOptions(elementOptions.element);
    }
    return elementOptions;
}

export const getRootClassname = (data, baseClass = "SortableItem rfb-item") => ` 
    ${baseClass} 
    ${data.pageBreakBefore ? "alwaysbreak" : ""} 

`;

export const getComponentClassname = (data, baseClass = "title") => ` 
    ${baseClass}  
    ${data.italic ? "italic" : ""}
    ${data.bold ? "bold" : ""}
    ${data.disabled ? "disabled" : ""}

`;
