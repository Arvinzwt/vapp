<template>
    <el-container class="jr-login">
        <div class="wrapper">
            <div class="title">
                <img alt="title_logo" src="/images/login_logo.png" height="30" width="138"/>
                <span class="title_p">MANAGE cloud platform</span>
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
                            label-width="70px"
                            label-position="left"
                            class="right_form">

                            <el-form-item label="账号" prop="account">
                                <el-input v-model="loginForm.account" @keyup.enter.native="submitLoginForm"></el-input>
                            </el-form-item>

                            <el-form-item label="密码" prop="password">
                                <el-input v-model="loginForm.password" @keyup.enter.native="submitLoginForm"
                                          show-password></el-input>
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
    import api from '@/config/module/common';

    export default {
        layout: 'blank',
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
                    account: {required: true, message: '请输入账号', trigger: 'blur'},
                    password: {required: true, message: '请输入密码', trigger: 'blur'}
                },

                // 登录项样式
                cardBodyStyle: {
                    'padding': 0,
                    'display': 'flex',
                }
            }
        },
        mounted() {
            this.getAccount();
        },
        methods: {
            /**
             *@desc 拉取本地存储的用户信息
             */
            getAccount() {
                let account = localStorage.getItem('usm');
                if (account) {//如果已经存储
                    this.loginForm.account = account;//填充账户
                    this.loginForm.isRemember = true;//填充rememberMe
                }
            },

            /**
             *@desc 本地存储的用户信息
             */
            setAccount() {
                if (this.loginForm.isRemember) {//如果记住账号
                    localStorage.setItem('testAccount', this.loginForm.account);//存储账户名称
                } else {
                    localStorage.removeItem('testAccount')//移除存储信息
                }
            },

            /**
             *@desc 立即登录
             */
            submitLoginForm() {
                this.$refs['ruleForm'].validate((valid) => {
                    if (valid) {//如果验证通过
                        //登录
                        api.login({
                            hrcode: this.loginForm.account,
                            password: this.loginForm.password,
                        }).then(userInfo => {
                            this.setAccount();//本地存储用户账户名
                            return this.$store.dispatch('userInfo/setUserInfo', userInfo);//存储用户信息
                        }).then(userInfo => {
                            return api.getDictionary()//拉取字典
                        }).then(dicList => {
                            return this.$store.dispatch('dictionary/setDictionary', dicList);//存储字典信息
                        }).then(dicList => {
                            return api.getMenu();//拉取菜单信息
                        }).then(menuInfo => {
                            return this.$store.dispatch('menuInfo/setMenuInfo', menuInfo);//存储菜单信息
                        }).then(menuInfo => {
                            // this.$router.push({
                            //     path: '/testBank/titleUpload'
                            // })
                        }).catch(err => {
                            console.log(err);
                        })


                    } else {
                        return false
                    }
                })
            }
        },
    }
</script>

<style lang="scss">
    .jr-login {
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
                width: 20vw;
                height: 20vw;;
                min-width: 420px;
                min-height: 420px;
                background: url("/images/login_bg.png") no-repeat center;
                background-size: 100% 100%;
            }

            .right {
                width: 20vw;
                height: 20vw;;
                min-width: 420px;
                min-height: 420px;
                background: url("/images/login_bg2.png") no-repeat right top;
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
                    margin-bottom: 80px;
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
