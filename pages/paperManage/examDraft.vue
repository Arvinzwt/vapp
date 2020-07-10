<template>
    <el-main>
        <Title>
            <template>试卷草稿箱</template>
            <template slot="expand">
                <a class="link color-blue font-basic"
                   href="http://guanjia.onesmart.org:991/helper/ExciseUpload-guide.html"
                   target="_blank">
                    <span class="el-icon-warning-outline"></span>
                    <span>查看学习管家操作指南</span>
                </a>
            </template>
        </Title>
    </el-main>
</template>

<script>
    import Title from '~/components/testBank/Title.vue'

    export default {
        name: "examDraft",
        components: {
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

<style scoped>

</style>