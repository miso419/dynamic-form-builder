import React, { createContext, useReducer } from "react";
import { createElement } from "../utils";
import update from "immutability-helper";
import { getElementData } from "../mappers";

export const ACTION_TYPES = {
    CREATE_ELEMENT: "CREATE_ELEMENT",
    UPDATE_ELEMENT: "UPDATE_ELEMENT",
    ON_DROP_ELEMENT: "ON_DROP_ELEMENT",
    DELETE_ELEMENT: "DELETE_ELEMENT",
    INSERT_ELEMENT: "INSERT_ELEMENT",
    LOAD_DATA: "LOAD_DATA",
    REORDER_ELEMENT: "REORDER_ELEMENT",
    MOVE_ELEMENT: "MOVE_ELEMENT"
};

export const StoreContext = createContext({});

const initialState = {
    formData: [],
    answers: {}
};

function reducer(state, { type, payload }) {
    switch (type) {
        case ACTION_TYPES.LOAD_DATA: {
            const formData = (Array.isArray(payload)
                ? payload
                : payload
                ? [payload]
                : []
            ).filter(i => !!i);
            return {
                ...state,
                formData
            };
        }
        case ACTION_TYPES.CREATE_ELEMENT: {
            return {
                ...state,
                formData: [...state.formData, createElement(payload)]
            };
        }
        case ACTION_TYPES.ON_DROP_ELEMENT: {
            const newData = [...state.formData];
            const newElement = createElement({ ...payload.data });
            newData.splice(payload.index, 0, newElement);
            return {
                ...state,
                formData: newData
            };
        }
        case ACTION_TYPES.UPDATE_ELEMENT: {
            const formData = [...state.formData]
                .filter(i => !!i)
                .map(item => {
                    if (item.id === payload.id) {
                        return getElementData({ ...item, ...payload });
                    }
                    return item;
                });
            return {
                ...state,
                formData
            };
        }
        case ACTION_TYPES.DELETE_ELEMENT:
            return {
                ...state,
                formData: (state.formData || []).filter(item => item.id !== payload.id)
            };
        case ACTION_TYPES.REORDER_ELEMENT: {
            return {
                ...state,
                formData: payload
            };
        }
        case ACTION_TYPES.INSERT_ELEMENT: {
            const newData = [...state.formData];
            newData.splice(payload.hoverIndex, 0, createElement(payload.item));
            return {
                ...state,
                formData: newData
            };
        }
        case ACTION_TYPES.MOVE_ELEMENT: {
            const { dragIndex, hoverIndex } = payload;
            const newData = update([...state.formData], {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, state.formData[dragIndex]]
                ]
            }).filter(i => !!i);
            return {
                ...state,
                formData: newData
            };
        }
        default:
            return state;
    }
}

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    );
};

export default Store;
