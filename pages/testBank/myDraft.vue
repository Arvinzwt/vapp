<template>
    <el-main class="jr-testBank-myDraft">
        <!--title-->
        <Title>我的草稿</Title>

        <!--内容-->
        <TopicList></TopicList>
    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import KnowledgeTree from '~/components/testBank/KnowledgeTree.vue'
    import TopicList from '~/components/testBank/TopicList.vue'
    import Title from '~/components/testBank/Title.vue'
    import api from '@/config/module/testBank'

    export default {
        name: "myDraft",
        components: {
            linkGroup,
            KnowledgeTree,
            TopicList,
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
        methods: {}
    }
</script>

<style lang="scss">
    @import "@/assets/css/testBank.scss";
</style>