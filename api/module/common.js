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
        return this.post('/ool-api/user/v2/base/login', data)
    }

    // 登出接口
    async logout(data, options) {
        return this.post('/ool-api/user/v2/base/logout', data)
    }

    // 字典-年级
    async grades(data) {
        return this.post('/mgr-api/v2/basic/grades', data)
    }

    // 字典-学科
    async subject(data) {
        return this.post('/mgr-api/v2/base/subject', data)
    }

    // 字典-学员状态
    async leadsstatus(data) {
        return this.post('/mgr-api/v2/base/leadsstatus', data)
    }

    // 字典-渠道大类
    async bigclass(data) {
        return this.post('/mgr-api/v2/base/bigclass', data)
    }

    // 字典-渠道小类
    async smallclass(data) {
        return this.post('/mgr-api/v2/base/smallclass', data)
    }

    // 字典-校区
    async hrcodedepts(data) {
        return this.post('/mgr-api/v2/base/hrcodedepts', data)
    }

    // 字典-教育顾问（初始化）
    async sales(data) {
        return this.post('/mgr-api/v2/base/sales', data)
    }

    // 字典-教育顾问（根据选择校区
    async deptsales(data) {
        return this.post('/mgr-api/v2/base/deptsales', data)
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