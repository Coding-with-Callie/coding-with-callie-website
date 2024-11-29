export type FieldData = {
  type: string;
  label: string;
  field: string;
};

export type CustomFormData = {
  formHeading: string;
  input: FieldData[];
};

export const resourceFormData: CustomFormData = {
  formHeading: "Create Resource",
  input: [
    {
      type: "text",
      label: "Title",
      field: "heading",
    },
    {
      type: "textarea",
      label: "Description",
      field: "bodyText",
    },
    {
      type: "file",
      label: "File",
      field: "file",
    },
    {
      type: "text",
      label: "Button Text",
      field: "buttonText",
    },
    {
      type: "text",
      label: "Resource Link",
      field: "linkUrl",
    },
    {
      type: "checkbox",
      label: "Open Link in New Tab",
      field: "target",
    },
  ],
};
