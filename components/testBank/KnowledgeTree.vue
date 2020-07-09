<template>
    <el-main class="jr-KnowledgeTree">
        <el-button :disabled="disabled"
                   size="mini"
                   type="primary"
                   @click="openDialog">
            <slot></slot>
        </el-button>


        <!--选择知识树弹窗-->
        <el-dialog
            class="jr"
            modal
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            :append-to-body="true"
            :title="type===1?'所属知识点（同步）':'所属知识点（专题）'"
            :visible.sync="dialog.show">

            <el-form
                class="jr-filter-form"
                size="mini"
                label-width="70px"
                label-position="left">

                <div v-if="type===1">
                    <el-form-item label="版本">
                        <linkGroup class="linkGroup3" @change="versionChange" v-model="paramMap.versionId"
                                   :options="options.versionList"></linkGroup>
                    </el-form-item>

                    <el-form-item label="年级">
                        <linkGroup class="linkGroup4" @change="gradeChange" v-model="paramMap.gradeId"
                                   :options="options.gradeList"></linkGroup>
                    </el-form-item>

                    <el-form-item label="学期">
                        <linkGroup class="linkGroup5" @change="termChange" v-model="paramMap.termId"
                                   :options="options.termList"></linkGroup>
                    </el-form-item>
                </div>

                <div v-if="type===2">
                    <el-form-item label="学段">
                        <linkGroup class="linkGroup4" v-model="paramMap.phaseId"
                                   @change="phaseChange"
                                   :options="options.phaseList"></linkGroup>
                    </el-form-item>

                    <el-form-item label="地区">
                        <linkGroup class="linkGroup5" v-model="paramMap.areaId"
                                   @change="areaChange"
                                   :options="options.areaList"></linkGroup>
                    </el-form-item>
                </div>
            </el-form>

            <div class="search-box mar-b-15">
                <el-input placeholder="请输入搜索知识点内容" v-model="paramMap.search" size="mini"/>
                <el-button size="mini" @click="searchTree" type="primary">搜索</el-button>
                <el-button size="mini" @click="clearTree" type="">重置</el-button>
            </div>

            <div class="cr-tree">
                <el-tree
                    class="jr-tree"
                    show-checkbox
                    node-key="knowledgeId"
                    ref="tree"
                    :data="options.knowledgeList"
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
    import api from '@/config/module/common'

    export default {
        name: "KnowledgeTree",
        components: {
            linkGroup,
        },
        data() {
            return {
                // 参数信息
                paramMap: {
                    search: '',//搜索内容
                    versionId: 60,//版本
                    gradeId: 0,//年级
                    termId: 0,//学期
                    phaseId: 0,//学段
                    areaId: '',//地区

                },

                //选项列表
                options: {
                    versionList: [],//版本
                    gradeList: [],//年级
                    termList: [],//学期
                    phaseList: [],//学段
                    areaList: [],//地区
                    knowledgeList: [],//知识点
                },

                //弹窗信息
                dialog: {
                    show: false,
                    props: {
                        children: 'child',
                        label: 'name',
                        id: 'knowledgeId',
                    }
                }
            }
        },

        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            model: {
                type: Array,
                default: [],
            },
            type: {
                type: Number,
                default: 1,
            }
        },

        //数据双向绑定
        model: {
            prop: 'model',
            event: 'update'
        },

        // 拉取 版本/学段列表
        async created() {
            this.options.versionList = await api.getParameterInfo({paramCode: 'Version', status: 1});
            this.options.phaseList = await api.getParameterInfo({paramCode: 'Phase', status: 1});
        },

        methods: {
            /**
             *@desc 打开弹窗
             */
            openDialog() {
                this.dialog.show = true
            },

            /**
             *@desc 关闭弹窗
             */
            closeDialog() {
                this.dialog.show = false
            },

            /**
             *@desc 触发筛选时
             */
            searchTree() {
                this.$refs.tree.filter(this.paramMap.search);
            },

            /**
             *@desc 重置筛选时
             */
            clearTree() {
                this.paramMap.search = '';
                this.$refs.tree.filter(this.paramMap.search);
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
             *@desc 版本修改时
             */
            async versionChange(val) {
                this.paramMap.gradeId = '';//年级
                this.paramMap.termId = '';//学期
                this.$emit('update', []);//重置树数据

                this.options.gradeList = this.options.gradeList = await api.getParameterInfo({
                    paramCode: 'Grade', status: 1
                });
                this.options.termList = [];//学期
                this.options.knowledgeList = [];//树
            },

            /**
             *@desc 年级修改时
             */
            async gradeChange() {
                this.paramMap.termId = '';//学期
                this.$emit('update', []);//重置树数据

                this.options.termList = await api.getParameterInfo({paramCode: 'Term', status: 1});
                this.options.knowledgeList = [];//树
            },

            /**
             *@desc 学期修改时
             */
            async termChange() {
                this.$emit('update', []);//重置树数据
                this.options.knowledgeList = await api.loadTrees();
            },

            /**
             *@desc 学段修改时
             */
            async phaseChange() {
                this.paramMap.areaId = '';
                this.$emit('update', []);//重置树数据

                this.options.areaList = await api.getParameterInfo({paramCode: 'Area', status: 1});
                this.options.knowledgeList = [];
            },

            /**
             *@desc 地区修改时
             */
            async areaChange() {
                this.options.knowledgeList = await api.loadTrees();
            },

            /**
             *@desc 提交弹窗
             */
            submitDialog() {
                let knowledgeIds = this.$refs.tree.getCheckedNodes();

                if (knowledgeIds.length > 0) {
                    this.$emit('update', knowledgeIds);//重置树数据
                    this.$emit('change', knowledgeIds);//重置树数据
                    this.closeDialog();
                } else {
                    this.$message.error('请选择知识点');
                }
            },
        }
    }
</script>

<style lang="scss">
    .jr-KnowledgeTree {
        margin: 0;
        padding: 0;
    }
</style>