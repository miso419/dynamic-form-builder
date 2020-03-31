/**
 * <ToolbarItem />
 */

import React from "react";
import { useDrag } from "react-dnd";
import ID from "../UUID";
import { DND_ITEM_TYPES } from "../constants";

const style = {
    display: "inline-flex",
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    cursor: "move",
    height: 56,
    alignItems: "center"
};

export default function({ data, onClick, index, disabled }) {
    const [{ opacity }, drag] = useDrag({
        item: { type: DND_ITEM_TYPES.TOOLBAR_ITEM, data, index },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1
        })
    });

    return (
        <li
            disabled={disabled}
            ref={!disabled ? drag : null}
            onClick={!disabled && onClick}
            data={data}
            id={ID.uuid()}
            style={{ ...style, opacity: disabled ? 0.2 : opacity }}
        >
            <i className={data.icon} />
            {data.name}
        </li>
    );
}
