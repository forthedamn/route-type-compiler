"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('jest');
const type_template_1 = require("../../lib/type_template");
describe('generator', () => {
    it('generator', () => {
        const res = type_template_1.default([
            './test/fixture/route/api/demo.ts',
            './test/fixture/route/demo.ts',
        ], './test/fixture/route');
        expect(res.importPool.length).toEqual(2);
        expect(res.instancePool.length).toEqual(2);
        expect(res.getRoutePool.length).toEqual(6);
        expect(res.postRoutePool.length).toEqual(2);
    });
});
