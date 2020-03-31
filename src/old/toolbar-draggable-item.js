/**
 * <ToolbarItem />
 */

import React from "react";
import { useDrag } from "react-dnd";
import ID from "../UUID";
import { DND_ITEM_TYPES } from "../constants";

const style = {
    display: "inline-block",
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    cursor: "move"
};

export default function({ data, onClick, index }) {
    const [{ opacity }, drag] = useDrag({
        item: { type: DND_ITEM_TYPES.TOOLBAR_ITEM, data, index },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1
        })
    });

    return (
        <li
            ref={drag}
            onClick={onClick}
            data={data}
            id={ID.uuid()}
            style={{ ...style, opacity }}
        >
            <i className={data.icon} />
            {data.name}
        </li>
    );
}
