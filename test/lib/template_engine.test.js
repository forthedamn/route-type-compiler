"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('jest');
const template_engine_1 = require("../../lib/template_engine");
const fileList = [
    './test/fixture/route/api/demo.ts',
    './test/fixture/route/demo.ts',
];
const input = './test/fixture/route';
const output = './test/fixture/route';
describe('engine', () => {
    it('engine', () => {
        const engine = new template_engine_1.default(fileList, input, output);
        engine;
        //engine.compile('test', '0,1')
    });
});
