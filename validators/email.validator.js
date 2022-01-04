import validateEmailString from './string.validator.js';
import { helpers, constants } from '../utils/index.js';

const { match } = helpers;
const { EMAIL_RGX } = constants;

export default function validator(email, validator) {
  const stringErrorMessage = validateEmailString(email, validator);
  const defaultMessage = 'not a valid email.';

  if (stringErrorMessage) return stringErrorMessage;
  if (!match(email, EMAIL_RGX)) return validator.typeMessage || defaultMessage;

  return null;
}
