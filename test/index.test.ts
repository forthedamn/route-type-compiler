require('jest');

const shelljs = require('shelljs');

describe('exec', () => {
  it('file', () => {
    shelljs.exec('node /Users/forthedamn/npm_node_modules/route-type-compiler/index.js -i ./test/fixture/route -o ./test/fixture/declaration -m test');
  });
});
