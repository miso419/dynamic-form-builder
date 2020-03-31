import React from "react";

export default function({ text = "Drop a field here....", ...props }) {
    return (
        <div {...props}>
            <div>{text}</div>
        </div>
    );
}
