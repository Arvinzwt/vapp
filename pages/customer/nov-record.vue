<template>
    <!--诺访记录-->
    <el-main class="jr-customer-nov-record">
        <!--标题-->
        <h3 class="jr-title">诺访记录</h3>
        <!--筛选项-->
        <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="校区">
                        <el-cascader
                                v-model="paramMap.arr"
                                :options="options.options1"
                                :props="props"
                                :show-all-levels="false"
                                collapse-tags
                                placeholder="请选择"
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="负责人">
                        <selected-role-template v-model="paramMap.role" @change="selectedRoleChange"></selected-role-template>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="渠道">
                        <el-cascader
                                v-model="paramMap.arr"
                                :options="options.options1"
                                :props="props"
                                :show-all-levels="false"
                                collapse-tags
                                placeholder="请选择"
                                clearable></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="姓名、手机号">
                        <el-input :maxlength='50' v-model="paramMap.str" placeholder="请输入内容" clearable/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="15">
                <el-col :span="6">
                    <el-form-item label="诺到访日期" v-show="paramMap.show">
                        <el-date-picker
                                v-model="paramMap.arr"
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
                    <el-form-item label="实到访日期" v-show="paramMap.show">
                        <el-date-picker
                                v-model="paramMap.arr"
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
                <el-col :span="12">
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

        <!--列表-->
        <el-table class="jr-table" ref="filterTable" :data="tableData" size="mini">
            <el-table-column fixed type="selection" align="center" width="50"/>
            <el-table-column fixed label="姓名" prop="name"></el-table-column>
            <el-table-column fixed label="手机" min-width="110px" prop="phone">
                <template slot-scope="scope">
                    <el-link type="primary" @click="callCustomer">
                        <span class="">{{ scope.row.phone }}</span>
                        <span class="el-icon-phone-outline"></span>
                    </el-link>
                </template>
            </el-table-column>
            <el-table-column label="年级" prop="name"></el-table-column>
            <el-table-column label="地区" prop="name"></el-table-column>
            <el-table-column label="跟进状态" prop="name"></el-table-column>
            <el-table-column label="渠道来源" prop="name"></el-table-column>
            <el-table-column label="负责人" prop="name"></el-table-column>
            <el-table-column label="诺到访时间" prop="name"></el-table-column>
            <el-table-column label="是否到访" prop="name"></el-table-column>
            <el-table-column label="实到访时间" prop="name"></el-table-column>
        </el-table>
        <!--分页信息-->
        <pagination-template v-model="pagesInfo" @change="onPagesChange"></pagination-template>
    </el-main>
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
            // tab切换信息
            tabs: [
                {id: 'customer-customer-call', name: '待确认', num: 6, path: '/customer/customer-call',},
                {id: 'customer-customer-call-confirmed', name: '已确认', path: '/customer/customer-call/confirmed',},
            ],

            // 筛选参数信息
            paramMap: {
                show: false,//是否显示全部筛选项
                arr: [],
                str: '',
                obj: {},
            },

            // 筛选选项列表
            options: {
                options1: [
                    {
                        value: 1,
                        label: '选项1',
                        children: [{
                            value: 2,
                            label: '选项1-1',
                            children: [
                                {value: 3, label: '选项1-1-1'},
                                {value: 4, label: '选项1-1-2'},
                                {value: 5, label: '选项1-1-3'}
                            ]
                        }]
                    }
                ],
            },

            // 列表数据
            tableData: [],

            // 分页参数
            pagesInfo: {
                pageIndex: 1,
                pageSize: 20,
                count: 0,//总条数
            },

            props:{
                multiple: true,
                value: 'value',
                label: 'label',
                children: 'children'
            }

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
         *@desc 切换tab时
         */
        tabsClick(tab) {

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

        selectedRoleChange(){

        }
    }
}
</script>

<style lang="scss">
.jr-customer-nov-record {

}
</style>