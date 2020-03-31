/**
 * <FormBuilder />
 */

import React from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import FormPreview from "./components/FormPreview";
import Toolbar from "./components/Toolbar";
import Store from "./store";
import { TOOLBAR_DEFAULT_ITEMS } from "./constants";

export default function({
    data,
    onLoad,
    onSave,
    variables,
    toolbarItems = TOOLBAR_DEFAULT_ITEMS,
    editable = true,
    ref,
    ...rest
}) {
    return (
        <Store>
            <DndProvider backend={HTML5Backend}>
                <div className="react-form-builder clearfix">
                    <FormPreview
                        data={data}
                        onSave={onSave}
                        editable={editable}
                        {...rest}
                    />
                    <Toolbar items={toolbarItems} />
                </div>
            </DndProvider>
        </Store>
    );
}
