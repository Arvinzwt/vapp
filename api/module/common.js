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
        return {
            token: 123123
        }
    }

    // 获取用户信息
    async user(data) {
        return {
            name: "张三"
        }
    }
}