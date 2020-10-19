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
                "id": "customer",//唯一id - 如果是页面取页面name属性，如果不是取文件夹名
                "code": "1098",//权限码
                "show": true,//是否显示
                "name": "线索客户管理",
                "icon": "iconxueyuan",
                "child": [
                    {
                        "id": "customer-customer-manage",//唯一id，页面name属性
                        "code": "0988",//权限码
                        "menuShow": true,//是否在左侧菜单栏显示显示
                        "topShow": false,//是否在顶部显示
                        "name": "线索客户管理",
                        "num": 0,//小时数量
                        "path": "/customer/customer-manage",
                        "query": {}
                    },
                    {
                        "id": "customer-customer-call",//唯一id
                        "code": "0987",//权限码
                        "menuShow": true,//是否显示
                        "topShow": false,//是否在顶部显示
                        "name": "呼入线索客户",
                        "num": 0,//小时数量
                        "path": "/customer/customer-call",
                        "query": {}
                    },
                    {
                        "id": "customer-today-clue",//唯一id
                        "code": "0989",//权限码
                        "menuShow": true,//是否显示
                        "topShow": false,//是否在顶部显示
                        "name": "今日新线索",
                        "num": 6,//小时数量
                        "path": "/customer/today-clue",
                        "query": {}
                    },
                    {
                        "id": "customer-today-reserve",//唯一id
                        "code": "0990",//权限码
                        "menuShow": true,//是否显示
                        "topShow": false,//是否在顶部显示
                        "name": "今日预约沟通",
                        "num": 20,//小时数量
                        "path": "/customer/today-reserve",
                        "query": {}
                    },
                    {
                        "id": "customer-customer-recover",//唯一id
                        "code": "0991",//权限码
                        "menuShow": true,//是否显示
                        "topShow": false,//是否在顶部显示
                        "name": "即将回收",
                        "num": 30,//小时数量
                        "path": "/customer/customer-recover",
                        "query": {}
                    },
                    {
                        "id": "customer-my-customer",//唯一id
                        "code": "0992",//权限码
                        "menuShow": true,//是否显示
                        "topShow": false,//是否在顶部显示
                        "name": "我的线索客户",
                        "num": 0,//小时数量
                        "path": "/customer/my-customer",
                        "query": {}
                    },
                    {
                        "id": "customer-my-student",//唯一id
                        "code": "0994",//权限码
                        "menuShow": true,//是否显示
                        "topShow": false,//是否在顶部显示
                        "name": "我的学员",
                        "num": 0,//小时数量
                        "path": "/customer/my-student",
                        "query": {}
                    },
                    {
                        "id": "customer-nov-record",//唯一id
                        "code": "0993",//权限码
                        "menuShow": true,//是否显示
                        "topShow": false,//是否在顶部显示
                        "name": "诺访记录",
                        "num": 0,//小时数量
                        "path": "/customer/nov-record",
                        "query": {}
                    },

                    {
                        "id": "customer-recommend-check",//唯一id
                        "code": "0995",//权限码
                        "menuShow": true,//是否显示
                        "topShow": false,//是否在顶部显示
                        "name": "推荐审核",
                        "num": 0,//小时数量
                        "path": "/customer/recommend-check",
                        "query": {}
                    },
                ]
            },
        ]
    }
}