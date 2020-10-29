export const state = () => ({
    menu: [
        {
            "name": "customer",//唯一属性 - 如果是页面取页面name属性，如果不是取对应文件夹名
            "code": "8",//权限码
            "show": true,//是否在左侧菜单栏显示显示 show===true+拥有权限 才会显示
            "title": "线索客户管理",//显示内容
            "icon": "iconxueyuan",//显示图标
            "child": [
                {
                    "name": "customer-customer-call",
                    "code": "710",
                    "show": true,
                    "title": "呼入线索客户",
                    "num": 0,
                    "path": "/customer/customer-call",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-customer-manage",//唯一属性， 如果是页面取页面name属性，如果不是取对应文件夹名
                    "code": "710",//权限码
                    "show": true,//是否在左侧菜单栏显示显示
                    "title": "线索客户管理",//显示内容
                    "num": 0,//拥有消息数量
                    "path": "/customer/customer-manage",//页面路由
                    "query": {},//页面参数，默认空
                    'child': [//子路由
                        "customer-customer-manage",
                        "customer-customer-manage-public",
                        "customer-customer-manage-dead",
                        "customer-customer-manage-all",
                    ]
                },
                {
                    "name": "customer-today-clue",
                    "code": "710",
                    "show": true,
                    "title": "今日新线索",
                    "num": 6,
                    "path": "/customer/today-clue",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-today-reserve",
                    "code": "710",
                    "show": true,
                    "title": "今日预约沟通",
                    "num": 0,
                    "path": "/customer/today-reserve",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-soon-recover",
                    "code": "710",
                    "show": true,
                    "title": "即将回收",
                    "num": 0,
                    "path": "/customer/soon-recover",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-my-customer",
                    "code": "710",
                    "show": true,
                    "title": "我的线索客户",
                    "num": 0,
                    "path": "/customer/my-customer",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-nov-record",
                    "code": "710",
                    "show": true,
                    "title": "诺访记录",
                    "num": 0,
                    "path": "/customer/nov-record",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-my-student",
                    "code": "710",
                    "show": true,
                    "title": "我的学员",
                    "num": 0,
                    "path": "/customer/my-student",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-customer-register",
                    "code": "710",
                    "show": true,
                    "title": "推荐登记",
                    "num": 0,
                    "path": "/customer/customer-register",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-recommend-check",
                    "code": "710",
                    "show": true,
                    "title": "推荐审核",
                    "num": 0,
                    "path": "/customer/recommend-check",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-customer-add",
                    "code": "710",
                    "show": true,
                    "title": "线索录入",
                    "num": 0,
                    "path": "/customer/customer-add",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-customer-detail",
                    "code": "710",
                    "show": false,
                    "title": "用户详情",
                    "num": 0,
                    "path": "/customer/customer-detail",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-customer-follow",
                    "code": "710",
                    "show": false,
                    "title": "用户跟进",
                    "num": 0,
                    "path": "/customer/customer-follow",
                    "query": {},
                    "child": [],
                },
                {
                    "name": "customer-customer-import",
                    "code": "710",
                    "show": false,
                    "title": "导入",
                    "num": 0,
                    "path": "/customer/customer-import",
                    "query": {},
                    "child": [],
                },
            ]
        },
    ],
    dictionary: {}
});

export const mutations = {};

export const actions = {
    /**
     *@desc 登出
     *@return promise [promise]
     */
    async logout({commit}) {
        if (process.client) {
            localStorage.removeItem('usr');//存储localStorage
        }
        return null;
    },

    /**
     *@desc 登录
     *@return promise [promise]
     */
    async login({commit}, loginForm) {
        return this.$api.common.login({
            hrcode: loginForm.account,
            password: loginForm.password,
        }).then(usr => {
            if (process.client) {
                localStorage.setItem('usr', JSON.stringify(usr));//存储localStorage
            }
            return usr;
        })
    },

    /**
     *@desc 拉取用户信息
     *@return promise [promise]
     */
    user({commit}) {
        let target = {token: false, rightid: '', name: '',}
        if (process.client) {
            let usr = localStorage.getItem('usr');//存储localStorage
            return usr ? JSON.parse(usr) : target
        }
        return target;
    }
};

export const getters = {
    /**
     *@desc 拉取菜单
     *@return promise [promise]
     */
    getMenu: state => {
        return state.menu;
    }
}