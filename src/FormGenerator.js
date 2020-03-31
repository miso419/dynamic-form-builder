/**
 * <Form />
 */

import React, { useCallback, useEffect, useRef, createRef, useState } from "react";
import FormElements from "./components/formElements";
import { ELEMENT_TYPE, SAVE_FORM_GENERATOR_CLICK } from "./constants";
import { getErrors, optionsDefaultValue, getElementValue } from "./utils";

const {
    Image,
    Checkboxes,
    Signature,
    Download,
    Camera,
    FileUpload,
    RadioButtons
} = FormElements;

const SimpleElement = props => {
    const Element = FormElements[props.data.element];
    return <Element {...props} />;
};

export default function({
    answers = [],
    data,
    readOnly = true,
    disabled,
    editable,
    onChange,
    onError,
    onValidateForm,
    hasValidation = false,
    onSave,
    onUserFileUpload
}) {
    const [formData, setFormData] = useState([]);
    const [answersData, setAnswerData] = useState([]);
    const [errors, setErrors] = useState([]);

    let inputRefs = useRef({});

    useEffect(() => {
        if (data) {
            inputRefs.current = data.reduce(
                (prev, curr) => ({
                    ...prev,
                    [curr.field_name]: createRef()
                }),
                {}
            );
            const newFormData = data
                .filter(item => item.field_name || item.fieldName)
                .map(item => ({
                    ...item,
                    fieldName: item.field_name || item.fieldName
                }));
            const newAnswers = [...newFormData].map(({ fieldName, ...item }) => {
                const foundAnswer = answers.find(answer => answer.name === fieldName);
                if (foundAnswer) {
                    return foundAnswer;
                }
                return { name: fieldName, value: item.options ? [] : "" };
            });
            setFormData(newFormData);
            setAnswerData(newAnswers);
        }
    }, [data, answers]);// eslint-disable-line 

    const saveHandler = useCallback(
        e => {
            e.preventDefault();
            if (hasValidation && !readOnly) {
                const errors = getErrors(formData, answersData);
                setErrors(errors);
                onValidateForm &&
                    onValidateForm({ errors, elements: formData, answers: answersData });

                if (!!errors.length) onError && onError(errors, formData, answersData);

                if (!!errors.length) return;
            }
            onSave && onSave(answersData);
        },
        [answersData, formData, hasValidation, onError, onSave, onValidateForm, readOnly]
    );

    const onChangeHandler = useCallback(
        e => {
            const newAnswers = answersData.some(item =>
                [e.target.name, e.target.fieldName].includes(item.name)
            )
                ? answersData.map(item => {
                      if ([e.target.name, e.target.fieldName].includes(item.name)) {
                          return getElementValue(e.target, formData, item);
                      }
                      return item;
                  })
                : [...answersData, getElementValue(e.target, formData)];

            setAnswerData(newAnswers);

            onChange && onChange(e);
        },
        [answersData, formData, onChange]
    );

    const onFileUploadHandler = useCallback(
        e => {
            if (onUserFileUpload) return onUserFileUpload(e);
        },
        [onUserFileUpload]
    );

    return (
        <div className="react-form-builder">
            <div className="react-form-builder-form">
                {formData.map((item, index) => {
                    const fieldName = item.field_name || item.fieldName;
                    const commonProps = {
                        defaultValue: (
                            answersData.find(item => item.name === fieldName) || {
                                value: null
                            }
                        ).value,
                        readOnly,
                        data: item,
                        key: `form-${item.id || 0}-${index}`,
                        onChange: onChangeHandler,
                        fieldName,
                        errors
                    };

                    switch (item.element) {
                        // case "Rating":
                        case ELEMENT_TYPE.TEXT_INPUT:
                        case ELEMENT_TYPE.NUMBER_INPUT:
                        case ELEMENT_TYPE.TEXT_AREA:
                        case ELEMENT_TYPE.DROP_DOWN:
                        case ELEMENT_TYPE.DATE_PICKER:
                        case ELEMENT_TYPE.MULTI_SELECT_DROPDOWN:
                        case ELEMENT_TYPE.RANGE:
                            return (
                                <SimpleElement
                                    {...commonProps}
                                    ref={inputRefs.current[fieldName]}
                                />
                            );
                        case ELEMENT_TYPE.SIGNATURE:
                            return (
                                <Signature
                                    {...commonProps}
                                    onChange={onChangeHandler}
                                    ref={inputRefs.current[fieldName]}
                                />
                            );
                        case ELEMENT_TYPE.RADIO_BUTTONS:
                            return (
                                <RadioButtons
                                    {...commonProps}
                                    ref={inputRefs.current[fieldName]}
                                />
                            );
                        case ELEMENT_TYPE.CHECK_BOXES:
                            return (
                                <Checkboxes
                                    {...commonProps}
                                    defaultValue={
                                        commonProps.defaultValue ||
                                        optionsDefaultValue(item, answersData)
                                    }
                                    ref={inputRefs.current[fieldName]}
                                />
                            );
                        case ELEMENT_TYPE.IMAGE:
                            return <Image {...commonProps} />;
                        case ELEMENT_TYPE.DOWNLOAD:
                            return (
                                <Download
                                    {...commonProps}
                                    ref={inputRefs.current[fieldName]}
                                />
                            );
                        case ELEMENT_TYPE.CAMERA:
                            return (
                                <Camera
                                    {...commonProps}
                                    ref={inputRefs.current[fieldName]}
                                />
                            );
                        case ELEMENT_TYPE.FILE_UPLOAD:
                            return (
                                <FileUpload
                                    {...commonProps}
                                    onFileUpload={onFileUploadHandler}
                                />
                            );
                        default:
                            return (
                                <SimpleElement
                                    {...commonProps}
                                    ref={inputRefs.current[fieldName]}
                                />
                            );
                    }
                })}
                <input
                    type="submit"
                    className={`hidden ${SAVE_FORM_GENERATOR_CLICK}`}
                    onClick={saveHandler}
                />
            </div>
        </div>
    );
}
