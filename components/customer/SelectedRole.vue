<template>
    <!--选择角色-->
    <div class="jr-selected-role">
        <!--触发对象-->
        <slot>
            <el-button @click="openDialog" size="mini">触发</el-button>
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
                show: false,//是否显示
                filterText: '',//筛选内容
                tree: [],//树数据
                treeProps: {//树结构
                    children: 'children',
                    label: 'label'
                }
            }
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
    async mounted() {
        this.dialog.tree = await this.$api.common.getRole();
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
    methods: {
        /**
         *@desc 打开弹窗
         */
        openDialog() {
            this.dialog.show = true;
            if (this.$refs['treeRef']) {
                let target = this.$utils.underscore.isArray(this.model) ? this.model : [];
                this.$refs['treeRef'].setCheckedKeys(target);//重置选中内容
            }
        },

        /**
         *@desc 筛选树状图
         *@param value [String] 筛选值
         *@param data [Object] 树数据
         */
        filterTreeNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
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
            let target = this.$refs['treeRef'].getCheckedKeys();
            if (target.length > 0) {
                this.$emit('update', target);//更新数据
                this.$emit('submit', {
                    ids:target,
                    name:(this.$refs['treeRef'].getCheckedNodes()).map(item=>{
                        return item.label;
                    })
                });//触发change
                this.dialog.show = false;
            } else {
                this.$message.error("请选择负责人")
            }
        },

    }
}
</script>

<style lang="scss">

</style>