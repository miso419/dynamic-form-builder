import React, { useRef, useState, useEffect, useCallback } from "react";
import FormContainer from "./FormContainer";
import Select from "react-select";

function getDefaultValue(defaultValue, options) {
    if (defaultValue) {
        if (typeof defaultValue === "string") {
            const vals = defaultValue.split(",").map(x => x.trim());
            return options.filter(x => vals.indexOf(x.value) > -1);
        }
        return (
            options &&
            options
                .filter(({ key }) => defaultValue.includes(key))
                .map(item => {
                    return { ...item, label: item.text };
                })
        );
    }
    return [];
}

export default function({ data, fieldName, defaultValue, editable, onChange, ...props }) {
    let inputFieldRef = useRef();
    const [value, setValue] = useState([]);

    useEffect(() => {
        setValue(getDefaultValue(defaultValue, data.options));
    }, [data.options, defaultValue]);

    const changeHandler = useCallback(
        e => {
            setValue(e);
            onChange &&
                onChange({
                    ...e,
                    target: {
                        value: e
                            ? (Array.isArray(e) ? e : [e]).map(item => item.key)
                            : [],
                        name: fieldName,
                        fieldName
                    }
                });
        },
        [fieldName, onChange]
    );

    return (
        <FormContainer data={data} editable={editable} {...props}>
            <Select
                {...{
                    options: (data.options || []).map(option => ({
                        label: option.text,
                        ...option
                    })),
                    isMulti: true,
                    name: fieldName,
                    onChange: changeHandler,
                    isDisabled: props.disabled || props.readOnly,
                    value
                }}
                ref={inputFieldRef}
            />
        </FormContainer>
    );
}
