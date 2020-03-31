export const getFieldProps = data => {
    return {
        dirty: !!data.dirty,
        required: !!data.required,
        readOnly: !!data.readOnly,
        defaultToday: !!data.defaultToday,
        showTimeSelect: !!data.showTimeSelect,
        showTimeSelectOnly: !!data.showTimeSelectOnly,
        inline: !!data.inline,
        bold: !!data.bold,
        italic: !!data.italic,
        center: !!data.center,
        pageBreakBefore: !!data.pageBreakBefore,
        alternateForm: !!data.alternateForm,
        files: data.files || [],
        editorState: data.editorState
    };
};

export const getElementData = data => {
    return {
        id: data.id || "",
        element: data.element,
        text: data.text || "",
        required: !!data.required,
        content: data.content,
        canHaveDisplayHorizontal: !!data.canHaveDisplayHorizontal,
        canHaveOptionValue: !!data.canHaveOptionValue,
        ...data
    };
};
