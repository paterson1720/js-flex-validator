import { helpers } from "../utils/index.js";

const { isString, isFunc, checkError } = helpers;

export default function validator(data, validator) {
  const { allowEmptyString = { value: false } } = validator;
  const { allowedFalseyValues = [] } = validator;

  if (!isString(data) && allowedFalseyValues.includes(data)) {
    return null;
  }

  if (allowEmptyString.value && !data.trim().length) {
    return null;
  }

  if (!allowEmptyString.value && !data.trim().length) {
    return allowEmptyString.message || `${validator.fieldName} is not allowed to be empty.`;
  }

  if (validator.match) {
    const { regex, message } = validator.match;
    checkError(regex, "match", "regex");
    if (!data.match(regex)) {
      return isFunc(message) ? message(data, validator) : message;
    }
  }

  if (validator.maxLength || validator.max) {
    const { value, message } = validator.maxLength || validator.max;
    checkError(value, "maxLength");
    if (data.length > value) {
      return isFunc(message) ? message(data, validator) : message;
    }
  }

  if (validator.minLength || validator.min) {
    const { value, message } = validator.minLength || validator.min;
    checkError(value, "minLength");
    if (data.length < value) {
      return isFunc(message) ? message(data, validator) : message;
    }
  }

  return null;
}
