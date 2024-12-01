export const isInvalidName = (name: string) => {
  if (name === "") return true;
  return false;
};

export const isInvalidMessage = (message: string) => {
  if (message === "") return true;
  return false;
};

export const isInvalidEmail = (email: string) => {
  if (email === "") return true;

  const pattern = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  const isEmail = pattern.test(email);

  if (!isEmail) return true;

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

export const editDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const dateValue = new Date(year, month - 1, day);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateValue.toLocaleDateString("en-US", options);
};

export const createFormData = (data: { [key: string]: any }) => {
  const keys = Object.keys(data);

  return keys.reduce((formData, key) => {
    const value = data[key];

    if (value === null) return formData;

    if (key === "image") {
      formData.append("file", value as File);
      return formData;
    }

    if (key === "date") {
      formData.append(key, editDate(value));
      return formData;
    }

    formData.append(key, value.toString());

    return formData;
  }, new FormData());
};

export const makeLowerCase = (field: string) => {
  return field.split("").map((character) => character.toLowerCase());
};
