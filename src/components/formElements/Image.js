import React, { useRef } from "react";
import FormContainer from "./FormContainer";

export default function({ data, fieldName, defaultValue, onChange, ...props }) {
    return (
        <FormContainer data={data} {...props}>
            {
                //TODO : Image component
            }
        </FormContainer>
    );
}
