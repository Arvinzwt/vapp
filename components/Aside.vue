<template>
    <!--左侧菜单-->
    <el-aside class="jr-aside" :width="navIsCollapse?'200px':'0'">
        <img src="/images/menu_bg.png" alt="logo" class="aside-logo"/>
        <el-menu
                class="aside-menu"
                background-color="#488ff1"
                text-color="#fff"
                :default-openeds="['customer']"
                :default-active="$router.name">
            <el-submenu v-for="mItem in menuList"
                        :key="mItem.name"
                        :index="mItem.name">
                <template slot="title">
                    <span class="iconfont mr-1" :class="mItem.icon"></span>
                    <span>{{ mItem.title }}</span>
                </template>
                <el-menu-item v-for="mList in mItem.child"
                              :key="mList.name"
                              :index="mList.name"
                              :class="isActive(mList)"
                              @click="linkTo(mList)">
                    <span> {{ mList.title }}</span>
                    <span v-if="mList.num" class="jr-badge">{{ mList.num }}</span>
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
    props: ['navIsCollapse'],
    computed: {
        isActive() {
            return mList => {
                return this.$route.name === mList.name || mList.child.includes(this.$route.name) ? 'active' : ''
            }
        }
    },
    async mounted() {
        this.menuList = [];
        this.$store.getters['getMenu'].forEach(item => {
            if (item.show && this.$utils.verifyAuth(item.code)) {//过滤第一层
                this.menuList.push({
                    ...item,
                    child: item.child.filter(list => {//过滤第二层
                        return list.show && this.$utils.verifyAuth(list.code);
                    })
                })
            }
        })
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
