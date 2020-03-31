import React, { useRef } from "react";
import FormContainer from "./FormContainer";

export default function({
    data,
    fieldName,
    defaultValue = [],
    onChange,
    errors,
    editable,
    ...props
}) {
    let optionsRef = useRef([]);
    return (
        <FormContainer data={data} errors={errors} editable={editable} {...props}>
            {(data.options || []).map(option => {
                return (
                    <label
                        className={`checkbox-label ${data.inline ? "option-inline" : ""}`}
                        key={`preview_${option.key}`}
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
                                checked: defaultValue.includes(option.key)
                            }}
                            type="checkbox"
                            ref={optionsRef.current[option.key]}
                        />
                        {option.text}
                    </label>
                );
            })}
        </FormContainer>
    );
}
