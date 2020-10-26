<template>
    <!--头部信息栏-->
    <el-header class="jr-header" height="40px">
        <div class="text-color-brand font-size-subtitle cursor-pointer" @click="navCollapseHandle">
            <span class="iconfont mr-2" :class="navIsCollapse?'iconmenuoff':'iconmenuon'"></span>
        </div>
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
    data() {
        return {
            user: {//用户信息
                name: null
            },
        }
    },
    async mounted() {
        this.user = await this.$api.common.user();//获取用户信息
    },
    props: ['navIsCollapse'],
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

        /**
         *@desc 打开关闭菜单
         */
        navCollapseHandle() {
            this.$emit('change')
        }
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
