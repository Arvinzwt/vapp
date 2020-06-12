<template>
    <el-main class="crm-index">
        <!--筛选栏-->
        <div class="crm-filter-box">
            <!--title-->
            <div class="crm-filter-title">leads管理</div>

            <!--筛选内容-->
            <el-form
                class="crm-filter-form"
                size="mini"
                label-width="70px"
                label-position="left">

                <el-row :gutter="18">
                    <el-col :span="4">
                        <el-form-item label="事业部">
                            <el-select v-model="paramMap.divisionId" @change="onDivisionChange" placeholder="请选择">
                                <el-option label="精锐在线·1v1" value="0"></el-option>
                                <el-option label="精锐在线·1v2" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4">
                        <el-form-item label="校区">
                            <el-select v-model="paramMap.campusId" placeholder="请选择">
                                <el-option label="云校" value="2"></el-option>
                                <el-option label="线下" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4">
                        <el-form-item label="海域">
                            <el-select v-model="paramMap.seaId" placeholder="请选择">
                                <el-option label="公海" value="4"></el-option>
                                <el-option label="个人海" value="5"></el-option>
                                <el-option label="新leads海" value="6"></el-option>
                                <el-option label="复活海" value="7"></el-option>
                                <el-option label="死海" value="8"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4">
                        <el-form-item label="流转阶段">
                            <el-select v-model="paramMap.circulationStage" placeholder="请选择">
                                <el-option label="平台市场" value="9"></el-option>
                                <el-option label="事业部市场" value="10"></el-option>
                                <el-option label="CC" value="11"></el-option>
                                <el-option label="CR" value="12"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="leads状态">
                            <el-select v-model="paramMap.leadsStatus" multiple collapse-tags placeholder="请选择">
                                <el-option label="线索" value="17"></el-option>
                                <el-option label="已试听" value="18"></el-option>
                                <el-option label="已上门" value="19"></el-option>
                                <el-option label="待跟进" value="20"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="最近跟进">
                            <el-date-picker
                                v-model="paramMap.recentTimeDate"
                                type="daterange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="下次联系">
                            <el-date-picker
                                v-model="paramMap.nextTimeDate"
                                type="daterange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="创建时间">
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

                    <el-col :span="4">
                        <el-form-item label="跟进状态">
                            <el-select v-model="paramMap.circulationStage" collapse-tags multiple placeholder="请选择">
                                <el-option label="重点跟进" value="13"></el-option>
                                <el-option label="无效（空号/错号）" value="14"></el-option>
                                <el-option label="无意向" value="15"></el-option>
                                <el-option label="线索客户" value="16"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4">
                        <el-form-item label="负责人">
                            <el-select v-model="paramMap.chargePersonId" multiple placeholder="请选择">
                                <el-option label="线索" value="21"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4">
                        <el-form-item label="渠道">
                            <el-cascader
                                collapse-tags
                                :props="{ multiple: true }"
                                v-model="paramMap.channelIds"
                                :options="filterOptions.channelOptions">
                            </el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="4">
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

                    <el-col :span="8">
                        <el-form-item label="" label-width="0">
                            <el-row :gutter="10">
                                <el-col :span="20">
                                    <el-input v-model="paramMap.name" placeholder="可搜索姓名、手机"></el-input>
                                </el-col>
                                <el-col :span="4">
                                    <el-button type="primary" size="mini" @click="onSubmitFilter">查询</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!--操作栏-->
        <div class="operation-bar">
            <div class="operation-bar_left">
                <el-button type="warning" size="mini" icon="el-icon-s-order" @click="onAllocateLeads">分配</el-button>
                <el-button type="warning" size="mini" icon="el-icon-delete" @click="onDeleteLeads">放弃</el-button>
            </div>
            <div class="operation-bar_right">
                <el-button class="c-color_blue" type="default" size="mini" icon="el-icon-folder-add"
                           @click="onGetNewLeads">
                    获取新leads
                </el-button>
                <el-button class="c-color_blue" type="default" size="mini" icon="el-icon-document-add"
                           @click="onAddLeads">
                    新增
                </el-button>
                <el-button class="c-color_blue" type="default" size="mini" icon="el-icon-files" @click="onImportLeads">
                    导入
                </el-button>
            </div>
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
            <el-table-column width="80" prop="leadsStatus" label="leads状态"/>
            <el-table-column width="80" prop="channelSource" label="渠道来源"/>
            <el-table-column width="80" prop="chargePerson" label="负责人"/>
            <el-table-column width="80" prop="sea" label="海域"/>
            <el-table-column width="100" prop="circulationStage" label="流转阶段"/>
            <el-table-column width="125" prop="recentTime" label="最近跟进时间"/>
            <el-table-column width="125" prop="nextTime" label="下次跟进时间"/>
            <el-table-column width="125" prop="createTime" label="创建时间"/>
            <el-table-column prop="" label="操作" width="120" align="center">
                <el-link class="c-font_basic" @click="onFollowLeads">跟进</el-link>
                <el-link class="c-font_basic" @click="onLeadsDetail">详情</el-link>
                <el-link class="c-font_basic" type="">更多</el-link>
            </el-table-column>

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
                    recentTime: '',//最近跟进
                    recentTimeDate: [],//最近跟进
                    nextTime: '',//下次联系
                    nextTimeDate: [],//下次联系
                    createTime: '',//创建时间
                    createTimeDate: [],//创建时间
                    gradeId: '',//年级
                    name: '',//姓名
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

            /**
             *@desc 分配leads
             */
            onAllocateLeads() {

            },

            /**
             *@desc 放弃leads
             */
            onDeleteLeads() {

            },

            /**
             *@desc 获取新leads
             */
            onGetNewLeads() {
                this.$router.push({
                    path: '/crm/leadsFollow',
                    query: {
                        type: 0,
                    }
                })
            },

            /**
             *@desc 新增leads
             */
            onAddLeads() {
                this.$router.push({
                    path: '/crm/leadsAdd',
                })
            },

            /**
             *@desc 导入leads
             */
            onImportLeads() {
                this.$router.push({
                    path: '/crm/leadsImport',
                })
            },

            /**
             *@desc 跟进leads
             */
            onFollowLeads() {
                this.$router.push({
                    path: '/crm/leadsFollow',
                    query: {
                        type: 1,
                    }
                })
            },

            /**
             *@desc leads详情
             */
            onLeadsDetail() {
                this.$router.push({
                    path: '/crm/leadsFollow',
                    query: {
                        type: 2,
                    }
                })
            },
        }
    }
</script>

<style lang="scss">

    .crm-index {
        /*操作栏*/
        .operation-bar {
            display: flex;
            justify-content: space-between;
            padding: 10px;
        }

        .el-col {
            /*border: 1px solid red;*/
        }
    }

</style>
