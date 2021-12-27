import { helpers } from "../utils/index.js";

const { isNumber, isFunc, checkError } = helpers;

export default function validator(data, validator) {
  const { allowedFalseyValues = [] } = validator;

  if (!isNumber(data) && allowedFalseyValues.includes(data)) {
    return null;
  }

  if (validator.equal) {
    const { value, message } = validator.equal;
    checkError(value, "equal");
    if (data === value) {
      return isFunc(message) ? message(data, validator) : message;
    }
  }

  if (validator.min) {
    const { value, message } = validator.min;
    checkError(value, "min");
    if (data < value || [undefined, null, ""].includes(data)) {
      return isFunc(message) ? message(data, validator) : message;
    }
  }

  if (validator.max) {
    const { value, message } = validator.max;
    checkError(value, "max");
    if (data > value || [undefined, null, ""].includes(data)) {
      return isFunc(message) ? message(data, validator) : message;
    }
  }

  if (validator.minmax) {
    const { value, message, rangeInclusive = true } = validator.minmax;
    checkError(value, "minmax");
    if (!Array.isArray(value) || value.length !== 2) {
      throw new Error("VALIDATOR: 'minmax' property value must be an array with two numbers.");
    }
    if (rangeInclusive) {
      if (!(data >= value[0] && data <= value[1])) {
        return isFunc(message) ? message(data, validator) : message;
      }
    } else if (!(data > value[0] && data < value[1])) {
      return isFunc(message) ? message(data, validator) : message;
    }
  }

  return null;
}
