<template>
    <el-main class="jr-testBank-myTopic">
        <!--title-->
        <Title>我的题目</Title>
        <!--筛选-->
        <el-form
            class="jr-filter-form"
            size="mini"
            label-width="70px"
            label-position="left">

            <!--公共条件-->
            <template>
                <el-form-item label="类型">
                    <linkGroup class="linkGroup1"
                               v-model="paramMap.knowledge.param.topic"
                               :options="options.topicList"></linkGroup>
                </el-form-item>
                <el-form-item label="学科">
                    <linkGroup v-model="paramMap.knowledge.param.cSubjectId"
                               @change="optionsChange($event,0)"
                               :options="options.cSubjectList"></linkGroup>
                </el-form-item>
            </template>

            <!--同步筛选-->
            <div v-show='paramMap.knowledge.param.topic===1'>
                <el-form-item label="版本">
                    <linkGroup class="linkGroup1"
                               :disabled="!paramMap.knowledge.param.cSubjectId"
                               v-model="paramMap.knowledge.param.versionId"
                               @change="optionsChange($event,1)"
                               :options="options.versionList"></linkGroup>
                </el-form-item>
                <el-form-item label="年级">
                    <linkGroup class="linkGroup2"
                               :disabled="!paramMap.knowledge.param.versionId"
                               v-model="paramMap.knowledge.param.gradeId"
                               @change="optionsChange($event,2)"
                               :options="options.gradeList"></linkGroup>
                </el-form-item>
                <el-form-item label="学期">
                    <linkGroup class="linkGroup3"
                               :disabled="!paramMap.knowledge.param.gradeId"
                               v-model="paramMap.knowledge.param.termId"
                               @change="optionsChange($event,3)"
                               :options="options.termList"></linkGroup>
                </el-form-item>
            </div>

            <!--专题筛选-->
            <div v-show='paramMap.knowledge.param.topic===2'>
                <el-form-item label="学段">
                    <linkGroup class="linkGroup6"
                               :disabled="!paramMap.knowledge.param.cSubjectId"
                               v-model="paramMap.knowledge.param.phaseId"
                               @change="optionsChange($event,4)"
                               :options="options.phaseList"></linkGroup>
                </el-form-item>

                <el-form-item label="地区">
                    <linkGroup class="linkGroup7"
                               :disabled="!paramMap.knowledge.param.phaseId"
                               v-model="paramMap.knowledge.param.areaId"
                               @change="optionsChange($event,5)"
                               :options="options.areaList"></linkGroup>
                </el-form-item>
            </div>

            <el-form-item label="状态">
                <linkGroup class="linkGroup6"
                           v-model="paramMap.status"
                           :options="options.statusList"></linkGroup>
            </el-form-item>

            <!--知识点-->
            <el-form-item label="知识点">
                <KnowledgePoint :disabled="paramMap.knowledge.param.cSubjectId === ''"
                                v-model="paramMap.knowledge.ids"
                                :param="paramMap.knowledge.param"
                                @change="knowledgeChange">

                </KnowledgePoint>
            </el-form-item>

            <!--高级筛选-->
            <template>
                <el-form-item label-width="0">
                    <el-link type="primary" class="font-basic"
                             @click="paramMap.advancedFilter=!paramMap.advancedFilter">
                        <span>高级筛选</span>
                        <span v-show="!paramMap.advancedFilter" class="icon el-icon-arrow-down"></span>
                        <span v-show="paramMap.advancedFilter" class="el-icon-arrow-up"></span>
                    </el-link>
                </el-form-item>

                <div v-show="paramMap.advancedFilter">
                    <el-form-item label="省份">
                        <linkGroup class="linkGroup6" v-model="paramMap.provinceId"
                                   :options="options.provinceList"></linkGroup>
                    </el-form-item>
                    <el-form-item label="城市">
                        <linkGroup class="linkGroup6" v-model="paramMap.cityId"
                                   :options="options.cityList"></linkGroup>
                    </el-form-item>
                    <el-form-item label="类别">
                        <linkGroup class="linkGroup6" v-model="paramMap.categoryId"
                                   :options="options.categoryList"></linkGroup>
                    </el-form-item>
                    <el-form-item label="来源">
                        <linkGroup class="linkGroup6" v-model="paramMap.sourceId"
                                   :options="options.sourceList"></linkGroup>
                    </el-form-item>
                    <el-form-item label="学段">
                        <linkGroup v-model="paramMap.phaseId"
                                   :options="options.phaseList"></linkGroup>
                    </el-form-item>
                    <el-form-item label="题型">
                        <linkGroup class="linkGroup6" v-model="paramMap.typeId"
                                   :options="options.typeList"></linkGroup>
                    </el-form-item>
                    <el-form-item label="程度">
                        <linkGroup class="linkGroup6" v-model="paramMap.difficultyId"
                                   :options="options.difficultyList"></linkGroup>
                    </el-form-item>
                    <el-form-item label="年份">
                        <linkGroup class="linkGroup6" v-model="paramMap.yearId"
                                   :options="options.yearList"></linkGroup>
                    </el-form-item>
                </div>
            </template>

            <!--普通筛选-->
            <template>
                <el-form-item label="时间">
                    <div class="wid-300">
                        <el-date-picker
                            v-model="paramMap.time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="">
                    <div class="flex-box">
                        <div class="wid-300">
                            <el-input placeholder="题目编号/题干内容" v-model="paramMap.keyword"></el-input>
                        </div>
                        <el-button type="primary" @click="submitSearch">搜索</el-button>
                    </div>
                </el-form-item>
            </template>

        </el-form>

        <!--题目列表-->


    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import KnowledgePoint from '~/components/testBank/KnowledgePoint.vue'
    import TopicList from '~/components/testBank/TopicList.vue'
    import Title from '~/components/testBank/Title.vue'
    import api from '@/config/module/testBank'

    export default {
        name: "myTopic",
        components: {
            linkGroup,
            KnowledgePoint,
            TopicList,
            Title,
        },
        data() {
            return {
                //分页信息
                pagesInfo: {
                    pageNum: 1,//页码
                    pageSize: 5,//页宽
                    totalNum: 0,//总条数
                },

                //筛选参数
                paramMap: {
                    //高级筛选是否打开
                    advancedFilter: false,

                    knowledge: {//知识点
                        ids: {
                            syncIds: [], specIds: []
                        },
                        param: {
                            topic: 1,//1同步，2专题
                            cSubjectId: '',//学科
                            cPhaseId: '',//学段
                            versionId: '',//版本
                            gradeId: '',//年级
                            termId: '',//学期
                            phaseId: '',//学段
                            areaId: '',//地区
                            syncBtnHidden: false,
                            specBtnHidden: true,
                        },
                    },

                    phaseId: '',//学段-选择题型的必须条件
                    status: 1,//状态
                    provinceId: 0,//省id
                    cityId: 0,//城市id
                    categoryId: 0,//题目大类id
                    sourceId: 0,//来源id
                    typeId: 0,//题型id
                    yearId: 0,//年份id
                    difficultyId: 0,//难度id
                    time: [],
                    keyword: '',//搜索内容 （题干）
                },

                //筛选列表
                options: {
                    topicList: [//类型列表
                        {
                            parameterId: 1,
                            parameterValue: "同步",
                        },
                        {
                            parameterId: 2,
                            parameterValue: "专题",
                        }
                    ],
                    cSubjectList: [],//学科
                    phaseList: [],//学段
                    areaList: [],//地区
                    versionList: [],//版本
                    gradeList: [],//年级
                    termList: [],//学期
                    statusList: [//状态列表
                        {
                            parameterId: 99,
                            parameterValue: "全部",
                        },
                        {
                            parameterId: 0,
                            parameterValue: "禁用",
                        },
                        {
                            parameterId: 1,
                            parameterValue: "启用",
                        },
                    ],
                    provinceList: [],//省
                    cityList: [],//城市
                    categoryList: [],//题目大类
                    sourceList: [],//来源
                    typeList: [],//题型
                    difficultyList: [],//难度
                    yearList: [],//年份

                    syncList: [],//同步树数据
                    specList: [],//专题树数据
                },

                //题目列表
                topicData: [],
            }
        },
        watch: {
            //监听学科id
            async 'paramMap.knowledge.param.cSubjectId'(val) {
                this.options.typeList = (val && this.paramMap.phaseId) ?
                    await api.getQuestionType({
                        subjectId: this.paramMap.knowledge.param.cSubjectId,
                        phaseId: this.paramMap.phaseId
                    }) : [];
            },

            //监听-生成题型
            async 'paramMap.phaseId'(val) {
                this.options.typeList = (val && this.paramMap.knowledge.param.cSubjectId) ?
                    await api.getQuestionType({
                        subjectId: this.paramMap.knowledge.param.cSubjectId,
                        phaseId: this.paramMap.phaseId
                    }) : [];
            },

            //监听版本id,填充年级列表
            async 'paramMap.knowledge.param.versionId'(val) {
                this.options.gradeList = val ? await api.getKnowledgeGrades({//重置年级列表
                    subjectId: this.paramMap.knowledge.param.cSubjectId,
                    versionId: this.paramMap.knowledge.param.versionId,
                    status: 1
                }) : [];
            },

            //监听年级id,填充学期列表
            async 'paramMap.knowledge.param.gradeId'(val) {
                this.options.termList = val ? await api.getParameterInfoByCode({//重置年级列表
                    paramCode: 'Term',
                    status: 1
                }) : [];
            },

            //监听学段id,填充地区列表
            async 'paramMap.knowledge.param.phaseId'(val) {
                this.options.areaList = val ? await api.getKnowledgeAreas({//重置年级列表
                    subjectId: this.paramMap.knowledge.param.cSubjectId,
                    phaseId: this.paramMap.knowledge.param.phaseId,
                    status: 1
                }) : [];
            },

            //监听类型
            async 'paramMap.knowledge.param.topic'(val) {
                this.paramMap.knowledge.param.syncBtnHidden = val === 2;
                this.paramMap.knowledge.param.specBtnHidden = val === 1;
            },

            // 监听省份
            async 'paramMap.provinceId'(val) {
                this.options.cityList = val ? await api.getPcd({
                    level: 2,
                    parentId: val,
                }) : []
            },
        },
        created() {
            this.initHandle();
        },
        methods: {
            /**
             *@desc 初始数据处理-//填充版本
             */
            async initHandle() {
                //学科 版本 学段 省份 类别 来源 题型 程度 年份
                Object.assign(this.options, {
                    cSubjectList: await api.getParameterInfoByCode({paramCode: 'Subject', status: 1}),//学科
                    versionList: await api.getParameterInfoByCode({paramCode: 'Version', status: 1}),//版本
                    phaseList: await api.getParameterInfoByCode({paramCode: 'Phase', status: 1}),//学段
                    provinceList: await api.getPcd({level: 1}),//省
                    categoryList: await api.getParameterInfoByCode({paramCode: 'Category', status: 1}),//题目大类
                    sourceList: await api.getParameterInfoByCode({paramCode: 'Source', status: 1}),//来源
                    difficultyList: await api.getParameterInfoByCode({paramCode: 'Difficulty', status: 1}),//难度
                    yearList: await api.getParameterInfoByCode({paramCode: 'Year', status: 1}),//年份
                });
            },

            /**
             *@desc 修改知识点时
             */
            knowledgeChange(val) {
                Object.assign(this.paramMap.knowledge.param, val.paramMap);
                Object.assign(this.options, val.options);
            },

            /**
             *@desc 选项时
             */
            optionsChange(val, type) {
                switch (type) {
                    case 0://学科
                        this.paramMap.knowledge.param.versionId = '';//版本
                        this.paramMap.knowledge.param.gradeId = '';//年级
                        this.paramMap.knowledge.param.termId = '';//学区
                        this.paramMap.knowledge.param.phaseId = '';//学段
                        this.paramMap.knowledge.param.areaId = '';//地区
                        this.paramMap.knowledge.ids.syncIds = [];//同步知识点选中值
                        this.paramMap.knowledge.idsspecIds = [];//专题知识点选中值
                        break;
                    case 1://版本
                        this.paramMap.knowledge.param.gradeId = '';//年级
                        this.paramMap.knowledge.param.termId = '';//学区
                        this.paramMap.knowledge.idssyncIds = [];//同步知识点选中值
                        break;
                    case 2://年级
                        this.paramMap.knowledge.param.termId = '';//学区
                        this.paramMap.knowledge.idssyncIds = [];//同步知识点选中值
                        break;
                    case 3://学期
                        this.paramMap.knowledge.idssyncIds = [];//同步知识点选中值
                        break;
                    case 4://学段
                        this.paramMap.knowledge.param.areaId = '';//地区
                        this.paramMap.knowledge.idsspecIds = [];//专题知识点选中值
                        break;
                    case 5://地区
                        this.paramMap.knowledge.idsspecIds = [];//专题知识点选中值
                        break;
                }

            },

            /**
             *@desc 提交搜索时
             */
            submitSearch() {
                // 我的草稿
                // api.searchByPageNo({
                //     pageNum: this.pagesInfo.pageNum,
                //     pageSize: this.pagesInfo.pageSize,
                //     // status: this.paramMap.status,
                //     searchType: 0,
                // }).then(res => {
                //     this.pagesInfo.pageNum = res.number;
                //     this.pagesInfo.pageSize = res.size;
                //     this.pagesInfo.totalNum = res.totalPages;
                //
                //     this.topicData = res.content.map(item => {
                //         return {
                //             ...item,
                //             showResolve: false,
                //             isOpera: false,
                //         }
                //     });
                // })


                // 我的题目
                // let paramMap = this.paramMap;
                // let pagesInfo = this.pagesInfo;
                // let knowledgeIdList = (paramMap.knowledge.ids.syncIds.concat(paramMap.knowledge.ids.specIds)).map(item => {
                //     return item.knowledgeId
                // });
                //
                // if (knowledgeIdList.length > 0) {
                //     api.searchByPageNo({
                //         searchType: 1,//0-我的草稿列表 1-我的题目列表 2-全部题目查询
                //         pageNum: pagesInfo.pageNum,
                //         pageSize: pagesInfo.pageSize,
                //         status: paramMap.status,
                //         knowledgeIdList,
                //         subjectId: paramMap.knowledge.param.cSubjectId,
                //         categoryId: paramMap.categoryId,
                //         provinceId: paramMap.provinceId,
                //         cityId: paramMap.cityId,
                //         difficultyId: paramMap.difficultyId,
                //         sourceId: paramMap.sourceId,
                //         typeId: paramMap.typeId,
                //         yearId: paramMap.yearId,
                //         startTime: this.$utils.convertTimestamp(paramMap.time, 0),
                //         endTime: this.$utils.convertTimestamp(paramMap.time, 1),
                //         questionId: paramMap.questionId,
                //         keyword: paramMap.keyword,
                //     }).then(res => {
                //         this.pagesInfo.pageNum = res.number;
                //         this.pagesInfo.pageSize = res.size;
                //         this.pagesInfo.totalNum = res.totalPages;
                //
                //         this.topicData = res.content.map(item => {
                //             return {
                //                 ...item,
                //                 showResolve: false,
                //                 isOpera: false,
                //             }
                //         });
                //     })
                // } else {
                //     this.$message.error('请选择知识点');
                // }

                // 全部题目
                // let paramMap = this.paramMap;
                // let pagesInfo = this.pagesInfo;
                // let knowledgeIdList = (paramMap.knowledge.ids.syncIds.concat(paramMap.knowledge.ids.specIds)).map(item => {
                //     return item.knowledgeId
                // });
                //
                // if (knowledgeIdList.length > 0) {
                //     api.searchByPageNo({
                //         searchType: 2,//0-我的草稿列表 1-我的题目列表 2-全部题目查询
                //         pageNum: pagesInfo.pageNum,
                //         pageSize: pagesInfo.pageSize,
                //         status: paramMap.status,
                //         knowledgeIdList,
                //         subjectId: paramMap.knowledge.param.cSubjectId,
                //         categoryId: paramMap.categoryId,
                //         provinceId: paramMap.provinceId,
                //         cityId: paramMap.cityId,
                //         difficultyId: paramMap.difficultyId,
                //         sourceId: paramMap.sourceId,
                //         typeId: paramMap.typeId,
                //         yearId: paramMap.yearId,
                //         startTime: this.$utils.convertTimestamp(paramMap.time, 0),
                //         endTime: this.$utils.convertTimestamp(paramMap.time, 1),
                //         questionId: paramMap.questionId,
                //         keyword: paramMap.keyword,
                //     }).then(res => {
                //         this.pagesInfo.pageNum = res.number;
                //         this.pagesInfo.pageSize = res.size;
                //         this.pagesInfo.totalNum = res.totalPages;
                //
                //         this.topicData = res.content.map(item => {
                //             return {
                //                 ...item,
                //                 showResolve: false,
                //                 isOpera: false,
                //             }
                //         });
                //     })
                // } else {
                //     this.$message.error('请选择知识点');
                // }
            }
        }
    }
</script>

<style lang="scss">

    .jr-testBank-myTopic {
        .flex-box {
            display: flex;
        }

        .wid-300 {
            width: 300px;
            margin-right: 20px;
        }

        .wrap {
            margin-top: 50px;
        }
    }

</style>