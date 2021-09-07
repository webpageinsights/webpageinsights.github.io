import LengthChecker from '~/modules/Auditor/LengthChecker'
import Asserts from '~/modules/Auditor/Asserts'
import {ValidationInterface} from '~/modules/Validations/Validations'

export default class Auditor {
  validations: ValidationInterface[];
  report: boolean[];

  constructor(validations: ValidationInterface[]) {
    this.validations = validations;
    this.report = [];
  }

  private static stringToHTML(htmlString: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(htmlString, 'text/html');
    return doc.documentElement;
  };

  parseFromString(htmlString: string): void {
    this.parse(Auditor.stringToHTML(htmlString))
  }

  parse(doc: HTMLElement): void {
    this.report = this.validations.map((validation: ValidationInterface) => {
      const targets = Array.from(doc.querySelectorAll(validation.selector) || []);

      const validate = (target: Element, condition: any) => {
        return condition && Asserts.check(
          condition.assertName,
          target.getAttribute(condition.name) || undefined,
          condition.assertValue
        );
      };

      const rejections = targets.filter((target) => {
        return validation.condition ? validate(target, validation.condition) : false;
      });

      const hasCorrectLength = LengthChecker.check(validation.length, rejections.length);
      return hasCorrectLength && rejections.length === 0;
    })
  }
}
