<template>
    <!--头部信息栏-->
    <el-header class="jr-header" height="40px">
        <div class="text-color-brand font-size-auxiliary">{{ currentDate }}</div>
        <div class="">
            <el-dropdown class="text-color-brand font-size-auxiliary" @command="userClick">
                <div class="cursor-pointer">
                    <i class="el-icon-user-solid mr-1"></i>
                    <span class="">{{ user.name }}</span>
                    <i class="el-icon-arrow-down"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="e">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-header>
</template>

<script>

export default {
    name: "Header",
    data() {
        return {
            currentDate: '',//当前时间
            user: {},//用户信息
        }
    },
    async mounted() {
        this.currentDate = this.$utils.moment(new Date()).format('YYYY年MM月DD日');//获取当前年月日
        this.user = await this.$api.common.user();//获取用户信息
    },

    methods: {
        /**
         *@desc 退出登录
         */
        userClick(command) {
            if (command === 'e') {
                this.$store.dispatch('logout').then(res => {
                    this.$router.replace({
                        path: '/'
                    })
                });
            }
        },
    }
}
</script>

<style lang="scss">
.jr-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
