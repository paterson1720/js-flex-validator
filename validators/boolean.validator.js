import { helpers } from '../utils/index.js';

const { isBoolean } = helpers;

export default function validator(data, validator) {
  const { allowedFalseyValues = [] } = validator;

  if (!isBoolean(data) && allowedFalseyValues.includes(data)) {
    return null;
  }

  return null;
}
