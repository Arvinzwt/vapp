<template>
    <el-header class="jr-header" height="40px">
        <div class="jr-header_left color-blue">{{currentDate}}</div>
        <div class="jr-header_right">
            <el-dropdown class="jr-header_item" @command="handleCommand">
                <div class="color-blue">
                    <i class="icon el-icon-user-solid"></i>
                    <span class="txt">{{userInfo.real_name}}</span>
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
    import moment from 'moment';

    export default {
        name: "Header",
        data() {
            return {
                currentDate: moment(new Date()).format('YYYY年MM月DD日 周E'),
            }
        },
        computed: {
            userInfo() {
                return this.$store.getters['userInfo/getUserInfo']
            },
        },

        methods: {
            /**
             *@desc 操作用户权限时
             *@serial [e] 退出
             */
            handleCommand(command) {
                if (command === 'e') {
                    this.$store.dispatch('loginOut');
                }
            }
        }
    }
</script>

<style lang="scss">
    .jr-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;

        .jr-header_left, .jr-header_right {
            display: flex;
            align-items: center;

            .icon {
                font-size: 16px;
            }

            .jr-header_item {
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 12px;

                .txt {
                    margin: 0 5px;
                }
            }
        }
    }
</style>
