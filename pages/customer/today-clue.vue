<template>
    <!--今日新线索-->
    <el-main class="jr-page jr-customer-today-clue">
        <!--tab切换-->
        <div class="jr-page-header">
            <el-tabs v-model="paramMap.tab" @tab-click="tabsClick">
                <el-tab-pane v-for="item in tabs" :key="item.id" :name="item.id" :path="item.path">
                    <div slot="label">
                        <span>{{ item.name }}</span>
                        <i v-if="item.id==='0'&&confirmedNum>0"
                           class="jr-badge">{{ confirmedNum }}</i>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--滚动内容-->
        <div class="jr-page-body">
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
                            <el-input :maxlength='50' v-model="paramMap.keywords" placeholder="请输入姓名，手机号" clearable/>
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
                                            :label="item.name"
                                            :value="item.dicCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!--科目-->
                        <el-col :span="6">
                            <el-form-item label="科目">
                                <el-select v-model="paramMap.subject" multiple collapse-tags placeholder="请选择" clearable>
                                    <el-option
                                            v-for="item in dic.subject"
                                            :key="item.dicCode"
                                            :label="item.name"
                                            :value="item.dicCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <!--沟通次数-->
                        <el-col :span="6">
                            <el-form-item label="沟通次数">
                                <el-select v-model="paramMap.trace_num" multiple collapse-tags placeholder="请选择" clearable>
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
                                <el-select v-model="paramMap.intension" multiple collapse-tags placeholder="请选择" clearable>
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
            <!--列表-->
            <div class="jr-table-placeholder" v-if="tableData.length===0">
                <img src="/images/placeholder.png" alt="placeholder">
                <span>暂无数据</span>
            </div>

            <el-table v-if="tableData.length>0" @sort-change="tableSortChange" class="jr-table" ref="filterTable" :data="tableData" size="mini">
                <el-table-column fixed width="50px" type="selection" align="center"/>
                <el-table-column fixed width="95px" label="姓名" prop="name"/>
                <el-table-column fixed width="95px" label="手机号" prop="phone">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="callCustomer(scope.row)">
                            <span class="">{{ $utils.desensitizationPhone(scope.row.phone) }}</span>
                            <span class="el-icon-phone-outline"></span>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="意向度" prop="intension"/>
                <el-table-column label="标签" prop="tags"/>
                <el-table-column label="年级" prop="grade" sortable="custom"/>
                <el-table-column label="科目" prop="subjects" sortable="custom"/>
                <el-table-column min-width="95px" label="最新跟进状态" prop="last_trace_status"/>
                <el-table-column min-width="95px" label="线索客户状态" prop="leads_status"/>
                <el-table-column min-width="95px" label="渠道大类" prop="bigclass" sortable="custom"/>
                <el-table-column min-width="95px" label="渠道小类" prop="smallclass" sortable="custom"/>
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
                <el-table-column min-width="95px" label="创建人" prop="creator"/>
                <el-table-column min-width="95px" label="获取时间" prop="gain_time"/>
                <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="customerFollow(scope.row)">跟进</el-link>
                        <el-link type="primary" @click="customerDetail(scope.row)">详情</el-link>
                        <el-link type="primary" @click="customerAudition(scope.row)">试听</el-link>
                        <el-link type="primary" @click="customerReserve(scope.row)">预约</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页信息-->
            <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
        </div>

    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedTagTemplate from "@/components/customer/SelectedTag";
import SelectedChannelTemplate from "@/components/customer/SelectedChannel";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedTagTemplate,
        SelectedChannelTemplate
    },
    data() {
        return {
            confirmedNum:0,

            // tab切换信息
            tabs: [
                {id: '0', name: '未跟进', num: 6},
                {id: '1', name: '已跟进'},
                {id: '2', name: '全部'},
            ],

            // 筛选参数信息
            paramMap: {
                show: false,//是否显示筛选
                order: "",//排序方式
                orderfield: "",//排序字段
                tab:'0',
                bigChannelId: '',//渠道大类
                smallChannelId: '',//渠道小类
                keywords: "",//手机号或姓名
                leads_status: [],//客户状态(code)
                grade: [],//年级
                subject: "",//学科
                intension: [],//意向度
                createdDate: [],//创建时间
                last_trace_status: [],//最近跟进状态
                last_trace_time: [],//最近跟进时间
                next_trace_time: [],//下次跟进时间
                no_trace_time: 0,//之后未跟进
                gain_time: [],//获取时间
                trace_num: [],//跟进次数
                last_owner: '',//最近一次负责人
                tags: [],//标签
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

            return this.$api.customer.todayleads({
                pageindex: pagesInfo.pageIndex,
                pagesize: pagesInfo.pageSize,
                order: paramMap.order,
                orderfield: paramMap.orderfield,
                keywords: paramMap.keywords,
                grade: paramMap.grade.join(','),
                subjects: paramMap.subjects,
                bigclass: paramMap.bigChannelId,//渠道大类
                smallclass: paramMap.smallChannelId,
                created_start: $utils.convertTime(paramMap.createdDate, 0),
                created_end: $utils.convertTime(paramMap.createdDate, 1),
                deptid: $utils.underscore.last(paramMap.deptid) || '',
                leads_status: paramMap.leads_status.join(','),
                intension: paramMap.intension.join(','),
                last_trace_status: paramMap.last_trace_status.join(','),
                last_trace_time_start: $utils.convertTime(paramMap.last_trace_time, 0),
                last_trace_time_end: $utils.convertTime(paramMap.last_trace_time, 1),
                next_trace_time_start: $utils.convertTime(paramMap.createdDate, 0),
                next_trace_time_end: $utils.convertTime(paramMap.next_trace_time, 0),
                no_trace_time: $utils.convertTime(paramMap.no_trace_time, 2),
                gain_time_start: $utils.convertTime(paramMap.gain_time, 0),
                gain_time_end: $utils.convertTime(paramMap.gain_time, 1),
                giveup_time_start: $utils.convertTime(paramMap.giveup_time, 0),
                giveup_time_end: $utils.convertTime(paramMap.giveup_time, 1),
                deadsea_time_start: $utils.convertTime(paramMap.deadsea_time, 0),
                deadsea_time_end: $utils.convertTime(paramMap.deadsea_time, 1),
                appoint_time_start: $utils.convertTime(paramMap.appoint_time, 0),
                appoint_time_end: $utils.convertTime(paramMap.appoint_time, 1),
                trace_num: paramMap.trace_num.join(','),
                last_owner: paramMap.last_owner,
                if_trace: paramMap.tab,
                tags: paramMap.tags.join(',')
            }).then(({request = {}, total = 0, list = []} = {}) => {
                Object.assign(this.pagesInfo, {
                    pageIndex: request.pageindex || 1,
                    pageSize: request.pagesize || 20,
                    count: total || 0,//总条数
                })
                this.tableData = list;

                if (paramMap.ifok === '3') {//如果是待确认数据刷新，更新总数
                    this.confirmedNum = total;
                }
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
         *@desc 分配用户-打开选择负责人弹窗
         */
        openAssignCustomerDialog() {
            let ids = this.$refs['filterTable'].selection;
            if (ids.length > 0) {
                if (this.$refs['selectedRole']) {
                    this.$refs['selectedRole'].openDialog();
                }
            } else {
                this.$message.error("请至少选择一条leads")
            }
        },

        /**
         *@desc 分配用户-确定分配时
         */
        submitAssignCustomer() {
            this.$api.customer.assignCustomer({
                customerId: this.$refs['filterTable'].selection,
                roleId: this.paramMap.role,
            }).then(res => {
                this.$message.success('分配成功')
                this.refreshPage();
            })
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
         *@desc 跟进
         */
        customerFollow(obj) {
            this.$router.push({
                path: '/customer/customer-follow',
                query: obj.leadsid
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
                    query: obj.leadsid
                })
            })
        },

        /**
         *@desc 用户详情
         */
        customerDetail(obj) {
            this.$router.push({
                path: '/customer/customer-detail',
                query: obj.leadsid
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
                        order: "desc",//排序
                        orderfield: val.prop,//排序对象
                    }
                    break;
                case "ascending":
                    target = {
                        order: "asce",//排序
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
        }
    }
}
</script>

<style lang="scss">
.jr-customer-today-clue {

}
</style>