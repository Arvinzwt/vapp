<template>
    <el-main>
        <el-button @click="login">登录</el-button>
<!--        <div>{{menuInfo}}</div>-->
<!--        <div> {{dictInfo}}</div>-->
<!--        <div>{{userInfo}}</div>-->
    </el-main>
</template>

<script>

    export default {
        name: "demo",
        data() {
            return {}
        },
        computed:{
            menuInfo(){
                return this.$store.getters['menuInfo/getMenuInfo']
            },
            dictInfo(){
                return this.$store.getters['dicInfo/getDicInfo']
            },
            userInfo(){
                return this.$store.getters['userInfo/getUserInfo']
            }
        },
        methods: {
            login() {

            }
        }
    }
</script>

<style scoped>

</style>