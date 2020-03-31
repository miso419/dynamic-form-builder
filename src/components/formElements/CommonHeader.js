import React from "react";
import ToolbarHeader from "../ToolbarHeader";

export default function({ data, parent, editing, onDestroy, onEdit, ...rest }) {
    return (
        <div>
            {data && data.pageBreakBefore && (
                <div className="preview-page-break">Page Break</div>
            )}
            <ToolbarHeader
                parent={parent}
                onEdit={onEdit}
                data={data}
                onDestroy={onDestroy}
                required={data.required}
                {...rest}
            />
        </div>
    );
}
