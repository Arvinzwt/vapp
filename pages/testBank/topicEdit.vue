<template>
    <el-main class="jr-testBank-topicEdit">
        <!--title-->
        <Title>题目编辑</Title>

        <div class="jr-tag">
            <div class="jr-tag-item mar-r-15">数学</div>
            <div class="jr-tag-item">初中</div>
        </div>

        <!--所属知识点-->
        <div>
            <h3 class="jr-subtitle">所属知识点</h3>
            <KnowledgeTree v-model="paramMap.knowledgeIds"></KnowledgeTree>
        </div>

        <!--题型-->
        <div>
            <h3 class="jr-subtitle">题型</h3>
            <Topic :param="paramMap"></Topic>
        </div>
    </el-main>
</template>

<script>
    import linkGroup from '~/components/testBank/LinkGroup.vue'
    import KnowledgeTree from '~/components/testBank/KnowledgeTree.vue'
    import Topic from '~/components/testBank/Topic.vue'
    import Title from '~/components/testBank/Title.vue'

    import api from '@/config/module/testBank'

    export default {
        name: "topicEdit",
        components: {
            linkGroup,
            KnowledgeTree,
            Topic,
            Title,
        },
        data() {
            return {
                paramMap: {
                    pageType: '0',
                    questionId: '',
                    knowledgeIds: {
                        syncIds: [],
                        specIds: [],
                    },
                }
            }
        },
        created() {
            this.paramMap.pageType = this.$route.query.pageType ? this.$route.query.pageType : '0';
            this.paramMap.questionId = this.$route.query.questionId || '';
        },
        methods: {
            removeKnowledge() {

            }
        }
    }
</script>

<style lang="scss">

</style>