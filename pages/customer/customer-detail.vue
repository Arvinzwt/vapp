<template>
    <!--客户详情-->
    <el-main class="jr-customer-customer-detail">
        <!--基本信息-->
        <div class="bg-gray pl-4 pr-4 border-radius-base">
            <h3 class="jr-title">基本信息</h3>
            <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <div class="jr-disabled-input">{{ paramMap.name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机">
                            <div class="jr-disabled-input">
                                <span>{{ paramMap.phone }}</span>
                                <span></span>
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="性别">
                            <div class="jr-disabled-input">{{ paramMap.sex }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="家庭住址">
                            <div class="jr-disabled-input">{{ paramMap.address }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="所在学校">
                            <div class="jr-disabled-input">{{ paramMap.school }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所在年级">
                            <div class="jr-disabled-input">{{ paramMap.grade }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="意向科目">
                            <div class="jr-disabled-input">{{ paramMap.subjects }}</div>
                        </el-form-item>
                    </el-col>


                    <el-col :span="6">
                        <el-form-item label="渠道大类">
                            <div class="jr-disabled-input">{{ paramMap.bigclass }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="渠道小类">
                            <div class="jr-disabled-input">{{ paramMap.smallclass }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="创建时间">
                            <div class="jr-disabled-input">{{ paramMap.created_at }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话1">
                            <div class="jr-disabled-input">{{ paramMap.phone1 }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话2">
                            <div class="jr-disabled-input">{{ paramMap.phone2 }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="备注">
                            <div class="jr-disabled-input">{{ paramMap.remark }}</div>
                        </el-form-item>
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
                    <div class="details-timeline_item" v-for="item in historyParam.followRecord" :key="item.id">
                        <div class="details-timeline_title text-color-main">
                            <div class="details-timeline_date text-ellipsis">跟进记录 {{ item.datetime }}</div>
                            <div class="details-timeline_user text-ellipsis">操作人：{{ item.zneirong }}</div>
                            <div class="details-timeline_status text-ellipsis">跟进状态：{{ item.zzType }}</div>
                        </div>
                        <div class="details-timeline_content_wrap">
                            <div class="details-timeline_content">
                                <div class="details-timeline_remark">
                                    {{ item.hot }}
                                </div>
                                <div class="details-timeline_audio">
                                    <audio v-if="item.gw" :src="item.gw" controls>您的浏览器不支持 audio 标签</audio>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--暂无跟进记录空-->
                    <div v-if="historyParam.followRecord.length===0" class="p-4 bg-gray">
                        <span>暂无跟进记录空</span>
                    </div>
                </div>
            </el-tab-pane>

            <!--负责人变更记录-->
            <el-tab-pane label="负责人变更记录">
                <div class="details-timeline">
                    <!--留资记录列表-->
                    <div class="details-timeline_item" v-for="item in historyParam.chargeRecord" :key="item.id">
                        <div class="details-timeline_title text-color-main">
                            <div class="details-timeline_date text-ellipsis">负责人变更记录 {{ item.updateAt }}</div>
                        </div>
                        <div class="details-timeline_content_wrap">
                            <div class="details-timeline_content">
                                <div class="details-timeline_remark">
                                    负责人变更记录：{{ item.creatorId }}=>{{ item.updatorId }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--负责人变更记录空-->
                    <div v-if="historyParam.chargeRecord.length===0" class="p-4 bg-gray">
                        <span>暂无负责人变更记录</span>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-main>
</template>

<script>
export default {
    data() {
        return {
            paramMap: {
                "leadsid": "",//id
                "name": "",//姓名
                "phone": "",//手机号
                "phone1": "",//联系电话1
                "phone2": "",//联系电话2
                "intype": "",//线索来源
                "address": "",//家庭住址
                "sex": "",//性别
                "grade": "",//年级
                "subjects": "",//学科
                "bigclass": "",//大类
                "smallclass": "",//小类
                "created_at": "",//创建时间
                "gain_time": "",//获取时间
                "owner": "",//负责人
                "remark": "",//备注
                "birthday": "",//生日
                "tags": "",//标签
                "school": "",//学校
            },

            historyParam: {
                followRecord: [],//跟进记录
                chargeRecord: [],//负责人变更记录
            }

        }
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        }
    },
    mounted() {
        this.paramMap.leadsid = this.$route.query.id
        this.refreshPage()
    },
    methods: {
        /**
         *@desc 拉取页面信息
         */
        async refreshPage() {
            let leadsid = this.paramMap.leadsid

            let paramMap = await this.$api.customer.detail({leadsid}) || {};
            let followRecord = await this.$api.customer.getTrackListByStudentid({studentId: leadsid}) || [];
            let chargeRecord = await this.$api.customer.getOwnerRecordByStudentid({leadsid}) || [];

            Object.assign(this.paramMap, paramMap)
            Object.assign(this.historyParam, {
                followRecord,
                chargeRecord,
            })
        },
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