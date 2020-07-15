<template>
    <el-main class="jr-paperManage-paperDraft">
        <Title haveLink>试卷草稿箱</Title>
        <el-button type="primary" plain size="mini" @click="toLinkImport">导入试卷</el-button>
        <PaperList></PaperList>
    </el-main>
</template>

<script>
    import Title from '~/components/testBank/Title.vue'
    import PaperList from '~/components/paperManage/PaperList.vue'

    export default {
        name: "paperDraft",
        components: {
            Title,
            PaperList
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
            toLinkImport() {
                this.$r.go('1-4')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
