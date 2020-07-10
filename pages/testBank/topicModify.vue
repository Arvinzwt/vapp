<template>
    <el-main class="jr-testBank-topicModify">
        <!--title-->
        <Title>题目修改</Title>

        <!--筛选-->
        <el-form
            class="jr-filter-form"
            size="mini"
            label-width="70px"
            label-position="left">
            <!-- <el-form-item label="类型">
                 <linkGroup class="linkGroup1" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
             </el-form-item>-->
            <el-form-item label="学科">
                <linkGroup class="linkGroup2" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
            </el-form-item>
            <!-- <el-form-item label="版本">
                 <linkGroup class="linkGroup3" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
             </el-form-item>
             <el-form-item label="年级">
                 <linkGroup class="linkGroup4" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
             </el-form-item>
             <el-form-item label="学期">
                 <linkGroup class="linkGroup5" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
             </el-form-item>-->
            <el-form-item label="状态">
                <linkGroup class="linkGroup6" v-model="paramMap.status" :options="options.subjectList"></linkGroup>
            </el-form-item>

            <el-form-item label="知识点">
                <!--<div class="knowledge-wrap">
                    <div class="knowledge-wrap-item">
                        <div class="knowledge-wrap-left">
                            <KnowledgeTree v-model="paramMap.knowledgeIds">
                                选择知识点
                            </KnowledgeTree>
                        </div>
                        <div class="knowledge-wrap-right jr-tag">
                            <div class="jr-tag-item" v-for="item in paramMap.knowledgeIds"
                                 :key="item.knowledgeId">
                                <span>{{item.name}}</span>
                                <span @click="removeKnowledge(item)" class="icon el-icon-close"></span>
                            </div>
                        </div>
                    </div>
                </div>-->
                <div class="knowledge-wrap">
                    <div class="knowledge-wrap-item">
                        <div class="knowledge-wrap-left">
                            <KnowledgeTree v-model="paramMap.knowledgeIds1">同步
                            </KnowledgeTree>
                        </div>
                        <div class="knowledge-wrap-right jr-tag">
                            <div class="jr-tag-item" v-for="item in paramMap.knowledgeIds1"
                                 :key="item.knowledgeId">
                                <span>{{item.name}}</span>
                                <span @click="removeKnowledge(item,1)" class="icon el-icon-close"></span>
                            </div>
                        </div>
                    </div>

                    <div class="knowledge-wrap-item">
                        <div class="knowledge-wrap-left">
                            <KnowledgeTree v-model="paramMap.knowledgeIds2"
                                           :type="2">专题
                            </KnowledgeTree>
                        </div>
                        <div class="knowledge-wrap-right jr-tag">
                            <div class="jr-tag-item" v-for="item in paramMap.knowledgeIds2" :key="item.name">
                                <span>{{item.name}}</span>
                                <span @click="removeKnowledge(item,2)" class="icon el-icon-close"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </el-form-item>

            <el-form-item label-width="0">
                <el-link type="primary" class="font-basic" @click="filterShow=!filterShow">
                    <span>高级筛选</span>
                    <span v-show="!filterShow" class="icon el-icon-arrow-down"></span>
                    <span v-show="filterShow" class="el-icon-arrow-up"></span>
                </el-link>
            </el-form-item>

            <div v-show="filterShow">
                <el-form-item label="省份">
                    <linkGroup class="linkGroup6" v-model="paramMap.subjectId"
                               :options="options.subjectList"></linkGroup>
                </el-form-item>
                <el-form-item label="城市">
                    <linkGroup class="linkGroup6" v-model="paramMap.subjectId"
                               :options="options.subjectList"></linkGroup>
                </el-form-item>
                <el-form-item label="类别">
                    <linkGroup class="linkGroup6" v-model="paramMap.subjectId"
                               :options="options.subjectList"></linkGroup>
                </el-form-item>
                <el-form-item label="来源">
                    <linkGroup class="linkGroup6" v-model="paramMap.subjectId"
                               :options="options.subjectList"></linkGroup>
                </el-form-item>
                <el-form-item label="题型">
                    <linkGroup class="linkGroup6" v-model="paramMap.subjectId"
                               :options="options.subjectList"></linkGroup>
                </el-form-item>
                <el-form-item label="程度">
                    <linkGroup class="linkGroup6" v-model="paramMap.subjectId"
                               :options="options.subjectList"></linkGroup>
                </el-form-item>
                <el-form-item label="年份">
                    <linkGroup class="linkGroup6" v-model="paramMap.subjectId"
                               :options="options.subjectList"></linkGroup>
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
                        <el-input placeholder="题目编号/题干内容" v-model="paramMap.keyWorld"></el-input>
                    </div>
                    <el-button type="primary">搜索</el-button>
                </div>
            </el-form-item>

        </el-form>

        <div class="wrap">
            <TopicList></TopicList>
        </div>
    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import KnowledgeTree from '~/components/testBank/KnowledgeTree.vue'
    import TopicList from '~/components/testBank/TopicList.vue'
    import Title from '~/components/testBank/Title.vue'

    import api from '@/config/module/testBank'

    export default {
        name: "topicModify",
        components: {
            linkGroup,
            KnowledgeTree,
            TopicList,
            Title,

        },
        data() {
            return {
                filterShow: false,
                paramMap: {
                    subjectId: '',
                    time: [],
                    knowledgeIds1: [],
                    knowledgeIds2: [],
                },
                options: {
                    subjectList: [
                        {
                            "parameterId": 1,
                            "parameterName": "",
                            "parameterValue": '选项1',
                            "parameterCode": '',
                            "parameterStatus": 1
                        },
                        {
                            "parameterId": 2,
                            "parameterName": "",
                            "parameterValue": '选项2',
                            "parameterCode": '',
                            "parameterStatus": 1
                        }
                    ]
                }
            }
        },
        created() {
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
            removeKnowledge() {

            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/testBank.scss";

    .jr-testBank-topicModify{
        .flex-box {
            display: flex;
        }

        .wid-300 {
            width: 300px;
            margin-right: 20px;
        }

        .wrap{
            margin-top: 50px;
        }
    }
</style>