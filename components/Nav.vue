<template>
    <el-aside class="jr-nav" width="200px">
        <h2 class="jr-nav_title">
            <img src="/images/logo.png" alt="logo" class="logo"/>
        </h2>
        <el-menu
            class="jr-nav_menu"
            background-color="#488ff1"
            :default-active="menuInfo.active"
            text-color="#fff">
            <el-submenu v-for="mItem in menuInfo.list"
                        :key="mItem.code"
                        :index="mItem.code">
                <template slot="title">
                    <span>{{mItem.name}}</span>
                </template>
                <el-menu-item v-for="mList in mItem.child"
                              :key="mList.code"
                              :class="menuInfo.active===mList.code?'active':''"
                              :index="mList.code"
                              @click="linkTo(mList)">
                    {{mList.name}}
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: "Nav",
        computed: {
            menuInfo() {
                let menuInfo = this.$store.getters['menuInfo/getMenuInfo'];

                return {
                    active: menuInfo.active,
                    list: menuInfo.list.map(item => {
                        if (item.show) {
                            return {
                                ...item,
                                child: item.child.filter(list => {
                                    return list.show;
                                })
                            }
                        }
                    })
                }
            },
        },
        methods: {
            linkTo(obj) {
                this.$r.go(obj.code);
            }
        }
    }
</script>

<style lang="scss">
    .jr-nav {
        background: #488ff1;
        color: #ffff;
        transition: width 0.2s linear;
        min-height: 100vh;

        .jr-nav_title {
            text-align: center;
            padding: 0;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;

            .logo {
                width: 90%;
                margin: 5px auto;
                margin-bottom: 0;
                border-radius: 4px;
            }
        }

        .jr-nav_menu {
            border-right-color: transparent;

            .el-submenu__title i {
                color: #fff;
            }

            .el-menu-item.active {
                color: #fff;
                background: #76aeff !important;
            }

            .el-menu-item.is-active {
                color: #fff;
                /*background: #76aeff !important;*/
            }

            .el-menu-item {
                font-size: 12px;
            }
        }
    }
</style>
