/**
 * <FormValidator />
 */

import React, { useState, useEffect, createRef, useCallback } from "react";
import { XSS } from "./constants";

export default function({ emitter }) {
    const [errors, setErrors] = useState([]);
    const subscriptionRef = createRef({});

    useEffect(() => {
        subscriptionRef.current =
            emitter &&
            emitter.addListener("formValidation", _errors => {
                setErrors(_errors);
            });
        return () => {
            subscriptionRef.current.remove();
        };
    }, [emitter, subscriptionRef]);

    const dismissModal = useCallback(e => {
        e.preventDefault();
        setErrors([]);
    }, []);

    return (
        <div>
            {!!errors.length && (
                <div className="alert alert-danger validation-error">
                    <div className="clearfix">
                        <i className="fa fa-exclamation-triangle pull-left" />
                        <ul className="pull-left">
                            {errors.map((error, index) => (
                                <li
                                    key={`error_${index}`}
                                    dangerouslySetInnerHTML={{
                                        __html: XSS.process(error)
                                    }}
                                />
                            ))}
                        </ul>
                    </div>
                    <div className="clearfix">
                        <span
                            className="pull-right btn btn-default btn-sm btn-danger"
                            onClick={dismissModal}
                        >
                            Dismiss
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
