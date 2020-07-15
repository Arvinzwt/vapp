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
   * 草稿列表查询
   * @param {*} params
   */
  queryDraft (params) {
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
   * 单选查询
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

  saveBasic (params) {
    return this.post('/testpaper/saveBasicSetting', params)
  }
}

export default new PaperApi()
