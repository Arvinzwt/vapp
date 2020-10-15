<template>
    <el-main class="container">
        <el-form label-width="100px" label-position="left">
            <el-form-item label="用户信息">
                {{$auth.user}}
            </el-form-item>
            <el-form-item label="是否登录">
                {{$auth.loggedIn}}
            </el-form-item>
        </el-form>
        <el-button @click="loginOut">loginOut</el-button>
    </el-main>
</template>

<script>
export default {
    components: {},
    methods: {
        loginOut() {
            this.$auth.logout().then(res=>{
                this.$router.push('/login')
            })
        }
    }
}
</script>

<style>

</style>
