
require('jest');

import Temlate from '../../lib/route_template';

const template = new Temlate('./test/fixture/route/api/demots.ts', './test/fixture/route')

describe('template', ()=> {
  it('nameCamelize', () => {
    const name = template.nameCamelize('/route/api/demots.ts');
    expect(name).toEqual('routeApiDemots')
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
    expect(template.routeInstanceName).toEqual('apiDemots');
  });

  it('routeFilePath', () => {
    expect(template.routeFilePath).toEqual('./api/demots.ts');
  });
});
