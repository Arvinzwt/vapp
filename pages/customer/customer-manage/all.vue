<template>
    <!--线索客户管理-新海-->
    <div class="jr-customer-customer-manage-all">
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px"
                 label-position="left">
            <el-row :gutter="15">
                <!--标签-->
                <el-col :span="6">
                    <el-form-item label="标签">
                        <selected-tag-template v-model="paramMap.tag"/>
                    </el-form-item>
                </el-col>
                <!--跟进状态-->
                <el-col :span="6">
                    <el-form-item label="跟进状态">
                        <el-select v-model="paramMap.selectedArr1" multiple collapse-tags placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--放弃时间-->
                <el-col :span="6">
                    <el-form-item label="删除时间">
                        <el-date-picker
                                v-model="paramMap.date1"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :default-time="['00:00:00', '23:59:59']"
                                :picker-options="$utils.pickeroptions"
                                clearable>
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <!--姓名，手机号-->
                <el-col :span="6">
                    <el-form-item label-width="0">
                        <el-input :maxlength='50' v-model="paramMap.value1" placeholder="请输入姓名，手机号" clearable/>
                    </el-form-item>
                </el-col>
            </el-row>
            <div v-show="paramMap.show">
                <el-row :gutter="15">
                    <!--最新跟进时间-->
                    <el-col :span="6">
                        <el-form-item label="最新跟进时间">
                            <el-date-picker
                                    v-model="paramMap.date2"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickeroptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--客户状态-->
                    <el-col :span="6">
                        <el-form-item label="客户状态">
                            <el-select v-model="paramMap.str1" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in options.options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--最近负责人-->
                    <el-col :span="6">
                        <el-form-item label="最近负责人">
                            <selected-role-template v-model="paramMap.role"></selected-role-template>
                        </el-form-item>
                    </el-col>
                    <!--渠道-->
                    <el-col :span="6">
                        <el-form-item label="渠道">
                            <el-cascader
                                    v-model="paramMap.cascader"
                                    :options="options.options1"
                                    :props="options.cascadeProps"
                                    :show-all-levels="false"
                                    collapse-tags
                                    placeholder="请选择"
                                    clearable></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <!--下次联系时间-->
                    <el-col :span="6">
                        <el-form-item label="下次联系时间">
                            <el-date-picker
                                    v-model="paramMap.date2"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickeroptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--年级-->
                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-select v-model="paramMap.selectedArr1" multiple collapse-tags placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in options.options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--科目-->
                    <el-col :span="6">
                        <el-form-item label="科目">
                            <el-select v-model="paramMap.selectedArr1" multiple collapse-tags placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in options.options1"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--沟通次数-->
                    <el-col :span="6">
                        <el-form-item label="沟通次数">
                            <el-select v-model="paramMap.input1" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in options.options1"
                                        :key="item.value"
                                        :label="item.label"
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
                                    v-model="paramMap.str"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    :picker-options="{firstDayOfWeek: 1}">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--获得时间-->
                    <el-col :span="6">
                        <el-form-item label="获得时间">
                            <el-date-picker
                                    v-model="paramMap.date2"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickeroptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <!--意向度-->
                    <el-col :span="6">
                        <el-form-item label="意向度">
                            <el-select v-model="paramMap.str" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in options"
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
                                    v-model="paramMap.date2"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickeroptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
            <el-row :gutter="15">
                <!--放弃原因-->
                <el-col :span="6">
                    <el-form-item label="删除原因" v-show="paramMap.show">
                        <el-select v-model="paramMap.str" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!--确定按钮-->
                <el-col :span="18">
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
        <!--操作栏-->
        <div class="action-bar">
            <selected-role-template v-model="paramMap.role" @change="assignCustomer" ref="selectedRole">
                <el-button @click="openAssignCustomerDialog" type="warning" size="mini">分配</el-button>
            </selected-role-template>
        </div>
        <!--列表-->
        <el-table class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column fixed width="50" type="selection" align="center"/>
            <el-table-column fixed label="姓名" prop="name"></el-table-column>
            <el-table-column fixed min-width="100px" label="手机" prop="phone">
                <template slot-scope="scope">
                    <el-link type="primary" @click="callCustomer">
                        <span class="">{{ scope.row.phone }}</span>
                        <span class="el-icon-phone-outline"></span>
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="意向度" prop="name">
                <template slot-scope="scope">
                    <el-rate v-model="scope.row.rate" disabled :max="3"/>
                </template>
            </el-table-column>
            <el-table-column label="年级" prop="name"></el-table-column>
            <el-table-column label="科目" prop="name"></el-table-column>
            <el-table-column label="地区" prop="name"></el-table-column>
            <el-table-column label="最新跟进状态" prop="name"></el-table-column>
            <el-table-column label="线索客户状态" prop="name"></el-table-column>
            <el-table-column label="渠道" prop="name"></el-table-column>
            <el-table-column label="最近负责人" prop="name"></el-table-column>
            <el-table-column label="最近跟进时间" prop="name"></el-table-column>
            <el-table-column label="最近跟进记录" prop="name"></el-table-column>
            <el-table-column label="删除原因" prop="name"></el-table-column>
            <el-table-column label="删除时间" prop="name"></el-table-column>
            <el-table-column label="创建人" prop="name"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
                <template slot-scope="scope">
                    <el-link type="primary" @click="customerDetail">详情</el-link>
                </template>
            </el-table-column>
        </el-table>
        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
    </div>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedTagTemplate from "@/components/customer/SelectedTag";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedTagTemplate,
    },
    data() {
        return {
            // 筛选参数信息
            paramMap: {
                show: false,//是否显示筛选
                tag: [],//选择标签
                selectedArr1: [],//跟进状态
                date1: [],//放弃时间
                input1: '',//姓名手机号
                date2: [],//最新跟进时间
                str1: [],//跟进状态
                role: [],//负责人
                cascader: [],
            },

            // 筛选选项列表
            options: {
                //渠道列表
                options1: [
                    {
                        value: '1',
                        label: '选项1',
                    },
                    {
                        value: '2',
                        label: '选项2',
                        children: [{
                            value: '2-1',
                            label: '选项2-1',
                            children: [
                                {value: '2-1-1', label: '选项2-1-1'},
                                {value: '2-1-2', label: '选项2-1-2'},
                                {value: '2-1-3', label: '选项2-1-3'}
                            ]
                        }]
                    }
                ],

                //级联选择器配置
                cascadeProps: {
                    multiple: true,
                    value: 'value',
                    label: 'label',
                    children: 'children',
                },
            },

            // 列表数据
            tableData: [
                {name: '英语', phone: '123123123', rate: 3}
            ],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },
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
            console.log(this.paramMap, this.pagesInfo, 'paramMap')
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
            this.$utils.resetJson(this.paramMap, ['show', 'role']);//重置筛选数据
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
        assignCustomer() {
            this.$api.customer.assignCustomer({
                customerId: this.$refs['filterTable'].selection,
                roleId: this.paramMap.role,
            }).then(res => {
                this.$message.success('分配成功')
                this.refreshPage();
            })
        },

        /**
         *@desc 呼叫用户
         */
        callCustomer() {
            this.$api.customer.callCustomer().then(res => {
                this.$message.success('呼叫用户')
                this.customerDetail();
            })
        },

        /**
         *@desc 用户详情
         */
        customerDetail() {
            this.$router.push({
                path: '/customer/customer-detail'
            })
        },

    }
}
</script>

<style lang="scss">

</style>