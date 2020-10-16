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

    //测试下载功能
    async dimg(data, options) {
        return this.download('/api/auth/dimg', data, options);
    }

    //拉取菜单
    async getMenu(data) {
        return [
            {
                "id": "0",//唯一id
                "code": "1098",//权限码
                "show": true,//是否显示
                "name": "线索客户管理",
                "icon": "iconxueyuan",
                "child": [
                    {
                        "id": "0-0",//唯一id
                        "code": "0988",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "线索客户管理",
                        "num": 0,//小时数量
                        "path": "/customer/customer-manage",
                        "query": {}
                    },
                    {
                        "id": "0-1",//唯一id
                        "code": "0987",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "呼入线索客户",
                        "num": 0,//小时数量
                        "path": "/customer/customer-call",
                        "query": {}
                    },
                    {
                        "id": "0-2",//唯一id
                        "code": "0989",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "今日新线索",
                        "num": 6,//小时数量
                        "path": "/customer/today-clue",
                        "query": {}
                    },
                    {
                        "id": "0-3",//唯一id
                        "code": "0990",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "今日预约沟通",
                        "num": 20,//小时数量
                        "path": "/customer/today-reserve",
                        "query": {}
                    },
                    {
                        "id": "0-4",//唯一id
                        "code": "0991",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "即将回收",
                        "num": 30,//小时数量
                        "path": "/customer/customer-recover",
                        "query": {}
                    },
                    {
                        "id": "0-5",//唯一id
                        "code": "0992",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "我的线索客户",
                        "num": 0,//小时数量
                        "path": "/customer/my-customer",
                        "query": {}
                    },
                    {
                        "id": "0-7",//唯一id
                        "code": "0994",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "我的学员",
                        "num": 0,//小时数量
                        "path": "/customer/my-student",
                        "query": {}
                    },
                    {
                        "id": "0-6",//唯一id
                        "code": "0993",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "诺访记录",
                        "num": 0,//小时数量
                        "path": "/customer/nov-record",
                        "query": {}
                    },

                    {
                        "id": "0-8",//唯一id
                        "code": "0995",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "推荐审核",
                        "num": 0,//小时数量
                        "path": "/customer/recommend-check",
                        "query": {}
                    },
                ]
            },
            {
                "id": "1",//唯一id
                "code": "190",//权限码
                "show": true,//是否显示
                "name": "学员管理",
                "icon": "iconkehu",
                "child": [
                    {
                        "id": "1-0",//唯一id
                        "code": "191",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "学员列表",
                        "num": 0,//小时数量
                        "path": "",
                        "query": {}
                    },
                    {
                        "id": "1-1",//唯一id
                        "code": "192",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "我的待办",
                        "num": 20,//小时数量
                        "path": "",
                        "query": {}
                    },
                    {
                        "id": "1-2",//唯一id
                        "code": "193",//权限码
                        "show": true,//是否显示
                        "isTopMenu": false,//是否在顶部显示
                        "name": "待办报表",
                        "num": 0,//小时数量
                        "path": "",
                        "query": {}
                    }
                ]
            }
        ]
    }
}