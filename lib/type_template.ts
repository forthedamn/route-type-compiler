import Template from './route_template';

/**
 * 根据 route 文件生成对应的 type
 * 
 * @export
 * @param {Array<string>} filePathList route 文件路径
 * @param {string} input 通过命令行键入的路由文件夹路径
 * @returns 
 */
export default function(filePathList: Array<string>, input: string) {
  /**
   * 生成 import list，例如：
   * import Demo from './demo';
   */
  const importPool = [];
  function importGen(instanceName: string, routeFilePath: string) {
    routeFilePath = routeFilePath.replace(/\.\//, '../route/');
    importPool.push(`import ${upperHelper(instanceName)} from '${routeFilePath.replace(/.ts/, '')}';`);
  }
  /**
   * 生成实例，例如：
   * const demo = new Demo();
   */
  const instancePool = [];
  function instanceGen(instanceName: string) {
    instancePool.push(`const ${instanceName}: ${upperHelper(instanceName)};`)
  }
  /**
   * 生成所有 get 类型 path：method 键值对，例如：
   * 'api/demo': typeof demo.alive,
   */
  const getRoutePool = [];
    /**
   * 生成所有 post 类型 path：method 键值对，例如：
   * 'api/demo': () => ReturnType<typeof routeClass.method>,
   */
  const postRoutePool = [];
  function routeGen(path: string, type: 'GET'|'POST', instanceName: string, methodName: string) {

    if (type === 'GET') {
      getRoutePool.push(`'${path}': ReturnType<typeof ${instanceName}.${methodName} >`);
    }
    if (type === 'POST') {
      postRoutePool.push(`'${path}': ReturnType<typeof ${instanceName}.${methodName} >`);
    }
  }

  /**
   * 开始遍历所有 route 文件，生成 type 字段
   */
  filePathList.forEach(filePath => {
    const classtemplate = new Template(filePath, input);
    // class 实例名称
    const { routeInstanceName, routeFilePath, methodList }  = classtemplate;
    importGen(routeInstanceName, routeFilePath);
    instanceGen(routeInstanceName);
    methodList.forEach(method => {
      routeGen(method.path,  method.methodType, routeInstanceName, method.methedName);
    });
  });

  return {
    importPool,
    instancePool,
    getRoutePool,
    postRoutePool
  }
}

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
