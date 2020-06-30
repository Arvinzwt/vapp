<template>
    <div>
        登录

        <el-button @click="$auth.loginOut">登出</el-button>
        <div>{{user}}</div>
        <div>{{brand}}</div>
    </div>
</template>

<script>
    export default {
        methods: {},
        computed: {
            brand() {
                return this.$dic.gitDic('brand')
            },
            user(){
                return this.$auth.getUserInfo();
            }
        },
        created() {
            this.$auth.login({
                name:'123',
                id:'456'
            }).then(res=>{
                console.log(res)
            })
        }
    }
</script>

<style>

</style>
