import LengthChecker, { PossibleLengths } from '~/modules/Auditor/LengthChecker'
import Asserts, { Assert } from '~/modules/Auditor/Asserts'
type ValidLevels = 'danger' | 'warning' | 'info'

interface ValidationInterface {
  selector: string;
  length: PossibleLengths;
  level: ValidLevels;
  condition?: {
    name: string;
    assertName: Assert;
    assertValue?: string;
  }
}

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

  private static stringToHTML(htmlString) {
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(htmlString, 'text/html');
    return doc.documentElement;
  };

  parseFromString(htmlString: string): void {
    this.parse(Auditor.stringToHTML(htmlString))
  }

  parse(doc): void {
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
