<template>
    <!--线索客户管理-新海-->
    <div class="jr-customer-customer-manage-first">
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px"
                 label-position="left">
            <el-row :gutter="15">
                <!--渠道-->
                <selected-channel-template v-model="paramMap"/>
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
            </el-row>
            <el-row :gutter="15">
                <!--姓名，手机号-->
                <el-col :span="6">
                    <el-form-item label="姓名、手机号" v-show="paramMap.show">
                        <el-input v-model="paramMap.keywords" placeholder="可搜索姓名、手机" clearable/>
                    </el-form-item>
                </el-col>
                <!--科目-->
                <el-col :span="6">
                    <el-form-item label="科目" v-show="paramMap.show">
                        <el-select v-model="paramMap.subjects" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in dic.subject"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--学习中心-->
                <el-col :span="6">
                    <el-form-item label="学习中心" v-show="paramMap.show">
                        <el-cascader
                                v-model="paramMap.deptid"
                                :options="dic.hrcodedepts"
                                :props="$utils.leaningCenterProps"
                                :show-all-levels="false"
                                collapse-tags
                                placeholder="请选择"
                                filterable
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <!--确定按钮-->
                <el-col :span="6">
                    <el-form-item label-width="0" class="text-right">
                        <el-button @click="submitSearch" type="primary">查询</el-button>
                        <el-button @click="resetSearch">重置</el-button>
                        <el-link type="primary" class="ml-4" @click="paramMap.show=!paramMap.show">
                            <span v-show="!paramMap.show">展开</span>
                            <span v-show="paramMap.show">收起</span>
                        </el-link>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--列表-有数据-->
        <div v-if="tableData.length>0">
            <!--操作栏-->
            <div class="action-bar">
                <selected-role-template v-model="paramMap.role" @change="submitAssignCustomer" ref="selectedRole">
                    <el-button @click="openAssignCustomerDialog" type="warning" size="mini">分配</el-button>
                </selected-role-template>
            </div>
            <!--列表-->
            <el-table @sort-change="tableSortChange" class="jr-table" ref="filterTable"
                      :data="tableData" size="mini">
                <el-table-column fixed width="50px" type="selection" align="center"/>
                <el-table-column fixed width="95px" label="姓名" prop="name"/>
                <el-table-column fixed width="135px" label="手机号" prop="phone">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="callCustomer(scope.row)">
                            <span class="">{{ $utils.desensitizationPhone(scope.row.phone) }}</span>
                            <span class="el-icon-phone-outline"></span>
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column label="年级" prop="grade" :sortable="false"/>
                <el-table-column label="科目" prop="subjects" :sortable="false"/>
                <el-table-column label="学习中心" prop="deptname"/>
                <el-table-column label="渠道大类" prop="bigclass" :sortable="false"/>
                <el-table-column label="渠道小类" prop="smallclass" :sortable="false"/>
                <el-table-column label="备注" prop="remark"/>
                <el-table-column label="创建时间" prop="created_at"/>
                <el-table-column label="创建人" prop="creator"/>
                <el-table-column width="90px" fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="customerDetail(scope.row)">详情</el-link>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页信息-->
            <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
        </div>
        <!--列表-没数据-->
        <div class="jr-table-placeholder" v-if="tableData.length===0">
            <img src="/images/placeholder.png" alt="placeholder">
            <span>暂无数据</span>
        </div>
    </div>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedChannelTemplate from "@/components/customer/SelectedChannel";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedChannelTemplate
    },
    //数据双向绑定
    model: {
        prop: 'model',
        event: 'update'
    },
    props: {
        model: {//绑定值，默认空
            type: Number,
            default() {
                return 0
            }
        },
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
                deptid: [],//学习中心(deptid)

                // leads_status: [],//客户状态(code)
                // intension: [],//意向度
                // isvalid: [],//是否有效
                // last_trace_status: [],//最近跟进状态
                // last_trace_time: [],//最近跟进时间
                // next_trace_time: [],//下次跟进时间
                // no_trace_time: 0,//之后未跟进
                // gain_time: [],//获取时间
                // giveup_time: [],//放弃时间
                // deadsea_time: [],//进入死海时间
                // area_code: "",//海域
                // appoint_time: 0,//预约沟通时间
                // trace_num: [],//跟进次数
                // last_owner: '',//最近一次负责人
                // if_trace: [],//是否已跟踪（为空时查全部，0：未跟踪，1：已跟踪）
                // tags: [],//标签

                role: '',//选择的角色
            },

            // 列表数据
            tableData: [],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            }
        }
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        },
    },
    mounted() {
        this.refreshPage().then(total => {
            this.$emit('update', total);
            this.$store.commit('setMenuNum', {
                name: this.$route.name,
                num: total
            })
        });
    },
    methods: {
        /**
         *@desc 刷新页面
         */
        refreshPage() {
            let {pagesInfo, paramMap, $utils} = this;

            return this.$api.customer.leadsSearch({
                area_code: '1',
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
                // leads_status: paramMap.leads_status.join(','),
                // intension: paramMap.intension.join(','),
                // isvalid: paramMap.isvalid.join(','),
                // last_trace_status: paramMap.last_trace_status.join(','),
                // last_trace_time_start: $utils.convertTime(paramMap.last_trace_time, 0),
                // last_trace_time_end: $utils.convertTime(paramMap.last_trace_time, 1),
                // next_trace_time_start: $utils.convertTime(paramMap.createdDate, 0),
                // next_trace_time_end: $utils.convertTime(paramMap.next_trace_time, 0),
                // no_trace_time: $utils.convertTime(paramMap.no_trace_time, 2),
                // gain_time_start: $utils.convertTime(paramMap.gain_time, 0),
                // gain_time_end: $utils.convertTime(paramMap.gain_time, 1),
                // giveup_time_start: $utils.convertTime(paramMap.giveup_time, 0),
                // giveup_time_end: $utils.convertTime(paramMap.giveup_time, 1),
                // deadsea_time_start: $utils.convertTime(paramMap.deadsea_time, 0),
                // deadsea_time_end: $utils.convertTime(paramMap.deadsea_time, 1),
                // appoint_time_start: $utils.convertTime(paramMap.appoint_time, 0),
                // appoint_time_end: $utils.convertTime(paramMap.appoint_time, 1),
                // trace_num: paramMap.trace_num.join(','),
                // last_owner: paramMap.last_owner,
                // if_trace: paramMap.if_trace.join(','),
                // tags: paramMap.tags.join(',')
            }).then(({request = {}, total = 0, list = []} = {}) => {
                Object.assign(this.pagesInfo, {
                    pageIndex: request.pageindex || 1,
                    pageSize: request.pagesize || 20,
                    count: total || 0,//总条数
                })
                this.tableData = list.map(item => {
                    return {
                        ...item,
                         tagList: item.tags?item.tags.split(','):[]
                    }
                });
                return total
            }).catch(err => {
            })
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
        submitAssignCustomer(obj) {
            let studentids = (this.$refs['filterTable'].selection).map(item => {
                return item.leadsid
            })
            this.$api.customer.assignCustomer({
                studentids,
                salesid: obj.id,
                salename: obj.name
            }).then(res => {
                this.$message.success('分配成功')
                this.refreshPage().then(total => {
                    this.$emit('update', total)
                    this.$store.commit('setMenuNum', {
                        name: this.$route.name,
                        num: total
                    })
                });
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
                    query: {
                        id: obj.leadsid,
                    }
                })
            })
        },

        /**
         *@desc 用户详情
         */
        customerDetail(obj) {
            this.$router.push({
                path: '/customer/customer-detail',
                query: {
                    id: obj.leadsid,
                }
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
        }
    }
}
</script>

<style lang="scss">

</style>