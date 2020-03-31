/**
 * <Toolbar />
 */

import React, { useCallback, useContext } from "react";
import ToolbarItem from "./ToolbarItem";
import { StoreContext, ACTION_TYPES } from "../store";

export default function({ items }) {
    const [state, dispatch] = useContext(StoreContext);

    const createHandler = useCallback(
        item => {
            dispatch({ type: ACTION_TYPES.CREATE_ELEMENT, payload: item });
        },
        [dispatch]
    );

    return (
        <div className="react-form-builder-toolbar pull-right">
            <h4>Toolbox</h4>
            <ul style={{ display: "flex", flexDirection: "column" }}>
                {items.map(item => (
                    <ToolbarItem
                        disabled={item.disabled}
                        data={item}
                        key={item.key}
                        onClick={() => createHandler(item)}
                    />
                ))}
            </ul>
        </div>
    );
}
