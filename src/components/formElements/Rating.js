import React, { useRef } from "react";
import FormContainer from "./FormContainer";

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
                //TODO : Rating component
            }
        </FormContainer>
    );
}
