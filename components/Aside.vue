<template>
    <el-aside class="jr-aside" width="200px">
        <img src="/images/menu_bg.png" alt="logo" class="aside-logo"/>
        <el-menu
                class="aside-menu"
                background-color="#488ff1"
                text-color="#fff"
                :default-openeds="['customer']"
                :default-active="$router.name">
            <el-submenu v-for="mItem in menuList"
                        :key="mItem.id"
                        :index="mItem.id">
                <template slot="title">
                    <span class="iconfont mr-1" :class="mItem.icon"></span>
                    <span>{{ mItem.name }}</span>
                </template>
                <el-menu-item v-for="mList in mItem.child"
                              :key="mList.id"
                              :index="mList.id"
                              :class="$route.name===mList.id?'active':''"
                              @click="linkTo(mList)">
                    <span> {{ mList.name }}</span>
                    <span v-if="mList.num" class="jr-badge bg-danger ml-1">{{ mList.num }}</span>
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
        this.menuList = await this.$api.common.getMenu().then(list => {
            let menuList = []
            list.forEach(item => {
                if (item.show) {
                    menuList.push({
                        ...item,
                        child: item.child.filter(list => {
                            return list.menuShow
                        })
                    })
                }
            })
            return menuList
        });
    },
    methods: {
        linkTo(obj) {
            this.$router.push({
                path: obj.path
            })
        }
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
        }

        .jr-badge {
            border-radius: 10px;
            color: #fff;
            display: inline-block;
            font-size: 12px;
            padding: 0 6px;
            text-align: center;
            white-space: nowrap;
            height: 18px;
            line-height: 18px;
            border: 1px solid #488ff1;
        }
    }
}
</style>
