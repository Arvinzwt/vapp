<template>
    <el-main class="jr-testBank-topicUpload">
        <div v-if="currentPage==='upload'">
            <Title haveLink>文档上传</Title>

            <!--筛选内容-->
            <el-form
                class="jr-filter-form"
                size="mini"
                label-width="70px"
                label-position="left">
                <el-form-item label="学科">
                    <linkGroup class="linkGroup1" v-model="paramMap.cSubjectId" :options="options.subjectList"
                               @change="topMsgChange"></linkGroup>
                </el-form-item>
                <el-form-item label="学段">
                    <linkGroup class="linkGroup2" v-model="paramMap.cPhaseId" :options="options.phaseList"
                               @change="topMsgChange"></linkGroup>
                </el-form-item>
                <el-form-item label="是否启用" v-if="currentModel==='0-2'">
                    <el-checkbox v-model="onlineParamMap.status"></el-checkbox>
                </el-form-item>
            </el-form>

            <!--内容-->
            <el-tabs v-model="currentModel">
                <!--文档上传-->
                <el-tab-pane label="文档上传" name="0-1">
                    <!--所属知识点-->
                    <template>
                        <h3 class="jr-subtitle 1">所属知识点</h3>
                        <div class="wrap">
                            <KnowledgePoint :disabled="canSelectKnowledgeBtnIs"
                                            v-model="docParamMap.knowledgeIds"
                                            @change="knowledgeChange($event,1)"
                                            :param="paramMap"></KnowledgePoint>
                        </div>
                    </template>

                    <!--文件-->
                    <template>
                        <h3 class="jr-subtitle 2">上传文件</h3>
                        <div class="mar-l-15">
                            <el-upload
                                ref="uploadBom"
                                action=""
                                :show-file-list="true"
                                :auto-upload="true"
                                :file-list="docParamMap.file"
                                :limit="2"
                                :disabled="canUploadFile"
                                :before-upload="onBeforeFile"
                                :http-request="onFileUpload">
                                <el-button size="small" :disabled="canUploadFile" type="">选择文件</el-button>
                            </el-upload>
                            <div class="mar-b-15 mar-t-15">
                                <el-button size="mini" :disabled="canResolveFile" @click="onResolveFile"
                                           type="primary">检测解析
                                </el-button>
                            </div>
                        </div>
                    </template>

                </el-tab-pane>

                <!--在线录入-->
                <el-tab-pane label="在线录入" name="0-2">
                    <!--所属知识点-->
                    <template>
                        <h3 class="jr-subtitle 1">所属知识点</h3>
                        <div class="wrap">
                            <KnowledgePoint :disabled="canSelectKnowledgeBtnIs"
                                            v-model="onlineParamMap.knowledgeIds"
                                            @change="knowledgeChange($event,2)"
                                            :param="paramMap"></KnowledgePoint>
                        </div>
                    </template>

                    <!--题型-->
                    <div v-show="canEditTopicType">
                        <h3 class="jr-subtitle 3">题型</h3>
                        <TopicTemplate class="mar-l-15"></TopicTemplate>
                    </div>

                    <!--题型-->
                    <template>

                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!--导入文件检测-->
        <div v-if="currentPage==='detect'">
            <!--title-->
            <Title>题目上传</Title>

            <h3 class="jr-subtitle">导入检测文件结果</h3>
            <el-form
                class="jr-filter-form"
                size="mini"
                label-width="70px"
                label-position="left">
                <el-form-item label="检测域">
                    <el-input type="textarea" class="color-red" v-model="detectParam.errorMsg" :rows="7"></el-input>
                </el-form-item>
                <el-form-item label="解析域">
                    <el-input type="textarea" class="color-red" v-model="detectParam.parseMsg" :rows="7"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button size="mini" type="" @click="backHandle">返回</el-button>
                    <el-button size="mini" type="primary" @click="importFile">导入</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import KnowledgePoint from '~/components/testBank/KnowledgePoint.vue'
    import TopicTemplate from '~/components/testBank/TopicTemplate.vue'
    import Title from '~/components/testBank/Title.vue'
    import api from '@/config/module/testBank'

    export default {
        name: "topicUpload",
        components: {
            linkGroup,
            KnowledgePoint,
            TopicTemplate,
            Title,
        },
        computed: {
            //判断能否选择知识点
            canSelectKnowledgeBtnIs() {
                return this.paramMap.cSubjectId === ''
            },

            //判定能否上传文件
            canUploadFile() {
                return !(this.docParamMap.knowledgeIds.syncIds.length > 0 || this.docParamMap.knowledgeIds.specIds.length > 0)
            },

            //能否解析文件
            canResolveFile() {
                return this.docParamMap.file.length === 0
            },

            //能否修改题型
            canEditTopicType() {
                return (this.onlineParamMap.knowledgeIds.syncIds.length > 0 || this.onlineParamMap.knowledgeIds.specIds.length > 0)
            },
        },
        data() {
            return {
                currentModel: '0-1',// 当前模块 0-1文档上传 0-2在线录入
                currentPage: 'upload',//upload题目上传，detect题目检测

                //公共参数
                paramMap: {
                    cSubjectId: '',//学科
                    cPhaseId: '',//学段
                },

                //文档上传参数
                docParamMap: {
                    knowledgeIds: {
                        syncIds: [], specIds: []
                    },
                    file: [],//上传文件
                },

                //在线录入参数
                onlineParamMap: {
                    status: true,//1-启用，2-不启用
                    knowledgeIds: {
                        syncIds: [], specIds: []
                    },
                },

                //文件检测数据参数
                detectParam: {
                    errorMsg: '',
                    parseMsg: '',
                    questions: [],
                },

                //字典列表
                options: {
                    phaseList: [],
                    subjectList: [],
                }
            }
        },
        created() {
            this.initHandle();
        },
        methods: {
            /**
             *@desc 初始数据处理
             */
            async initHandle() {
                //填充学科和学段
                this.options.phaseList = await api.getParameterInfoByCode({paramCode: 'Phase', status: 1});
                this.options.subjectList = await api.getParameterInfoByCode({paramCode: 'Subject', status: 1});
            },

            /**
             *@desc 重置页面信息
             */
            resetPage() {
                this.paramMap.cSubjectId = '';
                this.paramMap.cPhaseId = '';
                this.topMsgChange();//清空信息
            },

            /**
             *@desc 修改学科或学段时
             */
            topMsgChange() {
                this.docParamMap.knowledgeIds.syncIds = [];
                this.docParamMap.knowledgeIds.specIds = [];
                this.docParamMap.file = [];
                this.onlineParamMap.knowledgeIds.specIds = [];
                this.onlineParamMap.knowledgeIds.syncIds = [];

                // this.$refs.topic.getQuestionType();//在线录入的题型列表
            },

            /**
             *@desc 修改知识点时
             */
            knowledgeChange(val, type) {
                this.paramMap.cSubjectId = val.paramMap.cSubjectId;//重置值
                this.paramMap.cPhaseId = val.paramMap.cPhaseId;//重置值
                if (type === 1) {
                    this.docParamMap.file = [];//清空上传文件
                } else {
                    // this
                }
            },

            /**
             *@desc 文档上传-上传前验证
             */
            onBeforeFile(file) {
                if (!file.name.includes('doc')) {
                    this.$message.error('只能上传doc文档!');
                    return false;
                } else {
                    this.docParamMap.file = [];//清空上传列表，每次只上传最近上传的
                    return true;
                }
            },

            /**
             *@desc 文档上传-保存文件信息
             */
            onFileUpload(fileObj) {
                this.docParamMap.file = [fileObj.file];
            },

            /**
             *@desc 文档上传-上传并检测解析文件
             */
            onResolveFile() {
                let formData = new FormData();
                if (this.docParamMap.file[0]) {
                    formData.append('file', this.docParamMap.file[0]);
                    api.fileCheckAnalyse(formData).then(res => {
                        Object.assign(this.detectParam, res);
                        this.currentPage = 'detect';
                    }).catch(err => {
                    })
                } else {
                    this.$message.error('请选择文件');
                }
            },

            /**
             *@desc 文档上传-确定导入
             */
            importFile() {
                let knowledgeIds = this.docParamMap.knowledgeIds.specIds.concat(this.docParamMap.knowledgeIds.syncIds);

                api.bulkImport({
                    subjectId: this.paramMap.cSubjectId,
                    phaseId: this.paramMap.cPhaseId,
                    knowledgeIds: knowledgeIds.map(item => {
                        return item.knowledgeId
                    }),
                    questions: this.detectParam.questions
                }).then(res => {
                    this.$message.success('导入成功');
                    this.resetPage();//重置页面信息
                    this.currentPage = 'upload';
                }).catch(err => {

                })
            },

            /**
             *@desc 文档上传-返回
             */
            backHandle() {
                this.currentPage = 'upload';
            },

            /**
             *@desc 在线录入-保存录入结果
             */
            // saveOnlineTest(val) {
            //     this.$message.success('待确定');
            // },
        }
    }
</script>

<style lang="scss">
    .jr-testBank-topicUpload {
        .wrap {
            padding-left: 15px;
        }

        .color-red {
            .el-textarea__inner {
                color: #F2545A;
            }
        }
    }

</style>