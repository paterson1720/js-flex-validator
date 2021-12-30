interface JSFlexValidator {
  string: (message?: string) => JSFlexValidator;
  number: (message?: string) => JSFlexValidator;
  required: (bool?: boolean, message?: string) => JSFlexValidator;
}

declare function Flex(path: string, name?: string): JSFlexValidator;

declare namespace Flex {
  export function validateObject(data: any, constraints: JSFlexValidator[]): any;
  export function validateValue(data: any, constraint: JSFlexValidator): string | null;
}

export = Flex;
