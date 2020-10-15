<template>
    <el-main>
        <el-form  label-width="70px" label-position="left">
            <el-form-item label="username">
                <el-input type="text" v-model="login.username" />
            </el-form-item>
            <el-form-item label="password">
                <el-input type="text" v-model="login.password" />
            </el-form-item>
            <el-form-item>
                <el-button @click="userLogin">submit</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script>
export default {
    data() {
        return {
            login: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        async userLogin() {
            try {
                let response = await this.$auth.loginWith('customStrategy', { data: this.login })
            } catch (err) {
                console.log(err)
            }
        },
    }
}
</script>
