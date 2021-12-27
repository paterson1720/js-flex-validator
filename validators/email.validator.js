const validateEmailString = require("./string.validator");
const { helpers, constants } = require("../utils");

const { match } = helpers;
const { EMAIL_RGX } = constants;

module.exports = (email, validator) => {
  const stringErrorMessage = validateEmailString(email, validator);
  const defaultMessage = "not a valid email.";

  if (stringErrorMessage) return stringErrorMessage;
  if (!match(email, EMAIL_RGX)) return validator.message || defaultMessage;

  return null;
};
