import React, { useRef } from "react";
import FormContainer from "./FormContainer";

export default function({ data, defaultValue, editable, fieldName, onChange, ...props }) {
    let inputFieldRef = useRef();
    return (
        <FormContainer data={data} editable={editable} {...props}>
            <select
                {...{
                    defaultValue,
                    onChange,
                    name: fieldName,
                    className: "form-control",
                    type: "text"
                }}
                ref={inputFieldRef}
                {...props}
            >
                {data.options.map(option => {
                    return (
                        <option value={option.value} key={`form-option-${option.key}`}>
                            {option.text}
                        </option>
                    );
                })}
            </select>
        </FormContainer>
    );
}
