import React, { useRef, useState, useCallback, useEffect, useMemo } from "react";
import FormContainer from "./FormContainer";
import ReactBootstrapSlider from "react-bootstrap-slider";

export default function({
    data,
    fieldName,
    readOnly,
    defaultValue,
    editable,
    onChange,
    ...props
}) {
    let inputFieldRef = useRef();
    const [value, setValue] = useState();

    const changeValueHandler = useCallback(
        e => {
            setValue(e.target.value);
            onChange &&
                onChange({
                    target: { name: fieldName, fieldName, value: e.target.value }
                });
        },
        [fieldName, onChange]
    );

    useEffect(() => {
        setValue(
            defaultValue !== undefined
                ? parseInt(defaultValue, 10)
                : parseInt(data.default_value, 10) || 10
        );
    }, [data.default_value, defaultValue]);

    const commonProps = useMemo(() => {
        return {
            name: data.fieldName,
            type: "range",
            list: `tickmarks_${data.field_name}`,
            min: data.min_value || data.minValue || data.min,
            max: data.max_value || data.maxValue || data.max,
            step: data.step,
            change: changeValueHandler,
            value: value || 0,
            disabled: readOnly ? "disabled" : ""
        };
    }, [
        changeValueHandler,
        data.fieldName,
        data.field_name,
        data.max,
        data.maxValue,
        data.max_value,
        data.min,
        data.minValue,
        data.min_value,
        data.step,
        readOnly,
        value
    ]);

    const { dataList } = useMemo(() => {
        let newData = [];
        for (
            let i = parseInt(commonProps.min, 10);
            i <= parseInt(commonProps.max, 10);
            i += parseInt(props.step, 10)
        ) {
            newData.push(i);
        }
        return {
            dataList: newData
        };
    }, [commonProps.max, commonProps.min, props.step]);

    return (
        <FormContainer data={data} editable={editable} {...props}>
            <div className="range">
                <div className="clearfix">
                    <span className="pull-left">{data.min_label}</span>
                    <span className="pull-right">{data.max_label}</span>
                </div>
                <ReactBootstrapSlider {...commonProps} ref={inputFieldRef} />
            </div>
            <div className="visible_marks">
                {dataList.map((d, idx) => {
                    const oneBig = 100 / (dataList.length - 1);
                    const option_props = {};
                    let w = oneBig;
                    if (idx === 0 || idx === dataList.length - 1) {
                        w = oneBig / 2;
                    }
                    option_props.key = `${props.list}_label_${idx}`;
                    option_props.style = { width: `${w}%` };
                    if (idx === dataList.length - 1) {
                        option_props.style = { width: `${w}%`, textAlign: "right" };
                    }
                    return <label {...option_props}>{d}</label>;
                })}
            </div>
            <input name={data.field_name} value={value} type="hidden" />

            <datalist id={props.list}>
                {dataList.map((d, idx) => (
                    <option key={`${props.list}_${idx}`}>{d}</option>
                ))}
            </datalist>
        </FormContainer>
    );
}
