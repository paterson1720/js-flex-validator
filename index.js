import Flex from "./flex-constraint-builder/index.js";
import basicValidation from "./validators/basic.validator.js";
import validateDataByType from "./validators/types.validator.js";
import { helpers } from "./utils/index.js";

const { get, isFunc, isNullOrUndefined, checkCustomvalidator } = helpers;

export const validateValue = (data, validator, object) => {
  const { type, required, customValidator } = validator;
  const isRequired = isFunc(required) ? required(data, validator) : required;
  const basicValidationError = basicValidation(data, validator);

  if (customValidator) checkCustomvalidator(customValidator);
  if (isNullOrUndefined(data) && !isRequired) return customValidator?.(data, validator, object) || null;
  if (basicValidationError) return basicValidationError;
  if (customValidator) return customValidator(data, validator, object);

  return validateDataByType(type)(data, validator);
};

export const validateObject = (object, validators) => {
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

export default Flex;
