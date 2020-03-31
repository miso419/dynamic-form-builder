import React, { useRef } from "react";
import FormContainer from "./FormContainer";

export default function({ data, defaultValue, fieldName, editable, onChange, ...props }) {
    let inputFieldRef = useRef();
    return (
        <FormContainer data={data} editable={editable} {...props}>
            <input
                {...{
                    defaultValue,
                    onChange,
                    name: fieldName,
                    className: "form-control",
                    type: "text"
                }}
                ref={inputFieldRef}
                {...props}
            />
        </FormContainer>
    );
}
