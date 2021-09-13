import {Rule, AttributeRule} from '~/modules/Rules/Rules'
import RuleToText from '~/modules/Rules/RuleToText'
import RuleMethods from '~/modules/Rules/RuleMethods'

type ReportLine = Pick<Rule, 'id' | 'level' | 'group'> & {
  text: string;
  isApproved: boolean;
  targets: {
    all: NodeListOf<Element>,
    approved: Element[],
    disapproved: Element[]
  }
}

export default class RulesToReport {
  report: ReportLine[];

  private static isAttributeRule(ruleType: Rule | AttributeRule): ruleType is AttributeRule {
    return (ruleType as AttributeRule).attribute !== undefined;
  }

  private static stringToHTML(htmlString: string = '<div></div>') {
    // TODO: Throws error on not valid htmlString
    const domParser = new DOMParser();
    const doc: Document = domParser.parseFromString(htmlString, 'text/html');
    return doc.documentElement || document.createElement('html');
  };

  constructor(htmlString: string, rules: Array<Rule | AttributeRule<string | number>>) {
    const documentElement = RulesToReport.stringToHTML(htmlString);

    this.report = rules.map((rule: Rule) : ReportLine => {
      const targets: NodeListOf<Element> = documentElement.querySelectorAll(rule.selector) || [];

      const [approved, disapproved] = !RulesToReport.isAttributeRule(rule) ? [[], []] :
        Array.from(targets).reduce((total: Element[][], target) => {
          const attributeValue = target.getAttribute(rule.attribute);
          const isApproved = attributeValue && rule.toBe ? RuleMethods[rule.method](attributeValue, rule.toBe) : false;
          total[isApproved ? 0 : 1].push(target);
          return total;
        }, [[], []]);

      return {
        id: rule.id,
        group: rule.group,
        level: rule.level,
        text: new RuleToText(rule).text,
        isApproved: disapproved.length > 0,
        targets: {
          all: targets,
          approved: approved,
          disapproved: disapproved
        }
      };
    })
  }

}
