<template>
    <el-main class="jr-testBank-myDraft">
        <!--title-->
        <Title>我的草稿</Title>

        <!--筛选-->
        <el-form
            class="jr-filter-form"
            size="mini"
            label-width="70px"
            label-position="left">
            <el-form-item label="状态">
                <linkGroup class="linkGroup2" v-model="paramMap.kType" :options="options.kTypeList"></linkGroup>
            </el-form-item>

            <el-form-item label="学科">
                <linkGroup class="linkGroup2" v-model="paramMap.c_subjectId" :options="options.subjectList"
                           @change="topMsgChange"></linkGroup>
            </el-form-item>

            <div v-if="paramMap.kType===1">
                <el-form-item label="版本">
                    <linkGroup class="linkGroup3" v-model="paramMap.versionId"
                               :disabled="!paramMap.c_subjectId"
                               @change="changeSyncOptionData($event,1)"
                               :options="options.versionList"></linkGroup>
                </el-form-item>
                <el-form-item label="年级">
                    <linkGroup class="linkGroup4"
                               @change="changeSyncOptionData($event,2)"
                               v-model="paramMap.gradeId"
                               :options="options.gradeList"></linkGroup>
                </el-form-item>
                <el-form-item label="学期">
                    <linkGroup class="linkGroup5"
                               @change="changeSyncOptionData($event,3)"
                               v-model="paramMap.termId"
                               :options="options.termList"></linkGroup>
                </el-form-item>
            </div>

            <div v-if="paramMap.kType===2">
                <el-form-item label="学段">
                    <linkGroup class="linkGroup4" v-model="paramMap.phaseId"
                               :disabled="!paramMap.c_subjectId"
                               @change="changeSpecOptionData($event,1)"
                               :options="options.phaseList"></linkGroup>
                </el-form-item>

                <el-form-item label="地区">
                    <linkGroup class="linkGroup5" v-model="paramMap.areaId"
                               @change="changeSpecOptionData($event,2)"
                               :options="options.areaList"></linkGroup>
                </el-form-item>
            </div>

            <el-form-item label="状态">
                <linkGroup class="linkGroup6" v-model="paramMap.status" :options="options.statusList"></linkGroup>
            </el-form-item>

            <el-form-item label="知识点">
                <KnowledgeTreeAid :disabled="!paramMap.c_subjectId"
                                  ref="knowledgeTreeNode"
                                  v-model="knowledgeTreeModel"></KnowledgeTreeAid>
            </el-form-item>

            <el-form-item label-width="0">
                <el-link type="primary" class="font-basic" @click="advancedFilter=!advancedFilter">
                    <span>高级筛选</span>
                    <span v-show="!advancedFilter" class="icon el-icon-arrow-down"></span>
                    <span v-show="advancedFilter" class="el-icon-arrow-up"></span>
                </el-link>
            </el-form-item>

            <div v-show="advancedFilter">
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
                    <el-button type="primary">搜索</el-button>
                </div>
            </el-form-item>

        </el-form>

        <TopicList :topicData="topicData" @change="refreshPage"></TopicList>
    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import KnowledgeTreeAid from '~/components/testBank/KnowledgeTreeAid.vue'
    import TopicList from '~/components/testBank/TopicList.vue'
    import Title from '~/components/testBank/Title.vue'
    import api from '@/config/module/testBank'

    export default {
        name: "myDraft",
        components: {
            linkGroup,
            KnowledgeTreeAid,
            TopicList,
            Title,
        },
        computed: {
            //知识点参数
            knowledgeTreeModel: {
                get() {
                    let paramMap = this.paramMap;
                    return {
                        syncIds: paramMap.knowledgeIdList.syncIds,
                        specIds: paramMap.knowledgeIdList.specIds,
                        c_subjectId: paramMap.c_subjectId,//学科
                        c_phaseId: paramMap.c_phaseId,//学段
                        syncBtnHidden: paramMap.kType !== 1,
                        specBtnHidden: paramMap.kType !== 2,

                        versionId: paramMap.versionId,//版本
                        gradeId: paramMap.gradeId,//年级
                        termId: paramMap.termId,//学期
                        phaseId: paramMap.phaseId,//学段
                        areaId: paramMap.areaId,//地区

                        options: this.options
                    }
                },
                set(val) {
                    this.paramMap.knowledgeIdList = {
                        syncIds: val.syncIds,
                        specIds: val.specIds,
                    };

                    this.paramMap.versionId = val.versionId;//版本
                    this.paramMap.gradeId = val.gradeId;//版本
                    this.paramMap.termId = val.termId;//版本
                    this.paramMap.phaseId = val.phaseId;//版本
                    this.paramMap.areaId = val.areaId;//版本

                    this.options = val.options
                }
            },
        },

        data() {
            return {
                advancedFilter: false,

                //分页信息
                pagesInfo: {
                    pageNum: 1,//页码
                    pageSize: 5,//页宽
                    totalNum: 0,//总条数
                },

                //页面参数
                paramMap: {
                    kType: 1,
                    knowledgeIdList: {//知识点集合
                        syncIds: [],
                        specIds: []
                    },

                    c_subjectId: '',//学科
                    c_phaseId: '',//学段
                    versionId: '',//版本
                    gradeId: '',//年级
                    termId: '',//学期
                    phaseId: '',//学段
                    areaId: '',//地区
                    status: 1,

                    time: [],
                    categoryId: 0,//题目大类id
                    provinceId: 0,//省id
                    cityId: 0,//城市id
                    difficultyId: 0,//难度id
                    sourceId: 0,//来源id
                    typeId: 0,//题型id
                    yearId: 0,//年份id
                    startTime: 0,//开始时间
                    endTime: 0,//结束时间
                    keyword: '',//搜索内容 （题干）
                },

                // 筛选列表
                options: {
                    kTypeList: [
                        {
                            parameterCode: "kType",
                            parameterId: 1,
                            parameterName: "同步",
                            parameterStatus: 1,
                            parameterValue: "同步",
                        },
                        {
                            parameterCode: "kType",
                            parameterId: 2,
                            parameterName: "专题",
                            parameterStatus: 1,
                            parameterValue: "专题",
                        }
                    ],

                    phaseList: [],//学段
                    areaList: [],//地区
                    versionList: [],//版本
                    gradeList: [],//年级
                    termList: [],//学期
                    specKnowledgeList: [],//知识点
                    syncKnowledgeList: [],//知识点
                    statusList: [
                        {
                            parameterCode: "Status",
                            parameterId: 99,
                            parameterName: "全部",
                            parameterStatus: 99,
                            parameterValue: "全部",
                        },
                        {
                            parameterCode: "Status",
                            parameterId: 0,
                            parameterName: "禁用",
                            parameterStatus: 0,
                            parameterValue: "禁用",
                        },
                        {
                            parameterCode: "Status",
                            parameterId: 1,
                            parameterName: "启用",
                            parameterStatus: 1,
                            parameterValue: "启用",
                        },
                    ],

                    subjectList: [],//学科
                    topicList: [],
                    categoryList: [],//题目大类
                    provinceList: [],//省
                    cityList: [],//城市
                    difficultyList: [],//难度
                    sourceList: [],//来源
                    typeList: [],//题型
                    yearList: [],//年份
                    questionList: [],//题目
                },

                //草稿列表
                topicData: [],
            }
        },
        async created() {
            this.options.phaseList = (await api.getParameterInfoByCode({paramCode: 'Phase', status: 1})) || [];
            this.options.subjectList = (await api.getParameterInfoByCode({paramCode: 'Subject', status: 1})) || [];

            // 拉取 版本/学段列表
            this.options.versionList = (await api.getParameterInfoByCode({
                paramCode: 'Version', status: this.paramMap.status
            })) || [];
            this.options.phaseList = (await api.getParameterInfoByCode({
                paramCode: 'Phase', status: this.paramMap.status
            })) || [];

            this.refreshPage();
        },

        methods: {
            refreshPage() {
                api.searchByPageNo({
                    pageNum: this.pagesInfo.pageNum,
                    pageSize: this.pagesInfo.pageSize,
                    // status: this.paramMap.status,
                    searchType: 0,
                }).then(res => {
                    this.pagesInfo.pageNum = res.number;
                    this.pagesInfo.pageSize = res.size;
                    this.pagesInfo.totalNum = res.totalPages;

                    this.topicData = res.content.map(item => {
                        return {
                            ...item,
                            showResolve: false,
                            isOpera: false,
                        }
                    });
                })
            },

            topMsgChange() {
                this.paramMap.versionId = '';
                this.paramMap.gradeId = '';//年级
                this.paramMap.termId = '';//学期
                this.paramMap.phaseId = '';//学段
                this.paramMap.areaId = '';//地区
                this.paramMap.status = '';//状态
                this.paramMap.knowledgeIdList = {
                    syncIds: [],
                    specIds: [],
                };

                this.options.gradeList = [];
                this.options.termList = [];
                this.options.areaList = [];

                this.$refs.knowledgeTreeNode.resetMsg();
            },

            /**
             *@desc 同步级联选择器修改时
             *@param val[String] 修改值
             *@param type[Number] 修改数据，1版本修改，2年级修改，3学期修改
             */
            async changeSyncOptionData(val, type) {
                switch (type) {
                    case 1:     //版本修改
                        this.paramMap.gradeId = '';//清空年级选中信息
                        this.paramMap.termId = '';//清空学期选中信息
                        // this.$refs['syncDialog'].setCheckedKeys([]);//重置树选中

                        this.options.gradeList = (await api.getKnowledgeGrades({//重置年级列表
                            subjectId: this.paramMap.c_subjectId,
                            versionId: this.paramMap.versionId,
                            status: this.paramMap.status
                        })) || [];

                        this.options.termList = [];//清空学期
                        this.options.syncKnowledgeList = [];//清空同步树列表

                        break;
                    case 2:     //年级修改
                        this.paramMap.termId = ''; //清空学期选中信息
                        // this.$refs['syncDialog'].setCheckedKeys([]);//重置树选中

                        this.options.termList = (await api.getParameterInfoByCode({//重置年级列表
                            paramCode: 'Term', status: this.paramMap.status
                        })) || [];//重置学期列表
                        this.options.syncKnowledgeList = []; //清空同步树列表
                        break;
                    case 3:     //学期修改
                        // this.$refs['syncDialog'].setCheckedKeys([]);//重置树选中
                        // this.options.syncKnowledgeList = (await api.getKnowledgesByParams({
                        //     topic: 1,
                        //     subjectId: this.paramMap.c_subjectId,
                        //     versionId: this.paramMap.versionId,
                        //     gradeId: this.paramMap.gradeId,
                        //     termId: this.paramMap.termId,
                        // })) || [];//重置同步树列表
                        break;
                }
            },

            /**
             *@desc 专题级联选择器修改时
             *@param val[String] 修改值
             *@param type[Number] 修改数据，1学段修改，2地区修改
             */
            async changeSpecOptionData(val, type) {
                switch (type) {
                    case 1:     //学段修改
                        //清空地区、专题树选中信息，重置地区列表，清空专题树列表
                        this.paramMap.areaId = '';//清空选中信息
                        // this.$refs['specDialog'].setCheckedKeys([]);//重置树选中

                        this.options.areaList = (await api.getKnowledgeAreas({//重置地区列表
                            subjectId: this.paramMap.c_subjectId,
                            phaseId: this.paramMap.phaseId,
                            status: this.paramMap.status
                        })) || [];
                        this.options.specKnowledgeList = [];//清空专题树列表
                        break;
                    case 2:     //地区修改
                        //清空专题树选中信息 重置专题树列表
                        // this.$refs['specDialog'].setCheckedKeys([]);//重置树选中
                        // this.options.specKnowledgeList = (await api.getKnowledgesByParams({
                        //     topic: 2,
                        //     subjectId: this.paramMap.c_subjectId,
                        //     phaseId: this.paramMap.phaseId,
                        //     areaId: this.paramMap.areaId,
                        // })) || [];//重置同步树列表
                        break;
                }
            },
        }
    }
</script>

<style lang="scss">


    .jr-testBank-myDraft {
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
