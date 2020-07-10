<template>
    <el-main class="jr-testBank-topicUpload">
        <Title>
            <template>文档上传</template>
            <template slot="expand">
                <a class="link color-blue font-basic"
                   href="http://guanjia.onesmart.org:991/helper/ExciseUpload-guide.html"
                   target="_blank">
                    <span class="el-icon-warning-outline"></span>
                    <span>查看学习管家操作指南</span>
                </a>
            </template>
        </Title>

        <!--筛选内容-->
        <el-form
            class="jr-filter-form"
            size="mini"
            label-width="70px"
            label-position="left">
            <el-form-item label="学科">
                <linkGroup class="linkGroup1" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
            </el-form-item>

            <el-form-item label="学段">
                <linkGroup class="linkGroup2" v-model="paramMap.phaseId" :options="options.phaseList"></linkGroup>
            </el-form-item>

            <el-form-item label="是否启用" v-if="currentPage==='0-2'">
                <el-checkbox v-model="onlineParamMap.status"></el-checkbox>
            </el-form-item>
        </el-form>

        <!--内容-->
        <el-tabs v-model="currentPage">
            <!--文档上传-->
            <el-tab-pane label="文档上传" name="0-1">
                <!--所属知识点-->
                <div>
                    <h3 class="jr-subtitle 1">所属知识点</h3>
                    <div class="knowledge-wrap mar-l-15 mar-b-15">
                        <div class="knowledge-wrap-item">
                            <div class="knowledge-wrap-left">
                                <KnowledgeTree v-model="docParamMap.knowledgeIds1" :disabled="knowledgeBtnIsDis">同步
                                </KnowledgeTree>
                            </div>
                            <div class="knowledge-wrap-right jr-tag">
                                <div class="jr-tag-item" v-for="item in docParamMap.knowledgeIds1"
                                     :key="item.knowledgeId">
                                    <span>{{item.name}}</span>
                                    <span @click="removeKnowledge(item,1)" class="icon el-icon-close"></span>
                                </div>
                            </div>
                        </div>

                        <div class="knowledge-wrap-item">
                            <div class="knowledge-wrap-left">
                                <KnowledgeTree v-model="docParamMap.knowledgeIds2" :disabled="knowledgeBtnIsDis"
                                               :type="2">专题
                                </KnowledgeTree>
                            </div>
                            <div class="knowledge-wrap-right jr-tag">
                                <div class="jr-tag-item" v-for="item in docParamMap.knowledgeIds2" :key="item.name">
                                    <span>{{item.name}}</span>
                                    <span @click="removeKnowledge(item,2)" class="icon el-icon-close"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--上传文件-->
                <div>
                    <h3 class="jr-subtitle 2">上传文件</h3>
                    <div class="mar-l-15">
                        <div class="mar-b-15">
                            <el-upload
                                ref="uploadBom"
                                action=""
                                :show-file-list="true"
                                :auto-upload="true"
                                :file-list="docParamMap.file"
                                :limit="1"
                                :on-exceed="onFileExceed"
                                :disabled="!(docParamMap.knowledgeIds1.length>0||docParamMap.knowledgeIds2.length>0)"
                                :http-request="onFileUpload">
                                <el-button size="small"
                                           :disabled="!(docParamMap.knowledgeIds1.length>0||docParamMap.knowledgeIds2.length>0)"
                                           type="">
                                    选择文件
                                </el-button>
                            </el-upload>
                        </div>
                        <div class="mar-b-15">
                            <el-button size="mini" :disabled="docParamMap.file.length===0" @click="onResolveFile"
                                       type="primary">检测解析
                            </el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <!--在线录入-->
            <el-tab-pane label="在线录入" name="0-2">
                <!--所属知识点-->
                <div>
                    <h3 class="jr-subtitle" :key="3">所属知识点</h3>
                    <div class="knowledge-wrap mar-l-15 mar-b-15">
                        <!--同步-->
                        <div class="knowledge-wrap-item">
                            <div class="knowledge-wrap-left">
                                <KnowledgeTree v-model="onlineParamMap.knowledgeIds1" :disabled="knowledgeBtnIsDis">同步
                                </KnowledgeTree>
                            </div>
                            <div class="knowledge-wrap-right jr-tag">
                                <div class="jr-tag-item" v-for="item in onlineParamMap.knowledgeIds1"
                                     :key="item.knowledgeId">
                                    <span>{{item.name}}</span>
                                    <span @click="removeKnowledge(item,1)" class="icon el-icon-close"></span>
                                </div>
                            </div>
                        </div>

                        <!--专题-->
                        <div class="knowledge-wrap-item">
                            <div class="knowledge-wrap-left">
                                <KnowledgeTree v-model="onlineParamMap.knowledgeIds2" :disabled="knowledgeBtnIsDis"
                                               :type="2">专题
                                </KnowledgeTree>
                            </div>
                            <div class="knowledge-wrap-right jr-tag">
                                <div class="jr-tag-item" v-for="item in onlineParamMap.knowledgeIds2" :key="item.name">
                                    <span>{{item.name}}</span>
                                    <span @click="removeKnowledge(item,2)" class="icon el-icon-close"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--题型-->
                <div v-show="(onlineParamMap.knowledgeIds1.length>0||onlineParamMap.knowledgeIds2.length>0)">
                    <h3 class="jr-subtitle 4">知识点</h3>
                    <Topic @change="saveOnlineTest"></Topic>
                </div>

            </el-tab-pane>
        </el-tabs>
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
            knowledgeBtnIsDis() {
                return !(this.paramMap.subjectId !== '' && this.paramMap.phaseId !== '')
                // return false
            }
        },
        data() {
            return {
                // 当前模块
                currentPage: '0-1',//0-1文档上传 0-2在线录入

                //公共页面参数
                paramMap: {
                    subjectId: '',//学科
                    phaseId: '',//学段
                },

                //文档上传参数
                docParamMap: {
                    knowledgeIds1: [],
                    knowledgeIds2: [],
                    file: [],//上传文件
                },

                //在线录入参数
                onlineParamMap: {
                    status: 0,//1-启用，2-不启用
                    knowledgeIds1: [],//知识树id
                    knowledgeIds2: [],//知识树id

                    qTypeId: '',//题型
                    yearId: '',//年份
                    categoryId: '',//题型类别
                    sourceId: '',//来源
                    provinceId: '',//省份
                    cityId: '',//城市
                    difficultyId: '',//难度
                    content: '',//题目内容
                    optionA: '',//选择题A
                    optionB: '',//选择题B
                    optionC: '',//选择题C
                    optionD: '',//选择题D
                    appraise: '',//评估
                    answer: '',//答案
                    analyse: '',//分析
                    reply: '',//解答
                    questionScore: '',//分值
                    itemRule: '',//排放顺序
                },

                //字典列表
                options: {
                    subjectList: [],//学科
                    phaseList: [],//学段

                    qTypeList: [],//题型
                    categoryList: [],//题型类别
                    sourceList: [],//来源
                    provinceList: [],//省份
                    cityList: [],//城市
                    difficultyList: [],//难度
                    itemRuleList: [],//排序
                }
            }
        },
        async created() {
            //填充学科和学段
            this.options.phaseList = await api.getParameterInfo({paramCode: 'Phase', status: 1});
            this.options.subjectList = await api.getParameterInfo({paramCode: 'Subject', status: 1});
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
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
             *@desc 文档上传-移除知识点
             */
            removeKnowledge(target, type) {
                let obj = {};

                if (this.currentPage === '0-1') {
                    obj = type === 1 ? this.docParamMap.knowledgeIds1 : this.docParamMap.knowledgeIds2;
                } else {
                    obj = type === 1 ? this.onlineParamMap.knowledgeIds1 : this.onlineParamMap.knowledgeIds2;
                }

                obj.forEach((item, index) => {
                    if (item.knowledgeId === target.knowledgeId) {
                        obj.splice(index, 1);
                        return false;
                    }
                })
            },

            /**
             *@desc 文档上传-检测解析文件
             */
            onResolveFile() {
                this.$r.go('0-5', {id: 12222});
            },

            /**
             *@desc 在线录入-保存录入结果
             */
            saveOnlineTest() {
                // console.log(this.onlineParamMap)
                // CKEDITOR.instances.editor.getData()
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/testBank.scss";
</style>