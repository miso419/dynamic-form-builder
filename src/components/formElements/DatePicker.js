import React, { useRef } from "react";
import FormContainer from "./FormContainer";

export default function({ data, defaultValue, field_name, onChange, ...props }) {
    return (
        <FormContainer data={data} {...props}>
            {
                //TODO : DatePicker component
            }
        </FormContainer>
    );
}
