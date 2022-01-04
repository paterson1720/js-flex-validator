const EMAIL_RGX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isNumber = (v) => typeof v === 'number' && !Number.isNaN(parseFloat(v));
const isFunc = (value) => typeof value === 'function';
const isString = (v) => typeof v === 'string';
const isBoolean = (v) => typeof v === 'boolean';
const isNullOrUndefined = (v) => v == null;
const match = (value, regex) => {
  return String(value).toLowerCase().match(regex);
};
const checkCustomvalidator = (validator) => {
  if (!isFunc(validator)) {
    throw Error('VALIDATOR: customValidator must be a funtion');
  }
};
const checkError = (value, property, field = 'value') => {
  if (value === undefined) {
    throw new Error(`VALIDATOR: found "${property}" property without a "${field}" field.`);
  }
};
const get = (obj, path, defaultValue) => {
  const keys = path.includes('.') ? path.split('.') : [path];
  const [key] = keys;
  if (!obj[key]) return defaultValue;
  if (keys.length === 1) return obj[key];
  const newPath = keys.slice(1).join('.');
  return get(obj[key], newPath, defaultValue);
};

export const constants = { EMAIL_RGX };
export const helpers = {
  get,
  isNumber,
  isFunc,
  isString,
  match,
  isBoolean,
  checkError,
  isNullOrUndefined,
  checkCustomvalidator,
};
