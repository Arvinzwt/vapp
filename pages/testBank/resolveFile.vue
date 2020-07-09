<template>
    <el-main class="jr-testBank-resolveFile">
        <div class="jr-title">
            <h2>题目上传</h2>
            <a class="link color-blue font-basic" href="http://guanjia.onesmart.org:991/helper/ExciseUpload-guide.html"
               target="_blank">
                <span class="el-icon-warning-outline"></span>
                <span>查看学习管家操作指南</span>
            </a>
        </div>
        <div>
            <h3 class="jr-subtitle">导入检测文件结果</h3>
            <el-form
                class="jr-filter-form"
                size="mini"
                label-width="70px"
                label-position="left">
                <el-form-item label="检测域">
                    <el-input type="textarea" :rows="3"></el-input>
                </el-form-item>
                <el-form-item label="解析域">
                    <el-input type="textarea" :rows="3"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="btn-box t-right">
            <el-button size="mini" type="primary" @click="importFile">导入</el-button>
        </div>
    </el-main>
</template>

<script>
    export default {
        name: "resolveFile",
        data() {
            return {}
        },
        created() {
        },
        mounted() {
        },
        destroyed() {
        },
        methods: {
            async importFile() {
                this.$r.go('0-2', {}, 2, {redirectCode: '0-1',redirectQuery:{id:123123}});
                // this.$r.go('0-2', {}, 2);
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/testBank.scss";

    .jr-testBank-resolveFile {
        .btn-box {
            margin-top: 50px;
        }
    }
</style>