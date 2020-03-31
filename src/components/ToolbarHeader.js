/**
 * <HeaderBar />
 */

import React, { useCallback, useContext } from "react";
import { StoreContext, ACTION_TYPES } from "../store";

export default function({ data, parent, onEdit, onDestroy, ...props }) {
    const [state, dispatch] = useContext(StoreContext);

    //eslint-disabled-line
    const editHandler = useCallback(() => {
        onEdit && onEdit(data);
    }, [data, onEdit]);

    const onDestoryHandler = useCallback(() => {
        dispatch({ type: ACTION_TYPES.DELETE_ELEMENT, payload: data });
    }, [data, dispatch]);

    return (
        <div className="toolbar-header" {...props}>
            <span className="label label-default">{data.text}</span>
            <div className="toolbar-header-buttons">
                {data.element !== "LineBreak" && (
                    <div className="btn is-isolated btn-school" onClick={editHandler}>
                        <i className="is-isolated fa fa-pencil-square-o" />
                    </div>
                )}
                <div className="btn is-isolated btn-school" onClick={onDestoryHandler}>
                    <i className="is-isolated fa fa-trash-o" />
                </div>
            </div>
        </div>
    );
}
