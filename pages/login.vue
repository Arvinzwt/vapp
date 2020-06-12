<template>
    <el-container class="crm-login">
        <div class="wrapper">
            <div class="title">
                <img alt="title_logo" src="../static/images/login_logo.png" height="30" width="138"/>
                <span class="title_p">Open cloud platform</span>
            </div>
            <!--登录-->
            <el-card class="card" :body-style="cardBodyStyle">
                <div class="left"></div>
                <div class="right">
                    <div class="right_wrapper">
                        <div class="title">登录 / Login in</div>
                        <!--表单-->
                        <el-form
                            :model="loginForm"
                            :rules="rules"
                            ref="ruleForm"
                            label-width="auto"
                            class="right_form">

                            <el-form-item label="账号" prop="account">
                                <el-input v-model="loginForm.account"></el-input>
                            </el-form-item>

                            <el-form-item label="密码" prop="password">
                                <el-input v-model="loginForm.password" show-password></el-input>
                            </el-form-item>

                            <el-form-item>
                                <el-checkbox size="mimi" v-model="loginForm.isRemember">记住我</el-checkbox>
                                <br/>
                                <el-button class="right_btn" type="primary" @click="submitLoginForm">立即登录</el-button>
                            </el-form-item>

                        </el-form>
                    </div>
                </div>
            </el-card>
        </div>
    </el-container>
</template>

<script>
    export default {
        layout: 'blankness',
        data() {
            return {
                // 登录表单
                loginForm: {
                    account: '',//账户
                    password: '',//密码
                    isRemember: false,//是否记录账号密码
                },

                //登录验证规则
                rules: {
                    account: {required: true, message: '请输用账号', trigger: 'blur'},
                    password: {
                        required: true,
                        validator: (rule, value, callback) => {
                            if (/^[A-Za-z0-9]+$/.test(value)) {
                                callback();
                            } else {
                                callback(new Error('请输入密码'));
                            }
                        }, message: '请输入密码'
                    }
                },

                // 登录项样式
                cardBodyStyle: {
                    'padding': 0,
                    'display': 'flex',
                }
            }
        },
        methods: {
            /**
             *@desc 立即登录
             */
            submitLoginForm() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {//如果验证通过
                        console.log(this.loginForm)
                    } else {
                        return false
                    }
                })
            }
        },
    }
</script>

<style lang="scss">
    .crm-login {
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;


        .title {
            display: flex;
            align-items: center;
            height: 60px;

            .title_p {
                font-size: 18px;
                margin-left: 20px;
            }
        }

        .card {

            .left {
                width: 30vw;
                height: 30vw;;
                min-width: 420px;
                min-height: 420px;
                background: url("../static/images/login_bg.png") no-repeat center;
                background-size: 100% 100%;
            }

            .right {
                width: 30vw;
                height: 30vw;;
                min-width: 420px;
                min-height: 420px;
                background: url("../static/images/login_bg2.png") no-repeat right top;
                background-size: 18%;

                display: flex;
                align-items: center;
                justify-content: center;
            }

            .right_wrapper {
                width: 80%;

                .title {
                    font-size: 24px;
                    height: 30%;
                    font-weight: 700;
                    color: #0f0934;
                    margin-bottom: 20px;
                }

                .right_checkbox {
                    font-size: 12px;
                }

                .right_btn {
                    width: 100%;
                }
            }
        }
    }
</style>