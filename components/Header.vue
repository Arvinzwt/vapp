<template>
    <el-header class="crm-header" height="40px">
        <div class="crm-header_left">
            <div v-if="isShow" class="crm-header_item" @click="onBack">
                <i class="icon el-icon-arrow-left"></i>
                <span class="txt">返回</span>
            </div>
        </div>
        <div class="crm-header_right color-blue">
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
    export default {
        name: "Header",
        data() {
            return {
                isShow: false
            }
        },

        watch: {
            $route(now, old) {     //监控路由变换，控制返回按钮的显示-首页不显示回退按钮
                this.isShow = !(now.path === "/");
            }
        },
        methods: {
            /**
             *@desc 回退至上一页
             */
            onBack() {
                this.$router.back(-1)
            }
        }
    }
</script>

<style lang="scss">
    .crm-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #fff;
        font-size: 14px;

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
        }

        .crm-header_user {
            margin-right: 0;

            .txt {
                margin: 0 5px;
            }
        }
    }
</style>