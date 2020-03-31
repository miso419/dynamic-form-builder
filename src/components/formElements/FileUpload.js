import React, { useCallback, useEffect, useState, useMemo } from "react";
import FormContainer from "./FormContainer";
import { useDropzone } from "react-dropzone";

export default function({ data, readOnly, fieldName, onFileUpload, ...props }) {
    const [files, setFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(false);

    useEffect(() => {
        data && data.uploadedFiles && setFiles(data.uploadedFiles || []);
    }, [data, data.uploadedFiles]);

    const clearHandler = useCallback(
        id => {
            setFiles(files.filter(({ fileId }) => fileId !== id));
        },
        [files]
    );

    const { getRootProps, getInputProps, open } = useDropzone({
        noDrag: true,
        noClick: true,
        noKeyboard: true,
        multiple: !!data.multipleFilesUpload,
        maxSize: 25 * 1024 * 1024,
        onDrop: droppedFiles => onDrop(droppedFiles)
    });

    const onDrop = useCallback(
        accepted => {
            if (accepted.length > 0) {
                if (onFileUpload) {
                    setUploadProgress(true);
                    onFileUpload(accepted)
                        .then(res => {
                            setFiles([...files, ...res]);
                        })
                        .finally(() => {
                            setUploadProgress(false);
                        });
                }
            }
        },
        [onFileUpload, files]
    );

    const fileUploader = useMemo(
        () => (
            <div {...getRootProps()}>
                <input
                    {...getInputProps({
                        disabled: false,
                        name: data.fieldName
                    })}
                />
            </div>
        ),
        [getInputProps, getRootProps, data.fieldName]
    );

    return (
        <FormContainer data={data} {...props}>
            <button className="btn btn-primary" onClick={open}>
                Click
            </button>
            {!readOnly ? fileUploader : null}
            <div className="flex">
                {files.map(file => (
                    <div
                        key={file.fileId || `uploaded_file_${Math.random()}`}
                        className="form-image-thumbnail-wrapper"
                    >
                        {file.previewUrl && file.previewUrl !== "" ? (
                            <div
                                className="form-image-thumbnail"
                                style={{ backgroundImage: `url("${file.previewUrl}")` }}
                            ></div>
                        ) : (
                            <div className="form-image-thumbnail"></div>
                        )}
                        {!readOnly && (
                            <i
                                className="fa fa-times clear-file"
                                onClick={() => clearHandler(file.fileId)}
                                title="Clear File"
                            />
                        )}
                    </div>
                ))}
            </div>
            <input {...props} type="hidden" />
        </FormContainer>
    );
}
