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

export const makeLowerCase = (text: string) => {
  return text
    .split("")
    .map((character) => character.toLowerCase())
    .join("");
};

export const isInvalid = (field: string, value: string, required: boolean) => {
  // If the field is required and the value is empty, show an error
  if (value === "" && required) return true;

  // If the field is an email and the value is not a valid email, show an error
  if (field === "email" && isInvalidEmail(value)) return true;

  // If the field is rating and the value is null, show an error
  if (field === "rating" && value === null) return true;

  return false;
};

export const changeHexColorByPercentage = (hex: string, percent: number) => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, "");

  // Parse the r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Calculate the new r, g, b values
  r = Math.round(r * (1 + percent / 100));
  g = Math.round(g * (1 + percent / 100));
  b = Math.round(b * (1 + percent / 100));

  // Ensure the values are within the valid range
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  // Convert the r, g, b values back to hex
  const newHex = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

  return newHex;
};

export const getColors = (color: string) => {
  return {
    100: changeHexColorByPercentage(color, 40),
    200: changeHexColorByPercentage(color, 30),
    300: changeHexColorByPercentage(color, 20),
    400: changeHexColorByPercentage(color, 10),
    500: changeHexColorByPercentage(color, 0),
    600: changeHexColorByPercentage(color, -10),
    700: changeHexColorByPercentage(color, -20),
    800: changeHexColorByPercentage(color, -30),
    900: changeHexColorByPercentage(color, -40),
  };
};
