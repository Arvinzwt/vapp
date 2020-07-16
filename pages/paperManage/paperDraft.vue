<template>
    <el-main class="jr-paperManage-paperDraft">
        <Title haveLink>试卷草稿箱</Title>
        <el-button type="primary" plain size="mini" @click="toLinkImport">导入试卷</el-button>
        <PaperList ref="paperList" :searchData="searchData" :queryType="queryType"></PaperList>
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
            return {
                queryType: 'draft',//查询试卷列表的类型（正式：all， 草稿：draft，待审核：review）
                searchData: {}
            }
        },
        created() {

        },
        mounted() {
            this.searchPaper()
        },
        destroyed() {
        },
        methods: {
            /**
            *@desc 获取草稿试卷
            */
            searchPaper() {
                this.$refs.paperList.searchPaperList()
            },
            toLinkImport() {
                this.$r.go('1-4')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
