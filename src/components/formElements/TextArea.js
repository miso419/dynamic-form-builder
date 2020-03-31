import React, { useRef } from "react";
import FormContainer from "./FormContainer";
import TextAreaAutosize from "react-textarea-autosize";

export default function({ data, defaultValue, editable, onChange, fieldName, ...props }) {
    let inputFieldRef = useRef();

    return (
        <FormContainer data={data} editable={editable} {...props}>
            <TextAreaAutosize
                minRows={props.minRows || 2}
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
