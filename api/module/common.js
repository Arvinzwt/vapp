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

    // 获取菜单
    async getMenu(data) {
        return [
            {
                "name": "customer",//唯一属性 - 如果是页面取页面name属性，如果不是取对应文件夹名
                "code": "1098",//权限码
                "show": true,//是否在左侧菜单栏显示显示 show===true+拥有权限 才会显示
                "title": "线索客户管理",//显示内容
                "icon": "iconxueyuan",//显示图标
                "child": [
                    {
                        "name": "customer-customer-manage",//唯一属性， 如果是页面取页面name属性，如果不是取对应文件夹名
                        "code": "0988",//权限码
                        "show": true,//是否在左侧菜单栏显示显示
                        "title": "线索客户管理",//显示内容
                        "num": 0,//拥有消息数量
                        "path": "/customer/customer-manage",//页面路由
                        "query": {},//页面参数，默认空
                        'child': [//子路由
                            {
                                "name": "customer-customer-manage",//唯一id，页面name属性
                                "code": "0988",//权限码
                                "show": true,//是否在左侧菜单栏显示显示
                                "title": "线索客户管理-新海",
                                "num": 0,//小时数量
                                "path": "/customer/customer-manage",//子页面路由
                                "query": {}//子页面参数
                            },
                            {
                                "name": "customer-customer-manage-second",
                                "code": "0988",
                                "show": false,
                                "title": "线索客户管理-公海",
                                "num": 0,
                                "path": "/customer/customer-manage/second",
                                "query": {}
                            },
                            {
                                "name": "customer-customer-manage-third",
                                "code": "0988",
                                "show": false,
                                "title": "线索客户管理-死海",
                                "num": 0,
                                "path": "/customer/customer-manage/third",
                                "query": {}
                            },
                            {
                                "name": "customer-customer-manage-fourth",
                                "code": "0988",
                                "show": false,
                                "title": "线索客户管理-全部",
                                "num": 0,
                                "path": "/customer/customer-manage/fourth",
                                "query": {}
                            },
                        ]
                    },
                    {
                        "name": "customer-customer-call",
                        "code": "0987",
                        "show": true,
                        "title": "呼入线索客户",
                        "num": 0,
                        "path": "/customer/customer-call",
                        "query": {},
                    },
                    {
                        "name": "customer-today-clue",
                        "code": "0989",
                        "show": true,
                        "title": "今日新线索",
                        "num": 6,
                        "path": "/customer/today-clue",
                        "query": {}
                    },
                    {
                        "name": "customer-today-reserve",
                        "code": "0990",
                        "show": true,
                        "title": "今日预约沟通",
                        "num": 0,
                        "path": "/customer/today-reserve",
                        "query": {}
                    },
                    {
                        "name": "customer-customer-recover",
                        "code": "0991",
                        "show": true,
                        "title": "即将回收",
                        "num": 0,
                        "path": "/customer/customer-recover",
                        "query": {}
                    },
                    {
                        "name": "customer-my-customer",
                        "code": "0992",
                        "show": true,
                        "title": "我的线索客户",
                        "num": 0,
                        "path": "/customer/my-customer",
                        "query": {}
                    },
                    {
                        "name": "customer-my-student",
                        "code": "0994",
                        "show": true,
                        "title": "我的学员",
                        "num": 0,
                        "path": "/customer/my-student",
                        "query": {}
                    },
                    {
                        "name": "customer-nov-record",
                        "code": "0993",
                        "show": true,
                        "title": "诺访记录",
                        "num": 0,
                        "path": "/customer/nov-record",
                        "query": {}
                    },

                    {
                        "name": "customer-recommend-check",
                        "code": "0995",
                        "show": true,
                        "title": "推荐审核",
                        "num": 0,
                        "path": "/customer/recommend-check",
                        "query": {}
                    },
                    {
                        "name": "customer-customer-detail",
                        "code": "0998",
                        "show": false,
                        "title": "用户详情",
                        "num": 0,
                        "path": "/customer/customer-detail",
                        "query": {}
                    },
                ]
            },
        ]
    }
}