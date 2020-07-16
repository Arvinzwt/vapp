import base from '../base'

class PaperApi extends base {
  /**
   * 正式试卷列表查询(全部试卷)
   * @param {*} params
   */
  getPaperList (params) {
    return this.get('/testpaper/list', params)
  }
  /**
   * 待审核试卷列表查询
   * @param {*} params
   */
  getReviewedPaperList (params) {
    return this.get('/testpaper/draft/list', params)
  }
  /**
   * 草稿列表查询
   * @param {*} params
   */
  getDraftPaperList (params) {
    return this.get('/testpaper/draft/list/my', params)
  }
  /**
   * 草稿删除
   * @param {*} params
   */
  deleteDraft (params) {
    return this.post('/testpaper/draft/delete', params)
  }
  /**
   * 试卷分析
   * @param {*} params
   */
  paperAnalyse (params) {
    return this.get('/testpaper/testpaperAnalyse', params)
  }
  /**
   * 根据code获取所有有效的试卷学科、学段、年级、学期、试卷类型、年份
   * @param {*} params
   */
  queryOptions (params) {
    return this.get('/testpaper/parameter/getByCode', params)
  }

  /**
   * 省市区列表查询
   * @param {*} params
   */
  queryLocation (params) {
    return this.get('/parameter/getPcd', params)
  }
  /**
   * 根据省市区查询学校
   * @param {*} params
   */
  querySchool (params) {
    return this.get('/testpaper/parameter/getSchoolByPcd', params)
  }
  /**
   * 保存基础设置（保存试卷信息）
   * @param {*} params
   */
  saveBasic (params) {
    return this.post('/testpaper/saveBasicSetting', params)
  }
  /**
   * 试卷分析
   * @param {*} params
   */
  testpaperAnalyse (params) {
    return this.get('/testpaper/testpaperAnalyse', params)
  }
  /**
   * 正式试卷启用/禁用
   * @param {*} params
   */
  testpaperStatus (params) {
    return this.post('/testpaper/status', params)
  }
  /**
   * 待审核试卷审核通过
   * @param {*} params
   */
  passExamine (params) {
    return this.post('/testpaper/draft/audit', params)
  }
  /**
   * 下载试卷
   * @param {*} params
   */
  downLoadPaper (params) {
    return this.get('/testpaper/downloadTestpaper', params)
  }
  /**
   * 根据试卷Id获取试卷题目内容
   * @param {*} params
   */
  getPaperQuestion (params) {
    return this.get('/testpaper/getTestpaperAndQuestionByPaperId', params)
  }
  /**
   * 试卷导入解析，返回解析数据
   * @param {*} params
   */
  paperFileAnalysis (params) {
    return this.post('/testpaper/fileAnalysis', params)
  }
  /**
   * 提交试卷和题目入库
   * @param {*} params
   */
  importTestpaper (params) {
    return this.post('/testpaper/importTestpaper', params)
  }
}

export default new PaperApi()
