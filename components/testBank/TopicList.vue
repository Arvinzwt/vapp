<template>
    <!--题目列表-->
    <el-main class="jr-topList">
        <!--操作栏-->
        <div class="operation-bar" v-if="topicData.length>0">
            <el-checkbox
                v-model="paramMap.checkAll"
                @change="handleCheckAllChange"
                :label="0"
                size="mini">全选
            </el-checkbox>
            <el-button @click="changeAllKnowledge"
                       :disabled="paramMap.checkedIds.length===0"
                       plain size="mini"
                       type="primary">批量修改知识点
            </el-button>
            <el-button @click="changeAllOut"
                       :disabled="paramMap.checkedIds.length===0"
                       size="mini" plain
                       type="primary">批量发布
            </el-button>
            <el-button
                @click="changeAllDelete"
                :disabled="paramMap.checkedIds.length===0"
                plain size="mini" type="primary">批量删除
            </el-button>
        </div>

        <!--题目列表-->
        <div class="draft-main">
            <div class="draft-main-item bg-gray" v-for="item in topicData" :key="item.questionId"
                 :class="item.isOpera?'gray':''">
                <!--状态栏-->
                <div class="draft-main-head">
                    <div class="draft-main-head-left">
                        <div class="draft-main-head-item">
                            <el-checkbox @change="handleCheckedChange($event,item)" :value="isChecked(item)">
                                编号：{{item.questionId}}
                            </el-checkbox>
                        </div>
                        <div class="draft-main-head-item">状态：{{item.statusStr}}</div>
                        <div class="draft-main-head-item">上传时间：{{item.createdTime}}</div>
                        <div class="draft-main-head-item">所在城市：{{item.cityStr}}</div>
                        <div class="draft-main-head-item">题型：{{item.typeStr}}</div>
                    </div>
                    <el-tooltip v-if="!(item.knowledgeIds&&item.abilityIds)"
                                class="draft-main-head-right"
                                content="标签待完善"
                                placement="left">
                        <span class="el-icon-warning-outline color-red font-14"></span>
                    </el-tooltip>
                </div>

                <!--题干-->
                <div class="draft-main-body">
                    <div v-html="item.htmlContent"></div>
                </div>

                <!--操作栏-->
                <div class="draft-main-foot">
                    <el-link type="primary" class="draft-main-foot-item font-basic" @click="showTestResolve(item)">
                        <span>解析</span>
                        <span v-show="!item.showResolve" class="el-icon-arrow-down"></span>
                        <span v-show="item.showResolve" class="el-icon-arrow-up"></span>
                    </el-link>

                    <!--更换题型-->
                    <ChangeTopicType v-model="item.typeId"
                                     @change="refreshPage"
                                     :paramMap="changeTypeParam(item)"></ChangeTopicType>
                    <el-link @click="changeTitleType" type="primary" class="draft-main-foot-item font-basic">打标签
                    </el-link>
                    <el-link @click="editTitle(item)" type="primary" class="draft-main-foot-item font-basic">编辑
                    </el-link>
                    <el-link @click="releaseTitle(item)" type="primary" class="draft-main-foot-item font-basic">发布
                    </el-link>
                    <el-link @click="deleteTitle(item)" type="primary" class="draft-main-foot-item font-basic">删除
                    </el-link>
                </div>

                <!--解析内容-->

                <div class="draft-main-other" v-show="item.showResolve">
                    <div v-if="!item.htmlAnswer" class="blank-default bg-gray">
                        <span>该题目没有解析</span>
                    </div>
                    <div v-if="item.htmlAnswer">
                        <!--答案-->
                        <div v-html="item.htmlAnswer"></div>
                        <!--分析-->
                        <div v-html="item.htmlAnalyse"></div>
                        <!--解答-->
                        <div v-html="item.htmlReply"></div>
                    </div>

                </div>
            </div>
        </div>

        <div class="blank-default bg-gray" v-if="topicData.length===0">暂无数据</div>

        <!--分页-->
        <pagination v-model="pagesInfo" @change="pageChange"></pagination>

    </el-main>
</template>

<script>
    import Pagination from '~/components/testBank/Pagination.vue'
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import ChangeTopicType from '~/components/testBank/ChangeTopicType.vue'
    import api from '@/config/module/testBank'


    export default {
        name: "TopicList",
        components: {
            Pagination,
            linkGroup,
            ChangeTopicType
        },
        computed: {
            isChecked() {
                return (obj) => {
                    return this.paramMap.checkedIds.indexOf(obj.questionId) !== -1;
                };
            },
            changeTypeParam() {
                return (obj) => {
                    return {
                        questionId: obj.questionId,
                        phaseId: obj.phaseId,
                        phaseStr: obj.phaseStr,
                        subjectId: obj.subjectId,
                        subjectStr: obj.subjectStr,
                    };
                };
            }
        },
        data() {
            return {
                paramMap: {
                    checkAll: false,
                    checkedIds: []
                },

                // 分页信息
                pagesInfo: {
                    pageNum: 1,//页码
                    pageSize: 1,//页宽
                    totalNum: 0,//总条数
                },

                // //弹窗数据
                // dialog: {
                //     show: false,
                //     type: 1,
                //     form: {
                //         subjectId: '',
                //         typeId: '',
                //
                //         knowledgeIds1: [],
                //         knowledgeIds2: [],
                //     },
                //     rules: {}
                // },

                //选项
                options: {
                    subjectList: [],
                    typeList: [],
                }
            }
        },
        props: {
            topicData: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        async created() {
            //填充学科和学段
            this.options.phaseList = await api.getParameterInfo({paramCode: 'Phase', status: 1});
            this.options.subjectList = await api.getParameterInfo({paramCode: 'Subject', status: 1});
        },
        mounted() {
            MathJax.typesetPromise();
        },
        methods: {
            refreshPage(val) {
                this.$emit('change')
            },
            /**
             *@desc 全选
             */
            handleCheckAllChange(val) {
                this.paramMap.checkedIds = val ? this.topicData.map(item => {
                    return item.questionId;
                }) : [];
            },

            /**
             *@desc 单选
             */
            handleCheckedChange(val, obj) {
                let ind = this.paramMap.checkedIds.indexOf(obj.questionId);

                if (val) {
                    if (ind === -1) {
                        this.paramMap.checkedIds.push(obj.questionId);
                    }
                } else {
                    if (ind !== -1) {
                        this.paramMap.checkedIds.splice(ind, 1);
                    }
                }

                this.paramMap.checkAll = this.paramMap.checkedIds.length === this.topicData.length;
            },

            /**
             *@desc 分页触发时
             */
            pageChange(val) {
                console.log(val)
            },

            /**
             *@desc 切换解析内容
             */
            showTestResolve(obj) {
                obj.showResolve = !obj.showResolve;
                console.log(obj.showResolve)
            },

            /**
             *@desc 按钮-更换题型
             */
            changeTitleType() {


            },

            /**
             *@desc 按钮-编辑
             */
            editTitle(obj) {
                // 题目编辑页
                // :param="paramMap"
                this.$r.go('0-6', {pageType: 1, questionId: obj.questionId})
            },

            /**
             *@desc 按钮-发布
             */
            releaseTitle(obj) {
                this.$confirm('确定发布吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res => {
                    return api.publishBatchByQuestionIds({
                        questionIds: [obj.questionId]
                    })
                }).then(res => {
                    this.$message.success('发布成功')
                }).catch(err => {
                })
            },

            /**
             *@desc 按钮-删除
             */
            deleteTitle(obj) {
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res => {
                    api.deleteBatchByIds({
                        questionIds: [obj.questionId]
                    }).then(res => {
                        this.$message.success('删除成功')
                    }).catch(err => {
                        console.log(err, 222)
                    })
                }).catch(err => {

                })
            },

            /**
             *@desc 修改所有知识点
             */
            changeAllKnowledge() {
                this.$message.success('待确认')
            },

            /**
             *@desc 批量发布
             */
            changeAllOut() {
                console.log(123123)
                this.$confirm('确定要发布吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res => {
                    console.log(123123)
                    return api.publishBatchByQuestionIds({
                        questionIds: this.paramMap.checkedIds
                    })
                }).then(res => {
                    this.$message.success('批量发布成功');
                }).catch(err => {

                })
            },

            /**
             *@desc 批量删除
             */
            changeAllDelete() {
                this.$confirm('删除后数据不可恢复，确定要删除吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(res => {
                    return api.deleteBatchByIds({
                        questionIds: this.paramMap.checkedIds
                    })
                }).then(res => {
                    this.$message.success('批量删除成功');
                }).catch(err => {

                })
            }
        }
    }
</script>

<style lang="scss">
    .jr-topList {
        margin: 0;
        padding: 0;

        .el-checkbox__label {
            font-size: 12px;
        }

        .wrap {
            padding: 20px 15px;
        }

        .operation-bar {
            .el-button {
                margin-left: 20px;
            }

            margin-bottom: 20px;
        }

        .draft-main {
            .draft-main-item {
                margin-bottom: 20px;
                padding: 20px;
                border-radius: 5px;

                /*&.gray {*/
                /*    color: #bababa;*/

                /*    .el-link--inner {*/
                /*        color: #bababa;*/
                /*    }*/

                /*    .el-checkbox__label {*/
                /*        color: #bababa;*/
                /*    }*/
                /*}*/
            }

            .draft-main-head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;

                .draft-main-head-left {
                    display: flex;
                    align-items: center;
                }
            }

            .draft-main-head-item {
                font-weight: bolder;
                margin-right: 55px;
            }

            .draft-main-body {
                margin-bottom: 20px;
                padding: 0 15px;
            }

            .draft-main-foot {
                display: flex;
            }

            .draft-main-foot-item {
                margin-right: 55px;
            }
        }

        .draft-main-other {
            padding: 10px 15px 0;
        }

        .blank-default {
            padding: 20px;
            text-align: center;
        }
    }
</style>