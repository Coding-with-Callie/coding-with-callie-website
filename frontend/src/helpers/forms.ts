export type FieldData = {
  type: string;
  label: string;
  field: string;
  required: boolean;
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
      required: true,
    },
    {
      type: "textarea",
      label: "Description",
      field: "bodyText",
      required: true,
    },
    {
      type: "file",
      label: "Resource Image",
      field: "file",
      required: true,
    },
    {
      type: "text",
      label: "Button Text",
      field: "buttonText",
      required: true,
    },
    {
      type: "text",
      label: "Resource Link",
      field: "linkUrl",
      required: true,
    },
    {
      type: "checkbox",
      label: "Open Link in New Tab",
      field: "target",
      required: true,
    },
  ],
};

export const loginFormData: CustomFormData = {
  formHeading: "Log In",
  input: [
    {
      type: "text",
      label: "Username",
      field: "username",
      required: true,
    },
    {
      type: "password",
      label: "Password",
      field: "password",
      required: true,
    },
  ],
};

export const signUpFormData: CustomFormData = {
  formHeading: "Join the Coding with Callie community!",
  input: [
    {
      type: "text",
      label: "Name",
      field: "name",
      required: true,
    },
    {
      type: "text",
      label: "Email",
      field: "email",
      required: true,
    },
    {
      type: "text",
      label: "Username",
      field: "username",
      required: true,
    },
    {
      type: "password",
      label: "Password",
      field: "password",
      required: true,
    },
    {
      type: "file",
      label: "Profile Photo",
      field: "photo",
      required: false,
    },
  ],
};
