import React, { useState, useCallback, useEffect } from "react";
import TextAreaAutosize from "react-textarea-autosize";
import { ContentState, EditorState, convertFromHTML, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { useDropzone } from "react-dropzone";
import DynamicOptionList from "./DynamicOptionList";

const toolbar = {
    options: ["inline", "list", "textAlign", "fontSize", "link", "history"],
    inline: {
        inDropdown: false,
        className: undefined,
        options: ["bold", "italic", "underline", "superscript", "subscript"]
    }
};

const getDraftToHTML = content => {
    return draftToHtml(convertToRaw(content.getCurrentContent()))
        .replace(/<p>/g, "")
        .replace(/<\/p>/g, "")
        .replace(/(?:\r\n|\r|\n)/g, " ");
};

const getConvertedHTML = content => {
    const newContent = convertFromHTML(content);
    if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
        // to prevent crash when no contents in editor
        return EditorState.createEmpty();
    }
    const contentState = ContentState.createFromBlockArray(newContent);
    return EditorState.createWithContent(contentState);
};

const getElementValues = (values = {}) => {
    return {
        dirty: !!values.dirty,
        checked: !!values.required,
        readOnly: !!values.readOnly,
        defaultToday: !!values.defaultToday,
        showTimeSelect: !!values.showTimeSelect,
        showTimeSelectOnly: !!values.showTimeSelectOnly,
        checkedInline: !!values.inline,
        checkedBold: !!values.bold,
        checkedItalic: !!values.italic,
        checkedCenter: !!values.center,
        checkedPageBreak: !!values.pageBreakBefore,
        checkedAlternateForm: !!values.alternateForm,
        files: (values.files || []).length ? values.files : [],
        editorState: getConvertedHTML(
            values.content ? values.content : values.label || {}
        ),
        multipleFilesUpload: !!values.multipleFilesUpload,
        ...values
    };
};

export default function({
    data,
    fieldValuesArg,
    preview,
    files,
    onChange,
    onClose,
    onFileUpload,
    ...props
}) {
    const [editorData, setEditorData] = useState({
        element: "",
        text: ""
    });
    const [elementValues, setElementValues] = useState({});

    useEffect(() => {
        setEditorData(data);
        setElementValues(getElementValues(data));
    }, [data]);

    const updateElementHandler = useCallback(() => {
        onChange(editorData);
    }, [editorData, onChange]);

    const onOptionsChangeHandler = useCallback(
        optionValue => {
            onChange(optionValue);
        },
        [onChange]
    );

    const editElementPropHandler = useCallback(
        (e, elemProperty, targetProperty) => {
            const newElement = {
                ...editorData,
                [elemProperty]: e.target[targetProperty]
            };
            setEditorData(newElement);
            setElementValues({
                ...elementValues,
                [elemProperty]: e.target[targetProperty]
            });
            onChange(newElement);
        },
        [editorData, elementValues, onChange]
    );

    const onEditorStateChangeHandler = useCallback(
        (editorContent, propName) => {
            if (editorContent) {
                const html = getDraftToHTML(editorContent);
                const newElement = { ...editorData, [propName]: html };
                setEditorData(newElement);
                setElementValues({ ...elementValues, [propName]: html });
                onChange(newElement);
            }
        },
        [editorData, elementValues, onChange]
    );

    const { getRootProps, getInputProps, open } = useDropzone({
        noDrag: true,
        noClick: true,
        noKeyboard: true,
        multiple: false,
        maxSize: 25 * 1024 * 1024,
        onDrop: droppedFiles => onDrop(droppedFiles),
        onDropRejected: () => alert(`Maximum file upload size is ${maxSize}MB`)
    });

    const onDrop = useCallback(
        accepted => {
            if (accepted.length > 0) {
                onFileUpload && onFileUpload(accepted, editorData);
            }
        },
        [onFileUpload, editorData]
    );

    return (
        <div>
            <div className="clearfix">
                <h4 className="pull-left">{editorData.text}</h4>
                <i className="pull-right fa fa-times dismiss-edit" onClick={onClose} />
            </div>
            {editorData.content && (
                <div className="form-group">
                    <label className="control-label">Text to display:</label>
                    <Editor
                        toolbar={toolbar}
                        defaultEditorState={elementValues.editorState}
                        onBlur={updateElementHandler}
                        onEditorStateChange={e =>
                            onEditorStateChangeHandler(e, "content")
                        }
                    />
                </div>
            )}
            {editorData.href && (
                <div className="form-group">
                    <TextAreaAutosize
                        type="text"
                        className="form-control"
                        defaultValue={editorData.href}
                        onBlur={updateElementHandler}
                        onChange={e => editElementPropHandler(e, "href", "value")}
                    />
                </div>
            )}

            {editorData.src && (
                <div>
                    <div className="form-group">
                        <label className="control-label" htmlFor="srcInput">
                            Link to:
                        </label>
                        <input
                            id="srcInput"
                            type="text"
                            className="form-control"
                            defaultValue={editorData.src}
                            onBlur={updateElementHandler}
                            onChange={e => editElementPropHandler(e, "src", "value")}
                        />
                    </div>
                    <div className="form-group">
                        <div className="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={elementValues.checkedCenter}
                                    value={true}
                                    onChange={e =>
                                        editElementPropHandler(e, "center", "checked")
                                    }
                                />
                                Center?
                            </label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                            <label className="control-label" htmlFor="elementWidth">
                                Width:
                            </label>
                            <input
                                id="elementWidth"
                                type="text"
                                className="form-control"
                                defaultValue={editorData.width}
                                onBlur={updateElementHandler}
                                onChange={e =>
                                    editElementPropHandler(e, "width", "value")
                                }
                            />
                        </div>
                        <div className="col-sm-3">
                            <label className="control-label" htmlFor="elementHeight">
                                Height:
                            </label>
                            <input
                                id="elementHeight"
                                type="text"
                                className="form-control"
                                defaultValue={editorData.height}
                                onBlur={updateElementHandler}
                                onChange={e =>
                                    editElementPropHandler(e, "height", "value")
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
            {editorData.label && (
                <div className="form-group">
                    <label>Display Label</label>
                    <Editor
                        toolbar={toolbar}
                        defaultEditorState={elementValues.editorState}
                        onBlur={updateElementHandler}
                        onEditorStateChange={e => onEditorStateChangeHandler(e, "label")}
                    />

                    <br />
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={elementValues.checked}
                                value={true}
                                onChange={e =>
                                    editElementPropHandler(e, "required", "checked")
                                }
                            />
                            Required
                        </label>
                    </div>
                    {editorData.readOnly && (
                        <div className="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={elementValues.readOnly}
                                    value={true}
                                    onChange={e =>
                                        editElementPropHandler(e, "readOnly", "checked")
                                    }
                                />
                                Read only
                            </label>
                        </div>
                    )}
                    {editorData.defaultToday && (
                        <div className="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={elementValues.defaultToday}
                                    value={true}
                                    onChange={e =>
                                        editElementPropHandler(
                                            e,
                                            "defaultToday",
                                            "checked"
                                        )
                                    }
                                />
                                Default to Today?
                            </label>
                        </div>
                    )}
                    {editorData.showTimeSelect && (
                        <div className="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={elementValues.showTimeSelectOnly}
                                    value={true}
                                    onChange={e =>
                                        editElementPropHandler(
                                            e,
                                            "showTimeSelect",
                                            "checked"
                                        )
                                    }
                                />
                                Show Time Select?
                            </label>
                        </div>
                    )}
                    {editorData.showTimeSelectOnly && (
                        <div className="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={elementValues.showTimeSelectOnly}
                                    value={true}
                                    onChange={e =>
                                        editElementPropHandler(
                                            e,
                                            "showTimeSelectOnly",
                                            "checked"
                                        )
                                    }
                                />
                                Show Time Select Only?
                            </label>
                        </div>
                    )}

                    {// RADIO BUTTONS or CHECKBOXES
                    (editorData.element === "RadioButtons" ||
                        editorData.element === "Checkboxes") && (
                        <div className="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={elementValues.checkedInline}
                                    value={true}
                                    onChange={e =>
                                        editElementPropHandler(e, "inline", "checked")
                                    }
                                />
                                Display horizonal
                            </label>
                        </div>
                    )}
                </div>
            )}

            {editorData.element === "Signature" && elementValues.readOnly ? (
                <div className="form-group">
                    <label className="control-label" htmlFor="variableKey">
                        Variable Key:
                    </label>
                    <input
                        id="variableKey"
                        type="text"
                        className="form-control"
                        defaultValue={editorData.variableKey}
                        onBlur={updateElementHandler}
                        onChange={e => editElementPropHandler(e, "variableKey", "value")}
                    />
                    <p className="help-block">
                        This will give the element a key that can be used to replace the
                        content with a runtime value.
                    </p>
                </div>
            ) : (
                <div />
            )}

            {editorData.step && (
                <div className="form-group">
                    <div className="form-group-range">
                        <label className="control-label" htmlFor="rangeStep">
                            Step
                        </label>
                        <input
                            id="rangeStep"
                            type="number"
                            className="form-control"
                            defaultValue={editorData.step}
                            onBlur={updateElementHandler}
                            onChange={e => editElementPropHandler(e, "step", "value")}
                        />
                    </div>
                </div>
            )}
            {editorData.min_value && (
                <div className="form-group">
                    <div className="form-group-range">
                        <label className="control-label" htmlFor="rangeMin">
                            Min
                        </label>
                        <input
                            id="rangeMin"
                            type="number"
                            className="form-control"
                            defaultValue={editorData.min_value}
                            onBlur={updateElementHandler}
                            onChange={e =>
                                editElementPropHandler(e, "min_value", "value")
                            }
                        />
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={editorData.min_label}
                            onBlur={updateElementHandler}
                            onChange={e =>
                                editElementPropHandler(e, "min_label", "value")
                            }
                        />
                    </div>
                </div>
            )}
            {editorData.max_value && (
                <div className="form-group">
                    <div className="form-group-range">
                        <label className="control-label" htmlFor="rangeMax">
                            Max
                        </label>
                        <input
                            id="rangeMax"
                            type="number"
                            className="form-control"
                            defaultValue={editorData.max_value}
                            onBlur={updateElementHandler}
                            onChange={e =>
                                editElementPropHandler(e, "max_value", "value")
                            }
                        />
                        <input
                            type="text"
                            className="form-control"
                            defaultValue={editorData.max_label}
                            onBlur={updateElementHandler}
                            onChange={e =>
                                editElementPropHandler(e, "max_label", "value")
                            }
                        />
                    </div>
                </div>
            )}
            {editorData.default_value && (
                <div className="form-group">
                    <div className="form-group-range">
                        <label className="control-label" htmlFor="defaultSelected">
                            Default Selected
                        </label>
                        <input
                            id="defaultSelected"
                            type="number"
                            className="form-control"
                            defaultValue={editorData.default_value}
                            onBlur={updateElementHandler}
                            onChange={e =>
                                editElementPropHandler(e, "default_value", "value")
                            }
                        />
                    </div>
                </div>
            )}
            {editorData.normalText && (
                <div className="form-group">
                    <label className="control-label">Text Style</label>
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={elementValues.checkedBold}
                                value={true}
                                onChange={e =>
                                    editElementPropHandler(e, "bold", "checked")
                                }
                            />
                            Bold
                        </label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={elementValues.checkedItalic}
                                value={true}
                                onChange={e =>
                                    editElementPropHandler(e, "italic", "checked")
                                }
                            />
                            Italic
                        </label>
                    </div>
                </div>
            )}

            {editorData.element === "FileUpload" && (
                <div className="form-group">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                checked={elementValues.multipleFilesUpload}
                                value={true}
                                onChange={e =>
                                    editElementPropHandler(
                                        e,
                                        "multipleFilesUpload",
                                        "checked"
                                    )
                                }
                            />
                            Allow Multiple File Upload
                        </label>
                    </div>
                </div>
            )}

            {editorData.element === "Download" && (
                <div className="form-group">
                    <button className="btn btn-primary" onClick={open}>
                        Upload file
                    </button>
                    <div {...getRootProps()}>
                        <input
                            {...getInputProps({
                                disabled: false,
                                name: editorData.fieldName
                            })}
                        />
                    </div>
                    {editorData.attachment &&
                        editorData.attachment.contentType &&
                        editorData.attachment.contentType.includes("image/") && (
                            <div
                                className="form-image-thumbnail"
                                style={{
                                    backgroundImage: `url(${editorData.attachment.downloadUrl})`
                                }}
                            />
                        )}
                    {editorData.attachment &&
                        editorData.attachment.downloadUrl &&
                        editorData.attachment.contentType &&
                        !editorData.attachment.contentType.includes("image/") && (
                            <div className="download-placeholder">
                                {editorData.attachment.promptSaveAs}
                            </div>
                        )}
                </div>
            )}

            {editorData.options && (
                <DynamicOptionList
                    canHaveOptionValue={elementValues.canHaveOptionValue}
                    onChange={onOptionsChangeHandler}
                    data={elementValues}
                    key={editorData.options.length}
                />
            )}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}
            >
                <button className="btn btn-primary" onClick={onClose}>
                    SAVE
                </button>
            </div>
        </div>
    );
}
