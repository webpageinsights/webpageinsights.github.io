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

const minLength = (value: string, toBe: string): boolean => {
  return value ? value.length >= Number(toBe) : false;
};

const maxLength = (value: string, toBe: string): boolean => {
  return value ? value.length <= Number(toBe) : false;
};

const exists = (value: string): boolean => {
  return typeof value !== 'undefined';
};

const doesNotExist = (value: string): boolean => {
  return exists(value) === false;
};

const isEqual = (value: string, toBe: string): boolean => {
  return value === toBe;
};

const isNotEqual = (value: string, toBe: string): boolean => {
  return isEqual(value, toBe) === false;
};

const RuleMethods: RuleMethodsType = {
  isEqual,
  isNotEqual,
  absoluteUrl:x => false,
  minLength,
  maxLength,
  exists,
  doesNotExist,
  isNumber:  x => false,
  isNotNumber:x => false,
  contains,
  doesNotContain
};

export default RuleMethods;

