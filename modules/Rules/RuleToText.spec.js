import RuleToText from './RuleToText'
import InitialRules from './InitialRules'

describe('RuleToText specs', function () {
  test('RuleToText is defined', () => {
    const ruleToText = new RuleToText({
      level: 'danger',
      length: 'one',
      selector: 'selector'
    })
    expect(ruleToText).toBeDefined()
  })

  test('All initial rules are valid', () => {
    InitialRules.forEach((rule) => {
      const ruleToText = new RuleToText(rule)
      expect(ruleToText).toBeDefined()
    })
  })

  test('Validate default locale (ptbr)', () => {
    const sampleRule = {
      level: 'danger',
      length: 'one',
      selector: 'title'
    }

    const sampleRuleToText = new RuleToText(sampleRule)
    expect(sampleRuleToText.text).toBe('Deve haver um e somente um elemento \'title\'')

    const sampleAttributeRule = {
      level: 'warning',
      length: 'some',
      selector: 'img',
      attribute: 'data-test',
      method: 'contains',
      toBe: 'batata'
    }
    const sampleAttributeRuleToText = new RuleToText(sampleAttributeRule)
    expect(sampleAttributeRuleToText.text).toBe('Recomenda-se a existência de ao menos um elemento \'img\' com atributo \'data-test\' contendo \'batata\'')

    const noneSampleRule = {
      level: 'info',
      length: 'none',
      selector: 'marquee',
      attribute: 'direction',
      method: 'isNotEqual',
      toBe: 'right'
    }

    const noneSampleRuleToText = new RuleToText(noneSampleRule)
    expect(noneSampleRuleToText.text).toBe('Dica: evite quaisquer elementos \'marquee\' com atributo \'direction\' não igual a \'right\'')
  })
})
