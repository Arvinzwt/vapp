<template>
    <div>
        <el-link @click="openDialog" type="primary" class="draft-main-foot-item font-basic">更换题型</el-link>

        <!--更换题型弹窗-->
        <el-dialog
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            modal
            title="更换题型"
            :visible.sync="dialog.show">
            <el-form
                class="jr-filter-form"
                size="mini"
                label-width="90px"
                label-position="left">

                <el-form-item label="学科">{{paramMap.subjectStr}}</el-form-item>
                <el-form-item label="学段">{{paramMap.phaseStr}}</el-form-item>
                <el-form-item label="题型">
                    <el-radio-group v-model="dialog.value">
                        <el-radio v-for="item in dialog.typeList"
                                  :key="item.typeName"
                                  :label="item.typeId">
                            {{item.typeName}}
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <!--<div>注意！选择题或多选题更改为其他题型时，选项会被清空!!! 刷新页面后生效</div>-->
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeDialog">取 消</el-button>
                <el-button size="mini" @click="submitDialog" type="primary">提 交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '@/config/module/testBank'

    export default {
        name: "ChangeTopicType",
        data() {
            return {
                dialog: {
                    value: '',
                    show: false,
                    typeList: [],
                },
            }
        },

        props: {
            model: {
                type: Number,
                default: -1
            },
            paramMap: {
                questionId: '',
                phaseId: 0,
                phaseStr: '',
                subjectId: 0,
                subjectStr: '',
            }
        },
        model: {
            prop: 'model',
            event: 'update'
        },

        methods: {
            /**
             *@desc 打开弹窗
             */
            async openDialog() {
                this.dialog.show = true;
                this.dialog.typeList = (await api.getQuestionType({
                    subjectId: this.paramMap.subjectId,
                    phaseId: this.paramMap.phaseId
                })) || [];
                this.dialog.value = this.model;
            },

            /**
             *@desc 关闭弹窗
             */
            closeDialog() {
                this.dialog.show = false;
            },

            /**
             *@desc 提交弹窗
             */
            submitDialog() {
                if (this.dialog.value) {
                    api.updateQuestionType({
                        questionId: this.paramMap.questionId,
                        typeId: this.dialog.value,
                    }).then(res => {
                        this.$message.success('更换标签成功');
                        this.$emit('change');
                        this.closeDialog();
                    })
                } else {
                    this.$message.error('请选择类型');
                }
            }
        }
    }
</script>

<style scoped>

</style>