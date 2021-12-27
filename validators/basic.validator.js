/* eslint-disable valid-typeof */
import { helpers } from "../utils/index.js";

const { isFunc, isNullOrUndefined } = helpers;

export default function validator(data, validator) {
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
}
