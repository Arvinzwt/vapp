<template>
    <el-main class="jr-testBank-topicDetect">
        <!--title-->
        <Title>题目上传</Title>

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

            <el-form-item>
                <el-button size="mini" type="primary" @click="importFile">导入</el-button>
            </el-form-item>
        </el-form>

    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import KnowledgeTree from '~/components/testBank/KnowledgeTree.vue'
    import Title from '~/components/testBank/Title.vue'
    import api from '@/config/module/testBank'

    export default {
        name: "topicDetect",
        components: {
            linkGroup,
            KnowledgeTree,
            Title,
        },
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
            importFile() {
                this.$r.go('0-5', {}, 2, {redirectCode: '0-1', redirectQuery: {id: 123123}});
            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/testBank.scss";
</style>