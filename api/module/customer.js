/**
 * @description: 线索客户接口
 */
import Request from "../request";

export default class Customer extends Request {
    constructor(context) {
        super(context);
    }

    // leads查询
    async leadsSearch(data, options) {
        return this.post('/gxh-leads/v1/Leads/search', data, options)
    }

    // 分配负责人
    async assignCustomer(data, options) {
        return true
    }

    // 呼叫负责人
    async callCustomer(data, options) {
        return true
    }

    // 今日新线索
    async todayleads(data, options) {
        return this.post('/gxh-leads/v1/Leads/todayleads', data, options)
    }

    // 今日预约沟通
    async appointleads(data, options) {
        return this.post('/gxh-leads/v1/Leads/appointleads', data, options)
    }

    // 我的学员
    async mystudent(data, options) {
        return this.post('/gxh-leads/v1/Leads/mystudent', data, options)
    }

    // leads详情
    async detail(data, options) {
        return this.get('/gxh-leads/v1/Leads/detail', data, options)
    }

    // leads呼叫中心查询
    async search(data, options) {
        return this.post('/gxh-leads/v1/LeadsCallCenter/search', data, options)
    }

    // leads呼叫中心详情
    async leadsCallCenterDetail(data, options) {
        return this.get('/gxh-leads/v1/LeadsCallCenter/detail', data, options)
    }

    // leads呼叫中心确认
    async comfirm(data, options) {
        return this.post('/gxh-leads/v1/LeadsCallCenter/comfirm',data,options)
    }

    // 新增-更新追踪信息
    async addUpdateTrack(data, options) {
        return this.post('/gxh-leads/v1/LeadsTracks/AddUpdateTrack', data, options)
    }

    // 根据学员id获取学院所有的追踪记录
    async getTrackListByStudentid(data, options) {
        return this.post('/gxh-leads/v1/LeadsTracks/GetTrackListByStudentid', data, options)
    }

    // 根据学员id获取此学员的所有追踪记录分页
    async getTrackListByPagerStudentid(data, options) {
        return this.post('/gxh-leads/v1/LeadsTracks/GetTrackListByPagerStudentid', data, options)
    }

    // 根据leadsid获取负责人变更记录
    async getOwnerRecordByStudentid(data, options) {
        return this.post('/gxh-leads/v1/LeadsTracks/GetOwnerRecordByStudentid', data, options)
    }

    // 根据leadsid获取录负责人变更记录分页
    async getOwnerRecordPagerByStudentid(data, options) {
        return this.post('/gxh-leads/v1/LeadsTracks/GetOwnerRecordPagerByStudentid', data, options)
    }

    // 推荐客户查询
    async recommendSearch(data, options) {
        return this.post('/gxh-leads/v1/PreLeads/reccustomer/search', data, options)
    }

    // 查询推荐客户明星
    async recommendDetail(data, options) {
        return this.get('/gxh-leads/v1/PreLeads/reccustomer/detail', data, options)
    }

    // 新增更新推荐明细
    async reccustomer(data, options) {
        return this.post('/gxh-leads/v1/PreLeads/reccustomer', data, options)
    }

    // 审核
    async audit(data, options) {
        return this.post('/v1/PreLeads/reccustomer/audit', data, options)
    }

    // 获取标签列表
    async getTags(data, options) {
        return this.post('/gxh-leads/v1/Tag/GetTags', data, options)
    }

    // 新增标签
    async newTag(data, options) {
        return this.post('/gxh-leads/v1/Tag/NewTag', data, options)
    }

    // 修改标签
    async updateTagInfo(data, options) {
        return this.post('/gxh-leads/v1/Tag/UpdateTagInfo', data, options)
    }

    // 删除已注册标签
    async deleteRegisteredTag(data, options) {
        return this.post('/gxh-leads/v1/Tag/DeleteRegisteredTag', data, options)
    }

    // 绑定标签
    async bindingTag(data, options) {
        return this.post('/gxh-leads/v1/Tag/BindingTag', data, options)
    }

    // 取消绑定
    async untyingTag(data, options) {
        return this.post('/gxh-leads/v1/Tag/UntyingTag', data, options)
    }

    // 数据绑定标签变更
    async tagChange(data, options) {
        return this.post('/gxh-leads/v1/Tag/TagChange', data, options)
    }

    // cc约访预约上门
    async getCallCCCenterList(data, options) {
        return this.post('/gxh-leads/v1/Visit/GetCallCCCenterList', data, options)
    }

    // cc约访预约上门-确认上门
    async confirm(data, options) {
        return this.post('/gxh-leads/v1/Visit/confirm', data, options)
    }

    // 线索客户管理-上传报告
    async uploadReport(data, options) {
        return this.post('/gxh-leads/v1/Visit/UploadReport', data, options)
    }
}