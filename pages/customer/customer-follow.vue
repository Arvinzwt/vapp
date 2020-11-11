<template>
    <!--客户跟进-->
    <el-main class="jr-customer-customer-follow">
        <!--基本信息-->
        <div class="bg-wrap">
            <div class="box">
                <h3 class="jr-title">基本信息</h3>
                <el-link type="primary">+ 标签</el-link>
                <!--<selected-tag-template v-model="paramMap.tags" ref="tagRef" @change="submitSelectedTag"/>-->

            </div>
            <el-form class="jr-form" size="mini" :model="paramMap" label-width="90px" label-position="left">
                <el-form-item label="标签">
                    <el-tag v-for="item in paramMap.taglist" :key="item.id" type="primary" size="mini" class="mr-3">
                        {{ item.tag.tagName }}
                    </el-tag>
                </el-form-item>
                <el-row :gutter="15">
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <el-input v-model="paramMap.name" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="手机">
                            <span v-if="showPhone" class="mr-2">{{ paramMap.phone }}</span>
                            <span v-else class="mr-2">{{ $utils.desensitizationPhone(paramMap.phone) }}</span>
                            <span @click="callCustomer"
                                  class="mr-2 el-icon-phone-outline text-color-brand cursor-pointer"></span>
                            <span @click="showPhone=!showPhone"
                                  class="el-icon-view text-color-brand cursor-pointer"></span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="渠道大类">
                            <div class="jr-disabled-input">{{ paramMap.bigclass }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="渠道小类">
                            <div class="jr-disabled-input">{{ paramMap.smallclass }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
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
                        <el-form-item label="省市区">
                            <div class="jr-disabled-input">
                                {{ paramMap.cityid }}{{ paramMap.areacityid }}{{ paramMap.streetid }}
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="详细地址">
                            <el-input v-model="paramMap.address" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="学校">
                            <el-input v-model="paramMap.school" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
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
                        <el-form-item label="科目">
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
                        <el-form-item label="联系电话1">
                            <el-input v-model="paramMap.phone1" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话2">
                            <el-input v-model="paramMap.phone2" placeholder="请输入内容" clearable/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注">
                    <el-input v-model="paramMap.remark" disabled type="textarea" :rows="2" placeholder="请输入内容"
                              clearable/>
                </el-form-item>
                <el-form-item label-width="0" class="text-right">
                    <el-button type="primary" @click="submitBasicMsg">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--系统信息-->
        <div class="bg-wrap">
            <h3 class="jr-title">系统信息</h3>
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
            <h3 class="jr-title">添加跟进记录</h3>
            <el-form class="jr-form" size="mini" :model="followParam" :rules="rules" label-width="90px"
                     label-position="left" ref="ruleForm">
                <el-row :gutter="15">
                    <!--跟进状态-->
                    <el-col :span="6">
                        <el-form-item label="跟进状态" prop="last_trace_status">
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
                        <el-form-item label="意向度" prop="intention">
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
                                    v-model="followParam.last_trace_time"
                                    type="date"
                                    placeholder="选择日期" clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="诺到访时间">
                            <el-date-picker
                                    v-model="followParam.ntime"
                                    type="date"
                                    placeholder="选择日期" clearable>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="跟进记录">
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
                    <!--负责人变更列表-->
                    <div class="details-timeline_item" v-for="item in chargeRecord.list" :key="item.id">
                        <div class="details-timeline_title text-color-main">
                            <div class="details-timeline_date text-ellipsis">{{ item.begin_time }}</div>
                            <div class="details-timeline_user2 text-ellipsis"> CC负责人变更：{{ item.onwerremark }}</div>
                            <div class="details-timeline_status text-ellipsis">操作人：{{ item.operatorname }}</div>
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
            <!--报告中心-->
            <el-tab-pane label="报告中心">
                <div class="details-timeline">
                    <!--报告中心列表-->
                    <div class="details-timeline_item" v-for="item in reportCenter.list" :key="item.id">
                        <div class="details-timeline_title text-color-main">
                            <div class="details-timeline_date text-ellipsis">上传时间{{ item.createTime }}</div>
                            <div class="details-timeline_date text-ellipsis">上传人：{{ item.createBy }}</div>
                        </div>
                        <div class="details-timeline_content_wrap">
                            <div class="details-timeline_content">
                                <div class="details-timeline_remark">
                                    <span v-if="item.type==1">【 CC未签约分析报告 】：</span>
                                    <span v-if="item.type==2">【 入学测试 】：</span>
                                    <el-link type="primary" @click="onFilePreview(item)">{{ item.fileUrl }}</el-link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--报告中心列表空-->
                    <div v-if="reportCenter.list.length===0" class="p-4 bg-gray text-center">
                        <span>暂无报告</span>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!--查看图片弹窗-->
        <preview-picture-template ref="previewPictureRef"/>
    </el-main>
</template>

<script>
import PaginationTemplate from "@/components/customer/Pagination";
import SelectedRoleTemplate from "@/components/customer/SelectedRole";
import SelectedTagTemplate from "@/components/customer/SelectedTag";
import PreviewPictureTemplate from "@/components/customer/PreviewPicture";

export default {
    components: {
        PaginationTemplate,
        SelectedRoleTemplate,
        SelectedTagTemplate,
        PreviewPictureTemplate,
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        }
    },
    data() {
        return {
            showPhone: false,

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
                last_trace_status: '',//跟进状态
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

            // 报告中心
            reportCenter: {
                list: [],
                pages: {
                    pageindex: 1,
                    pagesize: 20
                },
                total: 0,
            },

            //必填判定
            rules: {
                last_trace_status: {required: true, message: '请选择跟进状态', trigger: 'blur'},
                intention: {required: true, message: '请选择意向度', trigger: 'blur'},
            },

            //市区街道
            city: [],
        }
    },
    async mounted() {
        this.paramMap.leadsid = this.$route.query.id;
        this.city = await this.$api.common.getCityStreetData({"parentid": 0, "iscity": true}) || [];
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
            let chargeRecord = await this.$api.customer.getOwnerRecordPagerByStudentid({
                leadsid,
                ...this.chargeRecord.pages
            }) || [];
            //报告中心
            let reportCenter = await this.$api.customer.reportList({
                studentid: leadsid,
            }) || [];

            Object.assign(this.paramMap, {
                ...paramMap,
                tags: paramMap.tags ? paramMap.tags.split(',') : []
            });

            followRecord.list = followRecord.list || [];
            chargeRecord.list = chargeRecord.list || [];
            reportCenter.list = reportCenter.list || [];

            this.followRecord.list = this.followRecord.list.concat(followRecord.list);
            this.chargeRecord.list = this.chargeRecord.list.concat(chargeRecord.list);
            this.reportCenter.list = reportCenter.list;

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
        // openAddTagDialog() {
        //     this.$refs['tagRef'].openDialog();
        // },

        /**
         *@desc 提交绑定标签
         */
        submitSelectedTag() {
            this.$api.customer.bindingTag({
                // "clientNo": "",//客户流水号
                // "timeStamp": "",//操作时间 时间戳
                // "tag_Id": 0,//标签ID
                // "tag_sourceId": "",//标记对象主索引
                // "tag_sourceName": "",//标记对象名称
                // "tag_sourceTypeId": "",//标记对象类型ID 1-老师 2-学生 3-员工 4-合同
                // "tag_sourceTypeName": "",//标记对象类型名称 老师 学生 员工 合同
                // "marker": "string",//标记者
                // "mark_time": "",//标记时间
                // "mark_timeStamp": 0,//标记时间时间戳
                // "remark": ""//备注
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
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {//如果验证通过
                    this.$api.customer.addUpdateTrack({
                        "id": this.$route.query.callId || 0,//呼入id不为0时更新
                        "leadsid": this.paramMap.leadsid,
                        "ztype": this.followParam.last_trace_status,//跟踪状态
                        "zneirong": this.followParam.reason1,//追踪记录
                        "kenengxing": this.followParam.intention,//可能性
                        "nextdate": this.$utils.convertTime(this.followParam.last_trace_time),//下次追踪时间时间戳
                        "promisedate": this.$utils.convertTime(this.followParam.ntime),
                        "ifvalid": 1,//下次有效 1 有效 2 无效
                    }).then(res => {
                        this.$message.success('成功');
                        this.refreshPage();
                    })
                } else {
                    return false
                }
            })
        },

        /**
         *@desc 呼叫用户
         */
        callCustomer(obj) {
            this.$api.customer.callCustomer().then(res => {
                this.$message.success('呼叫用户')
            })
        },

        /**
         *@desc 上传-查看图片
         */
        onFilePreview(obj) {
            this.$refs['previewPictureRef'].open({
                name: obj.name,
                url: obj.url
            });
        },
    }
}
</script>

<style lang="scss">
.jr-customer-customer-follow {
    min-width: 1000px;

    .box {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    //块背景
    .bg-wrap {
        background-color: #fafafa; //常规
        padding: 5px 20px 0;
        border-radius: 4px;
        margin-bottom: 10px;
        border: 1px solid transparent;
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
}
</style>
