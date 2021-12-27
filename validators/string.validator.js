const { helpers } = require("../utils");

const { isString, isFunc, checkError } = helpers;

module.exports = (data, validator) => {
  const { allowEmptyString = { value: true } } = validator;
  const { allowedFalseyValues = [] } = validator;

  if (!isString(data) && allowedFalseyValues.includes(data)) {
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
};
