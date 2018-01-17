
require('jest');

import Temlate from '../../lib/route_template';

const template = new Temlate('./test/fixture/route/api/demo.ts', './test/fixture/route')

describe('template', ()=> {
  it('nameCamelize', () => {
    const name = template.nameCamelize('/route/api/demo.ts');
    expect(name).toEqual('routeApiDemo')
  });

  it('routeList', ()=> {
    expect(template.methodList.length).toEqual(4);
    expect(template.methodList[2]).toEqual(
      {
        path: 'api/demo/error/path/somepath',
        methedName: 'error',
        methodType: 'GET',
        response: 'ITodo'
      });
  });

  it('routeInstanceName', () => {
    expect(template.routeInstanceName).toEqual('apiDemo');
  });

  it('routeFilePath', () => {
    expect(template.routeFilePath).toEqual('./api/demo.ts');
  });
});
