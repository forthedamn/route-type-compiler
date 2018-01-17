/*
* Autogenerated by Route Type Compiler (1.0.2)
*
* DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
*/

import ApiDemo from './api/demo';
import Demo from './demo';

declare module 'test' {
  const apiDemo: ApiDemo;
  const demo: Demo;
  export interface IGetRoute {
    'api/demo/': () => Promise<RouteResponse.{text: string}>,
    'api/demo/koa': () => Promise<any>,
    'api/demo/error/path/somepath': () => Promise<RouteResponse.ITodo>,
    '/demo/': () => Promise<RouteResponse.{text: string}>,
    '/demo/koa': () => Promise<any>,
    '/demo/error/path/somepath': () => Promise<RouteResponse.ITodo[]>
  }
  export interface IPostRoute {
    'api/demo/koa': () => Promise<any>,
    '/demo/koa': () => Promise<any>
  }
}
