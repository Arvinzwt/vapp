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
        // return this.post('/api/auth/login', data, options);
        return {
            token: 123123
        }
    }

    //获取用户信息
    async user(data, options) {
        // return this.get('/api/auth/user', data, options);
        return {
            name: '张三'
        }
    }

    //测试下载功能
    async dimg(data, options) {
        return this.download('/api/auth/dimg', data, options);
    }

    //拉取菜单
    async getMenu(data) {
        return [
            {
                "name": "customer",//唯一id - 如果是页面取页面name属性，如果不是取文件夹名
                "code": "1098",//权限码
                "show": true,//是否显示
                "title": "线索客户管理",
                "icon": "iconxueyuan",
                "child": [
                    {
                        "name": "customer-customer-manage",//唯一id，页面name属性
                        "code": "0988",//权限码
                        "show": true,//是否在左侧菜单栏显示显示
                        "title": "线索客户管理",
                        "num": 0,//小时数量
                        "path": "/customer/customer-manage",
                        "query": {},
                        'child': [
                            {
                                "name": "customer-customer-manage",//唯一id，页面name属性
                                "code": "0988",//权限码
                                "show": true,//是否在左侧菜单栏显示显示
                                "title": "线索客户管理-新海",
                                "num": 0,//小时数量
                                "path": "/customer/customer-manage",
                                "query": {}
                            },
                            {
                                "name": "customer-customer-manage-second",//唯一id，页面name属性
                                "code": "0988",//权限码
                                "show": false,//是否在左侧菜单栏显示显示
                                "title": "线索客户管理-公海",
                                "num": 0,//小时数量
                                "path": "/customer/customer-manage/second",
                                "query": {}
                            },
                            {
                                "name": "customer-customer-manage-third",//唯一id，页面name属性
                                "code": "0988",//权限码
                                "show": false,//是否在左侧菜单栏显示显示
                                "title": "线索客户管理-死海",
                                "num": 0,//小时数量
                                "path": "/customer/customer-manage/third",
                                "query": {}
                            },
                            {
                                "name": "customer-customer-manage-fourth",//唯一id，页面name属性
                                "code": "0988",//权限码
                                "show": false,//是否在左侧菜单栏显示显示
                                "title": "线索客户管理-全部",
                                "num": 0,//小时数量
                                "path": "/customer/customer-manage/fourth",
                                "query": {}
                            },
                        ]
                    },
                    {
                        "name": "customer-customer-call",//唯一id
                        "code": "0987",//权限码
                        "show": true,//是否在左侧菜单栏显示显示
                        "title": "呼入线索客户",
                        "num": 0,//小时数量
                        "path": "/customer/customer-call",
                        "query": {},
                        "child": [
                            {
                                "name": "customer-customer-call",//唯一id，页面name属性
                                "code": "0981",//权限码
                                "show": false,//是否在左侧菜单栏显示显示
                                "title": "呼入线索客户-待确认",
                                "num": 0,//小时数量
                                "path": "/customer/customer-manage",
                                "query": {}
                            },
                            {
                                "name": "customer-customer-call-confirmed",//唯一id，页面name属性
                                "code": "0981",//权限码
                                "show": false,//是否在左侧菜单栏显示显示
                                "title": "呼入线索客户-已确认",
                                "num": 0,//小时数量
                                "path": "/customer/customer-manage/confirmed",
                                "query": {}
                            },
                        ]
                    },
                    {
                        "name": "customer-today-clue",//唯一id
                        "code": "0989",//权限码
                        "show": true,//是否在左侧菜单栏显示显示
                        "title": "今日新线索",
                        "num": 6,//小时数量
                        "path": "/customer/today-clue",
                        "query": {}
                    },
                    {
                        "name": "customer-today-reserve",//唯一id
                        "code": "0990",//权限码
                        "show": true,//是否在左侧菜单栏显示显示
                        "title": "今日预约沟通",
                        "num": 0,//小时数量
                        "path": "/customer/today-reserve",
                        "query": {}
                    },
                    {
                        "name": "customer-customer-recover",//唯一id
                        "code": "0991",//权限码
                        "show": true,//是否在左侧菜单栏显示显示
                        "title": "即将回收",
                        "num": 0,//小时数量
                        "path": "/customer/customer-recover",
                        "query": {}
                    },
                    {
                        "name": "customer-my-customer",//唯一id
                        "code": "0992",//权限码
                        "show": true,//是否在左侧菜单栏显示显示
                        "title": "我的线索客户",
                        "num": 0,//小时数量
                        "path": "/customer/my-customer",
                        "query": {}
                    },
                    {
                        "name": "customer-my-student",//唯一id
                        "code": "0994",//权限码
                        "show": true,//是否在左侧菜单栏显示显示
                        "title": "我的学员",
                        "num": 0,//小时数量
                        "path": "/customer/my-student",
                        "query": {}
                    },
                    {
                        "name": "customer-nov-record",//唯一id
                        "code": "0993",//权限码
                        "show": true,//是否在左侧菜单栏显示显示
                        "title": "诺访记录",
                        "num": 0,//小时数量
                        "path": "/customer/nov-record",
                        "query": {}
                    },

                    {
                        "name": "customer-recommend-check",//唯一id
                        "code": "0995",//权限码
                        "show": true,//是否在左侧菜单栏显示显示
                        "title": "推荐审核",
                        "num": 0,//小时数量
                        "path": "/customer/recommend-check",
                        "query": {}
                    },
                    {
                        "name": "customer-customer-detail",//唯一id
                        "code": "0998",//权限码
                        "show": false,//是否在左侧菜单栏显示显示
                        "title": "用户详情",
                        "num": 0,//小时数量
                        "path": "/customer/customer-detail",
                        "query": {}
                    },
                ]
            },
        ]
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
            },{
                id: 6,
                label: '二级 1-3',
            }, {
                id: 7,
                label: '二级 1-4',
            },{
                id: 8,
                label: '二级 1-5',
            }, {
                id: 9,
                label: '二级 1-6',
            }]
        }]
    }
}