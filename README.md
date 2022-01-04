# JS Flex Validator

Simple JavaScript Data Validation library that offers a flexible way to validate data and customize error messages.
It also provides a way to pass dependencies to a value, which later can be used to decide whether the data is valid or not,
based on the value of the dependencies.

## Installation

`npm install js-flex-validator`

## Single Value validation Quick Example

- With default error messages

```js
import Flex, { validateValue } from 'js-flex-validator';

const age = 17;
const constraint = Flex('age').number().required().min(18).max(65);

const error = validateValue(age, constraint);
console.log(error); // "Minimum is 18"
```

- With custom error messages

```js
import Flex, { validateValue } from 'js-flex-validator';

const age = 17;
const constraint = Flex('age')
  .number('Age should be of type number.')
  .required(true, 'You should provide a value for age.')
  .min(18, 'Age should be 18 years old or older.')
  .max(65, 'Age should not be older than 65 years old.');

const error = validateValue(age, constraint);
console.log(error); // "Age should be 18 years old or older."
```

## Object validation Quick Example

```js
import Flex, { validateObject } from 'js-flex-validator';

const constraints = [
  Flex('name').string().required().min(3).max(50),
  Flex('age').number().required().min(18, 'Age should be 18 years old or older.').max(65),
  Flex('email').email().required().max(255),
  Flex('isMajor').boolean().required(),
  Flex('address.street').string().required(),
  Flex('address.city').string().required().min(30),
  Flex('address.code').string().required().max(6),
];

const testData1 = {
  name: 'Paterson A.',
  age: 17,
  email: 'paterson@email.com',
  address: {
    street: "O'Higgins Central 0902",
    city: 'Santiago',
    code: '0054321',
  },
};

const result1 = validateObject(testData1, constraints);
/*
 RETURNS:
 {
  hasError: true,
  errorDetails: { 
    age: 'Age should be 18 years old or older.', 
    'address.code': 'Maximum length is 6',
    isMajor: '"isMajor" is required.',
  }
}
*/
```

## React Form Validation Example

- [Click here to see it live on CodeSandbox](https://codesandbox.io/s/react-form-validation-with-flex-validator-0ikdp?file=/src/App.js:0-2634)

```js
import React from 'react';
import Flex, { validateObject, validateValue } from 'js-flex-validator';

const constraints = {
  username: Flex('username')
    .string()
    .allowEmpty()
    .min(3, 'Username should be at least 3 characters')
    .max(50, 'Username should not exceeds 50 characters'),

  email: Flex('email')
    .email('This email is not valid.')
    .match(/\w.@edu.com$/, 'Should be a edu.com domain')
    .required()
    .min(5, 'Email should be at least 3 characters')
    .max(255, 'Username should not exceeds 255 characters'),

  password: Flex('password')
    .string()
    .required()
    .min(5, 'Password should be at least 5 characters')
    .max(20, 'Password should not exceeds 20 characters'),
};

const initialState = { username: '', password: '', email: '' };

export default function App() {
  const [state, setState] = React.useState(initialState);
  const [errors, setErrors] = React.useState(null);

  const validate = () => {
    const constraintsArr = Object.values(constraints);
    const { hasError } = validateObject(state, constraintsArr);
    return hasError;
  };

  const validateField = (name, value) => {
    const fieldConstraint = constraints[name];
    const message = validateValue(value, fieldConstraint);
    return message;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) return;
    console.log(state);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value.trim() });
    setErrors({ ...errors, [name]: validateField(name, value.trim()) });
  };

  return (
    <form className="App" onSubmit={handleSubmit}>
      <h2>React Form Validation</h2>
      <h4>With JS-flex-validator</h4>

      <div>
        <input name="username" type="text" placeholder="Username" value={state.username} onChange={handleChange} />
        {errors && <small>{errors.username}</small>}
      </div>

      <div>
        <input name="email" type="text" placeholder="Email" value={state.email} onChange={handleChange} />
        {errors && <small>{errors.email}</small>}
      </div>

      <div>
        <input name="password" type="password" placeholder="Password" value={state.password} onChange={handleChange} />
        {errors && <small>{errors.password}</small>}
      </div>

      <div>
        <button disabled={validate()} type="submit">
          submit
        </button>
      </div>
    </form>
  );
}
```

## Syntax

### Constructor

- **Flex(path, [displayName])**

When validating an object, the `path` is the path to the value to be validated in the object, it can be a root path or a deeply nested path (i.e.: `address.street`). The `displayName` is an optional name to be displayed in the error message, if not provided, the `path` is used.

When validating a single value, the `path` is used as a name to display in error messages.

- **required([boolean], [message])**

The `required()` method specifies if a value is required or not. It accepts an optional `boolean` which is default to `true` and `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **string([message])**

The `string()` method specifies that the value should be of type `string`. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **boolean([message])**

The `boolean()` method specifies that the value should be of type `boolean`. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **minLength(value, [message])**

The `minLength()` method specifies the maximum length for a `string`. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **maxLength(value, [message])**

The `maxLength()` method specifies the maximum length for a `string`. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **allowEmpty(boolean, [message])**

The `allowEmpty()` method specifies if a string value is allowed to be empty or not, by default, a string is allowed to be empty. Use this method if you want to overwrite this behavior. It accepts a `boolean` argument and an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **allowedValues(any[])**

The `allowedValues()` method specifies an array of allowed values, these values will pass validation even if they don't match the specified type. (i.e.: you can allow a string value to be `null` like this: `Flex('name').string().allowedValues([null]).end()`).

- **email([message])**

The `email()` method specifies that the value should be of type `email`. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **match(regex, [message])**

The `match()` method specifies a regular expression that a `string` or an `email` should match. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **array([message])**

The `array()` method specifies that the value should be of type `array`. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **array([message])**

The `array()` method specifies that the value should be of type `array`. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **number([message])**

The `number()` method specifies that the value should be of type `number`. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **min(value, [message])**

The `min()` method specifies the minimum allowed value for a `number`. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **max(value, [message])**

The `max()` method specifies the maximum allowed value for a `number`. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned.

- **minmax(value, [message], [options{rangeInclusive: boolean}])**

The `minmax()` method specifies the range that is allowed for a `number`. It accepts an optional `message` argument that will be used if this constraint is violated, otherwise a default error message will be returned. It also accepts an options object, to specify if the range is inclusive or not, which is default to true.

- **customValidator(validator: (value, constraints, object)=> string|null)**

The `customValidator()` method gives you the possibillity to provide a custom validator function for more complex validations. It accepts the `value`, `constraints` and the whole `object` data if validating an object. This function should return a `string` or `null`.
