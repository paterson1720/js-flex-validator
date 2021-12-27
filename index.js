const Flex = require("./flex-constraint-builder");
const basicValidation = require("./validators/basic.validator");
const validateDataByType = require("./validators/types.validator");
const { helpers } = require("./utils");

const { get, isFunc, isNullOrUndefined, checkCustomvalidator } = helpers;

const validateValue = (data, validator, object) => {
  const { type, required, customValidator } = validator;
  const isRequired = isFunc(required) ? required(data, validator) : required;
  const basicValidationError = basicValidation(data, validator);

  if (customValidator) checkCustomvalidator(customValidator);
  if (isNullOrUndefined(data) && !isRequired) return customValidator?.(data, validator, object) || null;
  if (basicValidationError) return basicValidationError;
  if (customValidator) return customValidator(data, validator, object);

  return validateDataByType(type)(data, validator);
};

const validateObject = (object, validators) => {
  const validation = { hasError: false, errorDetails: {} };

  validators.forEach((validator) => {
    const { fieldName, path } = validator;
    const data = get(object, path);
    const message = validateValue(data, validator, object);
    if (message) {
      validation.hasError = true;
      validation.errorDetails[fieldName] = message;
    }
  });

  return validation;
};

module.exports = Flex;
module.exports.validateValue = validateValue;
module.exports.validateObject = validateObject;
