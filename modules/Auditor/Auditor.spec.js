import Auditor from './Auditor';

const stringToHTML = function (str) {
  const dom = document.createElement('div');
  dom.innerHTML = str;
  return dom;
};

const basicHTML = `<h1>Heading</h1><img src="https://www.google.com/image"><img alt="Sample test"><img width="30" height="30">`;
const basicValidations = [{
  selector: 'h1',
  length: 'one',
  level: 'danger'
}];

describe('Auditor spec', () => {

  test('Auditor exists', () => {
    expect(Auditor).toBeTruthy();
    expect(new Auditor(basicValidations)).toBeTruthy();
  });

  test('Basic validation', () => {
    const auditor = new Auditor(basicValidations);
    auditor.parse(stringToHTML(basicHTML));
    const imagesAuditor = new Auditor([{
      selector: 'img',
      length: 'zero',
      level: 'warning',
      condition: {
        name: 'width',
        assertName: 'isNotNumber'
      }
    }, {
      selector: 'img',
      length: 'zero',
      level: 'warning',
      condition: {
        name: 'height',
        assertName: 'isNotNumber'
      }
    }]);

    imagesAuditor.parse(stringToHTML(basicHTML));
    console.log(imagesAuditor.report);

  });
});
