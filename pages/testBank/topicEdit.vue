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
            <div class="knowledge-wrap mar-l-15 mar-b-15">
                <div class="knowledge-wrap-item">
                    <div class="knowledge-wrap-left">
                        <KnowledgeTree v-model="paramMap.knowledgeIds1" :disabled="type==='1'">同步
                        </KnowledgeTree>
                    </div>
                    <div class="knowledge-wrap-right jr-tag">
                        <div class="jr-tag-item" v-for="item in paramMap.knowledgeIds1"
                             :key="item.knowledgeId">
                            <span>{{item.name}}</span>
                            <span @click="removeKnowledge(item,1)" class="icon el-icon-close"></span>
                        </div>
                    </div>
                </div>

                <div class="knowledge-wrap-item">
                    <div class="knowledge-wrap-left">
                        <KnowledgeTree v-model="paramMap.knowledgeIds2" :type="2" :disabled="type==='1'">专题
                        </KnowledgeTree>
                    </div>
                    <div class="knowledge-wrap-right jr-tag">
                        <div class="jr-tag-item" v-for="item in paramMap.knowledgeIds2" :key="item.name">
                            <span>{{item.name}}</span>
                            <span @click="removeKnowledge(item,2)" class="icon el-icon-close"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!--题型-->
        <div>
            <h3 class="jr-subtitle">题型</h3>
            <Topic></Topic>
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
                type: 2,
                paramMap: {
                    knowledgeIds1: [],
                    knowledgeIds2: [],
                }
            }
        },
        created() {
            this.type = this.$route.query.type ? this.$route.query.type : 2;
        },
        methods: {
            removeKnowledge() {

            }
        }
    }
</script>

<style lang="scss">
    @import "@/assets/css/testBank.scss";
</style>