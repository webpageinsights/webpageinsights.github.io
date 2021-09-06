import LengthChecker, { PossibleLengths } from '~/modules/Auditor/LengthChecker'
import Asserts  from '~/modules/Auditor/Asserts'
import {ValidationInterface} from '~/modules/Validations/Validations'

interface ReportInterface {
  hasCorrectLength: boolean;
  details: {
    found: number;
    rejections: ValidationInterface[];
    expected: PossibleLengths
  };
  passed: boolean
}

export default class Auditor {
  validations: ValidationInterface[];
  report: ReportInterface[];

  constructor(validations: ValidationInterface[]) {
    this.validations = validations;
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

      const rejections = targets.filter(target => {
        return validation.condition ? Asserts.check(
          validation.condition.assertName,
          target.getAttribute(validation.condition.name) || undefined,
          validation.condition.assertValue
        ) === true : false;
      });

      const hasCorrectLength = LengthChecker.check(validation.length, rejections.length);
      return {
        passed: hasCorrectLength && rejections.length === 0,
        hasCorrectLength,
        details: {
          expected: validation.length,
          found: rejections.length,
          rejections
        }
      };
    })
  }
}
