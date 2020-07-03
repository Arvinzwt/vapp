<template>
    <el-main class="jr-order-orderCreate">
        <!--筛选栏-->
        <div class="jr-filter-box">
            <el-form class="jr-filter-form" ref="rulFform" :model="form" label-position="left" label-width="80px" size="mini">
                <el-row :gutter="18">
                    <el-col :span="6">
                      <el-form-item label="选择学员">
                          <el-input v-model="student_name" @focus="selectStd"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="18">
                    <el-col :span="6">
                        <el-form-item label="选择商品">
                            <el-button type="primary">选择商品</el-button>
                            <el-button  type="info" plain>清空商品</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!--table列表-->
        <div class="orderCreate-goods">
            <el-table :data="tableData" ref="dataTable" size="mini">
                <el-table-column prop="id" label="商品ID"></el-table-column>
                <el-table-column width="135" prop="time" label="商品名称"></el-table-column>
                <el-table-column width="135" prop="time" label="商品来源"></el-table-column>
                <el-table-column prop="orderNumber" label="商品科目"></el-table-column>
                <el-table-column prop="orderNumber" label="商品标签"></el-table-column>
                <el-table-column prop="goodsName" label="适用年级"></el-table-column>
                <el-table-column prop="goodsName" label="商品基数"></el-table-column>
                <el-table-column width="96" prop="phone" label="商品库存"></el-table-column>
                <el-table-column prop="name" label="地址"></el-table-column>
                <el-table-column prop="orderPayment" label="商品原价"></el-table-column>
                <el-table-column prop="orderPayment" label="商品成本"></el-table-column>
                <el-table-column prop="orderPayment" label="售卖价格"></el-table-column>
                <el-table-column prop="orderPayment" label="优惠金额"></el-table-column>
                <el-table-column prop="orderPayment" label="实缴金额"></el-table-column>
            </el-table>
            <p class="jr-orderCreate-price"><span class="total-price-name">原价总计</span><span class="total-price-money"></span></p>
            <p class="jr-orderCreate-price"><span class="total-price-name">成本总计</span><span class="total-price-money"></span></p>
            <p class="jr-orderCreate-price"><span class="total-price-name">售卖总计</span><span class="total-price-money"></span></p>
            <p class="jr-orderCreate-price"><span class="total-price-name">优惠总计</span><span class="total-price-money"></span></p>
            <p class="jr-orderCreate-price"><span class="total-price-name">实缴总计</span><span class="total-price-money"></span></p>
            <div class="orderCreate-sub">
                <el-button v-if="tableData.length > 0" type="primary" size="mini">提交</el-button>
                <el-button v-else disabled type="info" plain size="mini">提交</el-button>
            </div>
        </div>

        <!--选择学员-->
        <el-dialog :close-on-click-modal="false" width="80%" :visible.sync="dialog_std.show">
            <div slot="title">
              <span class="std_title">选择学员</span>
              <el-input class="std_search" size="mini" v-model="dialog_std.query_info" placeholder="搜索姓名/手机号"></el-input>
              <el-button class="std_query" size="mini" type="primary" @click="queryStd">查询</el-button>
              <el-button class="std_reset" size="mini" type="primary" plain @click="resetStd">重置</el-button>
            </div>
            <div class="std_body">
                <el-radio-group v-model="dialog_std.std_code">
                    <div class="single_radio" v-for="item in dialog_std.studentList" :key="item.std_code">
                        <el-radio :label="item.std_code">
                            <div class="std_icon">{{item.std_icon}}</div>
                            <span class="std_name">{{item.std_name}}</span>
                        </el-radio>
                    </div>
                </el-radio-group>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" :disabled="dialog_std.disabled" @click="submitStd">确认</el-button>
            </div>
        </el-dialog>

        <!--选择商品-->
        <el-dialog :close-on-click-modal="false" width="80%" :visible.sync="dialog_goods.show">
            <div slot="title">
              <span class="goods_title">选择商品</span>
              <el-input class="goods_search" size="mini" v-model="dialog_goods.goods_name" placeholder="搜索商品名称"></el-input>
              <el-select class="goods_content" v-model="dialog_goods.org_code" placeholder="内容来源" size="mini">
                <el-option v-for="item in studentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select class="goods_subject" v-model="dialog_goods.subject_code" placeholder="课程科目" size="mini">
                <el-option v-for="item in studentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select class="goods_grade" v-model="dialog_goods.grade_code" placeholder="适用年级" size="mini">
                <el-option v-for="item in studentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-select class="goods_tag" v-model="dialog_goods.tag_id" placeholder="商品标签" size="mini">
                <el-option v-for="item in studentList" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              <el-button class="goods_query" size="mini" type="primary" @click="queryGoods">查询</el-button>
              <el-button class="goods_reset" size="mini" type="primary" plain @click="resetGoods">重置</el-button>
            </div>
            <div class="goods_body">
                <el-table :data="dialog_goods.goods_data" style="width: 100%" size="mini">
                  <el-table-column prop="prop" label="ID"></el-table-column>
                  <el-table-column prop="prop" label="商品名称"></el-table-column>
                  <el-table-column prop="prop" label="绑定内容"></el-table-column>
                  <el-table-column prop="prop" label="内容来源"></el-table-column>
                  <el-table-column prop="prop" label="课程科目"></el-table-column>
                  <el-table-column prop="prop" label="适用年级"></el-table-column>
                  <el-table-column prop="prop" label="商品标签"></el-table-column>
                  <el-table-column prop="prop" label="商品原价"></el-table-column>
                  <el-table-column prop="prop" label="商品售价"></el-table-column>
                </el-table>
            </div>
            <!--分页-->
            <div class="jr-pagination-wrapper">
                <el-pagination
                    @current-change="onCurrentPagesChange"
                    background
                    @size-change="onPagesSizeChange"
                    :current-page="dialog_goods.page_index"
                    :page-size="dialog_goods.page_size"
                    :page-sizes="[20, 40, 60,80, 100]"
                    layout="total,sizes, prev, pager, next, jumper"
                    :total="dialog_goods.total_count">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" :disabled="dialog_goods.disabled" @click="submitGoods">确认</el-button>
            </div>
        </el-dialog>

    </el-main>
</template>

<script>
    export default {
        name: "orderCreate",
        data() {
            return {
              student_name: '',//学生姓名
              student_code: '',//学生id
              //选择学员弹窗数据
              dialog_std: {
                  show: false,//学员弹窗的显示
                  query_info: '',//查询条件
                  std_code: '',//选中学员的code
                  studentList: [],//学员列表
                  disabled: true,//选择学员弹窗的确认按钮是否可点击
              },
              //选择商品弹窗数据
              dialog_goods: {
                  show: false,//商品弹窗的显示
                  goods_name: '',//商品名称
                  org_code: '',//商品来源code
                  subject_code: '',//商品科目
                  grade_code: '',//商品年级
                  tag_id: '',//商品标签
                  choose_goods: [],//选中的商品信息
                  disabled: true,//选择商品弹窗的确认按钮是否可点击
                  goods_data: [],//商品信息数据
                  page_index: 1,//页码
                  page_size: 20,//页宽
                  total_count: 0,//总条数
              },


              form: {},
              model: '',
              tableData: [],
              data: [],
              aa:'',
              dialogVisible: false,
              // 选择学院
              dialog: {
                  show: false,
                  phone: '',
                  radio: '1',
                  remark: '',
              },
              dialog1: {
                  show: true,
                  phone: '',
                  radio: '1',
                  remark: '',
              },
              radio: '',
              model: '',
              studentList: [{
                radio:1
              }, {
                  radio: 2
              }, {
                  radio: 3
              }, {
                  radio: 7
              }, {
                  radio: 6
              }, {
                  radio: 4
              }, {
                  radio: 5
              }],
              // 分页信息
              pagesInfo: {
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
             *@desc 点击选择学员input框，弹出dialog
             */
            selectStd() {
                this.dialog_std.show = true;
                this.queryStd()
            },

            /**
             *@desc 根据姓名或手机号查询学员
             */
            queryStd() {

            },

            /**
             *@desc 重置查询学员条件
             */
            resetStd() {
                this.dialog_std.query_info = '';
                this.dialog_std.std_code = '';
                this.queryStd();
            },

            /**
             *@desc 确认选择学员
             */
            submitStd() {
                this.dialog_std.show = false;
            },

            /**
             *@desc 查询商品列表
             */
            queryGoods() {

            },

            /**
             *@desc 重置查查询商品列表条件
             */
            resetGoods() {
                // this.dialog_std.query_info = '';
                // this.dialog_std.std_code = '';
                // this.queryStd();
            },

            /**
             *@desc 确认选择商品
             */
            submitGoods() {

            },


            /**
             *@desc 商品列表分页模块翻页时触发
             *@param val [Number] 翻页后的页数
             */
            onCurrentPagesChange(val) {
                this.dialog_goods.page_index = val;
                this.queryGoods();
            },

            /**
             *@desc 商品列表分页模块跳页时触发时触发
             *@param val [Number] 跳页后的页数
             */
            onPagesSizeChange(val) {
                this.dialog_goods.page_size = val;
                this.queryGoods();
            },
        },
        watch: {
            'dialog_std.std_code'(val) {
                if(val) {
                    this.dialog_std.disabled = false;
                } else {
                    this.dialog_std.disabled = true;
                }
            },
            'dialog_goods.choose_goods'(val) {
                if(val.length > 0) {
                    this.dialog_goods.disabled = false;
                } else {
                    this.dialog_goods.disabled = true;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.orderCreate-sub {
    margin: 10px;
    height: 28px;
    .el-button {
        float: right;
    }
}
.jr-orderCreate-price {
    display: flex;
    span {
        display: block;
    }
    .total-price-name {
        flex: 1;
        font-size: #000;
        font-weight: bolder;
        text-align: right;
    }
    .total-price-money {
        width: 150px;
        font-size: 12px;
        color: #aaa;
    }
}

/deep/ .el-dialog__header {
    padding: 15px 15px 10px;
    .std_title {
        display: block;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
    }
    .std_search {
        position: absolute;
        width: 220px;
        top: 15px;
        right: 200px;
    }
    .std_query {
        position: absolute;
        top: 15px;
        right: 130px;
    }
    .std_reset {
        position: absolute;
        top: 15px;
        right: 60px;
    }

    .goods_title {
        display: block;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
    }
    .goods_search {
        position: absolute;
        width: 130px;
        top: 15px;
        right: 760px;
    }
    .goods_content {
        position: absolute;
        width: 130px;
        top: 15px;
        right: 620px;
    }
    .goods_subject {
        position: absolute;
        width: 130px;
        top: 15px;
        right: 480px;
    }
    .goods_grade {
        position: absolute;
        width: 130px;
        top: 15px;
        right: 340px;
    }
    .goods_tag {
        position: absolute;
        width: 130px;
        top: 15px;
        right: 200px;
    }
    .goods_query {
        position: absolute;
        top: 15px;
        right: 130px;
    }
    .goods_reset {
        position: absolute;
        top: 15px;
        right: 60px;
    }
}


/deep/ .el-dialog__body {
    padding: 10px 15px;
    .std_body {
        min-height: 200px;
        .el-radio-group {
            width:100%;
            max-height: 320px;
            .single_radio {
                width: 20%;
                display: inline-block;
                .el-radio {
                    box-sizing: border-box;
                    padding: 5px 0;
                    display: block;
                    height: 40px;
                    position: relative;
                    .el-radio__input {
                        float: left;
                        margin-top: 7px;
                    }
                    .std_icon {
                        float: left;
                        width: 30px;
                        height: 30px;
                        margin-left: 5px;
                        background: red;
                        border-radius: 15px;
                    }
                    .std_name {
                        float: left;
                        margin-left: 10px;
                        height: 30px;
                        line-height: 30px;
                        font-size: 12px;
                        color: #aaa;
                    }
                }
            }
        }
    }
    .goods_body {
        border: 1px solid #eee;
    }
}

</style>
