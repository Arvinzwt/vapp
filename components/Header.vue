<template>
    <!--头部信息栏-->
    <el-header class="jr-header" height="40px">
        <div class="jr-header-left">
            <span class="icon" @click="navCollapseHandle"
                  :class="navIsCollapse?'el-icon-s-fold':'el-icon-s-unfold'"></span>
            <span>{{ time.date }}</span>
        </div>
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
    </el-header>
</template>

<script>

export default {
    data() {
        return {
            time: {//当前时间
                date: null,
                interval: null,
            },
            user: {//用户信息
                name: null
            },
        }
    },
    async mounted() {
        this.user = await this.$api.common.user();//获取用户信息
        this.setTime();//设置倒计时
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
        },

        /**
         *@desc 设置倒计时
         */
        setTime() {
            let moment = this.$utils.moment;
            if (this.interval) clearInterval(this.interval);
            this.interval = setInterval(() => {
                this.time.date = moment().format('YYYY-MM-DD HH:mm:ss');
            }, 1000)
        }
    },
    destroyed() {
        if (this.interval) clearInterval(this.interval);
    }
}
</script>

<style lang="scss">
.jr-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #fafafa;

    .jr-header-left {
        color: #409EFF;
        display: flex;
        align-items: center;

        .icon {
            margin-right: 10px;
            cursor: pointer;
            font-size: 16px;
        }
    }
}
</style>
