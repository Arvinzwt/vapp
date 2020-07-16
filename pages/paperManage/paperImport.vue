<template>
    <el-main class="jr-paperManage-paperImport">
        <Title>导入试卷</Title>
        <!--筛选内容-->
        <PaperSelect ref="paperSelect" :showphase="true"></PaperSelect>
        <el-form class="jr-filter-form" ref="paperform" :model="paramMap" label-width="70px" :rules="rule" size="mini" label-position="left">
            <el-row>
                <el-col :span="18">
                    <el-form-item label="选择试卷" ref="file" prop="file">
                        <el-upload
                            ref="uploadBom"
                            action=""
                            :show-file-list="true"
                            :auto-upload="true"
                            :file-list="paramMap.file"
                            :limit="1"
                            :on-exceed="onFileExceed"
                            :before-upload="onBeforeFile"
                            :http-request="onFileUpload"
                            :on-remove="handleRemove">
                            <el-button size="small" type="">选择文件</el-button>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="试卷名称" prop="paperName">
                <el-input placeholder="" style="width:202px;" v-model="paramMap.paperName"></el-input>
            </el-form-item>
        </el-form>
        <div class="paper-import-btn">
            <el-button plain size="mini">返回</el-button>
            <el-button type="primary" size="mini" @click="importPaper">导入</el-button>
        </div>
    </el-main>
</template>

<script>
    import Title from '@/components/testBank/Title.vue'
    import linkGroup from '@/components/testBank/LinkGroup.vue'
    import PaperSelect from '@/components/paperManage/PaperSelect.vue'
    import paperapi from '@/config/module/paperManage';

    export default {
        name: "paperImport",
        components: {
            Title,
            linkGroup,
            PaperSelect
        },
        data() {
            return {
                paramMap: {
                    pager: '',
                    paperName: '',
                    file: [],
                    onFileExceed: ''
                },
                docParamMap: {
                    file: [],
                    onFileExceed: ''
                },
                //文件检测数据参数
                detectParam: {
                    errorMsg: '检测结果正常',
                    parseMsg: '检测结果正常',
                    questions: [],
                },
                //验证规则
                rule: {
                    file: {
                        required: true,
                        message: '请选择试卷'
                    },
                    paperName: {
                        required: true,
                        message: '请输入试卷名称',
                    },
                },

            }
        },
        async created() {
            // //填充学科和学段
            // this.options.phaseList = await api.getParameterInfo({paramCode: 'Phase', status: 1});
            // this.options.subjectList = await api.getParameterInfo({paramCode: 'Subject', status: 1});
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
            /**
             *@desc 文档上传-上传-文件超出个数
             */
            onFileExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },

            /**
             *@desc 上传-上传前验证
             */
            onBeforeFile(file) {
                if (!file.name.includes('doc')) {
                    this.$message.error('只能上传doc文档!');
                    return false;
                } else {
                    this.paramMap.file = [];//清空上传列表，每次只上传最近上传的
                    return true;
                }
            },

            /**
             *@desc 移除选择的试卷
             */
            handleRemove(file) {
                this.paramMap.paperName = ''
            },

            /**
             *@desc 文档上传-上传-上传函数
             */
            onFileUpload(fileObj) {
                this.paramMap.file = [fileObj.file];
                this.paramMap.paperName = fileObj.file.name
            },
            topMsgChange(){

            },

            importPaper() {
                const isCheckOut = this.$refs.paperSelect.checkForm()
                const selectParamMap = this.$refs.paperSelect.paramMap
                this.$refs.paperform.validate((valid) => {
                    if(valid && isCheckOut) {
                        let formData = new FormData();
                        if (this.paramMap.file[0]) {
                            formData.append('file', this.paramMap.file[0]);
                            paperapi.paperFileAnalysis(formData).then(res => {
                                Object.assign(this.detectParam, res);
                                const data = {
                                    paperName: this.paramMap.paperName,
                                    subjectId: selectParamMap.subjectId,
                                    phaseId: selectParamMap.phaseId,
                                    gradeId: selectParamMap.gradeId,
                                    examTypeId: selectParamMap.examTypeId,
                                    yearId: selectParamMap.yearId,
                                    provinceId: selectParamMap.provinceId,
                                    cityId: selectParamMap.cityId,
                                    districtId: selectParamMap.districtId,
                                    termId: selectParamMap.termId,
                                    schoolId: selectParamMap.schoolId,
                                    questions: res.questions
                                }
                                paperapi.importTestpaper(data).then(result => {
                                    this.$message({
                                        message: '导入试卷成功',
                                        type: 'success'
                                    });
                                    this.$r.go('1-4', {}, 2, {redirectCode: '1-1', redirectQuery: {}});
                                })
                            }).catch(err => {
                            })
                        } else {
                            this.$message.error('请选择文件');
                        }
                    } else {
                    }
                })
            }
        },
        watch: {
            // 'paramMap.file'(val){
            //     if(this.paramMap.file.length > 0) {
            //         // this.$refs.paperform.resetFields()
            //         this.$refs.paperform.clearValidate(['file'])
            //         // this.$refs.file.clearValidate()
            //     } else {
            //         this.$refs.paperform.resetFields()
            //     }
            // }
        }
    }
</script>

<style lang="scss">

    .paper-import-btn {
        margin-top: 60px;
    }
</style>
