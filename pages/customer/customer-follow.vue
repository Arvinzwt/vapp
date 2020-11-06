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
                            <span class="mr-2">13122122212</span>
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
                            <el-input :maxlength='50' v-model="paramMap.schoool" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="年级">
                            <el-select v-model="paramMap.grade" multiple collapse-tags placeholder="请选择"
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
                            <el-select v-model="paramMap.subject" multiple collapse-tags placeholder="请选择" clearable>
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
                        <el-form-item label="备注">
                            <div class="jr-disabled-input">{{ paramMap.remark }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label-width="0" class="text-right">
                            <el-button type="primary">提交</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
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
                            <div class="jr-disabled-input">{{ paramMap.time1 }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="获取时间">
                            <div class="jr-disabled-input">{{ paramMap.time2 }}</div>

                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="cc负责人">
                            <div class="jr-disabled-input">{{ paramMap.usr }}</div>
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
            <el-form class="jr-form" size="mini" :model="paramMap" :rules="paramRule" label-width="90px"
                     label-position="left">
                <el-row :gutter="15">
                    <!--跟进状态-->
                    <el-col :span="6">
                        <el-form-item label="跟进状态">
                            <el-select v-model="paramMap.last_trace_status" multiple collapse-tags placeholder="请选择"
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
                            <el-select v-model="paramMap.intention" multiple collapse-tags placeholder="请选择" clearable>
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
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickerOptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="诺到访时间">
                            <el-date-picker
                                    v-model="paramMap.ntime"
                                    type="daterange"
                                    range-separator="-"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :default-time="['00:00:00', '23:59:59']"
                                    :picker-options="$utils.pickerOptions"
                                    clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label-width="0">
                    <el-input
                            type="textarea"
                            :rows="2"
                            placeholder="请输入内容"
                            v-model="paramMap.reason1"/>
                </el-form-item>
                <el-form-item label-width="0" class="text-right">
                   <el-button size="mini" type="primary">提交</el-button>
                </el-form-item>
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
            // 筛选参数信息
            paramMap: {
                show: false,//是否显示筛选
                tags: [],//标签
                name: '',//
                phone: '',
                sex: '',
                address: '',
                schoool: '',
                grade: '',
                subject: [],
                phone1: '',
                phone2: '',
                bigclass: '',
                smallclass: '',
                remark: '',
                time1: '',
                time2: '',
                usr: '',


                last_trace_status: '',
                intention: '',
                last_trace_time: '',
                ntime: '',

                reason1: '',
            },

            paramRule: {
                last_trace_status: {required: true, message: '请选择', trigger: 'blur'},
                intention: {required: true, message: '请选择', trigger: 'blur'},
            }
        }
    },
    methods: {
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
        openAddTagDialog() {
            this.$refs['tagRef'].openDialog();
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
