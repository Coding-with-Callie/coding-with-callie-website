import { ResourceData } from "../Components/Home/CreateResourceForm";

export const isInvalidName = (name: string) => {
  if (name === "") return true;
  return false;
};

export const isInvalidMessage = (message: string) => {
  if (message === "") return true;
  return false;
};

export const isInvalidEmail = (email: string) => {
  if (email === "" || email.indexOf("@") === -1) return true;
  return false;
};

export const isInvalidComments = (comments: string) => {
  if (comments === "") return true;
  return false;
};

export const validURL = (str: string) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};

export const createFormData = (resourceData: ResourceData) => {
  const keys = Object.keys(resourceData);

  return keys.reduce((formData, key) => {
    const value = resourceData[key as keyof ResourceData];

    if (value === null) return formData;

    if (key === "image") {
      formData.append("file", value as File);
    }

    formData.append(key, value.toString());

    return formData;
  }, new FormData());
};
