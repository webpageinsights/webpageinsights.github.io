import RuleMethods from './RuleMethods'

describe('RuleMethods tests', function() {
  test('RuleMethods is defined', () => {
    expect(RuleMethods).toBeDefined();
  })

  test('contains and doesNotContain test', () => {
    expect(RuleMethods.contains('sapato','pato')).toBe(true);
    expect(RuleMethods.contains('sapato')).toBe(false);
    expect(RuleMethods.contains('sapato', 'fato')).toBe(false);
    expect(RuleMethods.doesNotContain('sapato','pato')).toBe(false);
    expect(RuleMethods.doesNotContain('sapato')).toBe(true);
    expect(RuleMethods.doesNotContain('sapato', 'fato')).toBe(true);
  });


  test('absoluteUrl tests', () => {
    expect(RuleMethods.absoluteUrl('no url')).toBe(false);
    expect(RuleMethods.absoluteUrl('http://github.com')).toBe(true);
    expect(RuleMethods.absoluteUrl('http://www.google.com')).toBe(true);
    expect(RuleMethods.absoluteUrl('https://github.com')).toBe(true);
    expect(RuleMethods.absoluteUrl('https://www.google.com')).toBe(true);
  });

  test('isEqual and isNotEqual tests', () => {
    expect(RuleMethods.isEqual('pato', 'pato')).toBe(true);
    expect(RuleMethods.isEqual('pato', ' pato')).toBe(false);
    expect(RuleMethods.isEqual('pato', 'Pato')).toBe(false);
    expect(RuleMethods.isNotEqual('pato', 'pato')).toBe(false);
    expect(RuleMethods.isNotEqual('pato', ' pato')).toBe(true);
    expect(RuleMethods.isNotEqual('pato', 'Pato')).toBe(true);
  });

  test('isNumer and isNotNumber tests', () => {
    expect(RuleMethods.isNumber("300")).toBe(true);
    expect(RuleMethods.isNumber("0")).toBe(true);
    expect(RuleMethods.isNumber("1")).toBe(true);
    expect(RuleMethods.isNumber("-20")).toBe(true);
    expect(RuleMethods.isNumber("20.5")).toBe(false);
    expect(RuleMethods.isNumber("20px")).toBe(false);
    expect(RuleMethods.isNotNumber("300")).toBe(false);
    expect(RuleMethods.isNotNumber("0")).toBe(false);
    expect(RuleMethods.isNotNumber("1")).toBe(false);
    expect(RuleMethods.isNotNumber("-20")).toBe(false);
    expect(RuleMethods.isNotNumber("20.5")).toBe(true);
    expect(RuleMethods.isNotNumber("20px")).toBe(true);
  });

  test('minLength and maxLength tests', () => {
    expect(RuleMethods.minLength("Treze letras!", 10)).toBe(true);
    expect(RuleMethods.minLength("Treze letras!", 13)).toBe(true);
    expect(RuleMethods.minLength("Treze letras!", 14)).toBe(false);
    expect(RuleMethods.maxLength("Sentence of 20 words", 1)).toBe(false);
    expect(RuleMethods.maxLength("Sentence of 20 words", 10)).toBe(false);
    expect(RuleMethods.maxLength("Sentence of 20 words", 20)).toBe(true);
  });

  test('exist and doesNotExists', () => {
    expect(RuleMethods.exists()).toBe(false);
    expect(RuleMethods.exists(undefined)).toBe(false);
    expect(RuleMethods.exists(null)).toBe(true);
    expect(RuleMethods.exists("")).toBe(true);
    expect(RuleMethods.exists("something")).toBe(true);
    expect(RuleMethods.doesNotExist()).toBe(true);
    expect(RuleMethods.doesNotExist(undefined)).toBe(true);
    expect(RuleMethods.doesNotExist(null)).toBe(false);
    expect(RuleMethods.doesNotExist("")).toBe(false);
    expect(RuleMethods.doesNotExist("something")).toBe(false);
  });


});
