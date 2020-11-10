<template>
    <!--选择角色-->
    <div class="jr-customer-selected-tag">
        <!--触发对象-->
        <slot>
            <div class="selected-wrp" @click="openDialog">
                <div v-if="showList.length>0" class="selected-wrp-main">
                    <div class="selected-wrp-tag">
                        <el-tag @close="deleteHandle" closable size="mini" type="info">
                            {{ showList[0].tag_Name }}
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
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" title="请选择标签"
                   :append-to-body="true" custom-class="jr-dialog" width="500px"
                   class="jr-customer-selected-tag">
            <!--弹窗内容-->
            <div class="dialog-body">
                <el-collapse v-model="activeNames" @change="">
                    <el-collapse-item v-for="item in tags" :key="item.tag_Id" :title="item.tag_Name"
                                      :name="item.tag_Id">
                        <el-tag size="small" class="mr-3 mb-2 cursor-pointer"
                                v-for="list in item.tag_Items"
                                :key="list.tag_Id"
                                :type="isActive(list)"
                                @click="tagTap(list)">{{ list.tag_Name }}
                        </el-tag>
                    </el-collapse-item>
                </el-collapse>
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
            activeNames: ['1'],
            dialog: {
                show: false,//是否显示弹窗
                value: [],
            },
            showList: [],//用来展示的结果数据
            tags: [],//标签列表
        }
    },
    watch: {
        'model': {
            handler(val) {
                this.setTag();//同步标签选中内容
            },
        }
    },
    computed: {
        isActive() {
            return list => {
                return this.dialog.value.includes(list.tag_Id) ? '' : 'info';
            }
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
        this.$api.customer.getTags({
            "clientNo": "",
            // "timeStamp": this.$utils.moment().valueOf(),
            "tag_parent_Id": 0
        }).then((res = []) => {
            this.activeNames = res.map(item => {
                return item.tag_Id;
            })
            this.tags = res;
            this.setTag()
        }).catch(err => {
        })
    },
    methods: {
        /**
         *@desc 同步标签选中内容
         */
        setTag() {
            this.showList = [];
            this.tags.forEach(item => {
                item.tag_Items.forEach(list => {
                    if (this.model.includes(list.tag_Id)) {
                        this.showList.push(list)
                    }
                })
            })
        },

        /**
         *@desc 打开弹窗
         */
        openDialog() {
            this.dialog.show = true;
            this.dialog.value = [...this.model];
        },

        /**
         *@desc 选择标签时
         */
        tagTap(obj) {
            if (this.dialog.value.includes(obj.tag_Id)) {
                this.dialog.value.splice(this.dialog.value.indexOf(obj.tag_Id), 1)
            } else {
                this.dialog.value.push(obj.tag_Id)
            }
            console.log(this.model)
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
            let target = this.dialog.value;//选中的数据
            if (target.length > 0) {
                this.$emit('update', target);//更新数据
                this.$emit('change', target);//触发change
                this.dialog.show = false;//关闭弹窗
            } else {
                this.$message.error("请选择标签")
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
.jr-customer-selected-tag {
    .el-collapse-item__content {
        padding-bottom: 10px;
    }

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