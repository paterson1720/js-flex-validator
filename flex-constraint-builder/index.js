/**
 * Creates a constraint object by chaining different methods.
 * @constructor
 * @param {string} path - The path to the value to be validated in the object.
 * If not validating an object, path is used as the name of the value to be displayed in error messages.
 * @param {string} [name] - The name to be displayed for the field in error messages, if not provided, the path is used.
 */

function Flex(path, name) {
  if (!(this instanceof Flex)) return new Flex(path, name);
  const fieldName = name || path;
  this.constraint = { path, fieldName };
}

Flex.prototype.path = function (path) {
  this.constraint.path = path;
  return this;
};

/**
 * Sets the key 'type' to the value 'string' in the constraint object.
 */
Flex.prototype.string = function (message) {
  this.constraint.type = 'string';
  this.constraint.typeMessage = message;
  return this;
};

/**
 * Sets the key 'allowEmptyString' to the specified values in the constraint object.
 */
Flex.prototype.allowEmpty = function (bool, message) {
  const value = bool ?? true;
  this.constraint.allowEmptyString = { value, message };
  return this;
};

/**
 * Sets the key 'allowedFalseyValues' to the specified values in the constraint object.
 */
Flex.prototype.allowedValues = function (values = []) {
  this.constraint.allowedFalseyValues = values;
  return this;
};

/**
 * Sets the key 'type' to the value 'number' in the constraint object.
 */
Flex.prototype.number = function (message) {
  this.constraint.type = 'number';
  this.constraint.typeMessage = message;
  return this;
};

/**
 * Sets the key 'type' to the value 'boolean' in the constraint object.
 */
Flex.prototype.boolean = function (message) {
  this.constraint.type = 'boolean';
  this.constraint.typeMessage = message;
  return this;
};

/**
 * Sets the key 'type' to the value 'email' in the constraint object.
 */
Flex.prototype.email = function (message) {
  this.constraint.type = 'email';
  this.constraint.typeMessage = message;
  return this;
};

/**
 * Sets the key 'type' to the value 'array' in the constraint object.
 */
Flex.prototype.array = function (message) {
  this.constraint.type = 'array';
  this.constraint.typeMessage = message;
  return this;
};

/**
 * Sets the 'minmax' constraint key to the specified 'value', 'message', and 'rangeInclusive' option specified in the arguments.
 * @param {number[]} value - An array of number to specify the minimum and maximum value allowed.
 * @param {string} [msg] - The message to be returned if the validation fail.
 * @param {Object} [options] - Object with single property 'rangeInclusive' to tell if the specified range is inclusive or not. Default to true.
 */
Flex.prototype.minmax = function (value, msg, options = { rangeInclusive: true }) {
  const message = msg || `Should be between ${value.join(' - ')}`;
  this.constraint.minmax = { value, message, rangeInclusive: options.rangeInclusive };
  return this;
};

/**
 * Sets the 'minLength' constraint key to the specified 'value' and 'message' arguments.
 * @param {String} value - A number value to specify the minimum length allowed.
 * @param {string} [msg] - The message to be returned if the validation fail. If not provided a default message will be returned.
 */
Flex.prototype.minLength = function (value, msg) {
  const message = msg || `Minimum length is ${value}`;
  this.constraint.minLength = { value, message };
  return this;
};

/**
 * Sets the 'minLength' constraint key to the specified 'value' and 'message' arguments.
 * @param {String} value - A number value to specify the minimum length allowed.
 * @param {string} [msg] - The message to be returned if the validation fail. If not provided a default message will be returned.
 */
Flex.prototype.maxLength = function (value, msg) {
  const message = msg || `Maximum length is ${value}`;
  this.constraint.maxLength = { value, message };
  return this;
};

/**
 * Sets the 'min' constraint key to the specified 'value' and 'message' arguments.
 * @param {String} value - A number value to specify the minimum length allowed.
 * @param {string} [msg] - The message to be returned if the validation fail. If not provided a default message will be returned.
 */
Flex.prototype.min = function (value, msg) {
  const message = msg || `Minimum is ${value}`;
  this.constraint.min = { value, message };
  return this;
};

/**
 * Sets the 'max' constraint key to the specified 'value' and 'message' arguments.
 * @param {String} value - A number value to specify the minimum length allowed.
 * @param {string} [msg] - The message to be returned if the validation fail. If not provided a default message will be returned.
 */
Flex.prototype.max = function (value, msg) {
  const message = msg || `Maximum is ${value}`;
  this.constraint.max = { value, message };
  return this;
};

/**
 * Sets the key 'match' to the specified value in the constraint object.
 */
Flex.prototype.match = function (regex, msg) {
  const message = msg || `Should match the regex ${regex}`;
  this.constraint.match = { regex, message };
  return this;
};

/**
 * Sets the 'customValidator' constraint key to the specified 'validator' function.
 * @param {Function} validator - A function that receives the 'data', 'constraints' and 'object'
 * as arguments and returns an error message or null.
 */
Flex.prototype.customValidator = function (validator) {
  this.constraint.customValidator = validator;
  return this;
};

/**
 * Sets the 'message' constraint key to the specified  'string' or 'function'.
 * @param {String|Function} msg - A string or function that receives the 'data' and 'constraint' object as arguments and returns a string
 */
Flex.prototype.message = function (msg) {
  if (['string', 'function'].includes(typeof msg)) {
    this.constraint.message = msg;
  } else {
    throw new Error("Argument to 'message' must be a 'string' or a 'function'!");
  }
  return this;
};

/**
 * Sets the 'required' constraint key to the specified 'boolean' or 'function'.
 * @param {Boolean|Function} msg - A boolean or function that receives the 'data' and 'constraint' object as arguments and returns a boolean.
 */
Flex.prototype.required = function (arg, message) {
  this.constraint.message = message;

  if (arg === undefined) {
    this.constraint.required = true;
    return this;
  }

  if (['boolean', 'function'].includes(typeof arg)) {
    this.constraint.required = arg;
  } else {
    throw new Error("Argument to 'required' must be a 'boolean' or a 'function'!");
  }

  return this;
};

/**
 * returns the constructed constraint object.
 */
Flex.prototype.end = function () {
  return this.constraint;
};

export default Flex;
