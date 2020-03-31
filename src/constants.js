import xssBase from "xss";

export const ELEMENT_TYPE = {
    RATING: "Rating",
    MULTI_SELECT_DROPDOWN: "MultiSelectDropdown",
    DATE_PICKER: "DatePicker",
    CAMERA: "Camera",
    SIGNATURE: "Signature",
    CHECK_BOXES: "Checkboxes",
    MULTIPLE_CHOICES: "MultipleChoice",
    RADIO_BUTTONS: "RadioButtons",
    INPUT: "Input",
    TEXT_INPUT: "TextInput",
    TEXT_AREA: "TextArea",
    NUMBER_INPUT: "NumberInput",
    DROP_DOWN: "Dropdown",
    RANGE: "Range",
    IMAGE: "Image",
    DOWNLOAD: "Download",
    FILE_UPLOAD: "FileUpload"
};

export const DND_ITEM_TYPES = { CARD: "card", TOOLBAR_ITEM: "toolbarItem" };

export const TOOLBAR_DEFAULT_ITEMS = [
    {
        key: "Header",
        name: "Header Text",
        icon: "fa fa-header",
        static: true,
        content: "Placeholder Text..."
    },
    {
        key: "Label",
        name: "Label",
        static: true,
        icon: "fa fa-font",
        content: "Placeholder Text..."
    },
    {
        key: "Paragraph",
        name: "Paragraph",
        static: true,
        icon: "fa fa-paragraph",
        content: "Placeholder Text..."
    },
    {
        key: "LineBreak",
        name: "Line Break",
        static: true,
        icon: "fa fa-arrows-h"
    },
    {
        key: "Dropdown",
        canHaveAnswer: true,
        name: "Dropdown",
        icon: "fa fa-caret-square-o-down",
        label: "Dropdown placeholder",
        field_name: "dropdown_",
        options: []
    },
    {
        key: "MultiSelectDropdown",
        canHaveAnswer: true,
        name: "Multi-select Dropdown",
        icon: "fa fa-tags",
        label: "Multi-select Dropdown placeholder",
        field_name: "multi_select_dropdown_",
        options: []
    },
    {
        key: "Checkboxes",
        canHaveAnswer: true,
        name: "Checkboxes",
        icon: "fa fa-check-square-o",
        label: "Checkboxes placeholder",
        field_name: "checkboxes_",
        options: []
    },
    {
        key: "RadioButtons",
        canHaveAnswer: true,
        name: "Radio Buttons",
        icon: "fa fa-dot-circle-o",
        label: "Radio buttons placeholder",
        field_name: "radiobuttons_",
        options: []
    },
    {
        key: "MultipleChoice",
        canHaveAnswer: true,
        name: "Multiple Choice",
        icon: "fa fa-list",
        label: "Multiple choice placeholder",
        field_name: "multiple_choice",
        options: []
    },
    {
        key: "TextInput",
        canHaveAnswer: true,
        name: "Text Input",
        label: "TextInput placeholder",
        icon: "fa fa-font",
        field_name: "text_input_"
    },
    {
        key: "NumberInput",
        canHaveAnswer: true,
        name: "Number Input",
        label: "NumberInput placeholder",
        icon: "fa fa-plus",
        field_name: "number_input_"
    },
    {
        key: "TextArea",
        canHaveAnswer: true,
        name: "Multi-line Input",
        label: "TextArea placeholder",
        icon: "fa fa-text-height",
        field_name: "text_area_"
    },
    {
        key: "Signature",
        canReadOnly: true,
        name: "Signature",
        icon: "fa fa-pencil-square-o",
        label: "Signature placeholder",
        field_name: "signature_"
    },
    {
        key: "HyperLink",
        name: "Web site",
        icon: "fa fa-link",
        static: true,
        content: "HyperLink  web site link ...",
        href: "http://www.example.com"
    },

    {
        key: "Download",
        name: "File Download",
        icon: "fa fa-download",
        content: "Placeholder file name ...",
        field_name: "download_",
        attachment: null
    },
    {
        key: "FileUpload",
        name: "File Upload",
        icon: "fa fa-paperclip",
        label: "Placeholder Label",
        field_name: "file_upload_"
    },

    {
        key: "Range",
        name: "Range",
        icon: "fa fa-sliders",
        label: "Range placeholder",
        field_name: "range_",
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: "Easy",
        max_label: "Difficult"
    },
    {
        key: "DatePicker",
        name: "Date Picker",
        icon: "fa fa-calendar",
        content: "Placeholder calendar name ...",
        field_name: "date_picker",
        disabled: true,
        attachment: {}
    },
    {
        key: "Download",
        name: "Insert Image",
        icon: "fa fa-image",
        content: "Placeholder image name ...",
        field_name: "image_",
        disabled: true,
        attachment: {}
    },
    {
        key: "Camera",
        name: "Image Upload",
        icon: "fa fa-camera",
        content: "Placeholder image name ...",
        field_name: "image_",
        disabled: true,
        attachment: {}
    }
];

export const XSS = new xssBase.FilterXSS({
    whiteList: {
        u: [],
        br: [],
        b: [],
        i: [],
        ol: ["style"],
        ul: ["style"],
        li: [],
        p: ["style"],
        sub: [],
        sup: [],
        div: ["style"],
        em: [],
        strong: [],
        span: ["style"]
    }
});

export const SAVE_FORM_BUILDER_CLICK = "react-form-builder-save-click";
export const SAVE_FORM_GENERATOR_CLICK = "react-form-generator-save-click";
