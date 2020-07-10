import base from '../base';
import fa from "element-ui/src/locale/lang/fa";

class Api extends base {
    //登录
    login(data, config) {
        return this.post('/user/login', data, config);
    }

    //菜单
    async getMenu(data) {
        return {
            active: '0-1',
            list: [
                {
                    code: '0',
                    show: true,
                    name: '题库',
                    child: [
                        {
                            code: '0-1',
                            show: true,
                            isTopMenu: false,
                            name: '题目上传',
                            path: '/testBank/topicUpload',
                            query: {},
                        },
                        {
                            code: '0-2',
                            show: true,
                            isTopMenu: false,
                            name: '我的草稿',
                            path: '/testBank/myDraft',
                            query: {},
                        },
                        {
                            code: '0-3',
                            show: true,
                            isTopMenu: false,
                            name: '我的题目',
                            path: '/testBank/myTopic',
                            query: {},
                        },
                        {
                            code: '0-4',
                            show: true,
                            isTopMenu: false,
                            name: '题目修改',
                            path: '/testBank/topicModify',
                            query: {},
                        },
                        {
                            code: '0-5',
                            show: false,
                            isTopMenu: false,
                            name: '题目检测',
                            path: '/testBank/topicDetect',
                            query: {},
                        },
                        {
                            code: '0-6',
                            show: false,
                            isTopMenu: false,
                            name: '题目编辑',
                            path: '/testBank/topicEdit',
                            query: {},
                        },
                    ],
                },
                {
                    code: '1',
                    show: true,
                    name: '试卷库管理',
                    child: [
                        {
                            code: '1-1',
                            show: true,
                            isTopMenu: false,
                            name: '试卷草稿箱',
                            path: '/paperManage/examDraft',
                            query: {},
                        },
                        {
                            code: '1-2',
                            show: true,
                            isTopMenu: false,
                            name: '待审核试卷库',
                            path: '/paperManage/unauditedExam',
                            query: {},
                        },
                        {
                            code: '1-3',
                            show: true,
                            isTopMenu: false,
                            name: '全部试卷',
                            path: '/paperManage/allExam',
                            query: {},
                        },
                        {
                            code: '1-4',
                            show: false,
                            isTopMenu: false,
                            name: '导入试卷',
                            path: '/paperManage/importTest',
                            query: {},
                        },
                        {
                            code: '1-5',
                            show: true,
                            isTopMenu: false,
                            name: '试卷编辑',
                            path: '/paperManage/editTest',
                            query: {},
                        },
                        {
                            code: '1-6',
                            show: true,
                            isTopMenu: false,
                            name: '试卷预览',
                            path: '/paperManage/previewTest',
                            query: {},
                        },
                    ]

                }
            ]
        }
    }
}

export default new Api();