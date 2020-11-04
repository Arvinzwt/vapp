<template>
    <!--选择角色-->
    <div class="jr-customer-selected-role">
        <!--触发对象-->
        <slot>
            <div class="selected-wrp" @click="openDialog">
                <div v-if="showList.length>0" class="selected-wrp-main">
                    <div class="selected-wrp-tag">
                        <el-tag @close="deleteHandle" closable size="mini" type="info">
                            {{ showList[0].label }}
                        </el-tag>
                        <el-tag type="info" v-show="showList.length>1" size="mini">
                            +{{ showList.length - 1 }}
                        </el-tag>
                    </div>
                    <div @click.stop="clearHandle" class="selected-wrp-icon text-color-placeholder">
                        <span class="el-icon-circle-close"></span>
                    </div>
                </div>
                <div v-else class="selected-wrp-placeholder text-color-placeholder">请选择</div>
            </div>
        </slot>

        <!--弹窗-->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" title="分配负责人"
                   :append-to-body="true" custom-class="jr-dialog" width="500px">
            <!--弹窗内容-->
            <div class="dialog-body">
                <el-form class="jr-form" size="mini" label-width="90px" label-position="left">
                    <el-row :gutter="15">
                        <el-col :span="12">
                            <el-form-item label="学习中心">
                                <el-cascader
                                        v-model="dialog.form.deptid"
                                        :options="dic.hrcodedepts"
                                        :props="$utils.leaningCenterProps"
                                        :show-all-levels="false"
                                        collapse-tags
                                        placeholder="请选择"
                                        filterable
                                        clearable></el-cascader>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-input placeholder="请输入内容"
                                      size="mini" clearable
                                      v-model="dialog.form.filter"></el-input>
                        </el-col>
                    </el-row>
                </el-form>
                <div style="max-height: 300px;overflow-y: scroll;">
                    <el-tree
                            class="filter-tree"
                            :data="dialog.tree"
                            :props="dialog.treeProps"
                            :filter-node-method="filterTreeNode"
                            node-key="id"
                            default-expand-all
                            expand-on-click-node
                            show-checkbox
                            ref="treeRef">
                    </el-tree>
                </div>
            </div>
            <!--弹窗尾部-->
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeDialog">取 消</el-button>
                <el-button size="mini" @click="submitDialog" type="primary">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialog: {
                show: false,//是否显示弹窗
                form: {
                    filter: '',//筛选内容
                    deptid: '',//学习中心
                },
                tree: [],//树数据
                treeProps: {//树结构
                    children: 'children',
                    label: 'name',
                    value: 'id',
                }
            },
            showList: [],//用来展示的结果数据
        }
    },
    watch: {
        //树状图筛选
        'dialog.form.filter': {
            handler(val) {
                this.$refs['treeRef'].filter(val);
            },
        },
        //树状图筛选2
        'dialog.form.deptid': {
            async handler(val) {
                let deptids = this.$utils.underscore.last(val);
                this.dialog.tree = await this.$api.common.deptsales({
                    "deptids": deptids ? deptids + '' : ''
                }) || []; //拉取树数据
            },
        },

        //设置选中的数据;
        'model': {
            handler(val) {
                this.setShowValue();
            },
        }
    },
    model: {
        prop: 'model',
        event: 'update'
    },
    props: {
        model: {//绑定值
            type: Array,
            default() {
                return []
            }
        },
    },
    computed: {
        dic() {
            return this.$store.state.dic;
        },
    },
    async mounted() {
        this.dialog.tree = await this.$api.common.sales() || []; //拉取树数据
        this.setShowValue();
    },
    methods: {
        /**
         *@desc 设置初始显示的value
         */
        setShowValue() {
            let target = [];
            let fn = (arr) => {
                arr.forEach(item => {
                    if (this.model.includes(item.id)) {
                        target.push(item)
                    }
                    if (item.children) {
                        fn(item.children)
                    }
                })
            }

            fn(this.dialog.tree);
            this.showList = target;
        },

        /**
         *@desc 打开弹窗
         */
        openDialog() {
            this.dialog.show = true;
            this.$nextTick(() => {
                if (this.$refs['treeRef']) {
                    this.$refs['treeRef'].setCheckedKeys(this.model);//重置选中内容
                }
            })
        },

        /**
         *@desc 筛选树状图
         *@param value [String] 筛选值
         *@param data [Object] 树数据
         */
        filterTreeNode(value, data) {
            if (!value) return true;
            return data[this.dialog.treeProps.label].indexOf(value) !== -1;
        },

        /**
         *@desc 关闭弹窗
         */
        closeDialog() {
            this.dialog.show = false;
        },

        /**
         *@desc 确定提交时
         */
        submitDialog() {
            let target = this.$refs['treeRef'].getCheckedKeys();//选中的数据
            if (target.length > 0) {
                this.$emit('update', target);//更新数据
                this.$emit('change', target);//触发change
                this.dialog.show = false;//关闭弹窗
            } else {
                this.$message.error("请选择负责人")
            }
        },

        /**
         *@desc 删除结果时
         */
        deleteHandle() {
            this.model.splice(0, 1);
            this.$emit('update', this.model);//更新数据
            this.$emit('change', this.model);//触发change
        },

        /**
         *@desc 清除结果时
         */
        clearHandle() {
            this.$emit('update', []);//更新数据
            this.$emit('change', []);//触发change
        }
    }
}
</script>

<style lang="scss">


.jr-customer-selected-role {
    $inputHeight: 28px;

    .selected-wrp {
        -webkit-appearance: none;
        background-color: #FFF;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: 12px;
        height: $inputHeight;
        line-height: $inputHeight;
        outline: 0;
        padding: 0;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;

        .selected-wrp-main {
            height: $inputHeight;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .selected-wrp-tag {
                .el-tag {
                    border-color: transparent;
                    margin-left: 6px;
                }

                .el-tag__close.el-icon-close {
                    background-color: #C0C4CC;
                }
            }

            .selected-wrp-icon {
                height: 100%;
                padding: 0 8px;
                font-size: 14px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;

                .el-icon-circle-close {
                    display: none;
                }
            }
        }

        .selected-wrp-placeholder {
            cursor: pointer;
            padding: 0 15px;
            height: $inputHeight;
            line-height: $inputHeight;
        }

        &:hover {
            border-color: #C0C4CC;

            .selected-wrp-icon {
                .el-icon-circle-close {
                    display: inline-block;
                }
            }
        }
    }
}
</style>