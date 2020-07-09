<template>
    <el-main class="jr-testBank-myTopic">
        <div class="jr-title">
            <h2>我的题目</h2>
            <el-link type="primary" class="font-basic" :underline="false" @click="filterShow=!filterShow">
                <span>高级筛选</span>
                <span v-show="!filterShow" class="el-icon-arrow-down"></span>
                <span v-show="filterShow" class="el-icon-arrow-up"></span>
            </el-link>
        </div>

        <el-form
            class="jr-filter-form"
            size="mini"
            label-width="70px"
            label-position="left">
            <el-form-item label="类型">
                <linkGroup class="linkGroup1" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
            </el-form-item>
            <el-form-item label="学科">
                <linkGroup class="linkGroup2" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
            </el-form-item>
            <el-form-item label="版本">
                <linkGroup class="linkGroup3" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
            </el-form-item>
            <el-form-item label="年级">
                <linkGroup class="linkGroup4" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
            </el-form-item>
            <el-form-item label="学期">
                <linkGroup class="linkGroup5" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
            </el-form-item>
            <el-form-item label="状态">
                <linkGroup class="linkGroup6" v-model="paramMap.subjectId" :options="options.subjectList"></linkGroup>
            </el-form-item>

            <el-form-item label="知识点">
                <el-button type="primary">选择知识点</el-button>
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
                        <el-input></el-input>
                    </div>
                    <el-button type="primary">搜索</el-button>
                </div>
            </el-form-item>

        </el-form>


    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import KnowledgeTree from '~/components/testBank/KnowledgeTree.vue'
    import api from '@/config/module/common'

    export default {
        name: "myTopic",
        components: {
            linkGroup,
            KnowledgeTree,
        },
        data() {
            return {
                filterShow: false,

                paramMap: {
                    subjectId: '',
                    time: []
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
        methods: {}
    }
</script>

<style lang="scss">
    @import "@/assets/css/testBank.scss";

    .flex-box {
        display: flex;
    }

    .wid-300 {
        width: 300px;
        margin-right: 20px;
    }
</style>