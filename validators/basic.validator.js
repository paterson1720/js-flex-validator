/* eslint-disable valid-typeof */
const { helpers } = require("../utils");

const { isFunc, isNullOrUndefined } = helpers;

module.exports = (data, validator) => {
  const { fieldName, type, message, typeMessage } = validator;
  const { allowedFalseyValues = [], required = false } = validator;
  const isRequired = isFunc(required) ? required(data, validator) : required;
  const dataIsAllowed = allowedFalseyValues.includes(data);

  if (isRequired && isNullOrUndefined(data) && !dataIsAllowed) {
    return message || `"${fieldName}" is required.`;
  }

  if (type === "array" && !Array.isArray(data) && !dataIsAllowed) {
    return typeMessage || message || `"${fieldName}" must be an array`;
  }

  if (["email", "array"].includes(type)) return null;

  if (typeof data !== type && !dataIsAllowed) {
    return typeMessage || message || `"${fieldName}" must be a "${type}"`;
  }

  return null;
};
