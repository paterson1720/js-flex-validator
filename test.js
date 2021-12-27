const Flex = require("./flex-constraint-builder");
const { validateObject, validateValue } = require(".");

const constraints = [
  Flex("name").string().required().minLength(3).maxLength(50).end(),
  Flex("age").number().required().min(18, "Age should be 18 years old or older.").max(65).end(),
  Flex("email").email().required().maxLength(255).end(),
  Flex("address.street").string().required().end(),
  Flex("address.city").string().required().minLength(30).end(),
  Flex("address.code").string().required().maxLength(6).end(),
];

const testData1 = {
  name: "Jhon Doe",
  age: 17,
  email: "jhondoe@email.com",
  address: {
    street: "690 Mill Pond Avenue",
    city: "New York New York New York New York",
    code: "0054321",
  },
};

const result1 = validateObject(testData1, constraints);
const result2 = validateValue(
  "New York New York New York New York",
  Flex("address.city").path("address.city").string().required().minLength(30).end()
);
console.log("test1", result1);
console.log("test2", result2);
