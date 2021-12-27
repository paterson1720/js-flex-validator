const stringValidator = require("./string.validator");
const numberValidator = require("./number.validator");
const emailValidator = require("./email.validator");
const arrayValidator = require("./array.validator");

const TYPES = {
  string: stringValidator,
  number: numberValidator,
  email: emailValidator,
  array: arrayValidator,
};

module.exports = (type) => TYPES[type];
