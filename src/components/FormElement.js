import React from "react";
import ToolbarHeader from "./ToolbarHeader";

export default function({ children, data, onDestroy, onEdit, className = "rfb-item" }) {
    return (
        <div className={className}>
            <ToolbarHeader
                name={data.text}
                onDestroy={onDestroy}
                onEdit={onEdit}
                required={data.required}
            />
            {children}
        </div>
    );
}
