"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('jest');
const route_template_1 = require("../../lib/route_template");
const template = new route_template_1.default('./test/fixture/route/api/demo.ts', './test/fixture/route');
describe('template', () => {
    it('nameCamelize', () => {
        const name = template.nameCamelize('/route/api/demo.ts');
        expect(name).toEqual('routeApiDemo');
    });
    it('routeList', () => {
        expect(template.methodList.length).toEqual(4);
        expect(template.methodList[2]).toEqual({
            path: 'api/demo/error/path/somepath',
            methedName: 'error',
            methodType: 'GET'
        });
    });
    it('routeInstanceName', () => {
        expect(template.routeInstanceName).toEqual('apiDemo');
    });
    it('routeFilePath', () => {
        expect(template.routeFilePath).toEqual('./api/demo.ts');
    });
});
