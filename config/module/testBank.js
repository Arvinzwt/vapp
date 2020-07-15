import base from '../base';

class Api extends base {
    async getParameterInfo(data) {
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
                parameterValue = '年级';
                break;

            case "Knowledge":
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

    // 根据参数码和状态查询对应科目,学科,类别,年份,来源等
    getParameterInfoByCode(data) {
        return this.post('/parameter/getParameterInfoByCodeAndStatus', data).catch(err=>{})
    }

    //通过学科版本获取所有的年级
    getKnowledgeGrades(data) {
        return this.post('/parameter/getKnowledgeGrades', data).catch(err=>{})
    }

    //知识树查询接口
    getKnowledgesByParams(data) {
        return this.post('/knowledge/getKnowledgesByParams', data).catch(err=>{})
    }

    // 根据学科学段获取所有的地区
    getKnowledgeAreas(data) {
        return this.post('/parameter/getKnowledgeAreas', data).catch(err=>{})
    }

    // 题目上传解析返回解析数据
    fileCheckAnalyse(data, config) {
        return this.post('/testpaper/fileAnalysis', data, config)
    }

    // 单个题目提交入库
    insertOne(data){
        return this.post('/question/insertOne', data)
    }

    // 根据学科、学段查询题型
    getQuestionType(data){
        return this.get('/parameter/getQuestionType', data)
    }

    // 根据题型查询模板(题目属性)
    getItemByTypeId(data){
        return this.get('/parameter/getItemByTypeId', data)
    }

    // 批量导入题目
    bulkImport(data){
        return this.post('/question/bulkImport', data)
    }

    // 我的草稿，我的题目、全部题目列表
    searchByPageNo(data){
        return this.post('/question/searchByPageNo', data)
    }
}

export default new Api();