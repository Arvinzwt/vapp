<template>
    <el-main class="crm-index">
        <!--筛选内容-->
        <el-form
            class="crm-filter-box"
            label-width="90px"
            label-position="left"
            :inline="true"
            size="mini"
            :model="paramMap">
            <div class="title">
                <h2 class="txt">基本信息</h2>
            </div>

            <el-form-item label="事业部：">
                <el-select v-model="paramMap.id" placeholder="请选择">
                    <el-option label="精锐在线1v1" value="shanghai"></el-option>
                    <el-option label="精锐在线1v2" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="校区：">
                <el-select v-model="paramMap.id" placeholder="请选择">
                    <el-option label="云校" value="shanghai"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="海域：">
                <el-select v-model="paramMap.id" placeholder="请选择">
                    <el-option label="死海" value="shanghai"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="leads状态：">
                <el-select v-model="paramMap.id" placeholder="请选择">
                    <el-option label="正常" value="shanghai"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="最新跟进：">
                <el-select v-model="paramMap.id" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-date-picker
                    v-model="paramMap.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="下次联系：">
                <el-select v-model="paramMap.id" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-date-picker
                    v-model="paramMap.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="创建时间：">
                <el-select v-model="paramMap.id" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
                <el-date-picker
                    v-model="paramMap.date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="跟进状态：">
                <el-select v-model="paramMap.id" placeholder="请选择">
                    <el-option label="正常" value="shanghai"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="负责人：">
                <el-cascader
                    v-model="paramMap.person"
                    :options="filterOptions.personOptions">
                </el-cascader>
            </el-form-item>

            <el-form-item label="渠道：">
                <el-select v-model="paramMap.id" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="年级：">
                <el-select v-model="paramMap.id" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="">
                <el-input class="crm-input" v-model="paramMap.name" placeholder="可搜索姓名、手机"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="">查询</el-button>
            </el-form-item>
        </el-form>

        <!--数据列表-->
        <template>
            <!--操作栏-->
            <div class="operation-bar">
                <div>
                    <el-button type="warning" size="mini" icon="el-icon-s-order">分配</el-button>
                    <el-button type="warning" size="mini" icon="el-icon-delete">放弃</el-button>
                </div>
                <div>

                    <nuxt-link class="color-blue" :to="{path:'/leads/leadsRecord',query:{id:1}}">
                        <el-button class="color-blue" type="default" size="mini" icon="el-icon-folder-add">
                            获取新leads
                        </el-button>
                    </nuxt-link>

                    <nuxt-link class="color-blue" :to="{path:'/leads/leadsAdd',query:{id:1}}">
                        <el-button class="color-blue" type="default" size="mini" icon="el-icon-document-add">
                            新增
                        </el-button>
                    </nuxt-link>

                    <nuxt-link class="color-blue" :to="{path:'/leads/leadsImport'}">
                        <el-button class="color-blue" type="default" size="mini" icon="el-icon-files">
                            导入
                        </el-button>
                    </nuxt-link>
                </div>
            </div>

            <!--table-->
            <el-table
                class="crm-table"
                cell-class-name="crm-table_cell"
                header-cell-class-name="crm-table_header"
                border
                ref="multipleTable"
                :data="tableData"
                size="mini"
                @selection-change="">
                <el-table-column type="selection"/>
                <el-table-column prop="name" label="姓名"/>
                <el-table-column prop="name" label="手机" width="120">
                    <template v-slot="scope">
                        <el-link type="primary">{{scope.row.phone}}</el-link>
                        <span class="icon el-icon-phone-outline"></span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="年级"/>
                <el-table-column prop="name" label="地区"/>
                <el-table-column prop="name" label="跟进状态"/>
                <el-table-column prop="name" label="leads状态"/>
                <el-table-column prop="name" label="渠道来源"/>
                <el-table-column prop="name" label="负责人"/>
                <el-table-column prop="name" label="海域"/>
                <el-table-column prop="name" label="流转阶段"/>
                <el-table-column prop="name" label="最近跟进时间"/>
                <el-table-column prop="name" label="下次跟进时间"/>
                <el-table-column prop="name" label="创建时间"/>
                <el-table-column prop="name" label="操作">
                    <nuxt-link :to="{path:'/leads/leadsRecord',query:{id:1}}">跟进</nuxt-link>
                    <el-link type="primary">详情</el-link>
                    <el-link type="primary">试听</el-link>
                    <el-link type="primary">签约</el-link>
                </el-table-column>
            </el-table>
        </template>

        <!--分页-->
        <div class="pagination-wrapper">
            <el-pagination
                @current-change="onCurrentPagesChange"
                background
                @size-change="onPagesSizeChange"
                :current-page="pagesInfo.currentPage"
                :page-size="pagesInfo.pageSize"
                :page-sizes="[20, 40, 60,80, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagesInfo.pageNum">
            </el-pagination>
        </div>

    </el-main>
</template>

<script>
    export default {
        data() {
            return {
                //leads筛选结果
                paramMap: {
                    id: '',
                    name: '',
                    date: '',
                    person: [],//负责人
                },

                // 分页信息
                pagesInfo: {
                    pageNum: 200,//数据总条数
                    pageSize: 20,//单页面数据条数
                    currentPage: 1,//当前页面
                },

                //leads筛选条件
                filterOptions: {
                    //负责人筛选条件
                    personOptions: [
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

                // leads数据列表
                tableData: [
                    {
                        name: '张三',
                        phone: 12311112232,
                    },
                ],
            }
        },

        methods: {
            onCurrentPagesChange(val) {
                console.log(val)
            },
            onPagesSizeChange(val) {
                console.log(val)
            }
        }
    }
</script>

<style lang="scss">

    .crm-index {
        .operation-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 30px 0 20px;
        }

        .crm-table {
            width: 100%;
        }
    }

</style>
