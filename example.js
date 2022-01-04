import Flex from "./flex-constraint-builder/index.js";
import { validateObject, validateValue } from "./index.js";

const constraints = [
  Flex("name").string().required().minLength(3).maxLength(50),
  Flex("age").number().required().min(18, "Age should be 18 years old or older.").max(65),
  Flex("email").email("Fuck this").match(/abc/).required().maxLength(255),
  Flex("isMajor").boolean().required(),
  Flex("address.street").string().required(),
  Flex("address.city").string().required().minLength(30),
  Flex("address.code", "code").string().required().max(6),
];

const testData1 = {
  name: "Jhon Doe",
  age: 17,
  email: "jhondoe@email.com",
  isMajor: false,
  address: {
    street: "690 Mill Pond Avenue",
    city: "New York New York New York New York",
    code: "0054321",
  },
};

const result1 = validateObject(testData1, constraints);
const result2 = Flex.validateValue("email", Flex("email").email("Fuck This").required());

console.log("test1", result1);
console.log("test2", result2);
