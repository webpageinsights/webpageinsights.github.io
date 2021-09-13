import RulesToExport from './RulesToReport'

describe('RulesToExport tests', function() {

  test('RulesToExport is defined', () => {
    const sampleRules = [{
      level: 'danger',
      length: 'one',
      selector: 'title'
    }];
    const report = new RulesToExport('<html><body><h1>test</h1></body></html>', sampleRules).report;
    expect(report).toBeDefined();
  })


  test('Methods are working', () => {
    const ruleWithMethod = {
      level: 'danger',
      length: 'one',
      selector: 'img',
      method: 'contains',
      attribute: 'alt',
      toBe: 'potato'
    };

    const report = new RulesToExport('<div><img alt="potatos are tasty"><img alt="tomato"><img></div>', [ruleWithMethod]);
    expect(report.report[0].targets.all.length).toBe(3);
    expect(report.report[0].targets.approved.length).toBe(1);
    expect(report.report[0].targets.disapproved.length).toBe(2);


  })


});
