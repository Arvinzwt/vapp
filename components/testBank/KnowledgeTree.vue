<template>
    <!--选择知识点-->
    <el-main class="jr-KnowledgeTree">
        <!--选择按钮-->
        <div class="knowledge-wrap">
            <div class="knowledge-wrap-item" v-show="!model.syncBtnHidden">
                <!--同步按钮-->
                <div class="knowledge-wrap-left">
                    <el-button :disabled="disabled" size="mini" type="primary" @click="openDialog('syncDialog')">同步
                    </el-button>
                </div>
                <div class="knowledge-wrap-right jr-tag" :class="{disabled}">
                    <div class="jr-tag-item" v-for="item in model.syncIds" :key="item.knowledgeId">
                        <span>{{item.name}}</span>
                        <span @click="removeKnowledge(item,'syncDialog')" class="icon el-icon-close"></span>
                    </div>
                </div>
            </div>

            <!--专题按钮-->
            <div class="knowledge-wrap-item" v-show="!model.specBtnHidden">
                <div class="knowledge-wrap-left">
                    <el-button :disabled="disabled" size="mini" type="primary" @click="openDialog('specDialog')">专题
                    </el-button>
                </div>
                <div class="knowledge-wrap-right jr-tag">
                    <div class="jr-tag-item" v-for="item in model.specIds" :key="item.name">
                        <span>{{item.name}}</span>
                        <span @click="removeKnowledge(item,'specDialog')" class="icon el-icon-close"></span>
                    </div>
                </div>
            </div>
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
            :visible.sync="syncDialog.show">
            <el-form
                class="jr-filter-form"
                size="mini"
                label-width="70px"
                label-position="left">
                <el-form-item label="版本">
                    <linkGroup class="linkGroup3" @change="changeSyncOptionData($event,1)"
                               v-model="model.versionId"
                               :options="options.versionList"></linkGroup>
                </el-form-item>
                <el-form-item label="年级">
                    <linkGroup class="linkGroup4" @change="changeSyncOptionData($event,2)"
                               v-model="model.gradeId"
                               :options="options.gradeList"></linkGroup>
                </el-form-item>
                <el-form-item label="学期">
                    <linkGroup class="linkGroup5" @change="changeSyncOptionData($event,3)"
                               v-model="model.termId"
                               :options="options.termList"></linkGroup>
                </el-form-item>
            </el-form>
            <div class="search-box mar-b-15">
                <el-row :gutter="18">
                    <el-col :span="18">
                        <el-input placeholder="请输入搜索知识点内容" v-model="syncDialog.form.search" size="mini"/>
                    </el-col>
                    <el-col :span="6" class="t-right">
                        <el-button size="mini" @click="searchTree('syncDialog')" type="primary">搜索</el-button>
                        <el-button size="mini" @click="clearTree('syncDialog')" type="">重置</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-tree
                class="jr-tree"
                show-checkbox
                node-key="knowledgeId"
                ref="syncDialog"
                :data="options.syncKnowledgeList"
                :check-strictly="true"
                :filter-node-method="onDialogFilterNode"
                :props="dialogProps">
            </el-tree>

            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeDialog('syncDialog')">取 消</el-button>
                <el-button size="mini" @click="submitDialog('syncDialog')" type="primary">提 交</el-button>
            </div>
        </el-dialog>

        <!--选中专题知识点-->
        <el-dialog
            class="jr-KnowledgeTree-dialog"
            modal
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            :append-to-body="true"
            title="所属知识点（专题）"
            :visible.sync="specDialog.show">
            <el-form
                class="jr-filter-form"
                size="mini"
                label-width="70px"
                label-position="left">
                <el-form-item label="学段">
                    <linkGroup class="linkGroup6" v-model="model.phaseId"
                               @change="changeSpecOptionData($event,1)"
                               :options="options.phaseList"></linkGroup>
                </el-form-item>

                <el-form-item label="地区">
                    <linkGroup class="linkGroup7" v-model="model.areaId"
                               @change="changeSpecOptionData($event,2)"
                               :options="options.areaList"></linkGroup>
                </el-form-item>
            </el-form>
            <div class="search-box mar-b-15">
                <el-row :gutter="18">
                    <el-col :span="18">
                        <el-input placeholder="请输入搜索知识点内容" v-model="model.search" size="mini"/>
                    </el-col>
                    <el-col :span="6" class="t-right">
                        <el-button size="mini" @click="searchTree('specDialog')" type="primary">搜索</el-button>
                        <el-button size="mini" @click="clearTree('specDialog')" type="">重置</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-tree
                class="jr-tree"
                show-checkbox
                node-key="knowledgeId"
                ref="specDialog"
                :data="options.specKnowledgeList"
                :check-strictly="true"
                :filter-node-method="onDialogFilterNode"
                :props="dialogProps">
            </el-tree>

            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeDialog('specDialog')">取 消</el-button>
                <el-button size="mini" @click="submitDialog('specDialog')" type="primary">提 交</el-button>
            </div>
        </el-dialog>
    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import api from '@/config/module/testBank'

    export default {
        name: "KnowledgeTree",
        components: {
            linkGroup,
        },
        data() {
            return {
                //同步弹窗信息
                syncDialog: {
                    show: false,
                    form: {
                        search: '',//搜索内容
                    },
                },

                //专题弹窗信息
                specDialog: {
                    show: false,
                    form: {
                        search: '',//搜索内容
                    }
                },

                //dialog配置
                dialogProps: {
                    children: 'knowledges',
                    label: 'name',
                    id: 'knowledgeId',
                },

                //选项列表
                options: {
                    phaseList: [],//学段
                    areaList: [],//地区
                    versionList: [],//版本
                    gradeList: [],//年级
                    termList: [],//学期
                    specKnowledgeList: [],//知识点
                    syncKnowledgeList: [],//知识点
                },
            }
        },

        props: {
            disabled: {//是否禁用
                type: Boolean,
                default: false,
            },
            model: {//数据
                type: Object,
                default: {
                    syncIds: [],
                    specIds: [],

                    c_subjectId: '',//学科
                    c_phaseId: '',//学段

                    versionId: '',//版本
                    gradeId: '',//年级
                    termId: '',//学期
                    phaseId: '',//学段
                    areaId: '',//地区
                },
            },
        },

        //数据双向绑定
        model: {
            prop: 'model',
            event: 'update'
        },
        created() {
            this.initHandle()
        },
        methods: {
            /**
             *@desc 重置所有所有列表
             */
            resetMsg() {
                Object.assign(this.options, {
                    areaList: [],//地区
                    gradeList: [],//年级
                    termList: [],//学期
                    specKnowledgeList: [],//知识点
                    syncKnowledgeList: [],//知识点
                })
            },

            async initHandle() {
                //设置选项默认值
                this.model.c_subjectId = this.model.c_subjectId || '';//学科
                this.model.c_phaseId = this.model.c_phaseId || '';//学段
                this.model.versionId = this.model.versionId || '';//版本
                this.model.gradeId = this.model.gradeId || '';//年级
                this.model.termId = this.model.termId || '';//学期
                this.model.phaseId = this.model.phaseId || '';//学段
                this.model.areaId = this.model.areaId || '';//地区
                this.model.syncBtnHidden = this.model.syncBtnHidden || false;//地区
                this.model.specBtnHidden = this.model.specBtnHidden || false;//地区
                this.model.status = this.model.status || 1;//地区

                // 拉取 版本/学段列表
                this.options.versionList = (await api.getParameterInfoByCode({
                    paramCode: 'Version', status: this.model.status
                })) || [];
                this.options.phaseList = (await api.getParameterInfoByCode({
                    paramCode: 'Phase', status: this.model.status
                })) || [];
            },

            /**
             *@desc 打开弹窗
             */
            openDialog(dialogName) {
                this[dialogName].show = true;//打开弹窗
                if (this.$refs.syncDialog) {
                    this.$refs.syncDialog.setCheckedNodes(this.model.syncIds);
                }
                if (this.$refs.specDialog) {
                    this.$refs.specDialog.setCheckedNodes(this.model.specIds);
                }
            },

            /**
             *@desc 关闭弹窗
             */
            closeDialog() {
                this.specDialog.show = false;
                this.syncDialog.show = false;
            },

            /**
             *@desc 同步级联选择器修改时
             *@param val[String] 修改值
             *@param type[Number] 修改数据，1版本修改，2年级修改，3学期修改
             */
            async changeSyncOptionData(val, type) {
                switch (type) {
                    case 1:     //版本修改
                        this.model.gradeId = '';//清空年级选中信息
                        this.model.termId = '';//清空学期选中信息
                        // this.$refs['syncDialog'].setCheckedKeys([]);//重置树选中

                        this.options.gradeList = (await api.getKnowledgeGrades({//重置年级列表
                            subjectId: this.model.c_subjectId,
                            versionId: this.model.versionId,
                            status: this.model.status
                        })) || [];

                        this.options.termList = [];//清空学期
                        this.options.syncKnowledgeList = [];//清空同步树列表

                        break;
                    case 2:     //年级修改
                        this.model.termId = ''; //清空学期选中信息
                        // this.$refs['syncDialog'].setCheckedKeys([]);//重置树选中

                        this.options.termList = (await api.getParameterInfoByCode({//重置年级列表
                            paramCode: 'Term', status: this.model.status
                        })) || [];//重置学期列表
                        this.options.syncKnowledgeList = []; //清空同步树列表
                        break;
                    case 3:     //学期修改
                        // this.$refs['syncDialog'].setCheckedKeys([]);//重置树选中
                        this.options.syncKnowledgeList = (await api.getKnowledgesByParams({
                            topic: 1,
                            subjectId: this.model.c_subjectId,
                            versionId: this.model.versionId,
                            gradeId: this.model.gradeId,
                            termId: this.model.termId,
                        })) || [];//重置同步树列表
                        break;
                }
            },

            /**
             *@desc 专题级联选择器修改时
             *@param val[String] 修改值
             *@param type[Number] 修改数据，1学段修改，2地区修改
             */
            async changeSpecOptionData(val, type) {
                switch (type) {
                    case 1:     //学段修改
                        //清空地区、专题树选中信息，重置地区列表，清空专题树列表
                        this.model.areaId = '';//清空选中信息
                        // this.$refs['specDialog'].setCheckedKeys([]);//重置树选中

                        this.options.areaList = (await api.getKnowledgeAreas({//重置地区列表
                            subjectId: this.model.c_subjectId,
                            phaseId: this.model.phaseId,
                            status: this.model.status
                        })) || [];
                        this.options.specKnowledgeList = [];//清空专题树列表
                        break;
                    case 2:     //地区修改
                        //清空专题树选中信息 重置专题树列表
                        // this.$refs['specDialog'].setCheckedKeys([]);//重置树选中
                        this.options.specKnowledgeList = (await api.getKnowledgesByParams({
                            topic: 2,
                            subjectId: this.model.c_subjectId,
                            phaseId: this.model.phaseId,
                            areaId: this.model.areaId,
                        })) || [];//重置同步树列表
                        break;
                }
            },

            /**
             *@desc 触发筛选时
             */
            searchTree(dialogName) {
                this.$refs[dialogName].filter(this[dialogName].form.search);
            },

            /**
             *@desc 重置筛选时
             */
            clearTree(dialogName) {
                this[dialogName].form.search = '';
                this.searchTree(dialogName);
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
            submitDialog(dialogName) {
                let ids = this.$refs[dialogName].getCheckedNodes();//树选中数据

                if (ids.length > 0) {
                    let model = dialogName === 'syncDialog' ? Object.assign(this.model, {
                        syncIds: ids
                    }) : Object.assign(this.model, {
                        specIds: ids
                    });
                    this.$emit('update', model);//重置树数据
                    this.$emit('change', model);//重置树数据
                    this.closeDialog();
                } else {
                    this.$message.error('请选择知识点');
                }
            },

            /**
             *@desc 移除选中的知识点
             */
            removeKnowledge(obj, dialogName) {
                if (!this.disabled) {
                    let ids = dialogName === 'syncDialog' ? this.model.syncIds : this.model.specIds;

                    ids.forEach((item, index) => {
                        if (item.knowledgeId === obj.knowledgeId) {
                            ids.splice(index, 1);
                        }
                    });

                    let model = dialogName === 'syncDialog' ?
                        Object.assign(this.model, {syncIds: ids}) :
                        Object.assign(this.model, {specIds: ids});

                    this.$emit('update', model);//重置树数据
                    this.$emit('change', model);//重置树数据
                }
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