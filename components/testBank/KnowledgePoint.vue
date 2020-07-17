<template>
    <el-main class="jr-KnowledgeTree">
        <!--选择按钮-->
        <div class="knowledge-wrap">
            <slot>
                <div class="knowledge-wrap-item" v-show="!paramMap.syncBtnHidden">
                    <!--同步按钮-->
                    <div class="knowledge-wrap-left">
                        <el-button :disabled="disabled" size="mini" type="primary" @click="openDialog(1)">同步
                        </el-button>
                    </div>
                    <div class="knowledge-wrap-right jr-tag" :class="{disabled}">
                        <div class="jr-tag-item" v-for="item in model.syncIds" :key="item.knowledgeId">
                            <span>{{item.name}}</span>
                            <span @click="removeKnowledge(item,1)" class="icon el-icon-close"></span>
                        </div>
                    </div>
                </div>

                <!--专题按钮-->
                <div class="knowledge-wrap-item" v-show="!paramMap.specBtnHidden">
                    <div class="knowledge-wrap-left">
                        <el-button :disabled="disabled" size="mini" type="primary" @click="openDialog(2)">专题
                        </el-button>
                    </div>
                    <div class="knowledge-wrap-right jr-tag">
                        <div class="jr-tag-item" v-for="item in model.specIds" :key="item.name">
                            <span>{{item.name}}</span>
                            <span @click="removeKnowledge(item,2)" class="icon el-icon-close"></span>
                        </div>
                    </div>
                </div>
            </slot>
        </div>

        <!--选择同步知识点-->
        <el-dialog
            class="jr-KnowledgeTree-dialog"
            modal
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            :append-to-body="true"
            title="所属知识点（同步）"
            :visible.sync="dialog.show">

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
                                   v-model="paramMap.topic"
                                   :options="options.topicList"></linkGroup>
                    </el-form-item>
                    <el-form-item label="学科">
                        <linkGroup v-model="paramMap.cSubjectId"
                                   :options="options.cSubjectList"></linkGroup>
                    </el-form-item>
                </template>

                <!--同步筛选-->
                <div v-show='paramMap.topic===1'>
                    <el-form-item label="版本">
                        <linkGroup class="linkGroup1"
                                   :disabled="!paramMap.cSubjectId"
                                   v-model="paramMap.versionId"
                                   :options="options.versionList"></linkGroup>
                    </el-form-item>
                    <el-form-item label="年级">
                        <linkGroup class="linkGroup2"
                                   :disabled="!paramMap.versionId"
                                   v-model="paramMap.gradeId"
                                   :options="options.gradeList"></linkGroup>
                    </el-form-item>
                    <el-form-item label="学期">
                        <linkGroup class="linkGroup3"
                                   :disabled="!paramMap.gradeId"
                                   v-model="paramMap.termId"
                                   :options="options.termList"></linkGroup>
                    </el-form-item>
                </div>

                <!--专题筛选-->
                <div v-show='paramMap.topic===2'>
                    <el-form-item label="学段">
                        <linkGroup class="linkGroup6"
                                   :disabled="!paramMap.cSubjectId"
                                   v-model="paramMap.phaseId"
                                   :options="options.phaseList"></linkGroup>
                    </el-form-item>

                    <el-form-item label="地区">
                        <linkGroup class="linkGroup7"
                                   :disabled="!paramMap.phaseId"
                                   v-model="paramMap.areaId"
                                   :options="options.areaList"></linkGroup>
                    </el-form-item>
                </div>
            </el-form>

            <!--树筛选-->
            <div class="search-box mar-b-15">
                <el-row :gutter="18">
                    <el-col :span="18">
                        <el-input placeholder="请输入搜索知识点内容" v-model="dialog.search" size="mini"/>
                    </el-col>
                    <el-col :span="6" class="t-right">
                        <el-button size="mini" @click="searchTree" type="primary">搜索</el-button>
                        <el-button size="mini" @click="clearTree" type="">重置</el-button>
                    </el-col>
                </el-row>
            </div>

            <!--同步树-->
            <div v-show='paramMap.topic===1'>
                <el-tree
                    class="jr-tree"
                    show-checkbox
                    node-key="knowledgeId"
                    ref="syncTree"
                    check-on-click-node
                    :data="options.syncList"
                    :check-strictly="true"
                    :filter-node-method="onDialogFilterNode"
                    :props="dialog.props">
                </el-tree>
            </div>

            <!--专题树-->
            <div v-show='paramMap.topic===2'>
                <el-tree
                    class="jr-tree"
                    show-checkbox
                    node-key="knowledgeId"
                    ref="specTree"
                    check-on-click-node
                    :data="options.specList"
                    :check-strictly="true"
                    :filter-node-method="onDialogFilterNode"
                    :props="dialog.props">
                </el-tree>
            </div>

            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeDialog">取 消</el-button>
                <el-button size="mini" @click="submitDialog" type="primary">提 交</el-button>
            </div>
        </el-dialog>

    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import api from '@/config/module/testBank'

    export default {
        name: "KnowledgePoint",
        components: {
            linkGroup
        },
        data() {
            return {
                // 弹窗信息
                dialog: {
                    show: false,
                    search: '',
                    props: {
                        children: 'knowledges',
                        label: 'name',
                        id: 'knowledgeId',
                    },
                },

                // 数据列表
                options: {
                    topicList: [
                        {
                            parameterId: 1,
                            parameterValue: "同步",
                        },
                        {
                            parameterId: 2,
                            parameterValue: "专题",
                        }
                    ],
                    cPhaseList: [],//学科
                    cSubjectList: [],//学段
                    phaseList: [],//学段
                    areaList: [],//地区
                    versionList: [],//版本
                    gradeList: [],//年级
                    termList: [],//学期
                    specList: [],//知识点树
                    syncList: [],//知识点树
                },

                //默认值
                pageData: {
                    topic: 1,//1同步，2专题
                    status: 1,//状态 1启用，0禁用
                    cSubjectId: '',//学科
                    cPhaseId: '',//学段
                    versionId: '',//版本
                    gradeId: '',//年级
                    termId: '',//学期
                    phaseId: '',//学段
                    areaId: '',//地区
                    syncBtnHidden: false,
                    specBtnHidden: false,
                }
            }
        },
        computed: {
            paramMap() {
                return Object.assign(this.pageData, this.param)
            }
        },
        watch: {
            //监听学科id
            async 'pageData.cSubjectId'(val) {
                this.pageData.versionId = '';//版本
                this.pageData.gradeId = '';//年级
                this.pageData.termId = '';//学区
                this.pageData.phaseId = '';//学段
                this.pageData.areaId = '';//地区
                this.model.syncIds = [];//同步知识点选中值
                this.model.specIds = [];//专题知识点选中值
            },

            //监听版本id,填充年级列表
            async 'pageData.versionId'(val) {
                this.pageData.gradeId = '';//年级
                this.pageData.termId = '';//学区
                this.model.syncIds = [];//同步知识点选中值

                this.options.gradeList = val ? await api.getKnowledgeGrades({//重置年级列表
                    subjectId: this.paramMap.cSubjectId,
                    versionId: this.paramMap.versionId,
                    status: this.paramMap.status
                }) : [];
            },

            //监听年级id,填充学期列表
            async 'pageData.gradeId'(val) {
                this.pageData.termId = '';//学区
                this.model.syncIds = [];//同步知识点选中值

                this.options.termList = val ? await api.getParameterInfoByCode({//重置年级列表
                    paramCode: 'Term',
                    status: this.paramMap.status
                }) : [];
            },

            //监听学期id,填充同步树列表
            async 'pageData.termId'(val) {
                this.model.syncIds = [];//同步知识点选中值

                this.options.syncList = val ? await api.getKnowledgesByParams({//重置年级列表
                    topic: 1,
                    subjectId: this.paramMap.cSubjectId,
                    versionId: this.paramMap.versionId,
                    gradeId: this.paramMap.gradeId,
                    termId: this.paramMap.termId,
                    // status:this.paramMap.status,
                }) : [];
            },

            //监听学段id,填充地区列表
            async 'pageData.phaseId'(val) {
                this.pageData.areaId = '';//地区
                this.model.specIds = [];//专题知识点选中值

                this.options.areaList = val ? await api.getKnowledgeAreas({//重置年级列表
                    subjectId: this.paramMap.cSubjectId,
                    phaseId: this.paramMap.phaseId,
                    status: this.paramMap.status
                }) : [];
            },

            //监听地区id,填充专题树列表
            async 'pageData.areaId'(val) {
                this.model.specIds = [];//专题知识点选中值

                this.options.specList = val ? await api.getKnowledgesByParams({//重置年级列表
                    topic: 2,
                    subjectId: this.paramMap.cSubjectId,
                    phaseId: this.paramMap.phaseId,
                    areaId: this.paramMap.areaId,
                    // status:this.paramMap.status
                }) : [];
            },
        },
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            param: {
                type: Object,
                default() {
                    return {};
                }
            },
            model: {
                type: Object,
                default() {
                    return {
                        syncIds: [],
                        specIds: [],
                    }
                }
            },
        },
        model: {
            prop: 'model',
            event: 'update'
        },
        created() {
            this.initHandle();
        },
        methods: {
            /**
             *@desc 初始数据处理-//填充版本学科，版本，学段
             */
            async initHandle() {
                let status = this.paramMap.status;
                let phaseList = await api.getParameterInfoByCode({paramCode: 'Phase', status});
                this.options.cSubjectList = await api.getParameterInfoByCode({paramCode: 'Subject', status});
                this.options.versionList = await api.getParameterInfoByCode({paramCode: 'Version', status});
                this.options.cPhaseList = phaseList;
                this.options.phaseList = phaseList;
            },

            /**
             *@desc 打开弹窗
             */
            openDialog(type) {
                this.pageData.topic = type;//修改类型
                this.dialog.show = true;//打开弹窗
                this.clearTree();//清空树搜素

                //填充选中值
                if (type === 1 && this.$refs.syncTree) {
                    this.$refs.syncTree.setCheckedNodes(this.model.syncIds);
                }
                if (type === 2 && this.$refs.specTree) {
                    this.$refs.specTree.setCheckedNodes(this.model.specIds);
                }
            },

            /**
             *@desc 关闭弹窗
             */
            closeDialog() {
                this.dialog.show = false;//打开弹窗
            },

            /**
             *@desc 移除选中的知识点
             */
            removeKnowledge(obj, type) {
                if (!this.disabled) {
                    let ids = type === 1 ? this.model.syncIds : this.model.specIds;

                    ids.forEach((item, index) => {
                        if (item.knowledgeId === obj.knowledgeId) {
                            ids.splice(index, 1);
                        }
                    });

                    // type === 1 ?
                    //     Object.assign(this.model, {syncIds: ids}) :
                    //     Object.assign(this.model, {specIds: ids});

                    this.refreshData();
                }
            },

            /**
             *@desc 触发筛选时
             */
            searchTree() {
                if (this.paramMap.topic === 1 && this.$refs.syncTree) {
                    this.$refs.syncTree.filter(this.dialog.search);
                }
                if (this.paramMap.topic === 2 && this.$refs.specTree) {
                    this.$refs.specTree.filter(this.dialog.search);
                }
            },

            /**
             *@desc 重置筛选时
             */
            clearTree() {
                this.dialog.search = '';
                this.searchTree();
            },

            /**
             *@desc 筛选
             *@param value [String] 筛选值
             *@param data [Object] 树数据
             */
            onDialogFilterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },

            /**
             *@desc 提交弹窗
             */
            submitDialog() {
                let syncIds = (this.$refs['syncTree'].getCheckedNodes()).filter(item => {
                    return item.knowledges.length === 0
                });

                let specIds = (this.$refs['specTree'].getCheckedNodes()).filter(item => {
                    return item.knowledges.length === 0
                });

                if (syncIds.length > 0 || specIds.length > 0) {
                    Object.assign(this.model, {
                        syncIds,
                        specIds,
                    });
                    this.refreshData();
                    this.closeDialog();
                } else {
                    this.$message.error('请选择知识点');
                }
            },

            /**
             *@desc 同步数据
             */
            refreshData() {
                this.$emit('update', this.model);//重置树数据
                this.$emit('change', {
                    options: this.options,
                    paramMap: this.paramMap,
                });//返回参数信息
            },

        }
    }
</script>

<style lang="scss">
    .jr-KnowledgeTree {
        margin: 0;
        padding: 0;

        .knowledge-wrap {
            .knowledge-wrap-left {
                margin: 5px 0;
            }

            .knowledge-wrap-item {
                display: flex;
                align-items: center;
            }

            .knowledge-wrap-right {
                margin-left: 20px;

                .jr-tag-item {
                    margin-right: 20px;
                }
            }
        }
    }
</style>