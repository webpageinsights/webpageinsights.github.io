export type Assert = 'isValidUrl' | 'doesNotExist' | 'isNotNumber' | 'contains' | 'maxLength' | 'minLength'

export default class Asserts {
  private static callbacks = {
    isValidUrl: (value: string): boolean => value ? value.match(/^http/) !== null : false,
    doesNotExist: (value: string): boolean => typeof value === 'undefined' || value === null,
    isNotNumber: (value: string): boolean => value && value.match(/^[0-9]+$/) === null,
    contains: (value: string, expect: string): boolean => value !== null && typeof value !== 'undefined' ? value.includes(expect) : false
  };

  static check(assert: Assert, value?: string, expect?: string) {
    return Asserts.callbacks[assert](value, expect);
  }
}
