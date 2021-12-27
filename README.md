# JS Flex Validator

Simple JavaScript Data Validation library that offers a flexible way to validate data and customize error messages.

## Installation

`npm install js-flex-validator`

## Quick Usage Example

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
