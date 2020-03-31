/**
 * <Preview />
 */

import React, { useEffect, useRef, useCallback, useState, useContext } from "react";
import { useDrop } from "react-dnd";
import FormElementsEdit from "./FormElementEditor";
import DNDelement from "./DNDcard";
import ELEMENTS from "./formElements";
import { DND_ITEM_TYPES, SAVE_FORM_BUILDER_CLICK } from "../constants";
import PlaceHolder from "./PlaceHolder";
import { StoreContext, ACTION_TYPES } from "../store";

export default function({
    data,
    onSave,
    onChange,
    editable,
    readonly,
    onFileUpload,
    className = "react-form-builder-preview pull-left"
}) {
    const [state, dispatch] = useContext(StoreContext);
    const editFormRef = useRef();
    const [formData, setFormData] = useState([]);
    const [activeEditData, setActiveEditData] = useState();

    useEffect(() => {
        dispatch({ type: ACTION_TYPES.LOAD_DATA, payload: data });
    }, [data, dispatch]);

    useEffect(() => {
        setFormData(state.formData);
    }, [state.formData]);

    useEffect(() => {
        onChange && onChange(formData);
    }, [formData, onChange]);

    const onChangeEditorHandler = useCallback(
        element => {
            if (formData.some(item => item.id === element.id)) {
                setActiveEditData(element);
                dispatch({ type: ACTION_TYPES.UPDATE_ELEMENT, payload: element });
            }
        },
        [dispatch, formData]
    );

    const onEditCloseHandler = useCallback(() => {
        setActiveEditData(null);
    }, []);

    const mouseDownHandler = useCallback(
        e => {
            if (editFormRef.current && !editFormRef.current.contains(e.target)) {
                onEditCloseHandler();
            }
        },
        [onEditCloseHandler]
    );

    useEffect(() => {
        document.addEventListener("mousedown", mouseDownHandler);
        return () => {
            document.removeEventListener("mousedown", mouseDownHandler);
        };
    }, [data]); // eslint-disable-line

    const onEditElementHandler = useCallback(newEditElement => {
        setActiveEditData(newEditElement);
    }, []);

    const moveCard = useCallback(
        (dragIndex, hoverIndex) => {
            if (formData[dragIndex]) {
                dispatch({
                    type: ACTION_TYPES.MOVE_ELEMENT,
                    payload: { dragIndex, hoverIndex }
                });
            }
        },
        [dispatch, formData]
    );

    const onDropItem = useCallback(
        item => {
            if (item && item.data) {
                dispatch({ type: ACTION_TYPES.ON_DROP_ELEMENT, payload: item });
            }
        },
        [dispatch]
    );

    const saveHandler = useCallback(
        item => {
            onSave && onSave(formData);
        },
        [formData, onSave]
    );

    const [{ isOver, canDrop }, drop] = useDrop({
        accept: [DND_ITEM_TYPES.CARD, DND_ITEM_TYPES.TOOLBAR_ITEM],
        drop: onDropItem,
        hover(item, monitor) {
            // #TODO :  handles hover
        },
        collect: monitor => {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop()
            };
        }
    });

    const onFileUploadHandler = useCallback(
        (fileData, elementData) => {
            onFileUpload &&
                onFileUpload(fileData, elementData).then(data => {
                    const element = { ...elementData, ...{ attachment: data } };
                    setActiveEditData(element);
                    dispatch({ type: ACTION_TYPES.UPDATE_ELEMENT, payload: element });
                });
        },
        [onFileUpload, dispatch]
    );
    return (
        <div className={activeEditData ? `${className} is-editing` : className}>
            <div className="edit-form" ref={editFormRef}>
                {activeEditData && (
                    <FormElementsEdit
                        onClose={onEditCloseHandler}
                        data={activeEditData}
                        onChange={onChangeEditorHandler}
                        onFileUpload={onFileUploadHandler}
                    />
                )}
            </div>
            <div className="Sortable " ref={drop}>
                {formData.map((item, index) => (
                    <DNDelement
                        Component={ELEMENTS[item.element]}
                        editable={editable}
                        readOnly={readonly}
                        id={item.id}
                        index={index}
                        onEdit={onEditElementHandler}
                        key={`item-${item.id}-${index}`}
                        data={item}
                        moveCard={moveCard}
                    />
                ))}
                {!formData.length && <PlaceHolder className="form-place-holder" />}
            </div>
            <input
                type="submit"
                className={`hidden ${SAVE_FORM_BUILDER_CLICK}`}
                onClick={saveHandler}
            />
        </div>
    );
}
