<template>
    <!--选择角色-->
    <div class="jr-customer-selected-role">
        <!--触发对象-->
        <slot>
            <div class="selected-wrp" @click="openDialog">
                <div v-if="showList.length>0" class="selected-wrp-main">
                    <div class="selected-wrp-tag">
                        <el-tag @close="deleteHandle" closable size="mini" type="info">
                            {{ showList[0].name }}
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
                   :append-to-body="true" custom-class="jr-dialog" width="500px" class="jr-customer-selected-role">
            <!--弹窗内容-->
            <div class="dialog-body">
                <el-input v-model="dialog.filter" placeholder="请输入姓名，手机号" clearable/>
                <div class="box">
                    <el-radio-group v-model="dialog.radio">
                        <el-radio v-for="item in salesList" :label="item.id" :key="item.id">
                            {{ item.name }}
                        </el-radio>
                    </el-radio-group>
                </div>
                <div v-if="salesList.length===0" class="p-4 text-center">
                    暂无数据
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
                filter: '',//筛选内容
                radio: '',
            },
            showList: [],//用来展示的结果数据
            salesList: [],
        }
    },
    watch: {
        'dialog.filter': {
            handler(val) {
                this.salesList = val ? this.dic.sales.filter(item => {
                    return item.name.includes(val);
                }) : this.dic.sales;
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
    props: ['model'],
    computed: {
        dic() {
            return this.$store.state.dic;
        },
    },
    async mounted() {
        this.salesList = await this.$api.common.sales() || [];
        this.setShowValue();
    },
    methods: {
        /**
         *@desc 设置初始显示的value
         */
        setShowValue() {
            let target = this.salesList.find(item => {
                return item.id == this.model;
            })
            this.showList = target ? [target] : [];
        },

        /**
         *@desc 打开弹窗
         */
        openDialog() {
            this.dialog.show = true;
            this.$nextTick(() => {
                this.dialog.radio = this.model;
            })
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
            if (this.dialog.radio) {
                this.$emit('update', this.dialog.radio);//更新数据
                this.$emit('change', this.dialog.radio);//触发change
                this.dialog.show = false;//关闭弹窗
            } else {
                this.$message.error("请选择负责人")
            }
        },

        /**
         *@desc 删除结果时
         */
        deleteHandle() {
            this.$emit('update', '');//更新数据
            this.$emit('change', '');//触发change
        },

        /**
         *@desc 清除结果时
         */
        clearHandle() {
            this.$emit('update', '');//更新数据
            this.$emit('change', '');//触发change
        }
    }
}
</script>

<style lang="scss">
.jr-customer-selected-role {
    $inputHeight: 28px;

    .box {
        max-height: 300px;
        overflow-y: scroll;
        margin-top: 20px;
    }

    .el-radio-group {
        display: flex;
        flex-wrap: wrap;

        .el-radio {
            width: 144px;
            padding: 6px 0;
            margin-right: 0;

            .el-radio__label {
                font-size: 12px;
            }
        }
    }


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