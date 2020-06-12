<template>
    <el-aside class="crm-nav" width="200px">
        <h2 class="crm-nav_title">精锐在线</h2>
        <el-menu
            class="crm-nav_menu"
            background-color="#488ff1"
            text-color="#fff"
            router
            default-active="/">
            <el-submenu v-for="(mItem,index) in menu" :key="index" :index="index+'-'">
                <template slot="title">
                    <!--<i :class="mItem.icon"></i>-->
                    <span>{{mItem.name}}</span>
                </template>
                <el-menu-item v-for="(mList,ind) in mItem.item" :key="index+'-'+ind" :index="mList.path">
                    {{mList.name}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "Nav",
        data() {
            return {
                menu: [
                    {
                        icon: "el-icon-user",
                        name: "CRM",
                        item: [
                            {
                                name: "leads管理",
                                path: "/"
                            },
                            // {
                            //     name: "试听列表",
                            //     path: "/leads/auditionList",
                            // },
                            // {
                            //     name: "诺访记录",
                            //     path: "/leads/novoRecord",
                            // },
                            // {
                            //     name: "配额设置",
                            //     path: "/leads/quotaSettings",
                            // }
                        ]
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
    .crm-nav {
        background: #488ff1;
        color: #ffff;
        transition: width 0.2s linear;
        min-height: 100vh;

        .crm-nav_title {
            text-align: center;
            padding: 0;
            margin: 0;
            line-height: 56px;
            white-space: nowrap;
            overflow: hidden;
        }

        .crm-nav_menu {
            border-right: solid 1px transparent;

            .el-submenu__title i {
                color: #fff;
            }

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