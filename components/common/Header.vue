<template>
    <el-header class="jr-header color-blue" height="40px">
        <div class="jr-header_left">
            {{currentDate}}
        </div>
        <div class="jr-header_right">
            <el-dropdown class="jr-header_item jr-header_user" @command="onUserListClick">
                <div class="el-dropdown-link color-blue">
                    <i class="icon el-icon-user-solid"></i>
                    <span class="txt">张三</span>
                    <i class="icon el-icon-arrow-down"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="h">退出</el-dropdown-item>
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
                currentDate: '',
            }
        },
        computed: {

        },
        created() {
            this.currentDate = moment(new Date()).format('YYYY年MM月DD日 周E');
        },
        methods: {
            /**
             *@desc 操作用户权限时
             */
            onUserListClick(command) {
                if (command === 'h') {

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
        }

        .jr-header_item {
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-right: 30px;
            font-size: 12px;
        }

        .jr-header_user {
            margin-right: 0;

            .txt {
                margin: 0 5px;
            }
        }
    }
</style>
