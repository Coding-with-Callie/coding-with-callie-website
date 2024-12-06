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

export const contactCallieFormData: CustomFormData = {
  formHeading: "Contact Callie",
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
      type: "textarea",
      label: "Message",
      field: "message",
      required: true,
    },
  ],
};

export const guestSpeakerFormData: CustomFormData = {
  formHeading: "Create Guest Speaker",
  input: [
    {
      type: "text",
      label: "Name",
      field: "name",
      required: true,
    },
    {
      type: "date",
      label: "Date",
      field: "date",
      required: true,
    },
    {
      type: "textarea",
      label: "Session Description",
      field: "sessionText",
      required: true,
    },
    {
      type: "textarea",
      label: "About",
      field: "bioText",
      required: true,
    },
    {
      type: "text",
      label: "Website",
      field: "websiteUrl",
      required: true,
    },
    {
      type: "text",
      label: "Session Recording URL",
      field: "sessionRecordingUrl",
      required: false,
    },
    {
      type: "file",
      label: "Speaker Photo",
      field: "file",
      required: true,
    },
  ],
};

export const reviewFormData: CustomFormData = {
  formHeading: "Leave a Review!",
  input: [
    {
      type: "rating",
      label: "Rating",
      field: "rating",
      required: true,
    },
    {
      type: "text",
      label: "Display Name",
      field: "displayName",
      required: true,
    },
    {
      type: "textarea",
      label: "Comments",
      field: "comments",
      required: false,
    },
  ],
};

export const changePasswordFormData: CustomFormData = {
  formHeading: "Change Password",
  input: [
    {
      type: "password",
      label: "Current Password",
      field: "password",
      required: true,
    },
    {
      type: "password",
      label: "New Password",
      field: "newPassword",
      required: true,
    },
    {
      type: "password",
      label: "Confirm New Password",
      field: "confirmPassword",
      required: true,
    },
  ],
};
