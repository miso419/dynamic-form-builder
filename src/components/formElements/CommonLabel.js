import React from "react";
import { XSS } from "../../constants";

export default function({
    data,
    readOnly,
    className,
    fieldName,
    onDestory,
    onEdit,
    ...rest
}) {
    return (
        <label className={`${className} form-label`} {...rest}>
            {data && (
                <React.Fragment>
                    <span dangerouslySetInnerHTML={{ __html: XSS.process(data.label) }} />
                    {data.required && !readOnly && (
                        <span className="label-required label label-danger">
                            Required
                        </span>
                    )}
                </React.Fragment>
            )}
        </label>
    );
}
