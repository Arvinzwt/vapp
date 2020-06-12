<template>
    <el-main>

    </el-main>
</template>

<script>
    export default {
        name: "leadsFollow",
        data() {
            return {
                type: 0,//0:获取新的leads; 1:跟进leads; 2:leads详情
            }
        },
        created() {
            this.type = this.$route.query.type;//判定页面类型
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