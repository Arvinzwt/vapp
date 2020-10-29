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
        return this.post('/ool-api/user/v2/base/login',data)
    }

    // 登出接口 (未使用)
    async logout(data, options) {
        return this.post('/ool-api/user/v2/base/logout',data)
    }


    //拉取负责人
    async getRole(data) {
        return [{
            id: 1,
            label: '一级 1',
            children: [{
                id: 4,
                label: '二级 1-1',
            }, {
                id: 5,
                label: '二级 1-2',
            }, {
                id: 6,
                label: '二级 1-3',
            }, {
                id: 7,
                label: '二级 1-4',
            }, {
                id: 8,
                label: '二级 1-5',
            }, {
                id: 9,
                label: '二级 1-6',
            }]
        }]
    }
}