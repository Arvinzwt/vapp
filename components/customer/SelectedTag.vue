<template>
    <!--选择标签-->
    <div class="jr-selected-role">
        <!--触发对象-->
        <slot>
            <el-button @click="openDialog" size="mini">触发</el-button>
        </slot>

        <!--弹窗-->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false"
                   :append-to-body="true" custom-class="jr-dialog" width="30%">
            <!--弹窗头部-->
            <h3 slot="title" class="dialog-header">请选择标签</h3>
            <!--弹窗内容-->
            <div slot="default" class="dialog-body">
                <el-form class="jr-form" size="mini" :model="dialog.form" :rules="dialog.rules"
                         label-width="90px" label-position="left">
                    <el-form-item label="家庭收入" prop="value1">
                        <el-select v-model="dialog.form.value1" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options1"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="是否有二胎" prop="value2">
                        <el-select v-model="dialog.form.value2" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options2"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="续费可能性" prop="value3">
                        <el-select v-model="dialog.form.value3" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options3"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预警" prop="value4">
                        <el-select v-model="dialog.form.value4" placeholder="请选择" clearable>
                            <el-option
                                    v-for="item in options.options4"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
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
                form: {
                    value1: null,
                    value2: null,
                    value3: null,
                    value4: null,
                },
                rules: {},
            },
            options: {
                options1: [
                    {name: '年收入10w-20w', id: '0'},
                    {name: '年收入50w-100w', id: '1'},
                    {name: '100w+', id: '2'}
                ],
                options2: [
                    {name: '有', id: '0'},
                    {name: '无', id: '1'},
                ],
                options3: [
                    {name: '大', id: '0'},
                    {name: '小', id: '1'},
                ],
                options4: [
                    {name: '1级', id: '0'},
                    {name: '2级', id: '1'},
                ],
            }
        }
    },
    model: {
        prop: 'model',
        event: 'update'
    },
    props: {
        model: {//绑定值
            type: Object,
            default() {
                return {}
            }
        },
    },
    methods: {
        /**
         *@desc 打开弹窗
         */
        openDialog() {
            this.dialog.show = true;
            Object.assign(this.dialog.form, this.model)
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
            let target = this.dialog.form;
            let tar1 = this.options.options1.find(item => {
                return item.id === target.value1;
            }) || {name: ''}
            let tar2 = this.options.options2.find(item => {
                return item.id === target.value1;
            }) || {name: ''}
            let tar3 = this.options.options3.find(item => {
                return item.id === target.value1;
            }) || {name: ''}
            let tar4 = this.options.options4.find(item => {
                return item.id === target.value1;
            }) || {name: ''}

            this.$emit('update', target);//更新数据
            this.$emit('submit', {
                ids: target,
                name: [tar1.name, tar2.name, tar3.name, tar4.name]
            });//触发change
            this.dialog.show = false;
        },

    }
}
</script>

<style lang="scss">

</style>