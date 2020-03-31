import { useCallback, useRef } from "react";
import { SAVE_FORM_GENERATOR_CLICK, SAVE_FORM_BUILDER_CLICK } from "./constants";

export default function() {
    const ref = useRef();

    const saveFormBuilder = useCallback(() => {
        if (ref.current) {
            ref.current.save();
        } else {
            document.querySelector(`.${SAVE_FORM_BUILDER_CLICK}`) &&
                document.querySelector(`.${SAVE_FORM_BUILDER_CLICK}`).click();
        }
    }, [ref]);

    const saveFormGenerator = useCallback(() => {
        if (ref.current) {
            ref.current.save();
        } else {
            document.querySelector(`.${SAVE_FORM_GENERATOR_CLICK}`) &&
                document.querySelector(`.${SAVE_FORM_GENERATOR_CLICK}`).click();
        }
    }, [ref]);

    return {
        saveFormGenerator,
        saveFormBuilder,
        ref
    };
}
