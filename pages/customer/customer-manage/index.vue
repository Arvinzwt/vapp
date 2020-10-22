<template>
    <!--线索客户管理-新海-->
    <div class="jr-customer-customer-manage-first">
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" :rules="paramRules"
                 label-width="90px" label-position="left">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="渠道">
                        <el-cascader
                                v-model="paramMap.value1"
                                :options="options.options1"
                                :props="options.cascadeProps"
                                collapse-tags
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="创建时间">
                        <el-date-picker
                                v-model="paramMap.value2"
                                type="daterange"
                                range-separator="-"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                :default-time="['00:00:00', '23:59:59']"
                                :picker-options="$utils.pickerOptions"
                                clearable>
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="年级">
                        <el-select v-model="paramMap.value3" multiple collapse-tags placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options2"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="" label-width="0">
                        <el-input v-model="paramMap.value4" placeholder="可搜索姓名、手机" clearable/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="科目" v-show="filterShow">
                        <el-select v-model="paramMap.value5" multiple collapse-tags placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options3"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="18">
                    <el-form-item label="" label-width="0" class="text-right">
                        <el-button @click="submitSearch" type="primary">查询</el-button>
                        <el-button @click="resetSearch" type="">重置</el-button>
                        <el-link type="primary" class="ml-2" @click="filterShow=!filterShow">
                            <span v-show="filterShow">收起</span>
                            <span v-show="!filterShow">展开</span>
                        </el-link>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!--操作栏-->
        <div class="action-bar">
            <selected-role-template v-model="paramMap.role" @submit="assignCustomer" ref="selectedRole">
                <el-button @click="openAssignCustomerDialog" type="primary" size="mini">分配</el-button>
            </selected-role-template>
        </div>
        <!--列表-->
        <el-table class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column fixed type="selection" align="center" width="50"/>
            <el-table-column fixed label="姓名" prop="name"></el-table-column>
            <el-table-column label="手机" prop="phone">
                <template slot-scope="scope">
                    <el-link type="primary" @click="callCustomer">
                        <span class="">{{ scope.row.phone }}</span>
                        <span class="el-icon-phone-outline"></span>
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="年级" prop="name"></el-table-column>
            <el-table-column label="科目" prop="name"></el-table-column>
            <el-table-column label="地区" prop="name"></el-table-column>
            <el-table-column label="渠道来源" prop="name"></el-table-column>
            <el-table-column label="备注" prop="name"></el-table-column>
            <el-table-column label="创建时间" prop="name"></el-table-column>
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

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
    },
    data() {
        return {
            filterShow: false,//是否显示其他筛选

            // 筛选参数信息
            paramMap: {
                value1: [],//渠道信息
                value2: [],//创建时间
                value3: [],//年级
                value4: null,//姓名，手机号
                value5: [],//科目

                role: [1, 4, 5],
            },

            // 筛选规则信息
            paramRules: {},

            // 筛选选项列表
            options: {
                //渠道列表
                options1: [
                    {
                        value: 1,
                        label: '东南',
                        children: [{
                            value: 2,
                            label: '上海',
                            children: [
                                {value: 3, label: '普陀'},
                                {value: 4, label: '黄埔'},
                                {value: 5, label: '徐汇'}
                            ]
                        }]
                    }
                ],

                //年级列表
                options2: [
                    {
                        value: '0',
                        label: '年级2'
                    }, {
                        value: '1',
                        label: '年级1'
                    }
                ],

                //科目列表
                options3: [
                    {
                        value: '1',
                        label: '科目2'
                    }, {
                        value: '2',
                        label: '科目1'
                    }
                ],

                //级联选择器配置
                cascadeProps: {
                    multiple: true,
                    // value:'value',
                    // label:'label',
                    // children:'children',
                },
            },

            // 列表数据
            tableData: [{name: '英语', phone: '123123123'}],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },
        }
    },
    created() {
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {
        /**
         *@desc 刷新页面
         */
        refreshPage() {
            console.log(this.paramMap, 'paramMap')
            console.log(this.pagesInfo, 'pagesInfo')
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
            this.$utils.resetJson(this.paramMap);//重置筛选数据
            this.refreshPage();
        },

        /**
         *@desc 打开分配用户弹窗
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
         *@desc 分配用户
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
            this.$api.customer.callCustomer().then(res=>{
                this.$message.success('呼叫用户')
                this.$router.push({
                    path:'/customer/customer-detail'
                })
            })

        },

        /**
         *@desc 用户详情
         */
        customerDetail() {
            this.$router.push({
                path:'/customer/customer-detail'
            })
        },
    }
}
</script>

<style lang="scss">

</style>