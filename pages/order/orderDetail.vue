<template>
    <el-main class="jr-order-orderDetail">
        <!-- <div>
            <el-button size="mini" type="info" plain>返回</el-button>
            <span class="jr-orderDetail-title">订单详情</span>
        </div> -->
        <h2>商品名称（订单编号）</h2>
        <div class="jr-orderDetail-info">
            <el-form ref="ruleform" :model="order_info" size="mini" label-width="80px" label-position="left">
                <el-row :gutter="18">
                    <el-col :span="8">
                        <el-form-item label="学生信息">
                            <span>wuww</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="订单编号">
                            <span>wuww</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="订单状态">
                            <span>wuww</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="18">
                    <el-col :span="8">
                        <el-form-item label="商品来源">
                            <span>wuww</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="生成时间">
                            <span>wuww</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="付款时间">
                            <span>wuww</span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="18">
                    <el-col :span="8">
                        <el-form-item label="用户协议">
                            <span>wuww</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="收货地址">
                            <span>wuww</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="电话号码">
                            <span>wuww</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="jr-orderDetail-tbl">
            <el-table :data="data" style="width: 100%">
                <el-table-column prop="prop" label="商品名称" width="100"> </el-table-column>
                <el-table-column prop="prop" label="商品科目" width="100"> </el-table-column>
                <el-table-column prop="prop" label="商品标签" width="100"> </el-table-column>
                <el-table-column prop="prop" label="适用年级" width="100"> </el-table-column>
                <el-table-column prop="prop" label="商品基数" width="100"> </el-table-column>
                <el-table-column prop="prop" label="商品原价" width="100"> </el-table-column>
                <el-table-column prop="prop" label="商品成本" width="100"> </el-table-column>
                <el-table-column prop="prop" label="售卖价格" width="100"> </el-table-column>
                <el-table-column prop="prop" label="优惠费用" width="100"> </el-table-column>
                <el-table-column prop="prop" label="实缴费用" width="100"> </el-table-column>
            </el-table>
            <p class="jr-orderDetail-price"><span class="total-price-name">原价总计</span><span class="total-price-money"></span></p>
            <p class="jr-orderDetail-price"><span class="total-price-name">商品成本</span><span class="total-price-money"></span></p>
            <p class="jr-orderDetail-price"><span class="total-price-name">售卖价格</span><span class="total-price-money"></span></p>
            <p class="jr-orderDetail-price"><span class="total-price-name">优惠费用</span><span class="total-price-money"></span></p>
            <p class="jr-orderDetail-price"><span class="total-price-name">实缴总计</span><span class="total-price-money"></span></p>
        </div>
        <div class="jr-orderDetail-payinfo">
            <h3>付款信息</h3>
            <el-table :data="data" style="width: 100%">
                <el-table-column prop="prop" label="支付ID"> </el-table-column>
                <el-table-column prop="prop" label="记录添加时间"> </el-table-column>
                <el-table-column prop="prop" label="付款时间"> </el-table-column>
                <el-table-column prop="prop" label="支付方式"> </el-table-column>
                <el-table-column prop="prop" label="交易编号"> </el-table-column>
                <el-table-column prop="prop" label="付款金额"> </el-table-column>
                <el-table-column prop="prop" label="备注"> </el-table-column>
                <el-table-column prop="prop" label="附件"> </el-table-column>
                <el-table-column prop="prop" label="操作人"> </el-table-column>
            </el-table>
        </div>
        <div class="jr-orderDetail-payinfo">
            <h3>开票信息</h3>
            <el-table :data="data" style="width: 100%">
                <el-table-column prop="prop" label="支付ID"> </el-table-column>
                <el-table-column prop="prop" label="记录添加时间"> </el-table-column>
                <el-table-column prop="prop" label="开票时间"> </el-table-column>
                <el-table-column prop="prop" label="发票号"> </el-table-column>
                <el-table-column prop="prop" label="发票类型"> </el-table-column>
                <el-table-column prop="prop" label="发票抬头"> </el-table-column>
                <el-table-column prop="prop" label="税号"> </el-table-column>
                <el-table-column prop="prop" label="开票金额"> </el-table-column>
                <el-table-column prop="prop" label="备注"> </el-table-column>
                <el-table-column prop="prop" label="附件"> </el-table-column>
                <el-table-column prop="prop" label="开票人"> </el-table-column>
            </el-table>
        </div>
        <div class="jr-orderDetail-log">
            <h3>订单日志</h3>
            <el-table :data="data" style="width: 100%">
                <el-table-column prop="prop" label="序号"> </el-table-column>
                <el-table-column prop="prop" label="操作时间"> </el-table-column>
                <el-table-column prop="prop" label="日志内容"> </el-table-column>
                <el-table-column prop="prop" label="操作人"> </el-table-column>
            </el-table>
        </div>
    </el-main>
</template>

<script>
export default {
  data () {
    return {
        order_info: {

        },
        data: []
    }
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.jr-order-orderDetail {
    padding: 15px 15px 0;
    .jr-orderDetail-title {
        margin-left: 10px;
        color: #aaa;
    }
    /deep/ .el-form-item {
        margin-bottom: 0;
        font-size: 12px;
        .el-form-item__label {
            font-size: 12px;
        }
        .el-form-item__content {
            font-size: 12px;
            color: #aaa;
        }
    }
    /deep/ .el-table__header {
        font-size: 12px;
        font-weight: normal;
        color: #aaa;
    }
    .jr-orderDetail-price {
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
}
</style>
