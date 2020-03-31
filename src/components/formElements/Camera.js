import React, { useRef } from "react";
import FormContainer from "./FormContainer";
import CommonLabel from "./CommonLabel";

export default function({
    data,
    field_name,
    defaultValue,
    editable,
    onChange,
    ...props
}) {
    return (
        <FormContainer data={data} editable={editable} {...props}>
            {
                //TODO : Camera component
            }
        </FormContainer>
    );
}
