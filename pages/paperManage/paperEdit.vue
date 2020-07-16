<template>
    <el-main class="jr-paperManage-paperEdit">
        <Title>试卷编辑</Title>
        <div class="paperEdit-submit">
            <el-row :gutter="18">
              <el-col :span="6">
                  <el-input v-model="nameid" placeholder="" size="mini"></el-input>
              </el-col>
              <el-col :span="6">
                  <el-button type="primary" size="mini">保存</el-button>
              </el-col>
            </el-row>
        </div>
        <TopicList></TopicList>
    </el-main>
</template>

<script>
    import Title from '~/components/testBank/Title.vue'
    import TopicList from '~/components/testBank/TopicList.vue'

    export default {
        name: "paperEdit",
        components: {
            Title,
            TopicList
        },
        data() {
            return {
                nameid: ''
            }
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

<style lang="scss" scoped>
    .paperEdit-submit {
        margin-bottom: 20px;
    }
</style>
