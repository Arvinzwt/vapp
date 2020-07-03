<template>
    <el-main>
        <el-button @click="login">登录</el-button>
    </el-main>
</template>

<script>
    import api from '@/config/module/common'

    export default {
        name: "demo",
        data() {
            return {}
        },
        methods: {
            login() {
                api.login({name: 123, id: 456}).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style scoped>

</style>