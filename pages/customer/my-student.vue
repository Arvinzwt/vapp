<template>
    <!--我的学员-->
    <el-main class="jr-customer-my-student">
        <!--标题-->
        <h3 class="jr-title">我的学员</h3>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
            <el-row :gutter="15">
                <!--标签-->
                <el-col :span="6">
                    <el-form-item label="标签">
                        <selected-tag-template v-model="paramMap.tags"/>
                    </el-form-item>
                </el-col>
                <!--跟进状态-->
                <el-col :span="6">
                    <el-form-item label="跟进状态">
                        <el-select v-model="paramMap.last_trace_status" multiple collapse-tags placeholder="请选择"
                                   clearable>
                            <el-option
                                    v-for="item in dic.trackResult"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--最新跟进时间-->
                <el-col :span="6">
                    <el-form-item label="最新跟进时间">
                        <el-date-picker
                                v-model="paramMap.last_trace_time"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']"
                                :picker-options="$utils.pickerOptions"
                                clearable>
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <!--姓名，手机号-->
                <el-col :span="6">
                    <el-form-item label="姓名、手机号">
                        <el-input  v-model="paramMap.keywords" placeholder="请输入姓名，手机号" clearable/>
                    </el-form-item>
                </el-col>
            </el-row>
            <div v-show="paramMap.show">
                <el-row :gutter="15">
                    <!--客户状态-->
                    <el-col :span="6">
                        <el-form-item label="客户状态">
                            <el-select v-model="paramMap.leads_status" multiple collapse-tags placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in dic.leadsstatus"
                                        :key="item.dicCode"
                                        :label="item.name"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--最近负责人-->
                    <el-col :span="6">
                        <el-form-item label="负责人">
                            <selected-role-template v-model="paramMap.last_owner"></selected-role-template>
                        </el-form-item>
                    </el-col>
                    <!--渠道-->
                    <selected-channel-template v-model="paramMap"/>
                </el-row>
                <el-row :gutter="15">
                    <!--下次联系时间-->
                    <el-col :span="6">
                        <el-form-item label="下次联系时间">
                            <el-date-picker
                                    v-model="paramMap.next_trace_time"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickerOptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--年级-->
                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-select v-model="paramMap.grade" multiple collapse-tags placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.grades"
                                        :key="item.dicCode"
                                        :label="item.dicValue"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--科目-->
                    <el-col :span="6">
                        <el-form-item label="科目">
                            <el-select v-model="paramMap.subjects" placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in dic.subject"
                                        :key="item.name"
                                        :label="item.name"
                                        :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--沟通次数-->
                    <el-col :span="6">
                        <el-form-item label="沟通次数">
                            <el-select v-model="paramMap.trace_num" multiple collapse-tags placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in dic.communicate"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <!--之后未跟进-->
                    <el-col :span="6">
                        <el-form-item label="之后未跟进">
                            <el-date-picker
                                    v-model="paramMap.no_trace_time"
                                    type="date"
                                    placeholder="选择日期" clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--获得时间-->
                    <el-col :span="6">
                        <el-form-item label="获得时间">
                            <el-date-picker
                                    v-model="paramMap.gain_time"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickerOptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--意向度-->
                    <el-col :span="6">
                        <el-form-item label="意向度">
                            <el-select v-model="paramMap.intension" multiple collapse-tags placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in dic.intention"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--创建时间-->
                    <el-col :span="6">
                        <el-form-item label="创建时间">
                            <el-date-picker
                                    v-model="paramMap.createdDate"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickerOptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <!--确定按钮-->
            <el-form-item label-width="0" class="text-right">
                <el-button @click="submitSearch" type="primary">查询</el-button>
                <el-button @click="resetSearch">重置</el-button>
                <el-link type="primary" class="ml-4" @click="paramMap.show=!paramMap.show">
                    <span v-show="!paramMap.show">展开</span>
                    <span v-show="paramMap.show">收起</span>
                </el-link>
            </el-form-item>
        </el-form>
        <!--列表-有数据-->
        <div v-if="tableData.length>0">
            <!--列表-->
            <el-table @sort-change="tableSortChange" class="jr-table" ref="filterTable" :data="tableData" size="mini">
                <el-table-column fixed width="50px" type="selection" align="center"/>
                <el-table-column fixed width="95px" label="姓名" prop="name"/>
                <el-table-column fixed width="105px" label="手机号" prop="phone">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="callCustomer(scope.row)">
                            <span class="">{{ $utils.desensitizationPhone(scope.row.phone) }}</span>
                            <span class="el-icon-phone-outline"></span>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="意向度" prop="intension"/>
                <el-table-column label="标签" prop="tags">
                    <template slot-scope="scope">
                        <div class="">
                            <el-tag v-for="item in scope.row.tagList" class="mr-3" :key="item" type="primary"
                                    size="mini">{{ item }}
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="年级" prop="grade" :sortable="false"/>
                <el-table-column label="科目" prop="subjects" :sortable="false"/>
                <el-table-column min-width="95px" label="最新跟进状态" prop="last_trace_status"/>
                <el-table-column min-width="95px" label="线索客户状态" prop="leads_status"/>
                <el-table-column min-width="95px" label="渠道大类" prop="bigclass" :sortable="false"/>
                <el-table-column min-width="95px" label="渠道小类" prop="smallclass" :sortable="false"/>
                <el-table-column min-width="95px" label="最近负责人" prop="last_owner	"/>
                <el-table-column min-width="135px" label="最近跟进时间" prop="last_trace_time"/>
                <el-table-column width="220px" label="最近跟进记录" prop="last_trace_record">
                    <template slot-scope="scope">
                        <el-popover placement="top-start" width="200" trigger="hover"
                                    :content="scope.row.last_trace_record">
                            <template slot="reference">
                                <div class="text-ellipsis w-p200">{{ scope.row.last_trace_record }}</div>
                            </template>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column min-width="95px" label="下次跟进时间" prop="next_trace_time"/>
                <el-table-column label="沟通次数" prop="trace_num"/>
                <el-table-column min-width="95px" label="获取时间" prop="gain_time"/>
                <el-table-column min-width="95px" label="创建人" prop="creator"/>
                <el-table-column width="190px" fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="customerFollow(scope.row)">跟进</el-link>
                        <el-link type="primary" @click="customerDetail(scope.row)">详情</el-link>
                        <el-link type="primary" @click="customerAudition(scope.row)">试听</el-link>
                        <el-link type="primary" @click="customerReserve(scope.row)">预约</el-link>
                        <el-link type="primary" @click="customerUpload(scope.row)">上传报告</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页信息-->
            <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
        </div>
        <!--列表-没有数据-->
        <div class="jr-table-placeholder" v-if="tableData.length===0">
            <img src="/images/placeholder.png" alt="placeholder">
            <span>暂无数据</span>
        </div>
        <!--弹窗-->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" :append-to-body="true"
                   :title="dialog.title" custom-class="jr-dialog" width="600px">
            <!--弹窗内容-->
            <div class="dialog-body">
                <el-form class="jr-form" size="mini" :model="dialog.form" label-position="left" :rules="dialog.rules"
                         label-width="90px" ref="ruleForm">
                    <!--放弃-->
                    <div v-if="dialog.type===1">
                        <el-form-item label="放弃愿意" prop="reason1">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="dialog.form.reason1"/>
                        </el-form-item>
                    </div>
                    <!--删除-->
                    <div v-if="dialog.type===2">
                        <el-form-item label="删除原因" prop="reason2">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="dialog.form.reason2"/>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <!--弹窗尾部-->
            <div slot="footer" class="dialog-footer">
                <span v-if="dialog.type===1||dialog.type===2" class="el-icon-warning text-color-warning"></span>
                <span v-if="dialog.type===1" class="mr-4 text-color-warning">放弃后线索客户将进入公海</span>
                <span v-if="dialog.type===2" class="mr-4 text-color-warning">删除后线索客户将进入死海</span>
                <el-button size="mini" @click="closeDialog">取 消</el-button>
                <el-button size="mini" @click="submitDialog" type="primary">提 交</el-button>
            </div>
        </el-dialog>

        <upload-report-template :leadsid="dialog.form.leadsid" ref="uploadReportRef"
                                @submit="submitUploadReport"></upload-report-template>
    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedTagTemplate from "@/components/customer/SelectedTag";
import SelectedChannelTemplate from "@/components/customer/SelectedChannel";
import UploadReportTemplate from "@/components/customer/UploadReport";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedTagTemplate,
        SelectedChannelTemplate,
        UploadReportTemplate
    },
    data() {
        return {
            // 筛选参数信息
            paramMap: {
                show: false,//是否显示筛选
                // order: "",//排序方式
                // orderfield: "",//排序字段

                keywords: "",//手机号或姓名
                grade: [],//年级
                subjects: "",//学科
                bigChannelId: '',//渠道大类
                smallChannelId: '',//渠道小类
                createdDate: [],//创建时间
                // deptid: [],//学习中心(deptid)
                leads_status: [],//客户状态(code)
                intension: [],//意向度
                isvalid: [],//是否有效
                last_trace_status: [],//最近跟进状态
                last_trace_time: [],//最近跟进时间
                next_trace_time: [],//下次跟进时间
                no_trace_time: 0,//之后未跟进
                gain_time: [],//获取时间
                // giveup_time: [],//放弃时间
                trace_num: [],//跟进次数
                last_owner: '',//最近一次负责人
                tags: [],//标签

                // area_code: "",//海域
                // if_trace: [],//是否已跟踪（为空时查全部，0：未跟踪，1：已跟踪） //
                // deadsea_time: [],//进入死海时间
                // appoint_time: [],//预约沟通时间

                role: [],//选择的角色
            },

            // 列表数据
            tableData: [],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },

            // 弹窗
            dialog: {
                show: false,
                type: null,//1放弃，2删除
                title: '',
                form: {
                    reason1: '',//放弃
                    reason2: '',//删除
                    leadsid: '',
                },
                rules: {
                    reason1: {required: true, message: '请输入放弃原因', trigger: 'blur'},
                    reason2: {required: true, message: '请输入删除原因', trigger: 'blur'},
                }
            }
        }
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        }
    },
    mounted() {
        this.refreshPage();
    },
    methods: {
        /**
         *@desc 刷新页面
         */
        refreshPage() {
            let {pagesInfo, paramMap, $utils} = this;

            return this.$api.customer.mystudent({
                area_code: '2',
                pageindex: pagesInfo.pageIndex,
                pagesize: pagesInfo.pageSize,
                // order: paramMap.order,
                // orderfield: paramMap.orderfield,
                keywords: paramMap.keywords,
                grade: paramMap.grade.join(','),
                subjects: paramMap.subjects,
                bigclass: paramMap.bigChannelId,//渠道大类
                smallclass: paramMap.smallChannelId,
                created_start: $utils.convertTime(paramMap.createdDate, 0),
                created_end: $utils.convertTime(paramMap.createdDate, 1),
                // deptid: $utils.underscore.last(paramMap.deptid) || '',
                leads_status: paramMap.leads_status.join(','),
                intension: paramMap.intension.join(','),
                isvalid: paramMap.isvalid.join(','),
                last_trace_status: paramMap.last_trace_status.join(','),
                last_trace_time_start: $utils.convertTime(paramMap.last_trace_time, 0),
                last_trace_time_end: $utils.convertTime(paramMap.last_trace_time, 1),
                next_trace_time_start: $utils.convertTime(paramMap.next_trace_time, 0),
                next_trace_time_end: $utils.convertTime(paramMap.next_trace_time, 1),
                no_trace_time: $utils.convertTime(paramMap.no_trace_time, 2),
                gain_time_start: $utils.convertTime(paramMap.gain_time, 0),
                gain_time_end: $utils.convertTime(paramMap.gain_time, 1),
                // giveup_time_start: $utils.convertTime(paramMap.giveup_time, 0),
                // giveup_time_end: $utils.convertTime(paramMap.giveup_time, 1),
                trace_num: paramMap.trace_num.join(','),
                last_owner: paramMap.last_owner,
                tags: paramMap.tags.join(','),

                // deadsea_time_start: $utils.convertTime(paramMap.deadsea_time, 0),
                // deadsea_time_end: $utils.convertTime(paramMap.deadsea_time, 1),
                // appoint_time_start: $utils.convertTime(paramMap.appoint_time, 0),
                // appoint_time_end: $utils.convertTime(paramMap.appoint_time, 1),
                // if_trace: paramMap.if_trace.join(','),
            }).then(({request = {}, total = 0, list = []} = {}) => {
                Object.assign(this.pagesInfo, {
                    pageIndex: request.pageindex || 1,
                    pageSize: request.pagesize || 20,
                    count: total || 0,//总条数
                })
                this.tableData = list;
            }).catch(err => {
            })
        },

        /**
         *@desc 切换tab时
         */
        tabsClick(tab) {
            this.refreshPage();
        },

        /**
         *@desc 分页触发时
         */
        onPagesChange() {
            this.refreshPage();
        },

        /**
         *@desc 提交筛选时
         */
        submitSearch() {
            this.pagesInfo.pageIndex = 1;//重置分页数据
            this.refreshPage();
        },

        /**
         *@desc 重置筛选时
         */
        resetSearch() {
            this.pagesInfo.pageIndex = 1;//重置分页数据
            this.$utils.resetJson(this.paramMap, ['show', "order", "orderfield", "role"]);//重置筛选数据
            this.refreshPage();
        },

        /**
         *@desc 试听
         */
        customerAudition() {
            this.$message.success('跳到upc')
        },

        /**
         *@desc 签约
         */
        customerReserve() {
            this.$message.success('跳到upc')
        },

        /**
         *@desc 上传报告-打开弹窗
         */
        async customerUpload(obj) {
            this.dialog.form.leadsid = obj.leadsid;
            this.$nextTick(() => {
                this.$refs['uploadReportRef'].openDialog();
            })
        },

        /**
         *@desc 上传报告-提交弹窗
         */
        submitUploadReport(param) {
            console.log(param,11)
            this.$message.success('上传成功');
            this.refreshPage();
        },

        /**
         *@desc 跟进
         */
        customerFollow(obj) {
            this.$router.push({
                path: '/customer/customer-follow',
                query: {id: obj.leadsid}
            })
        },

        /**
         *@desc 呼叫用户
         */
        callCustomer(obj) {
            this.$api.customer.callCustomer().then(res => {
                this.$message.success('呼叫用户')
                this.$router.push({
                    path: '/customer/customer-follow',
                    query: {id: obj.leadsid}
                })
            })
        },

        /**
         *@desc 用户详情
         */
        customerDetail(obj) {
            this.$router.push({
                path: '/customer/customer-detail',
                query: {id: obj.leadsid}
            })
        },

        /**
         *@desc table触发排序时
         */
        tableSortChange(val) {
            let target;
            switch (val.order) {
                case "descending":
                    target = {
                        order: 1,//排序
                        orderfield: val.prop,//排序对象
                    }
                    break;
                case "ascending":
                    target = {
                        order: 0,//排序
                        orderfield: val.prop,//排序对象
                    }
                    break;
                default:
                    target = {
                        order: "",//排序
                        orderfield: "",//排序对象
                    }
                    break;
            }
            Object.assign(this.paramMap, target);
            this.refreshPage();
        },

        /**
         *@desc 判定当前是否选择了leads
         */
        _canBatch() {
            let ids = this.$refs['filterTable'].selection;
            if (ids.length > 0) {
                return true;
            } else {
                this.$message.error("请至少选择一条leads")
                return false;
            }
        },

        /**
         *@desc 分配-打开弹窗
         */
        openAssignCustomer() {
            if (this.$refs['selectedRoleRef'] && this._canBatch()) {
                this.$refs['selectedRoleRef'].openDialog();
            }
        },

        /**
         *@desc 分配-提交
         */
        submitAssignCustomer() {
            let studentids = (this.$refs['filterTable'].selection).map(item => {
                return item.leadsid
            })
            this.$api.customer.assignCustomer({
                studentids,
                salesid: obj.id,
                salename: obj.name
            }).then(res => {
                this.$message.success('分配成功')
                this.refreshPage();
            })
        },

        /**
         *@desc 放弃
         */
        quitCustomer() {
            if (this._canBatch()) {
                this.dialog.type = 1;
                this.dialog.title = '放弃线索客户';
                this.dialog.show = true;
            }
        },

        /**
         *@desc 删除
         */
        deleteCustomer() {
            if (this._canBatch()) {
                this.dialog.show = true;
                this.dialog.type = 2;
                this.dialog.title = '删除线索客户';
                this.dialog.show = true;
            }
        },

        /**
         *@desc 放弃/删除-关闭弹窗
         */
        closeDialog() {
            this.dialog.show = false;
        },

        /**
         *@desc 放弃/删除-提交
         */
        submitDialog() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {//如果验证通过
                    if (this.dialog.type === 1) {
                        this.$message.success('放弃成功')
                    } else if (this.dialog.type === 2) {
                        this.$message.success('删除成功')
                    }
                    this.refreshPage();
                    this.closeDialog();
                } else {
                    return false;
                }
            })
        },
    }
}
</script>

<style lang="scss">

</style>