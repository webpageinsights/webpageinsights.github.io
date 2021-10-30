import { Rule, AttributeRule } from '~/modules/Rules/Rules'
import RulesLocale from '~/modules/Rules/RulesLocale'
import defaultLocale from '~/locales/ptbr.json'

export default class RuleToText<T extends Rule | AttributeRule> {
  text: string;

  private static isAttributeRule (ruleType: Rule | AttributeRule): ruleType is AttributeRule {
    return (ruleType as AttributeRule).attribute !== undefined
  }

  constructor (rule: T, locale: RulesLocale = defaultLocale) {
    const key = `${rule.length}:${rule.level}`
    const head: RulesLocale['head'] = (locale.head as any)[key]

    this.text = [
      head,
      `'${rule.selector}'`,
      RuleToText.isAttributeRule(rule) ? locale.attribute : '',
      RuleToText.isAttributeRule(rule) ? `'${rule.attribute}'` : '',
      RuleToText.isAttributeRule(rule) ? locale.method[rule.method].replace('{0}', `'${rule.toBe}'` || '') : '' // eslint-disable-line
    ].join(' ').trim()
  }
}
