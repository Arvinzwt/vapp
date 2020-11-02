<template>
    <el-main class="jr-index">
        <div class="login-wrap">
            <div class="login-title">
                <img class="login-logo" src="/images/login_bg3.png" alt="">
                <span class="font-size-title ml-4">CRM cloud platform</span>
            </div>
            <el-row class="login-bg shadow-light">
                <el-col :span="12" class="login-box">
                    <img class="login-img" src="@/static/images/login_bg1.png" alt="">
                </el-col>
                <el-col :span="12" class="login-box">
                    <div class="login-box-right">
                        <div class="login-box-title">登录 / Login In</div>
                        <el-form
                                :model="loginForm"
                                :rules="loginRule"
                                ref="ruleForm"
                                label-width="70px"
                                label-position="left"
                                class="login-form">
                            <el-form-item label="账号" prop="account">
                                <el-input v-model="loginForm.account" @keyup.enter.native="submitLoginForm"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="loginForm.password" @keyup.enter.native="submitLoginForm"
                                          show-password></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-checkbox size="mimi" v-model="loginForm.isRemember">记住我</el-checkbox>
                                <br>
                                <el-button class="w-100" type="primary" @click="submitLoginForm">立即登录</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
        </div>
    </el-main>
</template>

<script>
export default {
    name: "index",
    layout: "blank",
    data() {
        return {
            loginForm: {
                account: null,
                password: null,
                isRemember: false,
            },
            loginRule: {
                account: {required: true, message: '请输入账号', trigger: 'blur'},
                password: {required: true, message: '请输入密码', trigger: 'blur'}
            }
        }
    },
    mounted() {
        this.getAccount();
    },
    methods: {
        /**
         *@desc 读取账户
         */
        getAccount() {
            let usm = localStorage.getItem('usm');
            if (usm) {//如果已经存储
                this.loginForm.account = usm;//填充账户
                this.loginForm.isRemember = true;//填充rememberMe
            }
        },

        /**
         *@desc 存储账户
         */
        async setAccount() {
            if (this.loginForm.isRemember) {//如果记住账号
                localStorage.setItem('usm', this.loginForm.account);//存储账户名称
            } else {
                localStorage.removeItem('usm')//移除存储信息
            }
            return true
        },

        /**
         *@desc 登录
         */
        submitLoginForm() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {//如果验证通过
                    let loginForm = this.loginForm;
                    this.$store.dispatch('login',loginForm).then(res=>{
                        this.setAccount();
                        this.$router.push({
                            path: '/customer/customer-call'
                        })
                    })

                } else {
                    return false;
                }
            })
        }
    }
}
</script>

<style lang="scss">
.jr-index {
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .login-wrap {
        min-width: 850px;

        .login-title {
            height: 60px;
            display: flex;
            align-items: center;

            .login-logo {
                height: 30px;
                width: 138px;
            }
        }

        .login-box {
            width: 20vw;
            height: 20vw;;
            min-width: 420px;
            min-height: 420px;
            display: flex;
            align-items: center;
            justify-content: center;

            .login-img {
                display: block;
                width: 100%;
                height: 100%;
            }

            .login-box-title {
                font-size: 24px;
                height: 30%;
                font-weight: 700;
                color: #0f0934;
                margin-bottom: 80px;
            }

            .login-box-right {
                width: 80%;
            }
        }
    }

    .login-bg {
        background: url('/images/login_bg2.png') no-repeat 100% 0;
        background-size: 75px;
    }
}
</style>