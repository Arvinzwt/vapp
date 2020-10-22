<template>
    <!--客户详情-->
    <el-main class="jr-customer-customer-detail">
        <!--基本信息-->
        <div class="bg-gray pl-4 pr-4 border-radius-base">
            <h3 class="jr-title">基本信息</h3>
            <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="姓名">张三</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机">张三</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="渠道">张三</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="创建时间">张三</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="性别">张三</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="省市区">张三</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="详细地址">张三</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所在学校">张三</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="所在年级">张三</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="意向科目">张三</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话1">张三</el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话2">张三</el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="备注">张三</el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <!--历史记录-->
        <el-tabs class="details-tabs" type="card">
            <!--跟进记录-->
            <el-tab-pane label="跟进记录">
                <div class="details-timeline">
                    <!--跟进记录列表-->
                    <div class="details-timeline_item">
                        <div class="details-timeline_title text-color-main">
                            <div class="details-timeline_date text-ellipsis">跟进记录 2020-3-5 19:03:09</div>
                            <div class="details-timeline_user text-ellipsis">操作人：张三张三张三张三张三张三张三张三张三</div>
                            <div class="details-timeline_status text-ellipsis">跟进状态：已分发校区</div>
                        </div>
                        <div class="details-timeline_content_wrap">
                            <div class="details-timeline_content">
                                <div class="details-timeline_remark">
                                    留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录留资记录
                                </div>
                                <div class="details-timeline_audio">
                                    <audio src="" controls>您的浏览器不支持 audio 标签</audio>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--暂无跟进记录空-->
                    <div class="p-4 bg-gray">
                        <span>暂无跟进记录空</span>
                    </div>
                </div>
            </el-tab-pane>

            <!--留资记录-->
            <el-tab-pane label="留资记录">
                <div class="details-timeline">
                    <!--留资记录列表-->
                    <div class="details-timeline_item">
                        <div class="details-timeline_title text-color-main">
                            <div class="details-timeline_date text-ellipsis">留资记录 2020-3-5 19:03:09</div>
                        </div>
                        <div class="details-timeline_content_wrap">
                            <div class="details-timeline_content">
                                <div class="details-timeline_remark">
                                    留资渠道：张三张三张三张三张三张三张三张三张三
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--留资记录空-->
                    <div class="p-4 bg-gray">
                        <span>暂无留资记录</span>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-main>
</template>

<script>
export default {
    name: "customer-detail",
    data() {
        return {
            paramMap: {},
        }
    },
    created() {
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {

    }
}
</script>

<style lang="scss">
.jr-customer-customer-detail {
    //tabs
    .details-tabs {
        margin-top: 20px;

        .el-tabs__header {
            margin-bottom: 0;
            border-bottom: none;

            .el-tabs__nav {
                border: none;
            }

            .el-tabs__item {
                font-size: 12px;
                border: none;
            }

            .is-active {
                background-color: #fafafa;
            }
        }

        .el-tabs__content {
            background-color: #fafafa;
            padding: 0;
            font-size: 12px;
        }
    }

    //时间线
    .details-timeline {
        .details-timeline_item {
            .details-timeline_title {
                height: 30px;
                padding-top: 15px;
                display: flex;
                align-items: center;

                .details-timeline_date {
                    max-width: 200px;
                    margin-right: 20px;
                }

                .details-timeline_user {
                    max-width: 120px;
                    margin-right: 20px;
                }
            }

            .details-timeline_content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #f7f7f7;
                padding: 8px 0;
                padding-right: 20px;

                .details-timeline_remark {
                    padding-left: 20px;
                    padding-right: 20px;
                }

                .details-timeline_audio {
                    audio {
                        display: block;
                        height: 30px;
                    }
                }
            }

            $iconWidth: 40px;

            .details-timeline_title, .details-timeline_content_wrap {
                padding-left: $iconWidth;
                position: relative;

                &:after {
                    content: '';
                    display: block;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: $iconWidth/2;
                    margin-left: -1px;
                    width: 2px;
                    background-color: #e4e7ed;
                }
            }

            .details-timeline_title {
                &:before {
                    content: '';
                    display: block;
                    position: absolute;
                    width: 12px;
                    height: 12px;
                    left: $iconWidth/2;
                    margin-left: -6px;
                    border-radius: 50%;
                    background-color: #e4e7ed;;
                }
            }
        }


    }
}

</style>