/**
 * @description: api接口上下文管理
 */
import outfall from '~/api-repository/outfall'

export default (context, inject) => {
    inject('api',outfall(context));
}