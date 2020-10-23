<template>
    <!--选择角色-->
    <div class="jr-customer-selected-role">
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
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" title="分配负责人"
                   :append-to-body="true" custom-class="jr-dialog" width="30%">
            <!--弹窗内容-->
            <div class="dialog-body">
                暂无内容
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

            },
            showValue: [],//用来展示的结果数据
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

    },
    methods: {
        /**
         *@desc 打开弹窗
         */
        openDialog() {
            this.dialog.show = true;
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
            this.dialog.show = false;//关闭弹窗
        },
    }
}
</script>

<style lang="scss">
.jr-customer-selected-role {
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