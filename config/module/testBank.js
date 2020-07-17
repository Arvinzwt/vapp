import base from '../base';
import da from "element-ui/src/locale/lang/da";

class Api extends base {
    // 根据参数码和状态查询对应科目,学科,类别,年份,来源等
    getParameterInfoByCode(data) {
        return this.post('/parameter/getParameterInfoByCodeAndStatus', data).then(res => {
            return res || [];
        }).catch(err => {
        })
    }

    //通过学科版本获取所有的年级
    getKnowledgeGrades(data) {
        return this.post('/parameter/getKnowledgeGrades', data).then(res => {
            return res || [];
        }).catch(err => {
        })
    }

    //知识树查询接口
    getKnowledgesByParams(data) {
        return this.post('/knowledge/getKnowledgesByParams', data).then(res => {
            return res || [];
        }).catch(err => {
        })
    }

    // 根据学科学段获取所有的地区
    getKnowledgeAreas(data) {
        return this.post('/parameter/getKnowledgeAreas', data).then(res => {
            return res || [];
        }).catch(err => {
        })
    }

    // 题目上传解析返回解析数据
    fileCheckAnalyse(data, config) {
        return this.post('/testpaper/fileAnalysis', data, config)
    }

    // 单个题目提交入库
    insertOne(data) {
        return this.post('/question/insertOne', data)
    }

    // 根据学科、学段查询题型
    getQuestionType(data) {
        return this.get('/parameter/getQuestionType', data).then(res => {
            return res ? res.map(item => {
                return {
                    ...item,
                    parameterId: item.typeId,
                    parameterValue: item.typeName,
                }
            }) : [];
        }).catch(err => {

        })
    }

    // 根据题型查询模板(题目属性)
    getItemByTypeId(data) {
        return this.get('/parameter/getItemByTypeId', data)
    }

    // 批量导入题目
    bulkImport(data) {
        return this.post('/question/bulkImport', data)
    }

    // 我的草稿，我的题目、全部题目列表
    searchByPageNo(data) {
        return this.post('/question/searchByPageNo', data)
    }

    // 根据id查询草稿题目详情
    detailByQuestionId(data) {
        return this.post('/question/searchByPageNo', data)
    }

    // 批量发布题目
    publishBatchByQuestionIds(data) {
        return this.post('/question/draft/publishBatchByQuestionIds', data)
    }

    // 批量删除草稿
    deleteBatchByIds(data) {
        return this.post('/question/draft/deleteBatchByIds', data)
    }

    // 更换草稿题目题型
    updateQuestionType(data) {
        return this.post('/question/draft/updateQuestionType', data)
    }

    // 获取省市区列表
    getPcd(data) {
        return this.get('/parameter/getPcd', data).then(res => {
            return res ? res.map(item => {
                return {
                    ...item,
                    parameterId: item.areaId,
                    parameterValue: item.areaName,
                }
            }) : [];
        }).catch(err => {

        })
    }

}

export default new Api();