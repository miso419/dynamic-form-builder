import React, { useRef } from "react";
import FormContainer from "./FormContainer";

export default function({
    data,
    fieldName,
    defaultValue,
    editable,
    onChange,
    errors,
    ...props
}) {
    let optionsRef = useRef([]);

    return (
        <FormContainer data={data} {...props} errors={errors} editable={editable}>
            {(data.options || []).map(option => {
                return (
                    <label
                        className={`radio-label ${data.inline ? "option-inline" : ""}`}
                        key={`radio-${option.key}`}
                    >
                        <input
                            {...props}
                            {...{
                                name: option.key,
                                value: option.value,
                                onChange: e =>
                                    onChange({
                                        ...e,
                                        target: {
                                            value: e.target.value,
                                            name: e.target.name,
                                            fieldName
                                        }
                                    }),
                                disabled: props.disabled || props.readOnly,
                                readOnly: props.readOnly,
                                checked: defaultValue === option.key
                            }}
                            type="radio"
                            ref={optionsRef.current[option.key]}
                        />
                        {option.text}
                    </label>
                );
            })}
        </FormContainer>
    );
}
