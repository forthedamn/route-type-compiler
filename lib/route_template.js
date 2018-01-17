"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_parse_1 = require("route-parse");
const process = require("process");
const path = require("path");
const fs = require("fs");
/**
 * 模板类
 * 该类型包含了生成 type 模板的所有字段
 *
 * @class Template
 */
class Template {
    constructor(filePath, argvIn) {
        this.filePath = filePath;
        this.argvIn = argvIn;
    }
    /**
     * route 的相对路径，比如：'./demo'
     *
     * import Demo from './demo';
     *
     * @readonly
     * @memberof Template
     */
    get routeFilePath() {
        return this.filePath.replace(this.argvIn, '.');
    }
    /**
     * route class 实例的名称，如下的 demo 变量
     *
     * const demo = new Demo();
     *
     * @readonly
     * @type {string}
     * @memberof Template
     */
    get routeInstanceName() {
        const routeFilePath = this.filePath.replace(this.argvIn, '');
        return this.nameCamelize(routeFilePath);
    }
    /**
     * route class 中每一个 method 实例
     *
     * @readonly
     * @type {Array<IMethod>}
     * @memberof Template
     */
    get methodList() {
        const routeFileStr = fs.readFileSync(path.join(process.cwd(), this.filePath), { encoding: 'utf-8' });
        const routeClass = new route_parse_1.default(routeFileStr);
        return routeClass.methodPool.map((method) => {
            return {
                path: routeClass.prefix + method.path,
                methedName: method.methodName,
                methodType: method.httpMethod,
            };
        });
    }
    /**
     * 路径转化为实例名,例如：
     * /app/api/demo => appApiDemo
     *
     * @param {string} name
     * @returns {string}
     * @memberof Template
     */
    nameCamelize(name) {
        const nameList = name.split('');
        if (nameList.length < 1) {
            return '';
        }
        return nameList.map((name, i) => {
            if (name === '/') {
                if (typeof nameList[i + 1] !== 'undefined') {
                    let temp;
                    // 首字母小写
                    if (i !== 0) {
                        temp = nameList[i + 1].toUpperCase();
                    }
                    else {
                        temp = nameList[i + 1].toLowerCase();
                    }
                    nameList.splice(i + 1, 1);
                    return temp;
                }
                else {
                    return '';
                }
            }
            return name;
        }).join('').replace('.ts', '');
    }
}
exports.default = Template;
