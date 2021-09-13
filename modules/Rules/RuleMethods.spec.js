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


})
