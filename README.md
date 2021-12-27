# JS Flex Validator

Simple JavaScript Data Validation library that offers a flexible way to validate data and customize error messages.
It also provides a way to pass dependencies to a value, which later can be used to decide whether the data is valid or not,
based on the value of the dependencies.

## Installation

`npm install js-flex-validator`

## Single Value validation Quick Example

- With default error messages

```js
import Flex, { validateValue } from "js-flex-validator";

const age = 17;
const constraint = Flex("age").number().required().min(18).max(65).end();

const error = validateValue(age, constraint);
console.log(error); // "Minimum is 18"
```

- With custom error messages

```js
import Flex, { validateValue } from "js-flex-validator";

const age = 17;
const constraint = Flex("age")
  .number("Age should be of type number.")
  .required(true, "You should provide a value for age.")
  .min(18, "Age should be 18 years old or older.")
  .max(65, "Age should not be older than 65 years old.")
  .end();

const error = validateValue(age, constraint);
console.log(error); // "Age should be 18 years old or older."
```

## Object validation Quick Example

```js
import Flex, { validateObject } from "js-flex-validator";

const constraints = [
  Flex("name").string().required().minLength(3).maxLength(50).end(),
  Flex("age").number().required().min(18, "Age should be 18 years old or older.").max(65).end(),
  Flex("email").email().required().maxLength(255).end(),
  Flex("address.street").string().required().end(),
  Flex("address.city").string().required().minLength(30).end(),
  Flex("address.code").string().required().maxLength(6).end(),
];

const testData1 = {
  name: "Paterson A.",
  age: 17,
  email: "paterson@email.com",
  address: {
    street: "O'Higgins Central 0902",
    city: "Santiago",
    code: "0054321",
  },
};

const result1 = validateObject(testData1, constraints);
/*
 RETURNS:
 {
  hasError: true,
  errorDetails: { 
    age: 'Age should be 18 years old or older.', 
    'address.code': 'Maximum length is 6' 
  }
}
*/
```
