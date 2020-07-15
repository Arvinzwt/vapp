<template>
    <el-main class="jr-paperManage-paperImport">
        <Title>导入试卷</Title>
        <!--筛选内容-->
        <PaperSelect></PaperSelect>
        <el-form class="jr-filter-form" ref="paperform" :model="form" label-width="70px" :rules="rule" size="mini" label-position="left">
            <el-form-item label="选择试卷" prop="pager">
                <el-input placeholder="" style="width:202px;"></el-input>
            </el-form-item>
            <el-form-item label="试卷名称" prop="paperName">
                <el-input placeholder="" style="width:202px;"></el-input>
            </el-form-item>
        </el-form>
        <div class="paper-import-btn">
            <el-button plain size="mini">返回</el-button>
            <el-button type="primary" size="mini">导入</el-button>
        </div>
    </el-main>
</template>

<script>
    import Title from '@/components/testBank/Title.vue'
    import linkGroup from '@/components/testBank/LinkGroup.vue'
    import PaperSelect from '@/components/paperManage/PaperSelect.vue'
    // import api from '@/config/module/testBank'

    export default {
        name: "paperImport",
        components: {
            Title,
            linkGroup,
            PaperSelect
        },
        data() {
            return {
                form: {
                    pager: '',
                    paperName: ''
                },
                //验证规则
                rule: {
                    pager: {
                        required: true,
                        message: '请选择试卷'
                    },
                    paperName: {
                        required: true,
                        message: '请输入试卷名称'
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
            topMsgChange(){

            },

            submit() {
                this.$refs.rulesForm.validate((valid) => {
                    if(valid) {
                        console.log(1)
                    } else {
                        console.log(2)
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/testBank.scss";
    .paper-import-btn {
        margin-top: 60px;
    }
</style>
