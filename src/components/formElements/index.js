import React, { useRef } from "react";
import FormContainer from "./FormContainer";
import { XSS } from "../../constants";
import { getComponentClassname } from "../../utils";
import Input from "./Input";
import DatePicker from "./DatePicker";
import Camera from "./Camera";
import Checkboxes from "./Checkboxes";
import Download from "./Download";
import Image from "./Image";
import Dropdown from "./Dropdown";
import RadioButtons from "./RadioButtons";
import Range from "./Range";
import Rating from "./Rating";
import Signature from "./Signature";
import TextArea from "./TextArea";
import MultiSelectDropdown from "./MultiSelectDropdown";
import FileUpload from "./FileUpload";
import MultipleChoice from "./MultipleChoice";

const Header = function({ data, ...props }) {
    return (
        <FormContainer data={data} {...props}>
            <h3
                className={getComponentClassname(data)}
                dangerouslySetInnerHTML={{
                    __html: XSS.process(data.content)
                }}
            />
        </FormContainer>
    );
};

const Label = function({ data, ...props }) {
    return (
        <FormContainer data={data} {...props}>
            <label
                className={getComponentClassname(data)}
                dangerouslySetInnerHTML={{
                    __html: XSS.process(data.content)
                }}
            />
        </FormContainer>
    );
};

const LineBreak = function({ data, ...props }) {
    return (
        <FormContainer data={data} {...props}>
            <hr />
        </FormContainer>
    );
};

const Paragraph = function({ data, ...props }) {
    return (
        <FormContainer data={data} {...props}>
            <p
                className={getComponentClassname(data)}
                dangerouslySetInnerHTML={{
                    __html: XSS.process(data.content)
                }}
            />
        </FormContainer>
    );
};

const TextInput = function({ data, ...props }) {
    return <Input {...{ data, type: "text", ...props }} />;
};

const NumberInput = function({ data, ...props }) {
    return <Input {...{ data, type: "number", ...props }} />;
};

const HyperLink = function({ data, ...props }) {
    return (
        <FormContainer data={data} {...props}>
            <a target="_blank" href={data.href || "'"} rel="noopner noreferrer">
                {data.content}
            </a>
        </FormContainer>
    );
};

export default {
    Header,
    Paragraph,
    Label,
    LineBreak,
    TextInput,
    NumberInput,
    TextArea,
    Dropdown,
    Signature,
    Checkboxes,
    MultipleChoice,
    DatePicker,
    RadioButtons,
    Image,
    Rating,
    MultiSelectDropdown,
    Download,
    Camera,
    Range,
    HyperLink,
    FileUpload
};
