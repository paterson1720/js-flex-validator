import { helpers } from "../utils/index.js";

const { isFunc, checkError } = helpers;

export default function validator(data, validator) {
  const { allowedFalseyValues = [] } = validator;

  if (!Array.isArray(data) && allowedFalseyValues.includes(data)) {
    return null;
  }

  if (validator.maxLength) {
    const { value, message } = validator.maxLength;
    checkError(value, "maxLength");
    if (data.length > value) {
      return isFunc(message) ? message(data, validator) : message;
    }
  }

  if (validator.minLength) {
    const { value, message } = validator.minLength;
    checkError(value, "minLength");
    if (data.length < value) {
      return isFunc(message) ? message(data, validator) : message;
    }
  }

  return null;
}
