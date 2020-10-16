/**
 * @description: 通用接口
 */
import Request from "../request";

export default class Common extends Request {
    constructor(context) {
        super(context);
    }

    // 登录接口
    async login(data, options) {
        return this.post('/api/auth/login', data, options);
    }

    //获取用户信息
    async user(data, options) {
        return this.get('/api/auth/user', data, options);
    }

    async dimg(data, options) {
        return this.download('/api/auth/dimg', data, options);
    }
}