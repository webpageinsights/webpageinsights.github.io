import RulesToExport from './RulesToReport'

describe('RulesToExport tests', function() {

  test('RulesToExport is defined', () => {
    const sampleRules = [{
      level: 'danger',
      length: 'one',
      selector: 'title'
    }];
    const report = new RulesToExport(sampleRules).report;
    expect(report).toBeDefined();
  })

});
