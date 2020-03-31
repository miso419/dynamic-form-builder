import React, { useRef, useCallback, useEffect, useState } from "react";
import FormContainer from "./FormContainer";
import SignaturePad from "react-signature-canvas";

export default function({ data, readOnly, defaultValue, fieldName, onChange, ...props }) {
    let signatureRef = useRef();
    const [signatureData, setSignatureData] = useState();

    useEffect(() => {
        if (signatureRef.current) {
            signatureRef.current.clear();
            signatureRef.current.fromDataURL(defaultValue);
            setSignatureData(defaultValue);
        }
    }, [defaultValue]);

    const clearHandler = useCallback(() => {
        signatureRef.current && signatureRef.current.clear();
        setSignatureData(null);
        onChange && onChange({ target: { name: fieldName, fieldName, value: "" } });
    }, [fieldName, onChange]);

    const canClear = !readOnly || !!defaultValue;

    const refreshCanvas = useCallback(() => {
        if (signatureRef.current) {
            signatureRef.current.fromDataURL(signatureData);
        }
    }, [signatureData]);

    useEffect(() => {
        window.addEventListener("resize", refreshCanvas);
        return () => {
            window.removeEventListener("resize", refreshCanvas);
        };
    }, [refreshCanvas]);

    const onChangeHandler = useCallback(() => {
        const newData =
            signatureRef.current && signatureRef.current.toDataURL("image/png");
        setSignatureData(newData);
        onChange && onChange({ target: { name: fieldName, fieldName, value: newData } });
    }, [fieldName, onChange]);

    return (
        <FormContainer data={data} readOnly={readOnly} {...props}>
            <div className="signature" height={450}>
                {readOnly && defaultValue && (
                    <img
                        src={defaultValue}
                        alt="signature"
                        style={{
                            height: 450 / 2,
                            padding: 10
                        }}
                    />
                )}

                {!readOnly && (
                    <SignaturePad
                        canvasProps={{
                            className: "signature",
                            height: 450
                        }}
                        ref={signatureRef}
                        onEnd={onChangeHandler}
                    />
                )}
            </div>
            {canClear && !readOnly && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        cursor: "pointer",
                        paddingLeft: 16,
                        paddingRight: 16
                    }}
                    onClick={clearHandler}
                    className="text-danger"
                >
                    clear signature
                    <i
                        className="fa fa-times clear-signature text-danger"
                        title="Clear Signature"
                        style={{ paddingLeft: 8 }}
                    />
                </div>
            )}
        </FormContainer>
    );
}
