<template>
    <el-main class="crm-leadsFollow">
        <!--基本信息-->
        <div class="crm-filter-box">
            <!--title-->
            <div class="crm-filter-title">基本信息</div>

            <!--内容-->
            <el-form
                class="crm-filter-form"
                size="mini"
                label-width="70px"
                label-position="left">

                <el-row :gutter="18">
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <span>{{paramMap.name}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="手机">
                            <span>{{$utils.desensitization(paramMap.phone)}}</span>
                            <span class="c-color_blue el-icon-phone-outline"></span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="渠道">
                            <span>{{paramMap.channel}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="创建时间">
                            <span>{{paramMap.createTime}}</span>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="性别">
                            <el-select v-model="paramMap.sex" placeholder="请选择">
                                <el-option label="男" value="2"></el-option>
                                <el-option label="女" value="1"></el-option>
                                <el-option label="无" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="省市区">
                            <el-cascader
                                collapse-tags
                                :props="{ multiple: true }"
                                v-model="paramMap.channelIds"
                                :options="filterOptions.options">
                            </el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="详细地址">
                            <el-input v-model="paramMap.address" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="所在学校">
                            <el-select v-model="paramMap.school" placeholder="请选择">
                                <el-option label="学校名称" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="所在年级">
                            <el-select v-model="paramMap.grade" placeholder="请选择">
                                <el-option label="小班" value="23"></el-option>
                                <el-option label="中班" value="23"></el-option>
                                <el-option label="大班" value="23"></el-option>
                                <el-option label="一年级" value="23"></el-option>
                                <el-option label="二年级" value="23"></el-option>
                                <el-option label="三年级" value="23"></el-option>
                                <el-option label="四年级" value="23"></el-option>
                                <el-option label="五年级" value="23"></el-option>
                                <el-option label="六年级" value="23"></el-option>
                                <el-option label="初一" value="23"></el-option>
                                <el-option label="初二" value="23"></el-option>
                                <el-option label="初三" value="23"></el-option>
                                <el-option label="高一" value="23"></el-option>
                                <el-option label="高二" value="23"></el-option>
                                <el-option label="高三" value="23"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="意向科学">
                            <el-select v-model="paramMap.intent" placeholder="请选择">
                                <el-option label="物理" value="23"></el-option>
                                <el-option label="化学" value="23"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-row :gutter="18">
                            <el-col :span="12">
                                <el-form-item label="备注">
                                    <!--                                    <el-input-->
                                    <!--                                        type="textarea"-->
                                    <!--                                        :rows="3"-->
                                    <!--                                        placeholder="请填写备注"-->
                                    <!--                                        v-model="paramMap.remark">-->
                                    <!--                                    </el-input>-->
                                    <span>123123123123123123</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>

            </el-form>
        </div>

        <!--添加跟进记录-->
        <div class="crm-filter-box margin-t_10">
            <!--title-->
            <div class="crm-filter-title">添加跟进记录</div>

            <!--筛选内容-->
            <el-form
                class="crm-filter-form"
                size="mini"
                ref="rulesForm"
                :rules="rules"
                :model="paramMap"
                label-width="90px"
                label-position="left">

                <el-row :gutter="18">
                    <el-col :span="6">
                        <el-form-item label="跟进状态" prop="circulationStage">
                            <el-select v-model="paramMap.circulationStage" placeholder="请选择">
                                <el-option label="物理" value="23"></el-option>
                                <el-option label="化学" value="23"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="意向度" prop="intentLevel">
                            <el-select v-model="paramMap.intentLevel" placeholder="请选择">
                                <el-option label="一般" value="23"></el-option>
                                <el-option label="强烈" value="23"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="下次跟进时间">
                            <el-date-picker
                                v-model="paramMap.nextTimeDate"
                                type="datetime"
                                :picker-options="pickerOptions"
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>

                    <el-col :span="24">
                        <el-col :span="6">
                            <el-form-item label="分发校区">
                                <el-select v-model="paramMap.school" placeholder="请选择事业部">
                                    <el-option label="事业部1" value="23"></el-option>
                                    <el-option label="事业部2" value="23"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="" label-width="0">
                                <el-select v-model="paramMap.school" placeholder="选择校区">
                                    <el-option label="校区1" value="23"></el-option>
                                    <el-option label="校区2" value="23"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="" label-width="0">
                                <el-checkbox size="mini" class="margin-r_10" v-model="paramMap.checked">转至线上电销
                                </el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-col>

                    <el-col :span="24">
                        <el-row :gutter="18">
                            <el-col :span="18">
                                <el-form-item label="" label-width="0">
                                    <el-input
                                        type="textarea"
                                        :rows="3"
                                        placeholder="请填写跟进记录"
                                        v-model="paramMap.remark">
                                    </el-input>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <div class="btn-box">
                                    <el-button type="primary" size="small">提交</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>

                </el-row>

            </el-form>
        </div>

        <!--跟进记录/留资记录-->
        <div class="crm-tabs">
            <el-tabs v-model="activeName" type="card">
                <el-tab-pane label="跟进记录" name="first">
                    <el-timeline>
                        <el-timeline-item timestamp="郑同学请写跟进记录跟进记录   2020-3-5 19:03:35   操作人：郑渊    跟进状态：已分发校">
                            <div class="audio-box">
                                <span>有意向至慧数学课程，已分发至慧事业部·少儿</span>
                                <audio class="right-audio" controls src="">
                                    您的浏览器不支持 audio 标签。
                                </audio>
                            </div>
                        </el-timeline-item>

                        <el-timeline-item timestamp="郑同学请写跟进记录跟进记录   2020-3-5 19:03:35   操作人：郑渊    跟进状态：已分发校">
                            <div class="audio-box">
                                <span>有意向至慧数学课程，已分发至慧事业部·少儿</span>
                                <audio class="right-audio" controls src="">
                                    您的浏览器不支持 audio 标签。
                                </audio>
                            </div>
                        </el-timeline-item>

                        <el-timeline-item timestamp="郑同学请写跟进记录跟进记录   2020-3-5 19:03:35   操作人：郑渊    跟进状态：已分发校">
                            <div class="audio-box">
                                <span>有意向至慧数学课程，已分发至慧事业部·少儿</span>
                                <audio class="right-audio" controls src="">
                                    您的浏览器不支持 audio 标签。
                                </audio>
                            </div>
                        </el-timeline-item>
                    </el-timeline>
                </el-tab-pane>
                <el-tab-pane label="留资记录" name="second">
                    <el-timeline>
                        <el-timeline-item timestamp="郑同学请写跟进记录跟进记录   2020-3-5 19:03:35   操作人：郑渊    跟进状态：已分发校">
                            <div class="audio-box">
                                <span>有意向至慧数学课程，已分发至慧事业部·少儿</span>
                                <audio class="right-audio" controls src="">
                                    您的浏览器不支持 audio 标签。
                                </audio>
                            </div>
                        </el-timeline-item>
                    </el-timeline>
                </el-tab-pane>
            </el-tabs>

        </div>
    </el-main>
</template>

<script>
    export default {
        name: "leadsFollow",
        data() {
            return {
                //页面累心 0:获取新的leads; 1:跟进leads; 2:leads详情
                pageType: 0,

                activeName: 'first',//当前tabs选项

                // 筛选信息
                paramMap: {
                    name: '张三',//姓名
                    phone: '12122223212',//手机
                    channel: '百度',//渠道
                    createTime: '2019-09-09 12：33',//创建时间
                    sex: '',//性别
                    area: [],//省市区
                    address: '',//详细地址
                    school: '',//所在学校
                    grade: '',//所在年级
                    intent: [],//意象科学
                    remark: '',//备注

                    circulationStage: [],//跟进状态
                    intentLevel: [],//意向度
                    nextTimeDate: '',//下次跟进时间
                    divisionId: '',//事业部
                    campusId: '',//校区
                    checked: false,//转至线上电销
                    novoTime: [],//诺到访时间

                },

                //验证规则
                rules: {
                    circulationStage: {
                        type: 'array',
                        required: true,
                        message: '请选择跟进状态',
                        trigger: 'blur'
                    },

                    intentLevel: {
                        type: 'array',
                        required: true,
                        message: '请选择意向度',
                        trigger: 'blur'
                    },
                },

                //leads筛选条件
                filterOptions: {
                    // 三级联动数据
                    options: [
                        {
                            value: 'zhinan',
                            label: '指南',
                            children: [{
                                value: 'shejiyuanze',
                                label: '设计原则',
                                children: [{
                                    value: 'yizhi',
                                    label: '一致'
                                },]
                            }]
                        }
                    ],

                },

                // 控制时间选择器只能选当前时间之后
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;
                    }
                },
            }
        },
        created() {
            this.pageType = this.$route.query.type;//判定页面类型
        },
        methods: {}
    }
</script>

<style lang="scss">
    .crm-leadsFollow {
        .margin-t_10 {
            margin-top: 10px;
        }

        .btn-box {
            height: 64px;
            display: flex;
            align-items: flex-end;
            justify-content: flex-end;
        }

        .audio-box {
            display: flex;
            align-items: center;
            padding: 10px 0;

            .right-audio {
                height: 20px;
                background: transparent;
                margin-left: 20px;
            }
        }

        .crm-tabs {
            .el-tabs--card > .el-tabs__header {
                border: none;
            }

            .el-tabs--card > .el-tabs__header .el-tabs__nav {
                border: 1px solid transparent;
            }

            .el-tabs--card > .el-tabs__header .el-tabs__item {
                border: 1px solid transparent;
                font-size: 11px;
            }

            .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
                background-color: #fafafa;
            }

            .el-tabs__header {
                margin-bottom: 0;
            }

            .el-tabs__content {
                background-color: #fafafa;
                padding-top: 15px;
            }

            .el-timeline {
                font-size: 11px;
            }
        }
    }
</style>