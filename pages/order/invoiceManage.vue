<template>
    <el-main class="jr-order-invoiceManage">
        <!--筛选栏-->
        <div class="jr-filter-box">
            <!--title-->
            <div class="jr-filter-title">
                <div>发票管理</div>
                <div class="jr-filter-title_btn color-blue">
                    <span class="jr-filter-title_item icon el-icon-download"></span>
                    <span class="jr-filter-title_item icon el-icon-folder-add"></span>
                    <div class="jr-filter-title_item" v-show="filterOpened" @click="filterOpened=!filterOpened">
                        <span class="txt">收起筛选</span>
                        <span class="icon el-icon-arrow-up"></span>
                    </div>
                    <div class="jr-filter-title_item" v-show="!filterOpened" @click="filterOpened=!filterOpened">
                        <span class="txt">打开筛选</span>
                        <span class="icon el-icon-arrow-down"></span>
                    </div>
                </div>
            </div>

            <!--筛选内容-->
            <el-collapse-transition>
                <div v-show="filterOpened">
                    <el-form
                        class="jr-filter-form"
                        size="mini"
                        label-width="70px"
                        label-position="left">
                        <el-row :gutter="18">
                            <el-col :span="5">
                                <el-form-item label="发票ID">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="订单编号">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="发票号">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="发票抬头">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="发票类型">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="5">
                                <el-form-item label="开票状态">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="申请日期">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="开票日期">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="9">
                                <el-form-item label-width="0" class="t-right">
                                    <el-button type="primary">查询</el-button>
                                    <el-button>重置</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-collapse-transition>
        </div>

        <!--table列表-->
        <el-table
            class="jr-table"
            cell-class-name="jr-table_cell"
            header-cell-class-name="jr-table_header"
            :data="tableData"
            ref="dataTable"
            size="mini">

            <el-table-column width="40" prop="id" label="ID"/>
            <el-table-column width="135" prop="time" label="申请时间"/>
            <el-table-column width="135" prop="time" label="订单编号"/>
            <el-table-column prop="orderNumber" label="学生姓名"/>
            <el-table-column prop="orderNumber" label="发票类型"/>
            <el-table-column prop="goodsName" label="开票金额"/>
            <el-table-column prop="goodsName" label="开票状态"/>
            <el-table-column width="96" prop="phone" label="开票号"/>
            <el-table-column prop="name" label="开票时间"/>
            <el-table-column prop="orderPayment" label="开票人"/>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <span @click="onTapEdit(scope.row)" class="icon-btn font-18 el-icon-edit"></span>
                    <span @click="onViewDetail(scope.row)" class="icon-btn font-18 el-icon-document"></span>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
        <div class="jr-pagination-wrapper">
            <el-pagination
                @current-change="onCurrentPagesChange"
                background
                @size-change="onPagesSizeChange"
                :current-page="pagesInfo.page_index"
                :page-size="pagesInfo.page_size"
                :page-sizes="[20, 40, 60,80, 100]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="pagesInfo.total_count">
            </el-pagination>
        </div>

    </el-main>
</template>

<script>
    export default {
        name: "invoiceManage",
        data() {
            return {
                //是否显示筛选项
                filterOpened: true,

                // 数据列表
                tableData: [{}],

                // 分页信息
                pagesInfo: {
                    page_index: 1,//页码
                    page_size: 20,//页宽
                    total_count: 0,//总条数
                },
            }
        },
        methods: {
            /**
             *@desc 分页模块翻页时触发
             *@param val [Number] 翻页后的页数
             */
            onCurrentPagesChange(val) {
                this.pagesInfo.page_index = val;
                this.refreshPage();
            },

            /**
             *@desc 分页模块跳页时触发时触发
             *@param val [Number] 跳页后的页数
             */
            onPagesSizeChange(val) {
                this.pagesInfo.page_size = val;
                this.refreshPage();
            },

            /**
             *@desc 查看详情
             */
            onViewDetail(obj){

            },

            /**
             *@desc 点击修改
             */
            onTapEdit(obj){

            }
        }
    }
</script>

<style lang="scss">
    .jr-order-invoiceManage{
        .icon-btn {
            margin: 0 10px;
            cursor: pointer;
        }
    }
</style>