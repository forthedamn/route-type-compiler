
require('jest');

import Engine from '../../lib/template_engine';

const fileList = [
  './test/fixture/route/api/demo.ts',
  './test/fixture/route/demo.ts',
];
const input = './test/fixture/route';
const output = './test/fixture/declaration';

describe('engine', ()=> {
  it('engine', () => {
    const engine = new Engine(fileList, input, output)
    engine;
    //engine.compile('test', '0,1')
  });
});
