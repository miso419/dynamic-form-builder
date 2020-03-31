import React, { useMemo, useCallback } from "react";
import saveAs from "file-saver";
import FormContainer from "./FormContainer";

export default function({ data, ...props }) {
    const { fileUrl, fileType, fileName } = useMemo(() => {
        return {
            fileUrl: (data.attachment && data.attachment.downloadUrl) || "",
            fileType:
                (data.attachment &&
                    data.attachment.contentType &&
                    data.attachment.contentType.includes("image/") &&
                    "image") ||
                "other",
            fileName: (data.attachment && data.attachment.promptSaveAs) || "Download"
        };
    }, [data.attachment]);

    const downloadFile = useCallback(() => {
        saveAs(fileUrl, fileName);
    }, [fileUrl, fileName]);

    return (
        <FormContainer data={data} {...props}>
            <div onClick={downloadFile}>
                {data.content}
                {fileType === "image" && (
                    <div
                        className="form-image-thumbnail"
                        style={{ backgroundImage: `url(${fileUrl})` }}
                    />
                )}
                {fileUrl && fileType !== "image" && (
                    <div className="download-placeholder">
                        <span className="fa fa-cloud-download download-icon" />
                        {fileName}
                    </div>
                )}
            </div>
        </FormContainer>
    );
}
