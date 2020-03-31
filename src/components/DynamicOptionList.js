import React, { useEffect, useCallback, useState } from "react";
import ID from "../UUID";

export default function({ data, canHaveOptionValue, onChange }) {
    const [currentElement, setCurrentElement] = useState({ options: [] });

    useEffect(() => {
        setCurrentElement(data);
    }, [data]);

    const editOptionTextHandler = useCallback(
        ({ target }, option) => {
            const newElement = {
                ...currentElement,
                options: currentElement.options.map(item => {
                    if (item.key === option.key) {
                        return { ...item, text: target.value };
                    }
                    return item;
                })
            };

            setCurrentElement(newElement);
        },
        [currentElement]
    );

    const editValueHandlerHandler = useCallback(
        ({ target }, option) => {
            const newElement = {
                ...currentElement,
                options: currentElement.options.map(item => {
                    if (item.key === option.key) {
                        return { ...item, value: target.value };
                    }
                    return item;
                })
            };
            setCurrentElement(newElement);
        },
        [currentElement]
    );

    const updateOptionHandler = useCallback(() => {
        onChange(currentElement);
    }, [currentElement, onChange]);

    const addOptionHandler = useCallback(
        index => {
            const newElement = {
                ...currentElement,
                options: currentElement.options.concat({
                    value: "",
                    text: "",
                    key: ID.uuid()
                })
            };
            setCurrentElement(newElement);

            onChange(newElement);
        },
        [currentElement, onChange]
    );

    const removeOptionHandler = useCallback(
        key => {
            const newElement = {
                ...currentElement,
                options: currentElement.options.filter(item => item.key !== key)
            };
            onChange(newElement);
        },
        [currentElement, onChange]
    );

    return (
        <div className="dynamic-option-list">
            <ul>
                <li>
                    <div className="row">
                        <div className="col-sm-6">
                            <b>Options</b>
                        </div>
                        {canHaveOptionValue && (
                            <div className="col-sm-2">
                                <b>Value</b>
                            </div>
                        )}
                    </div>
                </li>
                {(currentElement.options || []).map((option, index) => {
                    // const val = option.value !== toValue(option.text) ? option.value : "";
                    return (
                        <li className="clearfix" key={`edit_${option.key}`}>
                            <div className="row">
                                <div className="col-sm-6">
                                    <input
                                        tabIndex={index + 1}
                                        className="form-control"
                                        style={{ width: "100%" }}
                                        type="text"
                                        name={`text_${index}`}
                                        placeholder="Option text"
                                        value={option.text}
                                        onBlur={updateOptionHandler}
                                        onChange={e => editOptionTextHandler(e, option)}
                                    />
                                </div>
                                {canHaveOptionValue && (
                                    <div className="col-sm-2">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name={`value_${index}`}
                                            value={option.value}
                                            onChange={e =>
                                                editValueHandlerHandler(e, option)
                                            }
                                        />
                                    </div>
                                )}

                                <div className="col-sm-3">
                                    <div className="dynamic-options-actions-buttons">
                                        <button
                                            onClick={() => addOptionHandler(index)}
                                            className="btn btn-success"
                                        >
                                            <i className="fa fa-plus-circle" />
                                        </button>
                                        {!!index && (
                                            <button
                                                onClick={() =>
                                                    removeOptionHandler(option.key)
                                                }
                                                className="btn btn-danger"
                                            >
                                                <i className="fa fa-minus-circle" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
