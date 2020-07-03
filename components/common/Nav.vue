<template>
    <el-aside class="jr-nav" width="200px">
        <h2 class="jr-nav_title">
            <img src="/images/logo.png" alt="logo" class="logo"/>
        </h2>
        <el-menu
            class="jr-nav_menu"
            background-color="#488ff1"
            default-active="/"
            :default-openeds="['jr']"
            router
            text-color="#fff">
            <el-submenu index="jr">
                <template slot="title">
                    <span>交易管理</span>
                </template>
                <el-menu-item index="/order/orderManage">订单列表</el-menu-item>
                <el-menu-item index="/order/orderCreate">创建订单</el-menu-item>
                <el-menu-item index="/order/orderDetail">订单详情</el-menu-item>
                <el-menu-item index="/order/refundManage">退费管理</el-menu-item>
                <el-menu-item index="/order/payManage">支付管理</el-menu-item>
                <el-menu-item index="/order/invoiceManage">发票管理</el-menu-item>
                <el-menu-item index="/order/invoiceDetail">发票详情</el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {}
        },

        computed: {

        },

        mounted() {

        },

        methods: {

        }
    }
</script>

<style lang="scss">
    .jr-nav {
        background: #488ff1;
        color: #ffff;
        transition: width 0.2s linear;
        min-height: 100vh;

        .logo{
            width:90%;
            margin:5px auto;
            margin-bottom:0;
            border-radius: 4px;
        }

        .jr-nav_title {
            text-align: center;
            padding: 0;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
        }

        .jr-nav_menu {
            border-right: solid 1px transparent;

            .el-submenu__title i {
                color: #fff;
            }

            /*.el-menu-item.active {*/
            /*    color: #fff;*/
            /*    background: #76aeff !important;*/
            /*}*/

            .el-menu-item.is-active {
                color: #fff;
                background: #76aeff !important;
            }

            .el-menu-item {
                font-size: 12px;
            }
        }
    }
</style>
