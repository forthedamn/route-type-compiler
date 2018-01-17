import Parse, { ClassParse, MethodParse } from 'route-parse';
import * as process from 'process';
import * as path from 'path';
import * as fs from 'fs';

type MethodType = 'GET' | 'POST';

interface IMethod {
  // url path
  path: string;
  methedName: string;
  methodType: MethodType
}

/**
 * 模板类
 * 该类型包含了生成 type 模板的所有字段
 * 
 * @class Template
 */
class Template {
  // route 文件路径
  private filePath: string;
  // 命令行键入的 route 文件夹
  private argvIn: string;

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
  get routeInstanceName(): string {
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
  get methodList():Array<IMethod> {
    const routeFileStr = fs.readFileSync(path.join(process.cwd(), this.filePath), {encoding: 'utf-8'});
    const routeClass: ClassParse = new Parse(routeFileStr);
    return routeClass.methodPool.map((method: MethodParse) => {
      return {
        path: routeClass.prefix + method.path,
        methedName: method.methodName,
        methodType: method.httpMethod,
      }
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
  nameCamelize(name:string): string {
    const nameList:Array<string> = name.split('');
    if (nameList.length < 1) {
      return '';
    }
    return nameList.map((name, i) => {
      if (name === '/') {
        if (typeof nameList[i+1] !== 'undefined') {
          let temp;
          // 首字母小写
          if (i !== 0) {
            temp = nameList[i+1].toUpperCase();
          } else {
            temp = nameList[i+1].toLowerCase();
          }
          nameList.splice(i+1, 1);
          return temp;
        } else {
          return '';
        }
      }
      return name;
    }).join('').replace('.ts', '');
  }

}

export default Template;
