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

    const complexHTML = `<html>
      <head>
        <meta name="description" content="12345678901">
      </head>
      <body>
        <h1>Title</h1>
        <img alt="alternative text">
        <img>
        <img>
        <img alt="another alt">
      </body>

    </html>`;

    const complexRules = [
      {
        "level": "danger",
        "length": "one",
        "selector": "h1"
      },
      {
        "level": "warning",
        "length": "none",
        "selector": "img",
        "attribute": "alt",
        "method": "exists"
      },
      {
        "level": "danger",
        "length": "one",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "method": "minLength",
        "toBe": "5"
      },
      {
        "level": "danger",
        "length": "one",
        "selector": "meta[name=\"description\"]",
        "attribute": "content",
        "method": "maxLength",
        "toBe": "10"
      }
    ]

    const complexReport = new RulesToExport(complexHTML, complexRules);
    expect(complexReport.report.length).toBe(complexRules.length);
    expect(complexReport.report[0].isApproved).toBe(true);
    expect(complexReport.report[0].targets.all.length).toBe(1);
    expect(complexReport.report[0].targets.approved.length).toBe(1);
    expect(complexReport.report[0].targets.disapproved.length).toBe(0);

    expect(complexReport.report[1].isApproved).toBe(false);
    expect(complexReport.report[2].isApproved).toBe(true);
    expect(complexReport.report[3].isApproved).toBe(false);

  //   [
  //   {
  //     id: undefined,
  //       group: undefined,
  //     level: 'warning',
  //     text: "Recomenda-se que não exista elemento algum 'img'",
  //     isApproved: false,
  //     targets: { all: NodeList {}, approved: NodeList {}, disapproved: [] }
  //   },
  //   {
  //     id: undefined,
  //       group: undefined,
  //     level: 'danger',
  //     text: `Deve haver um e somente um elemento 'meta[name="description"]' com atributo 'content' com tamanho mínimo de '5'`,
  //     isApproved: false,
  //     targets: { all: NodeList {}, approved: [], disapproved: [Array] }
  //   },
  //   {
  //     id: undefined,
  //       group: undefined,
  //     level: 'danger',
  //     text: `Deve haver um e somente um elemento 'meta[name="description"]' com atributo 'content' com tamanho máximo de '10'`,
  //     isApproved: false,
  //     targets: { all: NodeList {}, approved: [], disapproved: [Array] }
  //   }
  // ]


  });




});
