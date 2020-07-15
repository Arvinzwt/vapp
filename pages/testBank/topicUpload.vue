<template>
    <el-main class="jr-testBank-topicUpload">
        <div v-show="currentPage==='upload'">
            <Title haveLink>文档上传</Title>

            <!--筛选内容-->
            <el-form
                class="jr-filter-form"
                size="mini"
                label-width="70px"
                label-position="left">
                <el-form-item label="学科">
                    <linkGroup class="linkGroup1" v-model="paramMap.subjectId" :options="options.subjectList"
                               @change="topMsgChange"></linkGroup>
                </el-form-item>
                <el-form-item label="学段">
                    <linkGroup class="linkGroup2" v-model="paramMap.phaseId" :options="options.phaseList"
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
                    <h3 class="jr-subtitle 1">所属知识点</h3>
                    <div class="wrap">
                        <KnowledgeTree v-model="docKnowledgeTreeModel"
                                       :disabled="canSelectKnowledgeBtnIs"
                                       @change="knowledgeChange"></KnowledgeTree>
                    </div>

                    <!--文件-->
                    <h3 class="jr-subtitle 2">上传文件</h3>
                    <div class="mar-l-15">
                        <el-upload
                            ref="uploadBom"
                            action=""
                            :show-file-list="true"
                            :auto-upload="true"
                            :file-list="docParamMap.file"
                            :limit="1"
                            :disabled="canUploadFile"
                            :on-exceed="onFileExceed"
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
                </el-tab-pane>

                <!--在线录入-->
                <el-tab-pane label="在线录入" name="0-2">
                    <!--所属知识点-->
                    <h3 class="jr-subtitle 2">所属知识点</h3>
                    <div class="wrap">
                        <KnowledgeTree v-model="onlineKnowledgeTreeModel"
                                       :disabled="canSelectKnowledgeBtnIs"></KnowledgeTree>
                    </div>

                    <!--题型-->
                    <div v-show="canEditTopicType">
                        <h3 class="jr-subtitle 3">知识点</h3>
                        <Topic class="mar-l-15" :param="paramMap" ref="topic" @change="saveOnlineTest"></Topic>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div v-show="currentPage==='detect'">
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
    import KnowledgeTree from '~/components/testBank/KnowledgeTree.vue'
    import Topic from '~/components/testBank/Topic.vue'
    import Title from '~/components/testBank/Title.vue'
    import api from '@/config/module/testBank'

    export default {
        name: "topicUpload",
        components: {
            linkGroup,
            KnowledgeTree,
            Topic,
            Title,
        },
        computed: {
            //判断能否选择知识点
            canSelectKnowledgeBtnIs() {
                return !(this.paramMap.subjectId !== '' && this.paramMap.phaseId !== '')
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
            //文档上传默认传参
            docKnowledgeTreeModel: {
                get() {
                    return {
                        syncIds: this.docParamMap.knowledgeIds.syncIds,
                        specIds: this.docParamMap.knowledgeIds.specIds,
                        c_subjectId: this.paramMap.subjectId,//学科
                        c_phaseId: this.paramMap.phaseId,//学段
                    }
                },
                set(val) {
                    this.docParamMap.knowledgeIds = {
                        syncIds: val.syncIds,
                        specIds: val.specIds,
                    };
                }

            },
            onlineKnowledgeTreeModel: {
                get() {
                    return {
                        syncIds: this.onlineParamMap.knowledgeIds.syncIds,
                        specIds: this.onlineParamMap.knowledgeIds.specIds,
                        c_subjectId: this.paramMap.subjectId,//学科
                        c_phaseId: this.paramMap.phaseId,//学段
                    }
                },
                set(val) {
                    this.onlineParamMap.knowledgeIds = {
                        syncIds: val.syncIds,
                        specIds: val.specIds,
                    };
                }
            }
        },
        data() {
            return {
                currentModel: '0-2',// 当前模块 0-1文档上传 0-2在线录入
                currentPage: 'upload',//upload题目上传，detect题目检测

                //公共页面参数
                paramMap: {
                    subjectId: 7,//学科
                    phaseId: 14,//学段
                },

                //文档上传参数
                docParamMap: {
                    knowledgeIds: {
                        syncIds: [
                            {
                                knowledgeId: 2,
                                knowledgeUuid: "87c180c2-c5f4-4c62-978a-4455c38e206b",
                                name: "人口",
                                parentId: 1,
                                remark: null,
                            }
                        ],
                        specIds: []
                    },
                    file: [],//上传文件
                },

                //在线录入参数
                onlineParamMap: {
                    status: true,//1-启用，2-不启用
                    knowledgeIds: {
                        syncIds: [
                            {
                                knowledgeId: 2,
                                knowledgeUuid: "87c180c2-c5f4-4c62-978a-4455c38e206b",
                                name: "人口",
                                parentId: 1,
                                remark: null,
                            }
                        ], specIds: []
                    },
                },

                //文件检测数据参数
                detectParam: {
                    errorMsg: '检测结果正常',
                    parseMsg: '检测结果正常',
                    questions: [],
                },

                //字典列表
                options: {
                    subjectList: [],//学科
                    phaseList: [],//学段
                }
            }
        },
        async created() {
            //填充学科和学段
            this.options.phaseList = (await api.getParameterInfoByCode({paramCode: 'Phase', status: 1})) || [];
            this.options.subjectList = (await api.getParameterInfoByCode({paramCode: 'Subject', status: 1})) || [];

        },
        methods: {
            /**
             *@desc 修改学科或学段时
             */
            topMsgChange() {
                this.docParamMap.knowledgeIds.syncIds = [];
                this.docParamMap.knowledgeIds.specIds = [];
                this.docParamMap.file = [];
                this.onlineParamMap.knowledgeIds.specIds = [];
                this.onlineParamMap.knowledgeIds.syncIds = [];

                this.$refs.topic.getQuestionType();//在线录入的题型列表
            },

            /**
             *@desc 修改知识点时
             */
            knowledgeChange(val) {
                this.docParamMap.file = [];//清空上传文件
            },

            /**
             *@desc 上传-上传前验证
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
             *@desc 文档上传-上传-文件超出个数
             */
            onFileExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },

            /**
             *@desc 文档上传-上传-上传函数
             */
            onFileUpload(fileObj) {
                this.docParamMap.file = [fileObj.file];
            },

            /**
             *@desc 文档上传-检测解析文件
             */
            onResolveFile() {
                //
                // this.$r.go('0-5', {file: this.docParamMap.file});
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
             *@desc 在线录入-保存录入结果
             */
            saveOnlineTest(val) {
                this.$message.success('录入成功');
            },

            /**
             *@desc 文档上传-返回
             */
            backHandle() {
                this.currentPage = 'upload';
            },

            /**
             *@desc 文档上传-确定导入
             */
            importFile() {
                let knowledgeIds = this.onlineParamMap.knowledgeIds.specIds.concat(this.onlineParamMap.knowledgeIds.syncIds);
                api.bulkImport({
                    subjectId: this.paramMap.subjectId,
                    phaseId: this.paramMap.phaseId,
                    knowledgeIds: knowledgeIds.map(item => {
                        return item.knowledgeId
                    }),
                    questions: this.detectParam.questions
                }).then(res => {
                    this.$message.success('导入成功');
                    this.currentPage = 'upload';
                }).catch(err => {

                })
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/testBank.scss";

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