import Flex from "./flex-constraint-builder/index.js";
import basicValidation from "./validators/basic.validator.js";
import validateDataByType from "./validators/types.validator.js";
import { helpers } from "./utils/index.js";

const { get, isFunc, isNullOrUndefined, checkCustomvalidator } = helpers;

export const validateValue = (data, validator, object) => {
  const constraint = validator instanceof Flex ? validator.end() : validator;
  const { type, required, customValidator } = constraint;
  const isRequired = isFunc(required) ? required(data, constraint) : required;
  const basicValidationError = basicValidation(data, constraint);

  if (customValidator) checkCustomvalidator(customValidator);
  if (isNullOrUndefined(data) && !isRequired) return customValidator?.(data, constraint, object) || null;
  if (basicValidationError) return basicValidationError;
  if (customValidator) return customValidator(data, constraint, object);

  return validateDataByType(type)(data, constraint);
};

export const validateObject = (object, validators) => {
  const validation = { hasError: false, errorDetails: {} };
  const validatorsObj = validators.map((v) => (v instanceof Flex ? v.end() : v));

  validatorsObj.forEach((validator) => {
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

Flex.validateObject = validateObject;
Flex.validateValue = validateValue;

export default Flex;
