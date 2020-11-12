export const state = () => ({
    // 菜单
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
                    "num": 0,
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
            ]
        },
    ],
    // 通用字典-静态
    dic: {
        // 跟踪结果
        trackResult: [
            {"value": "继续电话", "name": "继续电话",},
            {"value": "参加俱乐部", "name": "参加俱乐部",},
            {"value": "预约成功", "name": "预约成功",},
            {"value": "无兴趣", "name": "无兴趣",},
            {"value": "电话无回应", "name": "电话无回应",},
            {"value": "再次提交", "name": "再次提交",},
            {"value": "电话号码不正确", "name": "电话号码不正确",},
            {"value": "无法联络上", "name": "无法联络上",},
            {"value": "非本市", "name": "非本市",},
            {"value": "年龄过小", "name": "年龄过小",},
            {"value": "超龄", "name": "超龄",},
        ],
        // 沟通次数
        communicate: [
            {"value": "0", "name": "0",},
            {"value": "1", "name": "1",},
            {"value": "2", "name": "2",},
            {"value": "3", "name": "3",},
            {"value": "4", "name": "4",},
            {"value": "5", "name": "5",},
            {"value": "10", "name": "5次以上",},
        ],
        // 意向度
        intention: [
            {"value": "大", "name": "大",},
            {"value": "一般", "name": "一般",},
            {"value": "小", "name": "小",},
            {"value": "没有", "name": "没有",},
        ],
        // 是否有效-查询
        isValid: [
            {"value": "1", "name": "有效",},
            {"value": "0", "name": "无效",},
            {"value": "3", "name": "未确认",},
        ],
        // 是否有效2-输入
        isValid2: [
            {"value": "1", "name": "有效",},
            {"value": "0", "name": "无效",},
        ],
        // 无效类型
        invalidType: [
            {"value": "1", "name": "小学一年级-二年级",},
            {"value": "2", "name": "SPY或供应商虚假来电",},
            {"value": "3", "name": "任何成人课程",},
            {"value": "4", "name": "广告、招聘类",},
            {"value": "5", "name": "精锐内部人员",},
            {"value": "6", "name": "客户投诉电话",},
            {"value": "7", "name": "1个月内的2次或多次来电",},
            {"value": "8", "name": "内部测试电话",},
            {"value": "10", "name": "找人或找总部",},
            {"value": "11", "name": "在读学员",},
        ],
        // 性别
        sex: [
            {"value": 0, "name": "女",},
            {"value": 1, "name": "男",},
        ],
        // 报告类型
        reportType: [
            {"value": "1", "name": "CC未签约分析报告",},
            {"value": "2", "name": "入学测试",},
        ],
        // 联系人身份
        contactIdentity: [
            {"value": "父亲", "name": "父亲",},
            {"value": "母亲", "name": "母亲",},
            {"value": "祖父", "name": "祖父",},
            {"value": "祖母", "name": "祖母",},
            {"value": "外公", "name": "外公",},
            {"value": "外婆", "name": "外婆",},
            {"value": "其他", "name": "其他",},
        ],
        // 线索来源（推荐登记）
        sourceClues1: [
            {"value": "电话呼出", "name": "电话呼出",},
            {"value": "电话呼入", "name": "电话呼入",},
            {"value": "主动上门", "name": "主动上门",},
        ],
        // 线索来源（线索录入type 为1或者43）
        sourceClues2: [
            {"value": "电话呼入", "name": "电话呼入",},
            {"value": "Local其他", "name": "Local其他",},
        ],
        // 线索来源（线索录入type 不为1或者43）
        sourceClues3: [
            {"value": "主动上门", "name": "主动上门",},
            {"value": "拉访", "name": "拉访",},
            {"value": "Local其他", "name": "Local其他",},
        ],
        // 呼入类型
        incomingType: [
            {"value": "电话呼入", "name": "电话呼入",},
            {"value": "在线咨询", "name": "在线咨询",},
        ],
        // 海域
        sea: [
            {"value": "1", "name": "新海",},
            {"value": "2", "name": "个人海",},
            {"value": "3", "name": "公海",},
            {"value": "4", "name": "死海",},
        ],
        // 审核状态
        checkStatus: [
            {"value": "0", "name": "待审批",},
            {"value": "1", "name": "已审核",},
            {"value": "2", "name": "驳回",},
        ],

        //年级
        grades: [],
        //学科
        subject: [],
        //学员状态
        leadsstatus: [],
        //渠道大类
        bigclass: [],
        //校区
        hrcodedepts: [],
        // 教育顾问（初始化）
        sales: [],

        //渠道小类
        // smallclass: [],
        // 教育顾问（根据选择校区）
        // deptsales: [],
    },
});

export const mutations = {
    /**
     *@desc 填充字典值
     */
    dic(state, dic) {
        Object.assign(state.dic, dic);
    },

    /**
     *@desc 设置菜单数量
     */
    setMenuNum(state, param) {
        state.menu.forEach(item => {
            item.child.forEach(list => {
                if (list.name === param.name) {
                    list.num = param.num
                }
            })
        })
    },
};

export const actions = {
    /**
     *@desc 登出
     *@return promise [promise]
     */
    async logout({commit}) {
        if (process.client) {
            localStorage.removeItem('usr');//存储localStorage
            localStorage.removeItem('menu');//存储localStorage
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
    async user() {
        let target = {token: false, rightid: '', name: '',}
        if (process.client) {
            let usr = localStorage.getItem('usr');//存储localStorage
            return usr ? JSON.parse(usr) : target
        }
        return target;
    },

    /**
     *@desc 拉取字典信息
     *@return promise [promise]
     */
    async dic({commit, state}) {
        for (let key in state.dic) {//循环字典
            if (state.dic.hasOwnProperty(key)) {
                if (state.dic[key].length === 0) {//如果某个值没有length
                    let target = {};
                    target[key] = await this.$api.common[key]() || [];//请求并填充值
                    commit('dic', target);
                }
            }
        }
        return state.dic;
    },

    /**
     *@desc 拉取menu信息
     *@return promise [promise]
     */
    async menu({state}) {
        let target = [];
        state.menu.forEach(item => {
            if (this.$utils.verifyAuth(item.code)) {//验证第一层权限
                target.push({
                    ...item,
                    child: item.child.filter(list => {
                        return this.$utils.verifyAuth(list.code);
                    })
                })
            }
        });
        return target
    },
};
