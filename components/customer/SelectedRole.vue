<template>
    <!--选择角色-->
    <div class="jr-selected-role">
        <!--触发对象-->
        <slot>
            <div class="jr-tag-wrp el-input__inner" @click="openDialog">
                <div class="text-ellipsis">
                    <el-tag v-for="item in showValue" :key="item.value" size="mini" type="info">
                        {{ item.label }}
                    </el-tag>
                </div>
                <div v-if="showValue.length===0" class="cursor-pointer text-color-placeholder pl-3 pr-3">请选择</div>
            </div>
        </slot>

        <!--弹窗-->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false"
                   :append-to-body="true" custom-class="jr-dialog" width="30%">
            <!--弹窗头部-->
            <h3 slot="title" class="dialog-header">分配负责人</h3>
            <!--弹窗内容-->
            <div slot="default" class="dialog-body">
                <el-input placeholder="请输入内容"
                          size="mini" clearable class="mb-4"
                          v-model="dialog.filterText"></el-input>
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
                filterText: '',//筛选内容
                tree: [],//树数据
                treeProps: {//树结构
                    children: 'children',
                    label: 'label'
                }
            },
            showValue: [],//用来展示的结果数据
        }
    },
    watch: {
        //树状图筛选
        'dialog.filterText': {
            handler(val) {
                this.$refs['treeRef'].filter(val);
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
    async mounted() {
        //拉取树数据
        this.dialog.tree = await this.$api.common.getRole();
    },
    methods: {
        /**
         *@desc 打开弹窗
         */
        openDialog() {
            this.dialog.show = true;
            if (this.$refs['treeRef']) {
                this.$refs['treeRef'].setCheckedKeys(this.model);//重置选中内容
            }
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
            let target2 = this.$refs['treeRef'].getCheckedNodes();//选中的数据
            if (target.length > 0) {
                this.$emit('update', target);//更新数据
                this.$emit('change', target);//触发change
                this.showValue = target2;

                this.dialog.show = false;//关闭弹窗
            } else {
                this.$message.error("请选择负责人")
            }
        },
    }
}
</script>

<style lang="scss">
.jr-selected-role {
    .jr-tag-wrp {
        height: 28px;
        line-height: 28px;
        padding-left: 0;
        padding-right: 0;

        .el-tag {
            border-color: transparent;
            margin: 2px 0 2px 6px;
        }

        .el-tag__close.el-icon-close {
            background-color: #C0C4CC;
        }
    }
}
</style>