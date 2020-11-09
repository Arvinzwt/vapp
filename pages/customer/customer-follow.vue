<template>
    <!--客户跟进-->
    <el-main class="jr-customer-customer-follow">
        <!--基本信息-->
        <div class="bg-wrap">
            <div class="jr-title">
                <h3>基本信息</h3>
                <selected-tag-template v-model="paramMap.tags" ref="tagRef" @change="submitSelectedTag">
                    <el-button type="primary" size="mini" @click="openAddTagDialog">添加标签</el-button>
                </selected-tag-template>
            </div>
            <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
                <!--标签-->
                <el-form-item label="标签">
                    <el-tag size="small" type="primary">标签1</el-tag>
                </el-form-item>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <div class="jr-disabled-input">{{ paramMap.name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机">
                            <span class="mr-2">{{ paramMap.phone }}</span>
                            <span class="mr-2 el-icon-phone-outline text-color-brand cursor-pointer"></span>
                            <span class="el-icon-view text-color-brand cursor-pointer"></span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="性别">
                            <el-select v-model="paramMap.sex" placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in dic.sex"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="详细地址">
                            <el-input :maxlength='50' v-model="paramMap.address" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="学校">
                            <el-input :maxlength='50' v-model="paramMap.school" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-select v-model="paramMap.grade" placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in dic.grades"
                                        :key="item.dicCode"
                                        :label="item.name"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="意向学科">
                            <el-select v-model="paramMap.subjects" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.subject"
                                        :key="item.dicCode"
                                        :label="item.name"
                                        :value="item.dicCode">
                                </el-option>
                            </el-select>
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
                        <el-form-item label="联系电话1">
                            <el-input :maxlength='50' v-model="paramMap.phone1" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话2">
                            <el-input :maxlength='50' v-model="paramMap.phone2" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="备注">
                            <div class="jr-disabled-input">{{ paramMap.remark }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label-width="0" class="text-right">
                    <el-button type="primary" @click="submitBasicMsg">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--系统信息-->
        <div class="bg-wrap">
            <div class="jr-title">
                <h3>系统信息</h3>
            </div>
            <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="创建时间">
                            <div class="jr-disabled-input">{{ paramMap.created_at }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="获取时间">
                            <div class="jr-disabled-input">{{ paramMap.gain_time }}</div>

                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="cc负责人">
                            <div class="jr-disabled-input">{{ paramMap.owner }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!--添加跟进记录-->
        <div class="bg-wrap">
            <div class="jr-title">
                <h3>添加跟进记录</h3>
            </div>
            <el-form class="jr-form" size="mini" :model="followParam" :rules="rules" label-width="90px"
                     label-position="left">
                <el-row :gutter="15">
                    <!--跟进状态-->
                    <el-col :span="6">
                        <el-form-item label="跟进状态">
                            <el-select v-model="followParam.last_trace_status" placeholder="请选择"
                                       clearable>
                                <el-option
                                        v-for="item in dic.trackResult"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <!--意向度-->
                    <el-col :span="6">
                        <el-form-item label="意向度">
                            <el-select v-model="followParam.intention" placeholder="请选择" clearable>
                                <el-option
                                        v-for="item in dic.intention"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="下次跟进时间">
                            <el-date-picker
                                    v-model="paramMap.last_trace_time"
                                    type="date"
                                    placeholder="选择日期" clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="诺到访时间">
                            <el-date-picker
                                    v-model="paramMap.ntime"
                                    type="date"
                                    placeholder="选择日期" clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label-width="0">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请写跟进记录"
                            v-model="followParam.reason1"/>
                </el-form-item>
                <el-form-item label-width="0" class="text-right">
                    <el-button size="mini" @click="submitFollowParam" type="primary">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--历史记录-->
        <el-tabs class="details-tabs" type="card">
            <!--跟进记录-->
            <el-tab-pane label="跟进记录">
                <div class="details-timeline">
                    <!--跟进记录列表-->
                    <div class="details-timeline_item" v-for="item in followRecord.list" :key="item.id">
                        <div class="details-timeline_title text-color-main">
                            <div class="details-timeline_date text-ellipsis">跟进记录 {{ item.datetime }}</div>
                            <div class="details-timeline_user text-ellipsis">操作人：{{ item.gw }}</div>
                            <div class="details-timeline_status text-ellipsis">跟进状态：{{ item.ztype }}</div>
                        </div>
                        <div class="details-timeline_content_wrap">
                            <div class="details-timeline_content">
                                <div class="details-timeline_remark">
                                    {{ item.zneirong }}
                                </div>
                                <div class="details-timeline_audio">
                                    <audio v-if="item.metadata" :src="item.metadata" controls>您的浏览器不支持 audio 标签</audio>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--加载更多-->
                    <div v-if="followRecord.list.length<followRecord.total"
                         class="p-5 bg-gray text-center">
                        <el-link type="primary" @click="addMore(1)">加载更多>></el-link>
                    </div>
                    <!--暂无跟进记录空-->
                    <div v-if="followRecord.list.length===0" class="p-4 bg-gray text-center">
                        <span>暂无跟进记录空</span>
                    </div>
                </div>
            </el-tab-pane>

            <!--负责人变更记录-->
            <el-tab-pane label="负责人变更记录">
                <div class="details-timeline">
                    <!--留资记录列表-->
                    <div class="details-timeline_item" v-for="item in chargeRecord.list" :key="item.id">
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
                    <!--加载更多-->
                    <div v-if="chargeRecord.list.length<chargeRecord.total"
                         class="p-5 bg-gray text-center">
                        <el-link type="primary" @click="addMore(2)">加载更多>></el-link>
                    </div>
                    <!--负责人变更记录空-->
                    <div v-if="chargeRecord.list.length===0" class="p-4 bg-gray text-center">
                        <span>暂无负责人变更记录</span>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedTagTemplate from "@/components/customer/SelectedTag";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedTagTemplate,
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        }
    },
    data() {
        return {
            //基础信息
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
                "tags": [],//标签
                "school": "",//学校
            },

            //添加根基记录
            followParam: {
                last_trace_status: [],//跟进状态
                intention: '',//意向度
                last_trace_time: '',//下次跟进时间
                ntime: '',//诺到访时间
                reason1: '',//请写跟进记录
            },

            // 跟进记录
            followRecord: {
                list: [],
                pages: {
                    pageindex: 1,
                    pagesize: 20
                },
                total: 0,
            },

            // 负责人记录
            chargeRecord: {
                list: [],
                pages: {
                    pageindex: 1,
                    pagesize: 20
                },
                total: 0,
            },

            //必填判定
            rules: {
                last_trace_status: {required: true, message: '请选择', trigger: 'blur'},
                intention: {required: true, message: '请选择', trigger: 'blur'},
            }
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
            //基础信息
            let paramMap = await this.$api.customer.detail({leadsid}) || {};
            //跟进记录
            let followRecord = await this.$api.customer.getTrackListByPagerStudentid({
                studentId: leadsid,
                ...this.followRecord.pages
            }) || [];
            //负责人记录
            let chargeRecord = await this.$api.customer.getOwnerRecordByStudentid({
                leadsid,
                ...this.chargeRecord.pages
            }) || [];

            Object.assign(this.paramMap, {
                ...paramMap,
                tags: paramMap.tags ? paramMap.tags.split(',') : []
            });

            followRecord.list = followRecord.list || [];
            chargeRecord.list = chargeRecord.list || [];

            this.followRecord.list = this.followRecord.list.concat(followRecord.list);
            this.chargeRecord.list = this.chargeRecord.list.concat(chargeRecord.list);

            this.followRecord.total = followRecord.total || 0;
            this.chargeRecord.total = chargeRecord.total || 0;
        },

        /**
         *@desc 加载更多
         */
        addMore(type) {
            if (type === 1) {
                this.followRecord.pages.pageindex++
            }
            if (type === 2) {
                this.chargeRecord.pages.pageindex++
            }
            this.refreshPage();
        },

        /**
         *@desc 打开选择标签弹窗
         */
        openAddTagDialog() {
            this.$refs['tagRef'].openDialog();
        },

        /**
         *@desc 提交绑定标签
         */
        submitSelectedTag() {
            this.$api.customer.bindingTag({
                // "clientNo": "string",
                // "timeStamp": "2020-11-06T03:04:08.190Z",
                // "tag_Id": 0,
                // "tag_sourceId": "string",
                // "tag_sourceName": "string",
                // "tag_sourceTypeId": "string",
                // "tag_sourceTypeName": "string",
                // "marker": "string",
                // "mark_time": "2020-11-06T03:04:08.190Z",
                // "remark": "string"
            }).then(res => {
                this.$message.success('添加成功')
                this.refreshPage();
            })
        },

        /**
         *@desc 提交基础信息修改
         */
        submitBasicMsg() {
            console.log(this.paramMap)
        },

        /**
         *@desc 新增跟进记录
         */
        submitFollowParam() {
            console.log(this.followParam)
        }
    }
}
</script>

<style lang="scss">
.jr-customer-customer-follow {
    min-width: 1000px;

    .jr-title {
        display: flex;
        justify-content: space-between;
        align-items: center;

        h3 {
            font-size: 13px;
        }
    }

    //块背景
    .bg-wrap {
        background-color: #fafafa; //常规
        padding: 5px 20px 0;
        border-radius: 4px;
        margin-bottom: 40px;
    }

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

    //地图
    .map-box {
        display: flex;

        $width: 760px;
        $height: 380px;

        #map {
            width: $width*0.7;
            height: $height;
            border-right: none;
        }


        $pt: 10px;
        $pl: 15px;

        .map-list-wrap {
            padding: $pt 0;

            ul {
                width: $width*0.3;
                height: $height - $pt*2;
                overflow-y: scroll;

                .map-item {
                    padding: 10px $pl;
                    cursor: pointer;

                    .title {
                        font-size: 14px;
                        font-weight: bold;
                    }

                    .detail {
                        font-size: 12px;
                        margin-top: 4px;
                    }

                    .title, .detail {
                        width: $width*0.3 - $pl*2;
                    }

                    &:hover {
                        background-color: #F5F7FA;
                    }
                }
            }
        }

        .map-default {
            font-size: 13px;
            text-align: center;
            padding: 15px 0;
        }
    }
}
</style>
