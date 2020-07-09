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
                            name: '文档上传',
                            path: '/testBank/titleUpload',
                            query: {},
                        },
                        {
                            code: '0-2',
                            show: false,
                            isTopMenu: false,
                            name: '题目解析',
                            path: '/testBank/resolveFile',
                            query: {},
                        },
                        {
                            code: '0-3',
                            show: true,
                            isTopMenu: false,
                            name: '我的草稿',
                            path: '/testBank/myDraft',
                            query: {},
                        },
                        {
                            code: '0-4',
                            show: true,
                            isTopMenu: false,
                            name: '我的题目',
                            path: '/testBank/myTopic',
                            query: {},
                        },

                        {
                            code: '0-6',
                            show: true,
                            isTopMenu: false,
                            name: '题目修改',
                            path: '/testBank/titleEdit',
                            query: {},
                        },
                        {
                            code: '0-7',
                            show: true,
                            isTopMenu: false,
                            name: '模糊搜索',
                            path: '/testBank/titleSearch',
                            query: {},
                        },
                        {
                            code: '0-8',
                            show: false,
                            isTopMenu: false,
                            name: '题目编辑',
                            path: '/testBank/draftEdit',
                            query: {},
                        }
                    ]

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
                            path: '/paperManage/ExamDraft',
                            query: {},
                        },
                        {
                            code: '1-2',
                            show: true,
                            isTopMenu: false,
                            name: '待审核试卷库',
                            path: '/paperManage/UnauditExam',
                            query: {},
                        },
                        {
                            code: '1-3',
                            show: true,
                            isTopMenu: false,
                            name: '全部试卷',
                            path: '/paperManage/AllExam',
                            query: {},
                        }, {
                            code: '1-4',
                            show: false,
                            isTopMenu: false,
                            name: '导入试卷',
                            path: '/paperManage/ImportTest',
                            query: {},
                        }, {
                            code: '1-5',
                            show: false,
                            isTopMenu: false,
                            name: '试卷编辑',
                            path: '/paperManage/EditTest',
                            query: {},
                        }, {
                            code: '1-6',
                            show: false,
                            isTopMenu: false,
                            name: '试卷预览',
                            path: '/paperManage/PreviewTest',
                            query: {},
                        }, {
                            code: '1-7',
                            show: false,
                            isTopMenu: false,
                            name: '题目编辑',
                            path: '/paperManage/EditTopic',
                            query: {},
                        }
                    ]

                }
            ]
        }
    }

    //根据参数码和状态查询对应科目,学科,类别,年份,来源
    getParameterInfo(data) {

        let parameterValue = '';
        switch (data.paramCode) {
            case "Subject":
                parameterValue = '学科';
                break;
            case "Phase":
                parameterValue = '学段';
                break;
            case "Version":
                parameterValue = '版本';
                break;
            case 'Term':
                parameterValue = '学期';
                break;
            case "Area":
                parameterValue = '地区';
                break;
            case "Grade":
                parameterValue = '年级'
        }

        return [
            {
                "parameterId": 1,
                "parameterName": "",
                "parameterValue": `${parameterValue}1`,
                "parameterCode": data.paramCode,
                "parameterStatus": 1
            },
            {
                "parameterId": 2,
                "parameterName": "",
                "parameterValue": `${parameterValue}2`,
                "parameterCode": data.paramCode,
                "parameterStatus": 1
            }
        ]
    }


    loadTrees(data) {
        return [
            {
                "knowledgeId": 1,
                "knowledgeUuid": "a5e1cceb-40f5-46a7-bab4-b9c2df6001ab",
                "parentId": 0,
                "name": "世界地理概况",
                "remark": null,
                child: [
                    {
                        "knowledgeId": 3,
                        "knowledgeUuid": "a5e1cceb-40f5-46a7-bab4-b9c2df6001ab",
                        "parentId": 0,
                        "name": "世界地理概况2",
                        "remark": null,
                    }
                ]
            },
            {
                "knowledgeId": 2,
                "knowledgeUuid": "87c180c2-c5f4-4c62-978a-4455c38e206b",
                "parentId": 1,
                "name": "人口",
                "remark": null
            },
        ]
    }
}

export default new Api();