import FormGenerator from "./FormGenerator";
import FormBuilder from "./FormBuilder";
import useFormBuilder from "./useFormBuilder";
import "./assets/scss/application.scss";

const FormBuilderDefault = FormBuilder;
FormBuilder.FormGenerator = FormGenerator;
FormBuilder.FormBuilder = FormBuilder;

export default FormBuilderDefault;

export { FormGenerator, FormBuilder, useFormBuilder };
