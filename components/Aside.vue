<template>
    <!--左侧菜单-->
    <el-aside class="jr-aside" width="200px">
        <img src="/images/menu_bg.png" alt="logo" class="aside-logo"/>
        <el-menu
                class="aside-menu"
                background-color="#488ff1"
                text-color="#fff"
                :default-openeds="['customer']"
                default-active="customer-manage">
            <el-submenu index="customer">
                <template slot="title">
                    <span class="iconfont iconxueyuan mr-1"></span>
                    <span>{{ mItem.title }}</span>
                </template>
                <el-menu-item index="customer-manage" class="active">
                    <span>页面1</span>
                    <span class="jr-badge">6</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
export default {
    name: "Aside",
    data() {
        return {
            menuList: [],
        }
    },
    async mounted() {

    },
    methods: {

    }
}
</script>

<style lang="scss">
.jr-aside {
    background: #488ff1;
    color: #ffff;
    transition: width 0.2s linear;

    .aside-logo {
        display: block;
        width: 90%;
        margin: 5px auto;
        border-radius: 4px;
    }

    .aside-menu {
        border-right: 1px solid transparent;

        .el-submenu__title i {
            color: #fff;
        }

        .el-menu-item.active {
            color: #fff;
            background: #76aeff !important;
        }

        .el-menu-item.is-active {
            color: #fff;
        }

        .el-menu-item {
            font-size: 12px;
            min-width: auto;
        }
    }
}
</style>
