import SortableElement from "./sortable-element";
import PlaceHolder from "./form-place-holder";
import BaseFormElements from "../components/formElements";

const {
    Header,
    Paragraph,
    Label,
    LineBreak,
    TextInput,
    NumberInput,
    TextArea,
    Dropdown,
    Checkboxes,
    DatePicker,
    RadioButtons,
    Image,
    Rating,
    Tags,
    Signature,
    HyperLink,
    Download,
    Camera,
    Range
} = BaseFormElements;

const FormElements = {};
export const ELEMENTS = {
    Header: Header,
    Paragraph: Paragraph,
    Label: Label,
    LineBreak: LineBreak,
    TextInput: TextInput,
    NumberInput: NumberInput,
    TextArea: TextArea,
    Dropdown: Dropdown,
    Signature: Signature,
    Checkboxes: Checkboxes,
    DatePicker: DatePicker,
    RadioButtons: RadioButtons,
    Image: Image,
    Rating: Rating,
    Tags: Tags,
    HyperLink: HyperLink,
    Download: Download,
    Camera: Camera,
    Range: Range,
    PlaceHolder: PlaceHolder
};

export default FormElements;
