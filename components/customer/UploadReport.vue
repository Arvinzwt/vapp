<template>
    <div>
        <slot>
            <!--<el-link type="primary" @click="openDialog">上传报告</el-link>-->
        </slot>
        <!--弹窗-->
        <el-dialog :visible.sync="dialog.show" :close-on-click-modal="false" :append-to-body="true"
                   title="上传报告" custom-class="jr-dialog" width="600px">
            <!--弹窗内容-->
            <el-form class="jr-form" size="mini" :model="dialog.form" label-position="left" :rules="dialog.rules"
                     label-width="90px" ref="ruleForm">
                <!--上传报告-->
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="学员姓名">
                            <div class="jr-disabled-input">{{ dialog.form.name }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="生日">
                            <div class="jr-disabled-input">{{ dialog.form.birthday }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="线索客户来源">
                            <div class="jr-disabled-input">{{ dialog.form.intype }}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="学校">
                            <div class="jr-disabled-input">{{ dialog.form.school }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="15">
                    <el-col :span="12">
                        <el-form-item label="手机号">
                            <div class="jr-disabled-input">
                                {{ $utils.desensitizationPhone(dialog.form.phone) }}
                            </div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="家庭住址">
                            <div class="jr-disabled-input">{{ dialog.form.address }}</div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="dialog.form.type" placeholder="请选择" clearable>
                        <el-option
                                v-for="item in dic.reportType"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择文件"  prop="filepath">
                    <el-upload
                            action=""
                            ref="uploadBom"
                            :multiple="true"
                            list-type="text"
                            :show-file-list="true"
                            :auto-upload="false"
                            :file-list="dialog.form.filepath"
                            :limit="10"
                            :on-preview="onFilePreview"
                            :on-remove="onFileRemove"
                            :on-exceed="onFileExceed"
                            :http-request="onFileUpload"
                            :before-upload="onBeforeFile">
                        <el-link size="small" type="primary">上传</el-link>
                    </el-upload>
                </el-form-item>
            </el-form>
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
    name: "UploadReport",
    computed: {
        dic() {
            return this.$store.state.dic;
        }
    },
    props: ['leadsid'],
    data() {
        return {
            dialog: {
                show: false,
                form: {
                    name: '',
                    birthday: '',
                    intype: '',
                    school: '',
                    phone: '',
                    address: '',
                    studentid: "",
                    type: '',
                    filepath: [],
                },
                rules: {
                    type: {required: true, message: '请选择类型', trigger: 'blur'},
                    filepath: {required: true, type: 'array', message: '请选择上传文件', trigger: 'blur'},
                }
            }
        }
    },
    created() {
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {
        /**
         *@desc 上传报告
         */
        async openDialog() {
            let leadsid = this.leadsid;
            if (leadsid) {
                await this.$api.customer.detail({leadsid: leadsid}).then(student => {
                    Object.assign(this.dialog.form, {
                        ...student,
                        type: '',
                        filepath: [],
                    })
                    this.dialog.show = true;
                })

            } else {
                console.error('无法找到数据详情')
            }
        },

        /**
         *@desc 上传-文件超出个数
         */
        onFileExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },

        /**
         *@desc 上传-上传函数
         */
        onFileUpload(fileObj) {
            let paramMap = this.paramMap;
            let linkage = this.$refs.linkage;
            let formData = new FormData();

            formData.append('leads_file', fileObj.file);
            formData.append('org_code', linkage.org_code);
            formData.append('school_code', linkage.school_code);
            formData.append('charge_person', paramMap.charge_person.value);

            this.$post('leads-api/v2/leads/importleadsinfo', formData, {isAllParams: true}).then(res => {
                this.refreshPage().then(() => {
                    this.$message.success(res.data.msg);
                });
            })
        },

        /**
         *@desc 上传-上传前验证
         */
        onBeforeFile(file) {
            if (!file.name.includes('xls')) {
                this.$message.error('只能上传excel!');
                return false;
            } else {
                this.paramMap.list = [];//清空上传列表，每次只上传最近上传的
                return true;
            }
        },

        /**
         *@desc 上传-点击已上传文件
         */
        onFilePreview(file) {
            console.log('点击文件列表中已上传的文件时的钩子\t')
        },

        /**
         *@desc 上传-移除上传文件
         */
        onFileRemove(file, fileList) {
            console.log('文件列表移除文件时的钩子\t')
        },

        /**
         *@desc 关闭弹窗
         */
        closeDialog() {
            this.dialog.show = false;
        },

        /**
         *@desc提交
         */
        submitDialog() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {//如果验证通过
                    this.closeDialog();
                } else {
                    return false;
                }
            })
        },
    }
}
</script>

<style lang="scss">

</style>