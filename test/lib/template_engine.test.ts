
require('jest');

import Engine from '../../lib/template_engine';

const fileList = [
  './test/fixture/route/api/demots.ts',
  './test/fixture/route/demots.ts',
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
