<template>
    <el-main>
        <!--筛选栏-->
        <div class="crm-filter-box">
            <!--title-->
            <div class="crm-filter-title">leads管理</div>

            <!--筛选内容-->
            <el-form
                class="crm-filter-form"
                size="mini"
                label-width="80px"
                label-position="left">

                <el-row :gutter="18">
                    <el-col :span="6">
                        <el-form-item label="事业部">
                            <el-select v-model="paramMap.divisionId" @change="onDivisionChange" placeholder="请选择">
                                <el-option label="精锐在线·1v1" value="0"></el-option>
                                <el-option label="精锐在线·1v2" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="校区">
                            <el-select v-model="paramMap.campusId" placeholder="请选择">
                                <el-option label="云校" value="2"></el-option>
                                <el-option label="线下" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="负责人">
                            <el-select v-model="paramMap.chargePersonId" multiple placeholder="请选择">
                                <el-option label="线索" value="21"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="跟进状态">
                            <el-select v-model="paramMap.circulationStage" collapse-tags multiple placeholder="请选择">
                                <el-option label="重点跟进" value="13"></el-option>
                                <el-option label="无效（空号/错号）" value="14"></el-option>
                                <el-option label="无意向" value="15"></el-option>
                                <el-option label="线索客户" value="16"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="诺到访日期">
                            <el-date-picker
                                v-model="paramMap.createTimeDate"
                                type="daterange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="实到访日期">
                            <el-date-picker
                                v-model="paramMap.createTimeDate"
                                type="daterange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-select v-model="paramMap.gradeId" placeholder="请选择">
                                <el-option label="小班" value="23"></el-option>
                                <el-option label="中班" value="23"></el-option>
                                <el-option label="大班" value="23"></el-option>
                                <el-option label="一年级" value="23"></el-option>
                                <el-option label="二年级" value="23"></el-option>
                                <el-option label="三年级" value="23"></el-option>
                                <el-option label="四年级" value="23"></el-option>
                                <el-option label="五年级" value="23"></el-option>
                                <el-option label="六年级" value="23"></el-option>
                                <el-option label="初一" value="23"></el-option>
                                <el-option label="初二" value="23"></el-option>
                                <el-option label="初三" value="23"></el-option>
                                <el-option label="高一" value="23"></el-option>
                                <el-option label="高二" value="23"></el-option>
                                <el-option label="高三" value="23"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="渠道">
                            <el-cascader
                                collapse-tags
                                :props="{ multiple: true }"
                                v-model="paramMap.channelIds"
                                :options="filterOptions.channelOptions">
                            </el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="" label-width="0">
                            <el-input v-model="paramMap.name" placeholder="可搜索姓名、手机"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="" label-width="0">
                            <el-button type="primary" size="mini" @click="onSubmitFilter">查询</el-button>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
        </div>


        <!--table列表-->
        <el-table
            class="crm-table"
            cell-class-name="crm-table_cell"
            header-cell-class-name="crm-table_header"
            :data="tableData"
            size="mini">

            <el-table-column type="selection"/>
            <el-table-column width="80" prop="name" label="姓名"/>
            <el-table-column width="130" prop="phone" label="手机">
                <template v-slot="scope">
                    <el-link type="primary">{{scope.row.phone}}</el-link>
                    <span class="icon el-icon-phone-outline"></span>
                </template>
            </el-table-column>
            <el-table-column width="80" prop="grade" label="年级"/>
            <el-table-column width="150" prop="area" label="地区"/>
            <el-table-column width="110" prop="followStatus" label="跟进状态"/>
            <el-table-column width="80" prop="channelSource" label="渠道来源"/>
            <el-table-column width="80" prop="chargePerson" label="负责人"/>

            <el-table-column width="125" prop="recentTime" label="诺到访时间"/>
            <el-table-column width="125" prop="checked" label="是否到访">
                <template v-slot="scope">
                    <el-switch v-model="scope.row.checked"></el-switch>
                </template>
            </el-table-column>
            <el-table-column width="125" prop="createTime" label="实到访时间"/>

        </el-table>

        <!--分页-->
        <div class="crm-pagination-wrapper">
            <el-pagination
                @current-change="onCurrentPagesChange"
                background
                @size-change="onPagesSizeChange"
                :current-page="pagesInfo.currentPage"
                :page-size="pagesInfo.pageSize"
                :page-sizes="[20, 40, 60,80, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagesInfo.total">
            </el-pagination>
        </div>

    </el-main>
</template>

<script>
    export default {
        name: "novoRecord",
        computed: {
            pickerOptions() {
                return this.$utils.pickerOptions;
            }
        },
        data() {
            return {
                // 筛选信息
                paramMap: {
                    divisionId: '0',//事业部id 默认 默认显示当前账号所属事业部
                    campusId: '',//校区id
                    seaId: '',//海域id
                    circulationStage: [],//跟进状态，可多选
                    followStatus: '',//跟进状态
                    leadsStatus: [],//leads状态
                    chargePersonId: [],//负责人id
                    channelIds: [],//渠道id
                    recentTimeDate: [],//最近跟进
                    nextTimeDate: [],//下次联系
                    createTimeDate: [],//创建时间
                    gradeId: '',//年级
                    name: '',//姓名

                    checked:'',
                },

                //leads筛选条件
                filterOptions: {
                    // 渠道数据
                    channelOptions: [
                        {
                            value: 'zhinan',
                            label: '指南',
                            children: [{
                                value: 'shejiyuanze',
                                label: '设计原则',
                                children: [{
                                    value: 'yizhi',
                                    label: '一致'
                                },]
                            }]
                        }
                    ],

                },

                // 分页信息
                pagesInfo: {
                    currentPage: 1,//当前页面
                    total: 200,//数据总条数
                    pageSize: 20,//单页面数据条数
                },

                // table信息
                tableData: [
                    {
                        name: "张三",//姓名
                        phone: 13111111221,//手机
                        grade: "一年级",//年级
                        area: "上海/上海市/长兴区",//地区
                        followStatus: "无效号（错号）",//跟进状态
                        leadsStatus: "已试听",//leads状态
                        channelSource: "百度",//渠道来源
                        chargePerson: "刘二",//负责人
                        sea: "个人海",//海域
                        circulationStage: "事业部市场",//流转阶段
                        recentTime: "2020-3-5 08:50:08",//最近跟进时间
                        nextTime: "2020-3-5 08:50:08",//下次跟进时间
                        createTime: "2020-3-5 08:50:08",//创建时间
                    },
                    {
                        name: "张三",//姓名
                        phone: 13111111221,//手机
                        grade: "一年级",//年级
                        area: "上海/上海市/长兴区",//地区
                        followStatus: "无效号（错号）",//跟进状态
                        leadsStatus: "已试听",//leads状态
                        channelSource: "百度",//渠道来源
                        chargePerson: "刘二",//负责人
                        sea: "个人海",//海域
                        circulationStage: "CC",//流转阶段
                        recentTime: "2020-3-5 08:50:08",//最近跟进时间
                        nextTime: "2020-3-5 08:50:08",//下次跟进时间
                        createTime: "2020-3-5 08:50:08",//创建时间
                    },

                ],
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
             *@desc 修改事业部数据时
             *@param val [Number] 选择的值
             */
            onDivisionChange(val) {
                this.paramMap.campusId = '';// 清空校区的值
                // this.filterOptions //充值校区选项列表
            },

            /**
             *@desc 提交筛选信息
             */
            onSubmitFilter() {
                console.log(this.paramMap);
            },

            /**
             *@desc 分页模块翻页时触发
             *@param val [Number] 翻页后的页数
             */
            onCurrentPagesChange(val) {
                console.log(val)
            },

            /**
             *@desc 分页模块跳页时触发时触发
             *@param val [Number] 跳页后的页数
             */
            onPagesSizeChange(val) {
                console.log(val)
            },


        }
    }
</script>

<style scoped>
    .crm-table {
        margin-top: 20px;
    }
</style>