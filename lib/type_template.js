"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_template_1 = require("./route_template");
/**
 * 根据 route 文件生成对应的 type
 *
 * @export
 * @param {Array<string>} filePathList route 文件路径
 * @param {string} input 通过命令行键入的路由文件夹路径
 * @returns
 */
function default_1(filePathList, input) {
    /**
     * 生成 import list，例如：
     * import Demo from './demo';
     */
    const importPool = [];
    function importGen(instanceName, routeFilePath) {
        importPool.push(`import ${upperHelper(instanceName)} from '${routeFilePath.replace(/.ts/, '')}';`);
    }
    /**
     * 生成实例，例如：
     * const demo = new Demo();
     */
    const instancePool = [];
    function instanceGen(instanceName) {
        instancePool.push(`const ${instanceName}: ${upperHelper(instanceName)};`);
    }
    /**
     * 生成所有 get 类型 path：method 键值对，例如：
     * 'api/demo': typeof demo.alive,
     */
    const getRoutePool = [];
    /**
   * 生成所有 post 类型 path：method 键值对，例如：
   * 'api/demo': typeof demo.alive,
   */
    const postRoutePool = [];
    function routeGen(path, instanceName, method, type) {
        if (type === 'GET') {
            getRoutePool.push(`'${path}': typeof ${instanceName}.${method}`);
        }
        if (type === 'POST') {
            postRoutePool.push(`'${path}': typeof ${instanceName}.${method}`);
        }
    }
    /**
     * 开始遍历所有 route 文件，生成 type 字段
     */
    filePathList.forEach(filePath => {
        const classtemplate = new route_template_1.default(filePath, input);
        importGen(classtemplate.routeInstanceName, classtemplate.routeFilePath);
        instanceGen(classtemplate.routeInstanceName);
        classtemplate.methodList.forEach(method => {
            routeGen(method.path, classtemplate.routeInstanceName, method.methedName, method.methodType);
        });
    });
    return {
        importPool,
        instancePool,
        getRoutePool,
        postRoutePool
    };
}
exports.default = default_1;
/**
 * 将首字母大写
 *
 * @param {any} instanceName
 * @returns
 */
function upperHelper(instanceName) {
    const nameArray = instanceName.split('');
    nameArray[0] = nameArray[0].toUpperCase();
    return nameArray.join('');
}
