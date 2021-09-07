export type Assert = 'isValidUrl' | 'doesNotExist' | 'isNotNumber' | 'contains' | 'exist'

export default class Asserts {
  private static callbacks = {
    isValidUrl: (value: string): boolean => value ? value.match(/^http/) !== null : false,
    exist: (value: string): boolean => typeof value !== 'undefined' || value !== null,
    doesNotExist: (value: string): boolean => typeof value === 'undefined' || value === null,
    isNotNumber: (value: string): boolean => value ? value.match(/^[0-9]+$/) === null : false,
    contains: (value: string, expect: string): boolean => value !== null && typeof value !== 'undefined' ? value.includes(expect) : false
  };

  static check(assert: Assert = 'exist', value: string = '', expect: string = '') {
    return Asserts.callbacks[assert](value, expect);
  }
}
