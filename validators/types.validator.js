import stringValidator from "./string.validator.js";
import numberValidator from "./number.validator.js";
import emailValidator from "./email.validator.js";
import arrayValidator from "./array.validator.js";

const TYPES = {
  string: stringValidator,
  number: numberValidator,
  email: emailValidator,
  array: arrayValidator,
};

export default (type) => TYPES[type];
