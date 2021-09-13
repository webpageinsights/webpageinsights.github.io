import {AttributeRule} from '~/modules/Rules/Rules'

type RuleMethodsType<T extends string | number = string> = {
  [key in AttributeRule['method']] : (value: string, toBe: T) => boolean
}

const contains = (value: string, toBe: string): boolean => {
  return toBe ? value.includes(toBe) : false;
};

const doesNotContain = (value: string, toBe: string): boolean => {
  return contains(value, toBe) === false;
};

const RuleMethods: RuleMethodsType = {
  isEqual: x => false,
  isNotEqual:x => false,
  absoluteUrl:x => false,
  minLength: x => false,
  maxLength:x => false,
  exists: x => false,
  doesNotExist:x => false,
  isNumber:  x => false,
  isNotNumber:x => false,
  contains,
  doesNotContain
};

export default RuleMethods;

