<template>
    <el-main class="jr-order-orderManage">
        <!--筛选栏-->
        <div class="jr-filter-box">
            <!--title-->
            <div class="jr-filter-title">
                <div></div>
                <div class="jr-filter-title_btn color-blue">
                    <span class="jr-filter-title_item icon el-icon-download"></span>
                    <span class="jr-filter-title_item icon el-icon-folder-add" @click="linkToCreate"></span>
                    <div class="jr-filter-title_item" v-show="query_type" @click="upFilter">
                        <span class="txt">收起筛选</span>
                        <span class="icon el-icon-arrow-up"></span>
                    </div>
                    <div class="jr-filter-title_item" v-show="!query_type" @click="downFilter">
                        <span class="txt">打开筛选</span>
                        <span class="icon el-icon-arrow-down"></span>
                    </div>
                </div>
            </div>

            <!--筛选内容-->
            <el-form v-show="query_type" class="jr-filter-form" size="mini" label-width="70px" label-position="left" :model="order_param">
                <el-row :gutter="18">
                    <el-col :span="6">
                        <el-form-item label="订单ID">
                            <el-input v-model="order_param.orderId" clearable placeholder="请输入订单ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="订单编号">
                            <el-input v-model="order_param.order_code" clearable placeholder="请输入订单编号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商品ID">
                            <el-input v-model="order_param.goodsID" clearable placeholder="请输入商品ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="学生姓名">
                            <el-input v-model="order_param.student_name" clearable placeholder="请输入学生姓名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="18">
                    <el-col :span="6">
                        <el-form-item label="手机号码">
                            <el-input v-model="order_param.phone" clearable placeholder="请输入手机号码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商品来源">
                            <el-select v-model="order_param.goods_channle" clearable placeholder="请选择" style="width:100%;">
                                <el-option v-for="item in dictionary.channelList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="订单状态">
                            <el-select v-model="order_param.goods_status" clearable placeholder="请选择" style="width:100%;">
                                <el-option v-for="item in dictionary.statusList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="支付方式">
                            <el-select v-model="order_param.pay" clearable placeholder="请选择" style="width:100%;">
                                <el-option v-for="item in dictionary.payList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="18">
                    <el-col :span="12">
                        <el-form-item label="生成日期">
                            <el-date-picker
                                v-model="order_param.create_time"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                style="width:100%;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label-width="0">
                            <el-button style="float:right;">重置</el-button>
                            <el-button style="float:right;margin-right:20px;" type="primary" @click="queryOrder">查询</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <!--table列表-->
            <el-table class="jr-table" cell-class-name="jr-table_cell" header-cell-class-name="jr-table_header" :data="tableData" ref="dataTable" size="mini">
                <el-table-column prop="id"  fixed label="ID" width="40"></el-table-column>
                <el-table-column prop="name"  fixed label="学生姓名" width="85"></el-table-column>
                <el-table-column prop="phone"  fixed label="手机号" width="100"></el-table-column>
                <el-table-column prop="phone"  fixed label="订单编号" width="110"></el-table-column>
                <el-table-column prop="phone" label="事业部单号" min-width="110"></el-table-column>
                <el-table-column prop="phone" label="商品ID" min-width="110"></el-table-column>
                <el-table-column prop="phone" label="商品来源" min-width="110"></el-table-column>
                <el-table-column prop="phone" label="原价总计" min-width="110"></el-table-column>
                <el-table-column prop="phone" label="实缴总计" min-width="110"></el-table-column>
                <el-table-column prop="phone" label="成本总计" min-width="110"></el-table-column>
                <el-table-column prop="phone" label="生成日期" width="110"></el-table-column>
                <el-table-column prop="pay" label="支付方式" :show-overflow-tooltip="true" width="110"></el-table-column>
                <el-table-column prop="phone" label="订单状态">
                    <template slot-scope="scope">
                        <span>待付款</span>
                        <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
                            <i class="status_info el-icon-info"></i>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="70">
                    <template slot-scope="scope">
                        <i class="order_icon el-icon-view" @click="linkTODetail()"></i>
                        <i class="order_icon el-icon-tickets" @click="lookLog()"></i>
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

        </div>
        <el-dialog
          title="订单日志"
          :visible.sync="order_log.show"
          width="600">
          <div>
              <el-table :data="order_log.data" size="mini" style="width: 100%">
                <el-table-column prop="id" label="序号"></el-table-column>
                <el-table-column prop="time" label="操作时间"></el-table-column>
                <el-table-column prop="content" label="日志内容"></el-table-column>
                <el-table-column prop="ower" label="操作人"></el-table-column>
              </el-table>
          </div>
          <div slot="footer">
            <el-pagination
                @current-change="logOnCurrentPagesChange"
                background
                @size-change="logOnPagesSizeChange"
                :current-page="logInfo.page_index"
                :page-size="logInfo.page_size"
                :page-sizes="[20, 40, 60,80, 100]"
                layout="total,sizes, prev, pager, next, jumper"
                :total="logInfo.total_count">
            </el-pagination>
          </div>
        </el-dialog>
    </el-main>
</template>

<script>
    export default {
        name: "orderManage",
        data() {
            return {
                query_type: true,//查询条件的收起和展示
                //订单查询条件
                order_param: {
                    orderId: '',//订单ID
                    order_code: '',//订单编号
                    goodsID: '',//商品ID
                    student_name: '',//学生姓名
                    phone: '',//手机号码
                    goods_channle: '',//商品来源
                    goods_status: '',//订单状态
                    pay: '',//支付方式
                    create_time: ['', ''],//生成日期
                },
                //订单列表数据
                tableData: [],
                //字典
                dictionary: {
                    channelList: [],// 商品来源
                    statusList: [],//订单状态
                    payList: [],//支付方式
                },
                // 订单列表分页信息
                pagesInfo: {
                    page_index: 1,//页码
                    page_size: 20,//页宽
                    total_count: 0,//总条数
                },
                //订单日志参数
                order_log: {
                    show: false,// 显示弹窗
                    data: [],// 订单日志
                },
                // 订单日志分页信息
                logInfo: {
                    page_index: 1,//页码
                    page_size: 20,//页宽
                    total_count: 0,//总条数
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
             *@desc 收起筛选
             */
            upFilter() {
                this.query_type = false
            },

            /**
             *@desc 打开筛选
             */
            downFilter() {
                this.query_type = true
            },

            /**
             *@desc 查询订单列表
             */
            queryOrder() {

            },

            /**
             *@desc 查询订单日志
             */
            queryOrderLog() {

            },

            /**
             *@desc 查看订单日志
             */
            lookLog() {
                this.order_log.show = true;
            },

            /**
             *@desc 跳转到创建订单
             */
            linkToCreate() {
                this.$router.push({
                    path: '/order/orderCreate'
                })
            },

            /**
             *@desc 跳转到订单详情页
             */
            linkTODetail() {
                this.$router.push({
                    path: '/order/orderDetail',
                    query: {

                    }
                })
            },

            /**
             *@desc 订单列表分页模块翻页时触发
             *@param val [Number] 翻页后的页数
             */
            onCurrentPagesChange(val) {
                this.pagesInfo.page_index = val;
                this.queryOrder();
            },

            /**
             *@desc 订单列表分页模块跳页时触发时触发
             *@param val [Number] 跳页后的页数
             */
            onPagesSizeChange(val) {
                this.pagesInfo.page_size = val;
                this.queryOrder();
            },

            /**
             *@desc 订单日志分页模块翻页时触发
             *@param val [Number] 翻页后的页数
             */
            logOnCurrentPagesChange(val) {
                this.pagesInfo.page_index = val;
                this.queryOrderLog();
            },

            /**
             *@desc 订单日志分页模块跳页时触发时触发
             *@param val [Number] 跳页后的页数
             */
            logOnPagesSizeChange(val) {
                this.pagesInfo.page_size = val;
                this.queryOrderLog();
            },
        }
    }
</script>

<style lang="scss">
    .jr-order-orderManage {
        .jr-filter-title {
            display: flex;
            justify-content: space-between;

            .jr-filter-title_btn {
                font-weight: normal;
                font-size: 12px;
                display: flex;

                .jr-filter-title_item {
                    font-size: 16px;
                    margin-left: 15px;
                    cursor: pointer;

                    .icon {
                        font-size: 12px;
                    }

                    .txt {
                        font-size: 12px;
                    }
                }
            }
        }
        /deep/ .el-dialog {
            .el-dialog__header {
                padding: 10px;
                .el-dialog__title {
                  font-size: 14px;
                }
                .el-dialog__headerbtn {
                    top: 10px;
                }
            }
            .el-dialog__body {
                padding: 5px 10px 20px;
                max-height: 500px;
            }
        }

        .status_info {
            color: #E6A23C;
        }
        .order_icon {
            padding: 5px;
            cursor: pointer;
        }
        .order_icon:hover {
            color: #409EFF;
        }
    }

</style>
