
require('jest');

import generator from '../../lib/type_template';

describe('generator', ()=> {
  it('generator', () => {
    const res = generator(
      [
        './test/fixture/route/api/demo.ts',
        './test/fixture/route/demo.ts',
      ],
      './test/fixture/route');
      expect(res.importPool.length).toEqual(2);
      expect(res.instancePool.length).toEqual(2);
      expect(res.getRoutePool.length).toEqual(6);
      expect(res.postRoutePool.length).toEqual(2);
  });
});
