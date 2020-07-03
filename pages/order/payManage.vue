<template>
    <el-main class="jr-order-payManage">
        <!--筛选栏-->
        <div class="jr-filter-box">
            <!--title-->
            <div class="jr-filter-title">
                <div>支付管理</div>
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
                                <el-form-item label="支付ID">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="订单编号">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="交易编号">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="学生姓名">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="4">
                                <el-form-item label="手机号码">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="5">
                                <el-form-item label="支付方式">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="支付状态">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="支付来源">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="5">
                                <el-form-item label="支付时间">
                                    <el-input></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="4">
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
            <el-table-column width="135" prop="time" label="创建时间"/>
            <el-table-column width="135" prop="time" label="支付时间"/>
            <el-table-column prop="orderNumber" label="交易编号"/>
            <el-table-column prop="orderNumber" label="订单编号"/>
            <el-table-column prop="goodsName" label="商品名称"/>
            <el-table-column prop="goodsName" label="学生姓名"/>
            <el-table-column width="96" prop="phone" label="手机号"/>
            <el-table-column prop="name" label="支付方式"/>
            <el-table-column prop="orderPayment" label="支付金额"/>
            <el-table-column prop="source" label="支付状态"/>
            <el-table-column prop="source" label="支付来源"/>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <span @click="onViewDetail(scope.row)" class="icon-btn font-18 el-icon-view"></span>
                    <span @click="onAuditHandle(scope.row)" class="icon-btn font-18 el-icon-s-check"></span>
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

        <!--审核弹窗-->
        <el-dialog
            :close-on-click-modal="false"
            modal
            title="退费审核"
            width="30%"
            custom-class="crm-dialog"
            :visible.sync="dialog.show">

            <el-form
                class=""
                size="mini"
                label-width="100px"
                label-position="left">

                <el-form-item label="审核结果">
                    <el-radio v-model="dialog.radio" label="1">确认退款</el-radio>
                    <el-radio v-model="dialog.radio" label="2">关闭退款</el-radio>
                </el-form-item>

                <el-form-item label="审核备注">
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        v-model="dialog.remark">
                    </el-input>
                </el-form-item>

            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialog.show=false">取 消</el-button>
                <el-button size="mini" @click="onDialogSubmit" type="primary">保 存</el-button>
            </div>
        </el-dialog>

    </el-main>
</template>

<script>
    export default {
        name: "payManage",
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

                // 退费审核
                dialog: {
                    show: false,
                    radio: '1',
                    remark: '',
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
             *@desc 审核-点击审核按钮
             */
            onAuditHandle(obj) {
                this.dialog.show = true;
            },

            /**
             *@desc 审核-保存退费审核
             */
            onDialogSubmit() {
                this.$message.success('审核成功');
                this.dialog.show = false;
            },

            /**
             *@desc 查看详情
             */
            onViewDetail() {
                this.$router.push({
                    path: '/order/orderDetail'
                })
            },
        }
    }
</script>

<style lang="scss">
    .jr-order-payManage{
        .icon-btn {
            margin: 0 10px;
            cursor: pointer;
        }
    }
</style>