import {Rule, AttributeRule} from '~/modules/Rules/Rules'
import RuleToText from '~/modules/Rules/RuleToText'

type ReportLine = Pick<Rule, 'id' | 'level' | 'group'> & {
  text: string;
  isApproved: boolean;
  targets: {
    all: HTMLElement[],
    approved: HTMLElement[],
    disapproved: HTMLElement[]
  }
}

export default class RulesToReport {

  report: ReportLine[];

  constructor(rules: Array<Rule | AttributeRule<string | number>>) {
    this.report = rules.map((rule: Rule) : ReportLine => {
      return {
        id: rule.id,
        group: rule.group,
        level: rule.level,
        text: new RuleToText(rule).text,
        isApproved: false,
        targets: {
          all: [1, 2].map(() => document.createElement('div')),
          approved: [1, 2].map(() => document.createElement('div')),
          disapproved: [1, 2].map(() => document.createElement('div'))
        }
      };
    })
  }

}
