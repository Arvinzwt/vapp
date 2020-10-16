<template>
    <el-main>
        <el-button @click="login">登录</el-button>
        <el-button @click="user">用户</el-button>
        <el-button @click="download">用户</el-button>
    </el-main>
</template>

<script>
export default {
    name: "login",
    data() {
        return {}
    },
    created() {
        // console.log(this.$api.common)
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {
        login() {
            this.$api.common.login({name: '张三'}).then(res => {
                console.log('res', res)
            }).catch(err => {
                console.log('err', err)
            })
        },
        user() {
            this.$api.common.user({id: 'zs'}).then(res => {
                console.log('res', res)
            }).catch(err => {
                console.log('err', err)
            })
        },
        download(){
            this.$api.common.dimg({id: 'zs'}).then(res => {
                console.log('res', res)
            }).catch(err => {
                console.log('err', err)
            })
        }
    }
}
</script>

<style lang="scss">

</style>