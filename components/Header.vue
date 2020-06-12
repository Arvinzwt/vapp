<template>
    <el-header class="crm-header c-color_blue" height="40px">
        <div class="crm-header_left">
            {{currentDate}}
        </div>
        <div class="crm-header_right ">
            <el-badge class="crm-header_item" :value="0">
                <i class="icon el-icon-date"></i>
            </el-badge>

            <el-badge class="crm-header_item" :value="0">
                <i class="icon el-icon-bell"></i>
            </el-badge>

            <div class="crm-header_item crm-header_user">
                <i class="icon el-icon-user-solid"></i>
                <span class="txt">用户名</span>
                <i class="icon el-icon-arrow-down"></i>
            </div>
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
        created() {
            this.currentDate = moment(new Date()).format('YYYY年MM月DD');
        }
    }
</script>

<style lang="scss">
    .crm-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;

        .crm-header_left, .crm-header_right {
            display: flex;
            align-items: center;

            .icon {
                font-size: 16px;
            }
        }

        .crm-header_item {
            cursor: pointer;
            display: flex;
            align-items: center;
            margin-right: 30px;
            font-size: 12px;
        }

        .crm-header_user {
            margin-right: 0;

            .txt {
                margin: 0 5px;
            }
        }
    }
</style>