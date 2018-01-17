import {Controller, HttpMethod, route} from 'koa-decorator';
import ITodo from '@server/declaration/Todo';
import {Context} from 'koa';

@route('api/demo')
export default class DemoCtrl extends Controller {

  @route('/', HttpMethod.GET)
  async alive(): Promise<{text: string}> {
    return {text: 'hello world'};
  }

  /**
   * 使用原生 koa 返回数据
   */
  @route('/koa', HttpMethod.GET)
  async koa(ctx: Context) {
    ctx.body = '123';
  }

  @route('/error/path/somepath', HttpMethod.GET, other)
  async error(): Promise<ITodo> {
    throw {
      code: 12345,
      msg: '出错了',
      data: {
        userId: 'Tom',
      },
    };
  }

  @route('/koa', HttpMethod.POST)
  async koaPost(ctx: Context) {
    const data = ctx.request.body;
    
    return {
      koa: 'fun in koa',
      data,
    }
  }
}
