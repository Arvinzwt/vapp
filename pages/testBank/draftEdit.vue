<template>
    <el-main class="jr-testBank-draftEdit">
        <div class="jr-title">
            <h2>题目编辑</h2>
        </div>
        <div class="jr-tag">
            <div class="jr-tag-item mar-r-15">数学</div>
            <div class="jr-tag-item">初中</div>
        </div>

        <div>
            <h3 class="jr-subtitle">所属知识点</h3>
            <div class="box">
                <div class="box-item mar-b-15">
                    <div class="box-left">
                        <KnowledgeTree v-model="paramMap.knowledgeIds1">同步</KnowledgeTree>
                    </div>
                    <div class="box-right">
                        <div class="jr-tag">
                            <div class="jr-tag-item" v-for="item in paramMap.knowledgeIds1"
                                 :key="item.knowledgeId">
                                <span>{{item.name}}</span>
                                <span @click="removeKnowledge(item,1)" class="icon el-icon-close"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="box-item mar-b-15">
                    <div class="box-left">
                        <KnowledgeTree v-model="paramMap.knowledgeIds2">专题
                        </KnowledgeTree>
                    </div>
                    <div class="box-right">
                        <div class="jr-tag">
                            <div class="jr-tag-item" v-for="item in paramMap.knowledgeIds2"
                                 :key="item.knowledgeId">
                                <span>{{item.name}}</span>
                                <span @click="removeKnowledge(item,2)" class="icon el-icon-close"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <h3 class="jr-subtitle">题型</h3>
            <el-form
                class="jr-filter-form box"
                size="mini"
                label-width="70px"
                label-position="left">
                <el-form-item label="题型">
                    <el-radio-group v-model="paramMap.qTypeId">
                        <el-radio :label="3">备选项</el-radio>
                        <el-radio :label="6">备选项</el-radio>
                        <el-radio :label="9">备选项</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-row :gutter="18">
                    <el-col :span="6">
                        <el-form-item label="年份">
                            <el-date-picker
                                v-model="paramMap.yearId"
                                type="date"
                                format="yyyy"
                                placeholder="请选择">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="来源">
                            <el-select v-model="paramMap.sourceId" placeholder="请选择">
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
                            <el-select v-model="paramMap.provinceId" placeholder="请选择">
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
                            <el-select v-model="paramMap.cityId" placeholder="请选择">
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
                            <el-select v-model="paramMap.categoryId" placeholder="请选择">
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
                            <el-select v-model="paramMap.difficultyId" placeholder="请选择">
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
                    <!--<el-input v-model="paramMap.content"/>-->
                    <div id="editor"></div>
                </el-form-item>

                <el-form-item label="选项A">
                    <!--<el-input v-model="paramMap.optionA"/>-->
                    <div id="editor2"></div>
                </el-form-item>
                <el-form-item label="选项B">
                    <!--<el-input v-model="paramMap.optionB"/>-->
                    <div id="editor3"></div>
                </el-form-item>
                <el-form-item label="选项C">
                    <!--<el-input v-model="paramMap.optionC"/>-->
                    <div id="editor4"></div>
                </el-form-item>
                <el-form-item label="选项D">
                    <!--<el-input v-model="paramMap.optionD"/>-->
                    <div id="editor5"></div>
                </el-form-item>
                <el-form-item label="答案">
                    <!--<el-input v-model="paramMap.answer"/>-->
                    <div id="editor6"></div>
                </el-form-item>
                <el-form-item label="解答">
                    <!--<el-input v-model="paramMap.reply"/>-->
                    <div id="editor7"></div>
                </el-form-item>
                <el-form-item label="分析">
                    <!--<el-input v-model="paramMap.analyse"/>-->
                    <div id="editor8"></div>
                </el-form-item>
                <el-form-item label="点评">
                    <!--<el-input v-model="paramMap.appraise"/>-->
                    <div id="editor9"></div>
                </el-form-item>

                <el-row :gutter="18">
                    <el-col :span="6">

                        <el-form-item label="排列">
                            <el-select v-model="paramMap.itemRule" placeholder="请选择">
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
                            <el-input v-model="paramMap.questionScore" type="number"/>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="">
                    <el-button type="primary" @click="saveOnlineTest">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import KnowledgeTree from '~/components/testBank/KnowledgeTree.vue'
    import api from '@/config/module/common'

    export default {
        name: "draftEdit",
        components: {
            linkGroup,
            KnowledgeTree,
        },
        data() {
            return {
                paramMap: {
                    knowledgeIds1: [],
                    knowledgeIds2: [],


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
        mounted() {
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
            removeKnowledge() {

            },
            saveOnlineTest(){

            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/testBank.scss";

    .jr-testBank-draftEdit{
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