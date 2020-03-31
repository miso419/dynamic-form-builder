import React from "react";
import CommonHeader from "./CommonHeader";
import { getRootClassname } from "../../utils";
import CommonLabel from "./CommonLabel";

export default function({
    data,
    children,
    editable = false,
    onDestory,
    onEdit,
    errors,
    ...props
}) {
    const hasError =
        data &&
        errors &&
        errors.length &&
        errors.includes(data.field_name || data.fieldName);
    return (
        <div className={getRootClassname(data)}>
            {editable && <CommonHeader data={data} onEdit={onEdit} {...props} />}
            <div className={`form-group ${hasError ? "form-error" : ""}`}>
                <CommonLabel data={data} {...props} />
                {children}
            </div>
        </div>
    );
}
