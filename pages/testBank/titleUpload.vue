<template>
    <el-main class="jr-testBank-titleUpload">
        <div class="jr-title">
            <h2>题目上传</h2>
            <a class="link color-blue font-basic" href="http://guanjia.onesmart.org:991/helper/ExciseUpload-guide.html"
               target="_blank">
                <span class="el-icon-warning-outline"></span>
                <span>查看学习管家操作指南</span>
            </a>
        </div>

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
                <linkGroup class="linkGroup2" v-model="paramMap.phaseId"
                           :options="options.phaseList"></linkGroup>
            </el-form-item>

            <el-form-item label="是否启用" v-if="currentPage==='0-2'">
                <el-checkbox v-model="onlineParamMap.status"></el-checkbox>
            </el-form-item>
        </el-form>

        <!--上传内容-->
        <el-tabs v-model="currentPage">
            <el-tab-pane label="文档上传" name="0-1">
                <!--所属知识点-->
                <h3 class="jr-subtitle" :key="1">所属知识点</h3>
                <div class="box">
                    <div class="box-item mar-b-15">
                        <div class="box-left">
                            <KnowledgeTree v-model="docParamMap.knowledgeIds1"
                                           :disabled="knowledgeBtnIsDis">同步
                            </KnowledgeTree>
                        </div>
                        <div class="box-right">
                            <div class="jr-tag">
                                <div class="jr-tag-item" v-for="item in docParamMap.knowledgeIds1"
                                     :key="item.knowledgeId">
                                    <span>{{item.name}}</span>
                                    <span @click="removeKnowledge(item,1)" class="icon el-icon-close"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="box-item mar-b-15">
                        <div class="box-left">
                            <KnowledgeTree v-model="docParamMap.knowledgeIds2"
                                           :type="2"
                                           :disabled="knowledgeBtnIsDis">专题
                            </KnowledgeTree>
                        </div>
                        <div class="box-right">
                            <div class="jr-tag">
                                <div class="jr-tag-item" v-for="item in docParamMap.knowledgeIds2"
                                     :key="item.knowledgeId">
                                    <span>{{item.name}}</span>
                                    <span @click="removeKnowledge(item,2)" class="icon el-icon-close"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--上传文件-->
                <h3 class="jr-subtitle" :key="2">上传文件</h3>
                <div class="box">
                    <div class="mar-b-15">
                        <el-upload
                            ref="uploadBom"
                            action=""
                            :show-file-list="true"
                            :auto-upload="true"
                            :file-list="docParamMap.file"
                            :limit="1"
                            :on-exceed="onFileExceed"
                            :http-request="onFileUpload">
                            <el-button size="small" type=""
                                       :disabled="!(docParamMap.knowledgeIds1.length>0||docParamMap.knowledgeIds2.length>0)">
                                选择文件
                            </el-button>
                        </el-upload>
                    </div>
                    <div class="mar-b-15">
                        <!--:disabled="docParamMap.file.length===0"-->
                        <el-button size="mini" @click="onResolveFile"
                                   type="primary">检测解析
                        </el-button>
                    </div>
                </div>
            </el-tab-pane>

            <el-tab-pane label="在线录入" name="0-2">
                <!--所属知识点-->
                <h3 class="jr-subtitle" :key="3">所属知识点</h3>
                <div class="box">
                    <div class="box-item mar-b-15">
                        <div class="box-left">
                            <KnowledgeTree v-model="onlineParamMap.knowledgeIds1"
                                           :disabled="knowledgeBtnIsDis">同步
                            </KnowledgeTree>
                        </div>
                        <div class="box-right">
                            <div class="jr-tag">
                                <div class="jr-tag-item" v-for="item in onlineParamMap.knowledgeIds1"
                                     :key="item.knowledgeId">
                                    <span>{{item.name}}</span>
                                    <span @click="removeKnowledge(item,1)" class="icon el-icon-close"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="box-item mar-b-15">
                        <div class="box-left">
                            <KnowledgeTree v-model="onlineParamMap.knowledgeIds2"
                                           :disabled="knowledgeBtnIsDis">专题
                            </KnowledgeTree>
                        </div>
                        <div class="box-right">
                            <div class="jr-tag">
                                <div class="jr-tag-item" v-for="item in onlineParamMap.knowledgeIds2"
                                     :key="item.knowledgeId">
                                    <span>{{item.name}}</span>
                                    <span @click="removeKnowledge(item,2)" class="icon el-icon-close"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--题型-->
                <div v-show="(onlineParamMap.knowledgeIds1.length>0||onlineParamMap.knowledgeIds2.length>0)">
                    <h3 class="jr-subtitle" :key="4">知识点</h3>
                    <el-form
                        class="jr-filter-form box"
                        size="mini"
                        label-width="70px"
                        label-position="left">
                        <el-form-item label="题型">
                            <el-radio-group v-model="onlineParamMap.qTypeId">
                                <el-radio :label="3">备选项</el-radio>
                                <el-radio :label="6">备选项</el-radio>
                                <el-radio :label="9">备选项</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-row :gutter="18">
                            <el-col :span="6">
                                <el-form-item label="年份">
                                    <el-date-picker
                                        v-model="onlineParamMap.yearId"
                                        type="date"
                                        format="yyyy"
                                        placeholder="请选择">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="来源">
                                    <el-select v-model="onlineParamMap.sourceId" placeholder="请选择">
                                        <el-option
                                            v-for="item in options.sourceList"
                                            :key="item.parameterId"
                                            :label="item.parameterValue"
                                            :value="item.parameterId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="省份">
                                    <el-select v-model="onlineParamMap.provinceId" placeholder="请选择">
                                        <el-option
                                            v-for="item in options.provinceList"
                                            :key="item.parameterId"
                                            :label="item.parameterValue"
                                            :value="item.parameterId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="城市">
                                    <el-select v-model="onlineParamMap.cityId" placeholder="请选择">
                                        <el-option
                                            v-for="item in options.cityList"
                                            :key="item.parameterId"
                                            :label="item.parameterValue"
                                            :value="item.parameterId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row :gutter="18">
                            <el-col :span="6">
                                <el-form-item label="类别">
                                    <el-select v-model="onlineParamMap.categoryId" placeholder="请选择">
                                        <el-option
                                            v-for="item in options.categoryList"
                                            :key="item.parameterId"
                                            :label="item.parameterValue"
                                            :value="item.parameterId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>

                            <el-col :span="6">
                                <el-form-item label="难度">
                                    <el-select v-model="onlineParamMap.difficultyId" placeholder="请选择">
                                        <el-option
                                            v-for="item in options.difficultyList"
                                            :key="item.parameterId"
                                            :label="item.parameterValue"
                                            :value="item.parameterId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="题干">
                            <!--<el-input v-model="onlineParamMap.content"/>-->
                            <div id="editor"></div>
                        </el-form-item>

                        <el-form-item label="选项A">
                            <!--<el-input v-model="onlineParamMap.optionA"/>-->
                            <div id="editor2"></div>
                        </el-form-item>
                        <el-form-item label="选项B">
                            <!--<el-input v-model="onlineParamMap.optionB"/>-->
                            <div id="editor3"></div>
                        </el-form-item>
                        <el-form-item label="选项C">
                            <!--<el-input v-model="onlineParamMap.optionC"/>-->
                            <div id="editor4"></div>
                        </el-form-item>
                        <el-form-item label="选项D">
                            <!--<el-input v-model="onlineParamMap.optionD"/>-->
                            <div id="editor5"></div>
                        </el-form-item>
                        <el-form-item label="答案">
                            <!--<el-input v-model="onlineParamMap.answer"/>-->
                            <div id="editor6"></div>
                        </el-form-item>
                        <el-form-item label="解答">
                            <!--<el-input v-model="onlineParamMap.reply"/>-->
                            <div id="editor7"></div>
                        </el-form-item>
                        <el-form-item label="分析">
                            <!--<el-input v-model="onlineParamMap.analyse"/>-->
                            <div id="editor8"></div>
                        </el-form-item>
                        <el-form-item label="点评">
                            <!--<el-input v-model="onlineParamMap.appraise"/>-->
                            <div id="editor9"></div>
                        </el-form-item>

                        <el-row :gutter="18">
                            <el-col :span="6">

                                <el-form-item label="排列">
                                    <el-select v-model="onlineParamMap.itemRule" placeholder="请选择">
                                        <el-option
                                            v-for="item in options.itemRuleList"
                                            :key="item.parameterId"
                                            :label="item.parameterValue"
                                            :value="item.parameterId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="分值">
                                    <el-input v-model="onlineParamMap.questionScore" type="number"/>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-form-item label="">
                            <el-button type="primary" @click="saveOnlineTest">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>

        </el-tabs>
    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import KnowledgeTree from '~/components/testBank/KnowledgeTree.vue'
    import api from '@/config/module/common'

    export default {
        name: "titleUpload",
        components: {
            linkGroup,
            KnowledgeTree,
        },
        computed: {
            knowledgeBtnIsDis() {
                return !(this.paramMap.subjectId !== '' && this.paramMap.phaseId !== '')
            },
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
                    file: [],//上传文件
                    knowledgeIds1: [],
                    knowledgeIds2: [],
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
        async mounted() {
            ckeditorInit();
            CKEDITOR.replace('editor2');
            CKEDITOR.replace('editor3');
            CKEDITOR.replace('editor4');
            CKEDITOR.replace('editor5');
            CKEDITOR.replace('editor6');
            CKEDITOR.replace('editor7');
            CKEDITOR.replace('editor8');
            CKEDITOR.replace('editor9');
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
                this.$r.go('0-2', {id: 12222});
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

    .jr-testBank-titleUpload {
        .box {
            padding-left: 10px;

            .box-item {
                display: flex;
                align-items: center;
            }

            .box-left {
                margin: 5px 0;
            }

            .box-right {
                margin-left: 20px;
            }

            .jr-tag {
                margin: 5px 20px 5px 0;
            }
        }
    }
</style>